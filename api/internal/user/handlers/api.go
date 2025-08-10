package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"
)

type APIHandler struct {
	logger *slog.Logger
}

func NewAPIHandler(logger *slog.Logger) *APIHandler {
	return &APIHandler{
		logger: logger,
	}
}

func (h *APIHandler) Home(c *fiber.Ctx) error {
	return c.SendString("Welcome to the Fiber API!")
}
