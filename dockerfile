# Add Node.js Docker Image
FROM node:alpine

# Create app directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Copy source code
COPY . .

# Install app dependencies
RUN npm install

# Generate prisma client
RUN npm run prisma:generate

CMD ["npx", "prisma", "db", "push", "&&", "npx", "prisma", "db", "push", "&&", "npm", "run", "dev"]
