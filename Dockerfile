# Use the Node.js 16 image as the base image
FROM node:16

# Create a working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Run the Prisma migration (optional: in case of database setup)
RUN npx prisma generate

# Command to start the application
CMD ["node", "server.js"]
