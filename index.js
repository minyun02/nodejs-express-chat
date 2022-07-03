require('dotenv').config();
const {MONGODB_URI} = process.env;
const mongoose = new require('mongoose');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

mongoose.connect(MONGODB_URI)
.then(() => { console.log('MongoDB Connected successfully') })
.catch(err => console.log(err));

app.use(express.static(__dirname + '/src'));

let userId = '';

app.get('/', (req, res) => {
  console.log(__dirname)
  res.sendFile(__dirname + '/src/views/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnection', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg, id) => {
      userId = id;
      console.log('message: ' + msg + ', ' + id);
      io.emit('chat message', msg, id);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});