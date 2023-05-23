# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

ENV CONTAINER_NAME container-name
ENV DB=mongodb://coinmarket:27017/api1
ENV PORT 8001

# Expose a port that the app will listen on
EXPOSE 8001

# Specify the command to run the app
CMD [ "node", "dist/index.js" ]
