# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build TypeScript and generate docs
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/docs ./docs

# Environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_URL="mysql://user:pass@mariadb:3306/dbname" \
    JWT_SECRET="your-secret-key"

# Expose port
EXPOSE 3000

# Non-root user
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:3000/health || exit 1

# Start command
CMD ["node", "dist/rest_api.js"]
