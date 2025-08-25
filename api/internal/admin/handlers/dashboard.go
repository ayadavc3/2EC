package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
)

type DashboardHandler struct {
	logger *slog.Logger
}

func NewDashboardHandler(logger *slog.Logger) *DashboardHandler {
	return &DashboardHandler{
		logger: logger,
	}
}

func (h *DashboardHandler) Home(c *fiber.Ctx) error {
	return c.SendString("Welcome to the Fiber API!")
}
