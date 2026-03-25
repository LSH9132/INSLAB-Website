FROM node:20-alpine

RUN apk add --no-cache rsync bash

WORKDIR /app

# Copy package files for dependency install
COPY package.json package-lock.json ./
COPY packages/ ./packages/
RUN npm ci

# Copy project source
COPY . .

# Make scripts executable
RUN chmod +x /app/services/builder/build.sh /app/services/builder/init.sh

EXPOSE 4000

# Init seed data, attempt initial build (non-fatal), then start server
CMD ["sh", "-c", "/app/services/builder/init.sh && (/app/services/builder/build.sh || echo '[builder] Initial build failed, will retry on trigger') && node /app/services/builder/server.mjs"]
