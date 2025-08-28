package handlers

import (
	"log/slog"

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
	return c.SendString("Welcome to the Admin API")
}
