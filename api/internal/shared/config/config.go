package config

import (
	"os"
	"strconv"

	"goapi/pkg/utils"

	"github.com/joho/godotenv"
)

type Config struct {
	Database DatabaseConfig
	App      AppConfig
}

type DatabaseConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	Database string
	SSLMode  string
}

type AppConfig struct {
	JwtSecret       string
	Msg91AuthKey    string
	Msg91TemplateID string
}

/*
Loads the configuration from the .env file.
*/
func LoadConfig() *Config {
	utils.Must("loaded", godotenv.Load())

	return &Config{
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnvAsInt("DB_PORT", 5432),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", ""),
			Database: getEnv("DB_NAME", "goapi"),
			SSLMode:  getEnv("DB_SSL_MODE", "disable"),
		},
		App: AppConfig{
			JwtSecret:       getEnv("JWT_SECRET", "secret"),
			Msg91AuthKey:    getEnv("MSG91_AUTH_KEY", ""),
			Msg91TemplateID: getEnv("MSG91_TEMPLATE_ID", ""),
		},
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}
