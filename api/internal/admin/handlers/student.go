package handlers

import (
	"goapi/ent/student"
	"goapi/internal/admin/dtos"
	"goapi/internal/shared/database"
	"goapi/pkg/utils/jsend"
	"log/slog"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

// UserHandler handles user-specific endpoints
type StudentHandler struct {
	db       *database.Database
	logger   *slog.Logger
	validate *validator.Validate
}

// NewUserHandler creates a new user handler
func NewStudentHandler(db *database.Database, logger *slog.Logger) *StudentHandler {
	return &StudentHandler{
		db:       db,
		logger:   logger,
		validate: validator.New(),
	}
}

// Home returns welcome message for user API
func (h *StudentHandler) GetAll(c *fiber.Ctx) error {
	students, err := h.db.Client.Student.
		Query().
		Where(student.Deleted(false)).
		Order(student.ByCreatedAt(sql.OrderDesc())).
		All(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(
			jsend.Error("Failed to get students data. try again later"),
		)
	}

	// Convert to clean DTO response
	result := dtos.ToStudentResponses(students)
	return c.JSON(jsend.Success("students", result))
}

// Health check endpoint
func (h *StudentHandler) GetById(c *fiber.Ctx) error {
	studentId := c.Params("id")
	if studentId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(
			jsend.Fail("Student id is required for this request"),
		)
	}

	student, err := h.db.Client.Student.
		Query().
		WithGuardians().
		Where(student.ID(studentId), student.Deleted(false)).
		First(c.Context())

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(
			jsend.Error("Student record not found"),
		)
	}

	result := dtos.ToStudentResponse(student)
	return c.JSON(jsend.Success("student", result))
}

func (h *StudentHandler) Create(c *fiber.Ctx) error {
	var args dtos.StudentCreateArgs
	if err := c.BodyParser(&args); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(
			jsend.Fail("Invalid request body"),
		)
	}

	if err := h.validate.Struct(&args); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(
			jsend.Fail("Data validation failed. check the request body"),
		)
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
		return c.Status(fiber.StatusInternalServerError).JSON(
			jsend.Error("Failed to create student"),
		)
	}

	result := dtos.ToStudentResponse(student)
	return c.JSON(jsend.Success("student", result))
}

func (h *StudentHandler) Update(c *fiber.Ctx) error {
	var args dtos.StudentUpdateArgs
	if err := c.BodyParser(&args); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(
			jsend.Fail("Invalid request body"),
		)
	}

	if err := h.validate.Struct(&args); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(
			jsend.Fail("Data validation failed. check the request body"),
		)
	}

	student, err := h.db.Client.Student.UpdateOneID(c.Params("id")).
		SetFirstName(args.FirstName).
		SetLastName(args.LastName).
		SetMiddleName(args.MiddleName).
		SetPhoneNumber(args.PhoneNumber).
		Save(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(
			jsend.Error("Failed to update student"),
		)
	}

	result := dtos.ToStudentResponse(student)
	return c.JSON(jsend.Success("student", result))
}

func (h *StudentHandler) Delete(c *fiber.Ctx) error {
	studentId := c.Params("id")
	if studentId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(
			jsend.Fail("Student ID is required"),
		)
	}

	_, err := h.db.Client.Student.UpdateOneID(studentId).
		SetDeleted(true).
		SetDeletedAt(time.Now()).
		Save(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(
			jsend.Error("Failed to delete student record. or it is already deleted"),
		)
	}

	return c.JSON(jsend.Success("student", nil))
}
