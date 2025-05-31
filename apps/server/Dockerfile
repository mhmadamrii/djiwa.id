FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root files
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy app & packages
COPY apps/server ./apps/server
COPY packages ./packages

# Install only server deps
RUN pnpm install --filter server...

# Build server
WORKDIR /app/apps/server
RUN pnpm build

# Run server
EXPOSE 4000
CMD ["pnpm", "start"]
