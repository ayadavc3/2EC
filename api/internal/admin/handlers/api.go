package handlers

import (
	"log/slog"

	"goapi/internal/admin/dtos"
	"goapi/internal/shared/database"

	"github.com/gofiber/fiber/v2"
)

type AdminAPIHandler struct {
	db     *database.Database
	logger *slog.Logger
}

func NewAdminAPIHandler(db *database.Database, logger *slog.Logger) *AdminAPIHandler {
	return &AdminAPIHandler{
		db:     db,
		logger: logger,
	}
}

func (h *AdminAPIHandler) Home(c *fiber.Ctx) error {
	students, err := h.db.Client.Student.Query().All(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Convert to clean DTO response
	response := dtos.ToStudentResponses(students)
	return c.JSON(response)
}
