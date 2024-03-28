FROM node:16.15.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i -g npm@8.5.5
RUN npm install

# Bundle app source & config files for TypeScript
COPY ./src ./src
COPY ./tsconfig.json .
COPY ./tsconfig.prod.json .
COPY ./cli.yml .

RUN npm run build

