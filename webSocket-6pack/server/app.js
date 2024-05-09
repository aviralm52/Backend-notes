import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { SocketAddress } from "net";

const PORT = 3000;
const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Hello World! from server</h1>");
});

io.on("connection", (socket) => {
    console.log("user connected with id: ", socket.id);
    socket.emit('welcome', `Welcome to server! ${socket.id}`);
    socket.broadcast.emit('welcome', `${socket.id} joined the server`);

    socket.on('msg', (message) => {
        console.log(message);
    })
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
