const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./todo.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const TodoService = grpc.loadPackageDefinition(packageDefinition).TodoService;

const client = new TodoService(
  "2.tcp.eu.ngrok.io:11873",
  grpc.credentials.createInsecure()
);


// client.getAllTodos({}, (error, todo) => {

//     if (error) throw error 
//       console.log(todo);
//   });


module.exports = client;