package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Role holds the schema definition for the Role entity.
type Role struct {
	ent.Schema
}

// Fields of the Role.
func (Role) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string {
			return uuid.New().String()
		}),
		field.String("name").NotEmpty(),
		field.String("description").NotEmpty(),
		field.String("organization_id").NotEmpty(),
		field.String("permissions").Default("message.create,message.read,message.update,message.delete").NotEmpty(),

		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}
