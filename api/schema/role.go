package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
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
		field.String("slug").NotEmpty(),
		field.String("description").Optional(),
		field.String("organization_id").Optional(),

		field.JSON("permissions", []string{}).
			Default(func() []string {
				return []string{"message.read", "message.create", "message.update", "message.delete"}
			}),

		field.Bool("global").Default(false),
		field.Bool("deleted").Default(false),
		field.Bool("disabled").Default(false),

		field.Time("deleted_at").Optional(),
		field.Time("disabled_at").Optional(),

		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

// Edges of the Role.
func (Role) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("organization", Organization.Type).Ref("roles").Unique(),
	}
}
