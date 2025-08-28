package main

import (
	"goapi/internal/admin"
	"goapi/internal/admin/handlers"
	"goapi/internal/admin/routes"
	"goapi/internal/shared/config"
	"goapi/internal/shared/database"
	"goapi/pkg/logger"

	"github.com/gofiber/fiber/v2"
	"go.uber.org/fx"
)

func main() {
	fx.New(
		// Provide shared dependencies
		fx.Provide(logger.NewLogger),
		fx.Provide(config.LoadConfig),
		fx.Provide(database.NewDatabase),

		// Provide admin-specific dependencies
		fx.Provide(handlers.NewAdminHandler),
		fx.Provide(handlers.NewAdminAPIHandler),
		fx.Provide(handlers.NewAuditHandler),
		fx.Provide(handlers.NewGeolocationHandler),
		fx.Provide(handlers.NewGroupHandler),
		fx.Provide(handlers.NewMessageHandler),
		fx.Provide(handlers.NewStudentHandler),
		fx.Provide(handlers.NewDashboardHandler),
		fx.Provide(routes.NewAdminRoutes),
		fx.Provide(admin.NewAdminServer),

		fx.Invoke(func(*fiber.App) {}),
	).Run()
}
