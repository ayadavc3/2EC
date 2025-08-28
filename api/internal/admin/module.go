package admin

import (
	"context"
	"goapi/internal/admin/routes"
	"goapi/internal/shared/config"
	"goapi/internal/shared/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"go.uber.org/fx"
)

func NewAdminServer(lc fx.Lifecycle, cfg *config.Config, adminRoutes *routes.AdminRoutes, db *database.Database) *fiber.App {
	app := fiber.New()

	// Middleware
	app.Use(cors.New())
	// app.Use(cache.New())
	app.Use(logger.New())
	app.Use(helmet.New())
	app.Use(recover.New())
	app.Use(healthcheck.New())

	adminRoutes.SetupRoutes(app)

	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			if err := db.RunMigrations(); err != nil {
				return err
			}
			go func() {
				if err := app.Listen("0.0.0.0:3000"); err != nil {
					panic(err)
				}
			}()
			return nil
		},
		OnStop: func(ctx context.Context) error {
			db.Close()
			return app.Shutdown()
		},
	})

	return app
}
