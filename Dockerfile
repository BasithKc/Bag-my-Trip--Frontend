# Build the angular app
FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve the angular app with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
# nginx.conf is copied to the nginx configuration directory
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copy the built angular app from the build stage
COPY --from=build /app/dist/bag-my-trip-frontend/  .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]