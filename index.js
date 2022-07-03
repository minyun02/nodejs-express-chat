const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
let userId = '';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnection', () => {
        console.log('user disconnected')
    })
});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg, id) => {
//       userId = id;
//       console.log('message: ' + msg + ', ' + id);
//     });
// });

// io.emit(
//         'some event'
//         , { someProperty: 'some value', otherProperty: 'other value' }
// ); 

io.on('connection', (socket) => {
    socket.on('chat message', (msg, id) => {
      userId = id;
      console.log('message: ' + msg + ', ' + id);
      io.emit('chat message', msg, id);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});