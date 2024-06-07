FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm cli

COPY . .

RUN npm run build

#  build production image
FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

ENV NODE_ENG =production 

# RUN npm ci --omit = dev => its omit the dev-dependencies
COPY --from=builder /app/dist ./dist

# we can change ownership
# RUN chown -R node:node /app && chmod -R 755 /app to follow least privileges

RUN npm install pm2 -g

COPY ecosystem.config.js .

# we can switch if 
# USER node

EXPOSE 8001

CMD [ "pm2-runtime","start","ecosystem.config.js" ]

