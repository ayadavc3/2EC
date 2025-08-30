package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Role holds the schema definition for the Role entity.
type Organization struct {
	ent.Schema
}

// Fields of the Role.
func (Organization) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string {
			return uuid.New().String()
		}),
		field.String("name").NotEmpty(),
		field.String("description").Optional(),
		field.String("logo_url").Optional(),
		field.String("email").Optional(),
		field.String("website").Optional(),
		field.String("phone_number").Optional(),

		field.String("address").Optional(),
		field.String("city").Optional(),
		field.String("state").Optional(),
		field.String("zip_code").Optional(),
		field.String("country").Optional(),

		field.Enum("language").Default("en").Values("en", "es").Optional(),
		field.String("timezone").Default("UTC").Optional(),

		field.Bool("deleted").Default(false),
		field.Bool("disabled").Default(false),

		field.Time("deleted_at").Optional(),
		field.Time("disabled_at").Optional(),

		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}
