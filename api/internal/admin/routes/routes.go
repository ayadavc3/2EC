package routes

import (
	"goapi/internal/admin/handlers"

	"github.com/gofiber/fiber/v2"
)

// UserRoutes defines the user API routes
type AdminRoutes struct {
	adminHandler       *handlers.AdminHandler
	adminAPIHandler    *handlers.AdminAPIHandler
	auditHandler       *handlers.AuditHandler
	geolocationHandler *handlers.GeolocationHandler
	groupHandler       *handlers.GroupHandler
	userHandler        *handlers.UserHandler
	dashboardHandler   *handlers.DashboardHandler
	messageHandler     *handlers.MessageHandler
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

	// Admin routes
	admin := app.Group("/admins")
	admin.Get("/", r.adminHandler.Home)
	admin.Get("/health", r.adminHandler.Health)

	// Audit routes
	audit := app.Group("/audits")
	audit.Get("/", r.auditHandler.Home)
	audit.Get("/health", r.auditHandler.Health)

	// Dashboard routes
	dashboard := app.Group("/dashboard")
	dashboard.Get("/", r.dashboardHandler.Home)

	// Geolocation routes
	geolocation := app.Group("/geolocations")
	geolocation.Get("/", r.geolocationHandler.Home)
	geolocation.Get("/health", r.geolocationHandler.Health)

	// Group routes
	group := app.Group("/groups")
	group.Get("/", r.groupHandler.Home)
	group.Get("/health", r.groupHandler.Health)

	// Messaging routes
	messaging := app.Group("/messages")
	messaging.Get("/", r.messageHandler.Home)
	messaging.Get("/health", r.messageHandler.Health)

	// User routes
	user := app.Group("/users")
	user.Get("/", r.userHandler.Home)
	user.Get("/health", r.userHandler.Health)
}
