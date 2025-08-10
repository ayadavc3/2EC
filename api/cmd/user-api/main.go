package main

import (
	"goapi/internal/shared/config"
	"goapi/internal/shared/database"
	"goapi/internal/user"
	"goapi/internal/user/handlers"
	"goapi/internal/user/routes"
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

		// Provide user-specific dependencies
		fx.Provide(handlers.NewAPIHandler),
		fx.Provide(handlers.NewUserHandler),
		fx.Provide(routes.NewUserRoutes),

		fx.Provide(user.NewUserServer),
		fx.Invoke(func(*fiber.App) {}),
	).Run()
}
