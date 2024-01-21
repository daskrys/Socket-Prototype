import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors()); // enables CORS

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5176", // neds to update to the correct port/vite url
        methods: ["GET", "POST"]
    },
});

io.on('connection', socket => {
  console.log('new user connected');

  socket.on('disconnect', () => console.log('user disconnected'));

    // add event listeners
});

server.listen(3000, () => console.log('server running on: port 3000'));

