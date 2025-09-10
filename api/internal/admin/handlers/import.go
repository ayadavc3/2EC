package handlers

import (
	"log/slog"

	"goapi/internal/shared/database"

	"github.com/gofiber/fiber/v2"
)

// UserHandler handles user-specific endpoints
type ImportHandler struct {
	db     *database.Database
	logger *slog.Logger
}

// NewUserHandler creates a new user handler
func NewImportHandler(db *database.Database, logger *slog.Logger) *ImportHandler {
	return &ImportHandler{
		db:     db,
		logger: logger,
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

// Home returns welcome message for user API
func (h *ImportHandler) StudentImport(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Welcome to the User API!",
		"service": "user",
	})
}

// Health check endpoint
func (h *ImportHandler) GuardianImport(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status":  "healthy",
		"service": "user-api",
	})
}
