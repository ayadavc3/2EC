package dtos

import (
	"time"
)

type GuardianCreateArgs struct {
	FirstName   string `json:"first_name" validate:"required"`
	LastName    string `json:"last_name" validate:"required"`
	MiddleName  string `json:"middle_name"`
	PhoneNumber string `json:"phone_number" validate:"required"`
}

type GuardianUpdateArgs struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	MiddleName  string `json:"middle_name"`
	PhoneNumber string `json:"phone_number"`
}

// GuardianResponse represents a clean DTO for Guardian API responses
type GuardianStudentResponse struct {
	ID          string    `json:"id"`
	PhotoURL    string    `json:"photo_url,omitempty"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name,omitempty"`
	MiddleName  string    `json:"middle_name,omitempty"`
	PhoneNumber string    `json:"phone_number"`
	Email       string    `json:"email,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
