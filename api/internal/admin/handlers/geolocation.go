package handlers

import (
	"log/slog"

	"goapi/internal/shared/database"

	"github.com/gofiber/fiber/v2"
)

// UserHandler handles user-specific endpoints
type GeolocationHandler struct {
	db     *database.Database
	logger *slog.Logger
}

// NewUserHandler creates a new user handler
func NewGeolocationHandler(db *database.Database, logger *slog.Logger) *GeolocationHandler {
	return &GeolocationHandler{
		db:     db,
		logger: logger,
	}
}

// Home returns welcome message for user API
func (h *GeolocationHandler) Home(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Welcome to the User API!",
		"service": "user",
	})
}

// Health check endpoint
func (h *GeolocationHandler) Health(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status":  "healthy",
		"service": "user-api",
	})
}
