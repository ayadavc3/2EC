package routes

import (
	"goapi/internal/admin/handlers"

	"github.com/gofiber/fiber/v2"
)

// UserRoutes defines the user API routes
type AdminRoutes struct {
	adminHandler    *handlers.AdminHandler
	adminAPIHandler *handlers.AdminAPIHandler
}

// NewUserRoutes creates a new user routes instance
func NewAdminRoutes(adminHandler *handlers.AdminHandler, adminAPIHandler *handlers.AdminAPIHandler) *AdminRoutes {
	return &AdminRoutes{
		adminHandler:    adminHandler,
		adminAPIHandler: adminAPIHandler,
	}
}

// SetupRoutes configures all user routes
func (r *AdminRoutes) SetupRoutes(app *fiber.App) {
	// Basic routes
	app.Get("/", r.adminAPIHandler.Home)
	app.Get("/health", r.adminHandler.Health)

	// User-specific routes (require authentication)
	users := app.Group("/admin")

	// Profile management
	users.Get("/", r.adminHandler.Home)
	users.Get("/health", r.adminHandler.Health)
}
