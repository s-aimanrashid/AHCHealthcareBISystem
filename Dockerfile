# Use an official Node.js runtime as the base image
FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite will run on
EXPOSE 5173

# Command to run the development server
CMD ["npm", "run", "dev"]
