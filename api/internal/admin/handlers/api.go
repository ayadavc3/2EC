package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
)

type AdminAPIHandler struct {
	logger *slog.Logger
}

func NewAdminAPIHandler(logger *slog.Logger) *AdminAPIHandler {
	return &AdminAPIHandler{
		logger: logger,
	}
}

func (h *AdminAPIHandler) Home(c *fiber.Ctx) error {
	return c.SendString("Welcome to the Fiber API!")
}
