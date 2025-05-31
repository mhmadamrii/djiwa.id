FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy applications
COPY apps/server ./apps/server
COPY apps/web ./apps/web
COPY packages ./packages

# Build applications
RUN pnpm build

# Expose ports
EXPOSE 3000
EXPOSE 4000

# Start the applications
CMD ["pnpm", "start"]