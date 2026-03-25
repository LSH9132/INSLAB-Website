FROM node:20-alpine

WORKDIR /app

# Copy root workspace files
COPY package.json package-lock.json ./
COPY packages/ ./packages/

# Copy admin app
COPY apps/admin/ ./apps/admin/

RUN npm ci --workspace=@inslab/admin

WORKDIR /app/apps/admin

RUN npx next build --webpack

EXPOSE 3000

CMD ["npx", "next", "start", "-p", "3000"]
