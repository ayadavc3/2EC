package main

import (
	"context"
	"fmt"
	"goapi/ent"
	"goapi/internal/shared/config"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	// fx.New(
	// 	// Provide shared dependencies
	// 	fx.Provide(logger.NewLogger),
	// 	fx.Provide(config.LoadConfig),
	// 	fx.Provide(database.NewDatabase),

	// 	// Provide user-specific dependencies
	// 	fx.Provide(handlers.NewAdminAPIHandler),
	// 	fx.Provide(handlers.NewAdminHandler),
	// 	fx.Provide(routes.NewAdminRoutes),
	// 	fx.Provide(admin.NewAdminServer),

	// 	fx.Invoke(func(*fiber.App) {}),
	// ).Run()

	cfg := config.LoadConfig()

	connStr := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.Database.Host, cfg.Database.Port, cfg.Database.User, cfg.Database.Password, cfg.Database.Database, cfg.Database.SSLMode,
	)

	client, err := ent.Open("postgres", connStr)
	fmt.Println(connStr)
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()
	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	org, err := client.Organization.
		Create().
		SetName("Example Organization").
		SetDescription("This is an example organization").
		SetLogo("https://example.com/logo.png").
		SetWebsite("https://example.com").
		Save(context.Background())

	if err != nil {
		log.Fatalf("failed creating organization: %v", err)
	}

	user, err := client.User.
		Create().
		SetName("Jane Doe").
		SetEmail("jane.doe@example.com").
		SetPassword("password").
		SetOrganization(org).
		Save(context.Background())

	if err != nil {
		log.Fatalf("failed creating user: %v", err)
	}

	fmt.Println(user)
}
