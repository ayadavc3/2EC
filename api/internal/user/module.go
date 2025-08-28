package user

import (
	"context"
	"goapi/internal/shared/config"
	"goapi/internal/user/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"go.uber.org/fx"
)

func NewUserServer(lc fx.Lifecycle, cfg *config.Config, userRoutes *routes.UserRoutes) *fiber.App {
	app := fiber.New()

	// Middleware
	app.Use(cors.New())
	app.Use(cache.New())
	app.Use(logger.New())
	app.Use(helmet.New())
	app.Use(recover.New())
	app.Use(healthcheck.New())

	userRoutes.SetupRoutes(app)

	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			go func() {
				if err := app.Listen("0.0.0.0:3000"); err != nil {
					panic(err)
				}
			}()
			return nil
		},
		OnStop: func(ctx context.Context) error {
			return app.Shutdown()
		},
	})

	return app
}
