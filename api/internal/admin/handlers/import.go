package handlers

import (
	"bufio"
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"strings"
	"sync"
	"time"

	"goapi/internal/admin/dtos"
	"goapi/internal/shared/database"
	"goapi/pkg/utils/jsend"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// ImportHandler handles import-specific endpoints
type ImportHandler struct {
	db        *database.Database
	logger    *slog.Logger
	validator *validator.Validate
	// Store active SSE connections
	sseConnections      map[string]chan dtos.ImportStatus
	sseConnectionsMutex sync.RWMutex
}

// NewImportHandler creates a new import handler
func NewImportHandler(db *database.Database, logger *slog.Logger) *ImportHandler {
	return &ImportHandler{
		db:             db,
		logger:         logger,
		validator:      validator.New(),
		sseConnections: make(map[string]chan dtos.ImportStatus),
	}
}

// Home returns welcome message for user API
func (h *ImportHandler) GetAll(c *fiber.Ctx) error {

	return c.JSON([]fiber.Map{
		{
			"message": "Welcome to the User API!",
			"service": "user",
		},
	})
}

// StudentImport handles CSV file upload for student data import
func (h *ImportHandler) StudentImport(c *fiber.Ctx) error {
	// Generate unique session ID for this import
	sessionID := uuid.New().String()

	// Get the uploaded file
	file, err := c.FormFile("csv_file")
	if err != nil {
		h.logger.Error("Failed to get uploaded file", "error", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "No CSV file uploaded",
		})
	}

	// Validate file type
	if !strings.HasSuffix(strings.ToLower(file.Filename), ".csv") {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "File must be a CSV file",
		})
	}

	// Open the uploaded file
	src, err := file.Open()
	if err != nil {
		h.logger.Error("Failed to open uploaded file", "error", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to process uploaded file",
		})
	}
	defer src.Close()

	// Start the import process in a goroutine
	go h.processStudentCSV(sessionID, src, file.Filename)

	// Return session ID for SSE connection
	return c.JSON(fiber.Map{
		"message":    "File upload successful, processing started",
		"session_id": sessionID,
		"filename":   file.Filename,
	})
}

// SSEStatus handles Server-Sent Events for import status updates
func (h *ImportHandler) SSEStatus(c *fiber.Ctx) error {
	sessionID := c.Params("sessionId")
	if sessionID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Session ID is required",
		})
	}

	// Set SSE headers
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Access-Control-Allow-Origin", "*")
	c.Set("Access-Control-Allow-Headers", "Cache-Control")

	// Create a channel for this session
	statusChan := make(chan dtos.ImportStatus, 100)

	// Store the connection
	h.sseConnectionsMutex.Lock()
	h.sseConnections[sessionID] = statusChan
	h.sseConnectionsMutex.Unlock()

	// Clean up when connection closes
	defer func() {
		h.sseConnectionsMutex.Lock()
		delete(h.sseConnections, sessionID)
		close(statusChan)
		h.sseConnectionsMutex.Unlock()
	}()

	// Set up context for cancellation
	ctx := c.Context()

	// Send status updates
	c.Context().SetBodyStreamWriter(func(w *bufio.Writer) {
		for {
			select {
			case status, ok := <-statusChan:
				if !ok {
					return
				}

				statusJSON, err := json.Marshal(status)
				if err != nil {
					h.logger.Error("Failed to marshal status", "error", err)
					continue
				}

				// Write SSE format
				fmt.Fprintf(w, "data: %s\n\n", string(statusJSON))

				// Flush the data
				if err := w.Flush(); err != nil {
					h.logger.Error("Failed to flush SSE data", "error", err)
					return
				}

				// End connection if import is complete
				if status.Status == "completed" || status.Status == "failed" {
					return
				}
			case <-ctx.Done():
				return
			}
		}
	})

	return nil
}

// processStudentCSV handles the CSV processing in background
func (h *ImportHandler) processStudentCSV(sessionID string, src io.Reader, filename string) {
	h.sendStatus(sessionID, dtos.ImportStatus{
		Status:      "upload_complete",
		Message:     fmt.Sprintf("File '%s' uploaded successfully", filename),
		Progress:    0,
		ProcessedAt: time.Now().Format(time.RFC3339),
	})

	// Parse CSV
	h.sendStatus(sessionID, dtos.ImportStatus{
		Status:      "parsing",
		Message:     "Parsing CSV file...",
		Progress:    10,
		ProcessedAt: time.Now().Format(time.RFC3339),
	})

	records, err := h.parseStudentCSV(src)
	if err != nil {
		h.sendStatus(sessionID, dtos.ImportStatus{
			Status:      "failed",
			Message:     fmt.Sprintf("Failed to parse CSV: %v", err),
			Progress:    0,
			ProcessedAt: time.Now().Format(time.RFC3339),
			Errors:      []string{err.Error()},
		})
		return
	}

	totalRecords := len(records)
	h.sendStatus(sessionID, dtos.ImportStatus{
		Status:      "validation",
		Message:     fmt.Sprintf("Validating %d records...", totalRecords),
		Progress:    25,
		Total:       totalRecords,
		ProcessedAt: time.Now().Format(time.RFC3339),
	})

	// Validate records
	validRecords, validationErrors := h.validateStudentRecords(records)

	if len(validationErrors) > 0 {
		h.sendStatus(sessionID, dtos.ImportStatus{
			Status:      "validation_warnings",
			Message:     fmt.Sprintf("Validation completed with %d warnings. Processing %d valid records...", len(validationErrors), len(validRecords)),
			Progress:    40,
			Total:       totalRecords,
			ProcessedAt: time.Now().Format(time.RFC3339),
			Errors:      validationErrors,
		})
	} else {
		h.sendStatus(sessionID, dtos.ImportStatus{
			Status:      "validation_complete",
			Message:     "All records validated successfully",
			Progress:    40,
			Total:       totalRecords,
			ProcessedAt: time.Now().Format(time.RFC3339),
		})
	}

	// Process records
	h.sendStatus(sessionID, dtos.ImportStatus{
		Status:      "processing",
		Message:     "Processing student records...",
		Progress:    50,
		Total:       len(validRecords),
		ProcessedAt: time.Now().Format(time.RFC3339),
	})

	successCount, processingErrors := h.processStudentRecords(sessionID, validRecords)

	// Send completion status
	allErrors := append(validationErrors, processingErrors...)
	h.sendStatus(sessionID, dtos.ImportStatus{
		Status:      "completed",
		Message:     fmt.Sprintf("Import completed. %d successful, %d failed", successCount, len(processingErrors)),
		Progress:    100,
		Total:       totalRecords,
		ProcessedAt: time.Now().Format(time.RFC3339),
		Errors:      allErrors,
	})
}

// parseStudentCSV parses CSV data into StudentCSVRecord structs
func (h *ImportHandler) parseStudentCSV(src io.Reader) ([]dtos.StudentCSVRecord, error) {
	reader := csv.NewReader(src)

	// Read header
	headers, err := reader.Read()
	if err != nil {
		return nil, fmt.Errorf("failed to read CSV headers: %w", err)
	}

	// Create header map for field mapping
	headerMap := make(map[string]int)
	for i, header := range headers {
		headerMap[strings.ToLower(strings.TrimSpace(header))] = i
	}

	var records []dtos.StudentCSVRecord
	lineNumber := 1

	for {
		row, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, fmt.Errorf("failed to read CSV row %d: %w", lineNumber, err)
		}
		lineNumber++

		// Map CSV row to struct
		record := dtos.StudentCSVRecord{}

		if idx, exists := headerMap["first_name"]; exists && idx < len(row) {
			record.FirstName = strings.TrimSpace(row[idx])
		}
		if idx, exists := headerMap["last_name"]; exists && idx < len(row) {
			record.LastName = strings.TrimSpace(row[idx])
		}
		if idx, exists := headerMap["middle_name"]; exists && idx < len(row) {
			record.MiddleName = strings.TrimSpace(row[idx])
		}
		if idx, exists := headerMap["phone_number"]; exists && idx < len(row) {
			record.PhoneNumber = strings.TrimSpace(row[idx])
		}
		if idx, exists := headerMap["email"]; exists && idx < len(row) {
			record.Email = strings.TrimSpace(row[idx])
		}
		if idx, exists := headerMap["photo_url"]; exists && idx < len(row) {
			record.PhotoURL = strings.TrimSpace(row[idx])
		}

		records = append(records, record)
	}

	return records, nil
}

// validateStudentRecords validates CSV records
func (h *ImportHandler) validateStudentRecords(records []dtos.StudentCSVRecord) ([]dtos.StudentCSVRecord, []string) {
	var validRecords []dtos.StudentCSVRecord
	var errors []string

	for i, record := range records {
		if err := h.validator.Struct(record); err != nil {
			errors = append(errors, fmt.Sprintf("Row %d: %v", i+2, err))
			continue
		}

		// Additional business logic validation
		if record.FirstName == "" {
			errors = append(errors, fmt.Sprintf("Row %d: First name is required", i+2))
			continue
		}
		if record.LastName == "" {
			errors = append(errors, fmt.Sprintf("Row %d: Last name is required", i+2))
			continue
		}
		if record.PhoneNumber == "" {
			errors = append(errors, fmt.Sprintf("Row %d: Phone number is required", i+2))
			continue
		}

		validRecords = append(validRecords, record)
	}

	return validRecords, errors
}

// processStudentRecords processes validated records and saves to database
func (h *ImportHandler) processStudentRecords(sessionID string, records []dtos.StudentCSVRecord) (int, []string) {
	successCount := 0
	var errors []string

	for i, record := range records {
		// Update progress
		progress := int(float64(i+1)/float64(len(records))*50) + 50 // 50-100%
		h.sendStatus(sessionID, dtos.ImportStatus{
			Status:      "processing",
			Message:     fmt.Sprintf("Processing record %d of %d", i+1, len(records)),
			Progress:    progress,
			Total:       len(records),
			ProcessedAt: time.Now().Format(time.RFC3339),
		})

		// Create student in database
		_, err := h.db.Client.Student.Create().
			SetFirstName(record.FirstName).
			SetLastName(record.LastName).
			SetMiddleName(record.MiddleName).
			SetPhoneNumber(record.PhoneNumber).
			SetEmail(record.Email).
			SetPhotoURL(record.PhotoURL).
			Save(context.Background())

		if err != nil {
			errorMsg := fmt.Sprintf("Row %d: Failed to create student: %v", i+2, err)
			errors = append(errors, errorMsg)
			h.logger.Error("Failed to create student", "error", err, "record", record)
			continue
		}

		successCount++
	}

	return successCount, errors
}

// sendStatus sends status update to SSE connection
func (h *ImportHandler) sendStatus(sessionID string, status dtos.ImportStatus) {
	h.sseConnectionsMutex.RLock()
	statusChan, exists := h.sseConnections[sessionID]
	h.sseConnectionsMutex.RUnlock()

	if exists {
		select {
		case statusChan <- status:
		case <-time.After(time.Second * 5):
			h.logger.Warn("Failed to send status update - channel timeout", "sessionID", sessionID)
		}
	}
}

// GuardianImport placeholder for guardian import functionality
func (h *ImportHandler) GuardianImport(c *fiber.Ctx) error {
	file, err := c.FormFile("document")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(
			jsend.Fail(fiber.Map{
				"document": "A CSV file is required",
			}),
		)
	}

	// validate the file
	if !strings.HasSuffix(strings.ToLower(file.Filename), ".csv") {
		return c.Status(fiber.StatusBadRequest).JSON(
			jsend.Fail(fiber.Map{
				"document": "Only csv file is supported",
			}),
		)
	}

	// Save file inside uploads folder under current working directory:
	filename := fmt.Sprintf("./uploads/guardian-import-%d.csv", time.Now().Unix())
	err = c.SaveFile(file, filename)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(
			jsend.Error("Failed to save uploaded file"),
		)
	}

	// read the file
	src, err := file.Open()
	if err != nil {
		h.logger.Error("Failed to open uploaded file", "error", err)
		return c.Status(fiber.StatusInternalServerError).JSON(
			jsend.Error("Failed to process uploaded file"),
		)
	}
	defer src.Close()

	// parse the file and start the import process in a goroutine later
	records, err := h.parseStudentCSV(src)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(
			jsend.Error("Failed to parse uploaded csv file"),
		)
	}

	// Start validation process and collect errors
	// Start creating students in the database and collect errors
	// Save reports in a separate file
	// Update import request with the results and status

	return c.JSON(jsend.Success("records", records))
}
