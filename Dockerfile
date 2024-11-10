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

# Install necessary packages
RUN apk add --no-cache shadow

# Create SSL directory
RUN mkdir -p /etc/letsencrypt

# Add nginx user to SSL cert group
RUN groupadd -g 101 ssl-cert \
  && usermod -aG ssl-cert nginx

# Set proper permissions
RUN chmod 755 /etc/letsencrypt

# Create required directories and set permissions
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d \
  && chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d \
  && chmod -R 755 /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chown nginx:nginx /etc/nginx/conf.d/default.conf

# Copy built angular files
COPY --from=build /app/dist/bag-my-trip-frontend/ .
RUN chown -R nginx:nginx /usr/share/nginx/html

# Add build info
COPY --from=build /app/build-time.txt /usr/share/nginx/html/
RUN chown nginx:nginx /usr/share/nginx/html/build-time.txt

# Modify nginx.conf to run as nginx user
RUN sed -i 's/user  nginx;//g' /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

# Switch to non-root user
USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]