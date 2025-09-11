package dtos

import (
	"time"

	"goapi/ent"
)

type StudentCreateArgs struct {
	FirstName   string `json:"first_name" validate:"required"`
	LastName    string `json:"last_name" validate:"required"`
	MiddleName  string `json:"middle_name"`
	PhoneNumber string `json:"phone_number" validate:"required"`
	Email       string `json:"email"`
	PhotoURL    string `json:"photo_url"`
}

type StudentUpdateArgs struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	MiddleName  string `json:"middle_name"`
	PhoneNumber string `json:"phone_number"`
}

// StudentResponse represents a clean DTO for Student API responses
type StudentResponse struct {
	ID          string             `json:"id"`
	PhotoURL    string             `json:"photo_url,omitempty"`
	FirstName   string             `json:"first_name"`
	LastName    string             `json:"last_name,omitempty"`
	MiddleName  string             `json:"middle_name,omitempty"`
	PhoneNumber string             `json:"phone_number"`
	Email       string             `json:"email,omitempty"`
	Guardians   []GuardianResponse `json:"guardians,omitempty"`
	CreatedAt   time.Time          `json:"created_at"`
	UpdatedAt   time.Time          `json:"updated_at"`
}

// GuardianResponse represents a clean DTO for Guardian API responses
type GuardianResponse struct {
	ID          string    `json:"id"`
	PhotoURL    string    `json:"photo_url,omitempty"`
	Title       string    `json:"title"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name,omitempty"`
	MiddleName  string    `json:"middle_name,omitempty"`
	PhoneNumber string    `json:"phone_number"`
	Email       string    `json:"email,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// ToStudentResponse converts an Ent Student to StudentResponse DTO
func ToStudentResponse(student *ent.Student) StudentResponse {
	response := StudentResponse{
		ID:          student.ID,
		PhotoURL:    student.PhotoURL,
		FirstName:   student.FirstName,
		LastName:    student.LastName,
		MiddleName:  student.MiddleName,
		PhoneNumber: student.PhoneNumber,
		Email:       student.Email,
		CreatedAt:   student.CreatedAt,
		UpdatedAt:   student.UpdatedAt,
	}

	// Convert guardians if they are loaded
	if student.Edges.Guardians != nil {
		response.Guardians = make([]GuardianResponse, len(student.Edges.Guardians))
		for i, guardian := range student.Edges.Guardians {
			response.Guardians[i] = ToGuardianResponse(guardian)
		}
	}

	return response
}

// ToGuardianResponse converts an Ent Guardian to GuardianResponse DTO
func ToGuardianResponse(guardian *ent.Guardian) GuardianResponse {
	return GuardianResponse{
		ID:          guardian.ID,
		PhotoURL:    guardian.PhotoURL,
		Title:       guardian.Title,
		FirstName:   guardian.FirstName,
		LastName:    guardian.LastName,
		MiddleName:  guardian.MiddleName,
		PhoneNumber: guardian.PhoneNumber,
		Email:       guardian.Email,
		CreatedAt:   guardian.CreatedAt,
		UpdatedAt:   guardian.UpdatedAt,
	}
}

// ToStudentResponses converts a slice of Ent Students to StudentResponse DTOs
func ToStudentResponses(students []*ent.Student) []StudentResponse {
	responses := make([]StudentResponse, len(students))
	for i, student := range students {
		responses[i] = ToStudentResponse(student)
	}
	return responses
}

// StudentCSVRecord represents a CSV row for student import
type StudentCSVRecord struct {
	FirstName   string `json:"first_name" validate:"required"`
	LastName    string `json:"last_name" validate:"required"`
	MiddleName  string `json:"middle_name"`
	PhoneNumber string `json:"phone_number" validate:"required"`
	Email       string `json:"email"`
	PhotoURL    string `json:"photo_url"`
}

// ImportStatus represents the status of import process
type ImportStatus struct {
	Status      string   `json:"status"`
	Message     string   `json:"message"`
	Progress    int      `json:"progress"`
	Total       int      `json:"total"`
	ProcessedAt string   `json:"processed_at"`
	Errors      []string `json:"errors,omitempty"`
}

// ImportResult represents the final result of import process
type ImportResult struct {
	TotalRecords     int      `json:"total_records"`
	SuccessfulImport int      `json:"successful_import"`
	FailedImport     int      `json:"failed_import"`
	Errors           []string `json:"errors"`
	CompletedAt      string   `json:"completed_at"`
}
