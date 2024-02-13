/*
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors()); // enables CORS

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    },
});

io.on('connection', socket => {
  console.log('new user connected');

  socket.on('disconnect', () => console.log('user disconnected'));

    // add event listeners
});

const port = process.env.PORT || 3000
server.listen(port, () => console.log('server running on: port ' + port));

*/

// uncomment when using server, gonna deploy client on github pages