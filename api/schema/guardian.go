package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Guardian holds the schema definition for the Guardian entity.
type Guardian struct {
	ent.Schema
}

// Fields of the Guardian.
func (Guardian) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string {
			return uuid.New().String()
		}),
		field.String("photo_url").Optional(),
		field.String("title").Default("Mr.").NotEmpty(),
		field.String("first_name").NotEmpty(),
		field.String("last_name").Optional(),
		field.String("middle_name").Optional(),
		field.String("phone_number").NotEmpty().Unique(),
		field.String("email").Optional(),

		field.Bool("deleted").Default(false),
		field.Bool("disabled").Default(false),

		field.Time("deleted_at").Optional(),
		field.Time("disabled_at").Optional(),
		field.Time("last_signed_in_at").Optional(),
		field.Time("phone_confirmed_at").Optional(),

		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

// Edges of the Guardian.
func (Guardian) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("students", Student.Type),
	}
}
