package routes

import (
	"goapi/internal/user/handlers"

	"github.com/gofiber/fiber/v2"
)

// UserRoutes defines the user API routes
type UserRoutes struct {
	userHandler *handlers.UserHandler
	apiHandler  *handlers.APIHandler
}

// NewUserRoutes creates a new user routes instance
func NewUserRoutes(userHandler *handlers.UserHandler, apiHandler *handlers.APIHandler) *UserRoutes {
	return &UserRoutes{
		userHandler: userHandler,
		apiHandler:  apiHandler,
	}
}

// SetupRoutes configures all user routes
func (r *UserRoutes) SetupRoutes(app *fiber.App) {
	// Basic routes
	app.Get("/", r.apiHandler.Home)
	app.Get("/health", r.userHandler.Health)

	// User-specific routes (require authentication)
	users := app.Group("/users")

	// Profile management
	users.Get("/", r.userHandler.Home)
	users.Get("/health", r.userHandler.Health)
}
