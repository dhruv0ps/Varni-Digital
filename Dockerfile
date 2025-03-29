# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build the application (if you're using Next.js)
RUN npm run build

# Expose the port your app runs on (default for Next.js is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
