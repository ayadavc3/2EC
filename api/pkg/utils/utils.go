package utils

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func FormatError(err error) string {
	return err.Error()
}

// Must is a helper function that panics if an error is not nil.
func Must[T any](value T, err error) T {
	if err != nil {
		panic(err)
	}

	return value
}

func MustParam(c *fiber.Ctx, key string) string {
	value := c.Params(key)
	if value == "" {
		panic(fmt.Errorf("param %s is required", key))
	}

	return value
}

func MustQueryParam(c *fiber.Ctx, key string) string {
	value := c.Query(key)
	if value == "" {
		panic(fmt.Errorf("query param %s is required", key))
	}

	return value
}
