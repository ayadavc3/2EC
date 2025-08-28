package handlers

import (
	"fmt"
	"goapi/ent/student"
	"goapi/internal/admin/dtos"
	"goapi/internal/shared/database"
	"log/slog"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

// UserHandler handles user-specific endpoints
type StudentHandler struct {
	db     *database.Database
	logger *slog.Logger
}

// NewUserHandler creates a new user handler
func NewStudentHandler(db *database.Database, logger *slog.Logger) *StudentHandler {
	return &StudentHandler{
		db:     db,
		logger: logger,
	}
}

var validate *validator.Validate = validator.New()

// Home returns welcome message for user API
func (h *StudentHandler) GetAll(c *fiber.Ctx) error {
	students, err := h.db.Client.Student.
		Query().
		Where(student.Deleted(false)).
		Order(student.ByCreatedAt(sql.OrderDesc())).
		All(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	// Convert to clean DTO response
	response := dtos.ToStudentResponses(students)
	return c.JSON(response)
}

// Health check endpoint
func (h *StudentHandler) GetById(c *fiber.Ctx) error {
	studentId := c.Params("id")
	if studentId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Student ID is required",
		})
	}

	student, err := h.db.Client.Student.Query().WithGuardians().Where(student.ID(studentId), student.Deleted(false)).First(c.Context())
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Student record not found",
		})
	}

	return c.JSON(dtos.ToStudentResponse(student))
}

func (h *StudentHandler) Create(c *fiber.Ctx) error {
	var args dtos.StudentCreateArgs
	if err := c.BodyParser(&args); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	fmt.Println(args)

	if err := validate.Struct(&args); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Validation failed",
		})
	}

	student, err := h.db.Client.Student.Create().
		SetFirstName(args.FirstName).
		SetLastName(args.LastName).
		SetMiddleName(args.MiddleName).
		SetPhoneNumber(args.PhoneNumber).
		SetEmail(args.Email).
		SetPhotoURL(args.PhotoURL).
		Save(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create student",
		})
	}

	return c.JSON(dtos.ToStudentResponse(student))
}

func (h *StudentHandler) Update(c *fiber.Ctx) error {
	var args dtos.StudentUpdateArgs
	if err := c.BodyParser(&args); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if err := validate.Struct(args); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Validation failed",
		})
	}

	student, err := h.db.Client.Student.UpdateOneID(c.Params("id")).
		SetFirstName(args.FirstName).
		SetLastName(args.LastName).
		SetMiddleName(args.MiddleName).
		SetPhoneNumber(args.PhoneNumber).
		Save(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update student",
		})
	}

	return c.JSON(dtos.ToStudentResponse(student))
}

func (h *StudentHandler) Delete(c *fiber.Ctx) error {
	studentId := c.Params("id")
	if studentId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Student ID is required",
		})
	}

	_, err := h.db.Client.Student.UpdateOneID(studentId).
		SetDeleted(true).
		SetDeletedAt(time.Now()).
		Save(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete student",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Student deleted successfully",
	})
}
