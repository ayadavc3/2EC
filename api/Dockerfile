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
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o admin ./cmd/admin-api
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o user ./cmd/user-api

# Final stage
FROM alpine:latest

# Install required packages
RUN apk update && apk add --no-cache curl gnupg
RUN (curl -Ls https://cli.doppler.com/install.sh || wget -qO- https://cli.doppler.com/install.sh) | sh

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/admin .
COPY --from=builder /app/user .

# Create uploads directory
RUN mkdir -p /app/uploads

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port (default 4000)
EXPOSE 4000

# Run the admin API by default
CMD ["doppler", "run", "--", "./admin"]