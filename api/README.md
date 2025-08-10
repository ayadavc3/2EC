# Go Fiber Admin & User APIs with Uber FX

A clean architecture implementation of separate Admin and User APIs using Go Fiber and Uber FX dependency injection, with shared dependencies and clear service boundaries.

## Architecture Overview

This project implements the recommended architecture for building scalable APIs with maximum code reuse while maintaining proper separation of concerns.

### Project Structure

```
project-root/
├── cmd/
│   ├── admin-api/
│   │   └── main.go           # Admin API entry point
│   └── user-api/
│       └── main.go           # User API entry point
├── internal/
│   ├── admin/
│   │   ├── handlers/         # Admin-specific HTTP handlers
│   │   ├── routes/           # Admin route definitions
│   │   ├── services/         # Admin business logic
│   │   └── module.go         # Admin FX module
│   ├── user/
│   │   ├── handlers/         # User-specific HTTP handlers
│   │   ├── routes/           # User route definitions
│   │   ├── services/         # User business logic
│   │   └── module.go         # User FX module
│   └── shared/
│       ├── config/       # Shared middleware (auth, etc.)
│       ├── database/       # Shared middleware (auth, etc.)
│       ├── repository/       # Data access layer
│       └── model/            # Shared data models
├── pkg/
│   └── logger/              # Logging utilities
└── go.mod
```

## Key Features

### 🔄 **Shared Dependencies Architecture**
- **Database connections** shared between APIs
- **Repository interfaces** for consistent data access
- **Logging and configuration** utilities
- **Middleware** for authentication and common functionality

### 🎯 **Clean Separation**
- **Admin API** (Port 8080): Full CRUD operations, user management
- **User API** (Port 8081): Limited access, user-facing features
- **Independent deployment** with separate binaries

### 🏗️ **Uber FX Dependency Injection**
- **Modular architecture** with FX modules
- **Lifecycle management** for graceful startup/shutdown
- **Interface-based design** for testability

### 🚀 **Go Fiber Performance**
- **Fast HTTP routing** and middleware
- **JSON API responses** with proper error handling
- **CORS and logging** middleware included

## Quick Start

### Prerequisites
- Go 1.21 or later
- PostgreSQL database

### Environment Setup

Create a `.env` file in the project root:

```env
# Database Configuration
DATABASE_URL=postgres://user:password@localhost:5432/dbname?sslmode=disable

# Admin API Configuration
ADMIN_PORT=:8080
ADMIN_TIMEOUT=30
ADMIN_SECRET=admin-secret-key

# User API Configuration  
USER_PORT=:8081
USER_TIMEOUT=10

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
```

### Running the Applications

#### Start Admin API
```bash
go run ./cmd/admin-api
```

#### Start User API
```bash
go run ./cmd/user-api
```

#### Or build and run separately
```bash
# Build both APIs
go build -o bin/admin-api ./cmd/admin-api
go build -o bin/user-api ./cmd/user-api

# Run them
./bin/admin-api &
./bin/user-api &
```

## API Endpoints

### Admin API (Port 8080)

#### Health & Info
- `GET /` - Welcome message
- `GET /health` - Health check

#### User Management
- `GET /admin/users` - List all users
- `GET /admin/users/:id` - Get user by ID
- `POST /admin/users/:id/ban` - Ban user
- `POST /admin/users/:id/unban` - Unban user
- `DELETE /admin/users/:id` - Delete user

#### Book Management
- `GET /admin/books` - List all books
- `GET /admin/books/:id` - Get book by ID
- `POST /admin/books` - Create new book
- `PUT /admin/books/:id` - Update book
- `DELETE /admin/books/:id` - Delete book
- `POST /admin/books/:id/publish` - Publish book
- `POST /admin/books/:id/unpublish` - Unpublish book

### User API (Port 8081)

#### Health & Info
- `GET /` - Welcome message
- `GET /health` - Health check

#### Book Discovery
- `GET /api/books` - List published books
- `GET /api/books/trending` - Get trending books
- `GET /api/books/similar?category=:id` - Get similar books
- `GET /api/books/:id` - Get book by ID
- `GET /api/books/:id/categories` - Get book with categories
- `GET /api/books/slug/:slug` - Get book by slug

#### User Profile
- `GET /api/users/:id/profile` - Get user profile
- `PUT /api/users/:id/profile` - Update user profile

#### Library Management
- `GET /api/users/:id/library` - Get user's library
- `POST /api/users/:id/library` - Add book to library
- `PUT /api/users/:id/progress` - Update reading progress

#### Wishlist Management
- `GET /api/users/:id/wishlist` - Get user's wishlist
- `POST /api/users/:id/wishlist` - Add book to wishlist
- `DELETE /api/users/:id/wishlist/:bookId` - Remove from wishlist

## Authentication

Both APIs include authentication middleware (currently with placeholder implementations):

### Admin Authentication
```http
Authorization: Bearer admin-secret-token
```

### User Authentication
```http
Authorization: Bearer user-secret-token
```

> **Note**: The current implementation uses placeholder tokens. In production, replace with proper JWT validation.

## Development

### Adding New Dependencies

#### Shared Dependencies
Add to `pkg/fx/shared.go`:
```go
var SharedModule = fx.Options(
    fx.Provide(
        logger.New,
        database.New,
        repository.NewRepository,
        // Add your new shared dependency here
    ),
)
```

#### API-Specific Dependencies
Add to respective module files:
- Admin: `internal/admin/module.go`
- User: `internal/user/module.go`

### Database Integration

The project uses [sqlc](https://sqlc.dev/) for type-safe SQL queries. To add new queries:

1. Add SQL queries to `query.sql`
2. Run `sqlc generate`
3. Implement repository methods using generated code

### Testing

```bash
# Run tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Run specific package tests
go test ./internal/admin/services
```

## Deployment

### Building for Production

```bash
# Build both APIs
make build

# Or manually
CGO_ENABLED=0 GOOS=linux go build -o bin/admin-api ./cmd/admin-api
CGO_ENABLED=0 GOOS=linux go build -o bin/user-api ./cmd/user-api
```

### Docker Support

Each API can be containerized separately for independent scaling:

```dockerfile
# Dockerfile.admin
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o admin-api ./cmd/admin-api

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/admin-api .
CMD ["./admin-api"]
```

## Configuration Management

The application uses environment-based configuration with sensible defaults:

- **BaseConfig Interface**: Shared configuration contract
- **AdminConfig**: Admin-specific settings with extended timeout
- **UserConfig**: User-specific settings with shorter timeout
- **Automatic Environment Loading**: Uses `godotenv` for development

## Benefits of This Architecture

✅ **Code Reuse**: Shared dependencies maximize reusability  
✅ **Independent Deployment**: Each API can be deployed separately  
✅ **Testability**: Uber FX makes mocking dependencies easy  
✅ **Scalability**: Add new APIs using the same shared foundation  
✅ **Maintainability**: Clear separation of concerns and boundaries  
✅ **Performance**: Go Fiber provides excellent HTTP performance  
✅ **Type Safety**: Interface-based design with compile-time checks  

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 