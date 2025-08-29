package database

import (
	"context"
	"database/sql"
	"fmt"
	"goapi/ent"
	"goapi/internal/shared/config"
	"log/slog"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type Database struct {
	Client *ent.Client
}

// New creates a new database connection pool
func NewDatabase(cfg *config.Config) (*Database, error) {
	db, err := sql.Open("pgx", cfg.DatabaseUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Configure connection pool
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)

	// Test the connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	drv := entsql.OpenDB(dialect.Postgres, db)
	client := ent.NewClient(ent.Driver(drv))

	return &Database{Client: client}, nil
}

func (d *Database) RunMigrations() error {
	if err := d.Client.Schema.Create(context.Background()); err != nil {
		return fmt.Errorf("failed to create schema: %w", err)
	}

	return nil
}

// Close closes the database connection pool
func (d *Database) Close() {
	slog.Info("Closing database connection pool")
	if d.Client != nil {
		d.Client.Close()
		slog.Info("Database connection pool closed")
	}
}
