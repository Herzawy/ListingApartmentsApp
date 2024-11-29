# Use node:18 as the base image
FROM node:18


# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]
