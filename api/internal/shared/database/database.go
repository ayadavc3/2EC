package database

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"goapi/internal/shared/config"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Database struct {
	Pool *pgxpool.Pool
}

// New creates a new database connection pool
func NewDatabase(cfg *config.Config) (*Database, error) {
	// Build connection string
	connStr := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.Database.Host, cfg.Database.Port, cfg.Database.User, cfg.Database.Password, cfg.Database.Database, cfg.Database.SSLMode,
	)

	// Configure connection pool
	poolConfig, err := pgxpool.ParseConfig(connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to parse database config: %w", err)
	}

	// Set connection pool settings
	poolConfig.MaxConns = 25
	poolConfig.MinConns = 5
	poolConfig.MaxConnLifetime = time.Hour
	poolConfig.MaxConnIdleTime = time.Minute * 30

	// Disable automatic prepared statement caching to avoid conflicts
	poolConfig.ConnConfig.DefaultQueryExecMode = pgx.QueryExecModeExec

	// Create connection pool
	pool, err := pgxpool.NewWithConfig(context.Background(), poolConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %w", err)
	}

	// Test the connection
	if err := pool.Ping(context.Background()); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	slog.Info("Successfully connected to database")

	return &Database{Pool: pool}, nil
}

// Close closes the database connection pool
func (d *Database) Close() {
	slog.Info("Closing database connection pool")
	if d.Pool != nil {
		d.Pool.Close()
		slog.Info("Database connection pool closed")
	}
}

// GetConn returns a connection from the pool
func (d *Database) GetConn(ctx context.Context) (*pgxpool.Conn, error) {
	return d.Pool.Acquire(ctx)
}

// Ping checks if the database is reachable
func (d *Database) Ping(ctx context.Context) error {
	return d.Pool.Ping(ctx)
}

// Stats returns connection pool statistics
func (d *Database) Stats() *pgxpool.Stat {
	return d.Pool.Stat()
}

// Health checks database health and returns status
func (d *Database) Health(ctx context.Context) error {
	// Set a timeout for the health check
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	// Ping the database
	if err := d.Pool.Ping(ctx); err != nil {
		return fmt.Errorf("database health check failed: %w", err)
	}

	return nil
}
