package handlers

import (
	"log/slog"

	"goapi/internal/shared/database"

	"github.com/gofiber/fiber/v2"
)

// UserHandler handles user-specific endpoints
type UserHandler struct {
	logger *slog.Logger
	db     *database.Database
}

// NewUserHandler creates a new user handler
func NewUserHandler(db *database.Database, logger *slog.Logger) *UserHandler {
	return &UserHandler{
		db:     db,
		logger: logger,
	}
}

// Home returns welcome message for user API
func (h *UserHandler) Home(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Welcome to the User API!",
		"service": "user",
	})
}

// Health check endpoint
func (h *UserHandler) Health(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status":  "healthy",
		"service": "user-api",
	})
}
