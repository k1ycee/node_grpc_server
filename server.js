const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./todo.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const todoProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let todo = [
    { id: "1", title: "Todo Title 1", todo: "Todo Content 1" },
    { id: "2", title: "Todo Title 2", todo: "Todo Content 2" },
];

server.addService(todoProto.TodoService.service, {
    getAllTodos: (_, callback) => {
        callback(null, { todo });
    },
    addTodo: (call, callback) => {
        const _todo = { ...call.request };
        todo.push(_todo);
        callback(null, { todo });
    },
    deleteTodo: (_, callback) => {
        const todoId = _.request.id;
        todo = todo.filter(({ id }) => id !== todoId);
        callback(null, { todo });
    },


    editTodo: (_, callback) => {
        const todoId = _.request.id;
        const todoItem = todo.find(({ id }) => todoId == id);
        todoItem.todo = _.request.todo,
            todoItem.title = _.request.title;
        callback(null, todoItem);

    },

    getTodo: (_, callback) => {
        const todoId = _.request.id;
        const todoItem = todo.find(({ id }) => todoId == id);
        callback(null, todoItem);
    }
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        server.start();
        console.log(`Server running at http://localhost:${port}`);
    }
);