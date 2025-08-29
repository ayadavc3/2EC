package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseUrl      string
	JwtSecret        string
	TwilioAuthToken  string
	TwilioAccountSid string
}

/*
Loads the configuration from the .env file.
*/
func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Printf("Error loading .env file: %v", err)
	}

	return &Config{
		DatabaseUrl:      getEnv("DATABASE_URL", ""),
		JwtSecret:        getEnv("JWT_SECRET", "super_secret"),
		TwilioAuthToken:  getEnv("TWILIO_AUTH_TOKEN", ""),
		TwilioAccountSid: getEnv("TWILIO_ACCOUNT_SID", ""),
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
