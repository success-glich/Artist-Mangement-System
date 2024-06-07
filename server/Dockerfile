# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production 

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Install PM2 globally
RUN npm install pm2 -g

COPY ecosystem.config.js .

# Change ownership and permissions (optional, for least privileges)
# RUN chown -R node:node /app && chmod -R 755 /app

# If you switch to a non-root user, ensure that the user has the necessary permissions
# USER node

EXPOSE 8001

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
