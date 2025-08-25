package handlers

import (
	"log/slog"

	"goapi/internal/shared/database"

	"github.com/gofiber/fiber/v2"
)

// UserHandler handles user-specific endpoints
type MessageHandler struct {
	db     *database.Database
	logger *slog.Logger
}

// NewUserHandler creates a new user handler
func NewMessageHandler(db *database.Database, logger *slog.Logger) *MessageHandler {
	return &MessageHandler{
		db:     db,
		logger: logger,
	}
}

// Home returns welcome message for user API
func (h *MessageHandler) Home(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Welcome to the User API!",
		"service": "user",
	})
}

// Health check endpoint
func (h *MessageHandler) Health(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status":  "healthy",
		"service": "user-api",
	})
}
