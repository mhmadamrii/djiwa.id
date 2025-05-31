FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root config files
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy everything under /apps and /packages
COPY apps ./apps
COPY packages ./packages

# Install only what's needed for web
RUN pnpm install --filter web...

# Build
WORKDIR /app/apps/web
RUN pnpm build

# Run
EXPOSE 3000
CMD ["pnpm", "start"]
