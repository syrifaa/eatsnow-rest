# Add Node.js Docker Image
FROM node:alpine

# Create app directory
WORKDIR /eatsnow-rest

# Copy package.json
COPY package.json ./

# Install app dependencies
RUN npm install

# Generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Copy source code
COPY . .

# Generate prisma client
RUN npm run prisma:generate \
    && npx prisma db push   \
    && npx prisma db seed

# # Create database schema
# RUN npx prisma db push

# # Seed database
# RUN npx prisma db seed

CMD ["npm", "run", "dev"]
