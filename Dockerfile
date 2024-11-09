# Build the angular app
FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Add build timestamp to force rebuild
RUN echo "Build timestamp: $(date)" > build-time.txt
RUN npm run build

# Serve the angular app with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built angular files
COPY --from=build /app/dist/bag-my-trip-frontend/ .

# Add build info
COPY --from=build /app/build-time.txt /usr/share/nginx/html/

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]