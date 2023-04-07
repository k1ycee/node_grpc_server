FROM node:18-alpine


WORKDIR /grpc_server

COPY . .


RUN npm install 

# EXPOSE 4000

CMD ["node", "server.js"]