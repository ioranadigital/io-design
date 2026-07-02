# Frontend Dockerfile - IO Prospector
# Multi-stage build para Next.js

FROM node:20-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN if [ -f build-safe.js ]; then node build-safe.js; else npm run build:next; fi

FROM node:20-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3002/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3002
ENV NODE_ENV=production PORT=3002 NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "start"]
