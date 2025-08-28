# Build stage
FROM golang:1.24.4-alpine AS builder

# Install git and build dependencies
RUN apk add --no-cache git ca-certificates tzdata

# Set working directory
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the admin API binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o admin-api ./cmd/admin-api

# Final stage
FROM alpine:latest

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/admin-api .
COPY --from=builder /app/.env .

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port (default 3000)
EXPOSE 3000

# Run the admin API
CMD ["./admin-api"]
