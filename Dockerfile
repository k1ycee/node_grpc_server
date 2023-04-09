FROM node:18-alpine

COPY package.json .

RUN npm install 

WORKDIR /grpc_server

COPY . .

EXPOSE 50051

CMD ["npm", "run", "serve"]