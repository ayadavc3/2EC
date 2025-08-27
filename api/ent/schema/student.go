package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Student holds the schema definition for the Student entity.
type Student struct {
	ent.Schema
}

// Fields of the Student.
func (Student) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string {
			return uuid.New().String()
		}),
		field.String("photo_url").Optional(),
		field.String("first_name").NotEmpty(),
		field.String("last_name").NotEmpty().Optional(),
		field.String("middle_name").Optional(),
		field.String("phone_number").NotEmpty().Unique(),
		field.String("email").Optional(),

		field.Bool("deleted").Default(false),
		field.Time("deleted_at").Optional(),
		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

// Edges of the Student.
func (Student) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("guardians", Guardian.Type).Ref("students"),
	}
}
