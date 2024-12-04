# Use an official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the React app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]