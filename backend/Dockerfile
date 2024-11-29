# Use node:18-alpine as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/main"]
