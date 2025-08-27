package database

import (
	"database/sql"
	"fmt"
	"log/slog"

	"goapi/ent"
	"goapi/internal/shared/config"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type Database struct {
	Client *ent.Client
}

// New creates a new database connection pool
func NewDatabase(cfg *config.Config) (*Database, error) {
	// Build connection string
	connStr := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.Database.Host, cfg.Database.Port, cfg.Database.User, cfg.Database.Password, cfg.Database.Database, cfg.Database.SSLMode,
	)

	db, err := sql.Open("pgx", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	drv := entsql.OpenDB(dialect.Postgres, db)
	client := ent.NewClient(ent.Driver(drv))

	return &Database{Client: client}, nil
}

// Close closes the database connection pool
func (d *Database) Close() {
	slog.Info("Closing database connection pool")
	if d.Client != nil {
		d.Client.Close()
		slog.Info("Database connection pool closed")
	}
}
