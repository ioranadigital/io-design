# Backend Dockerfile - IO Prospector
# Multi-stage build para optimizar imagen

FROM node:20-alpine AS builder
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --only=production && npm cache clean --force

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/backend/node_modules ./node_modules
COPY backend/ .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 4000
ENV NODE_ENV=production PORT=4000 LOG_LEVEL=info
CMD ["node", "server.js"]
