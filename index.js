import express from 'express';
import { createServer } from 'http';
import { instrument } from "@socket.io/admin-ui";
import { Server } from 'socket.io';
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path';

const __dirname = path.resolve();

dotenv.config();
const {MONGODB_URI} = process.env;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


mongoose.connect(MONGODB_URI)
.then(() => { console.log('MongoDB Connected successfully') })
.catch(err => console.log(err));

app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/src'));

let userId = '';

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/src/views/index.html');
  app.get("/", (_, res) => res.render("home"));
  app.get("/*", (_, res) => res.redirect("/"));
});

const ioServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});

instrument(ioServer, {
  auth: false
});


function publicRooms(){
  const { sockets: { adapter: { sids, rooms }, },} = io;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if(sids.get(key) === undefined){
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName){
  return io.sockets.adapter.rooms.get(roomName)?.size;
}

io.on('connection', (socket) => {
    console.log('[Server] user connected');

    //새로운 회원 입장 시 전체 메시지
    socket["nickname"] = "Anonymous";
    socket.onAny((event) => {
      console.log(`socket event : ${event}`);
    });

    socket.on("enter_room", (roomName, done) => {
      socket.join(roomName);
      done();
      //메세지를 하나의 socket에만 보내기
      socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
      //메시지를 모든 socket에 보내주기
      io.sockets.emit("room_change", publicRooms());
    });

    //클라이언트가 서버와 연결이 끊어지기 전에 굿바이 메시지 
    socket.on("disconnecting", () => {
      console.log('[Server] user disconnected');
      socket.rooms.forEach((room) => socket.to(room).emit("bye", socket.nickname, countRoom(room)- 1 ));
    });

    socket.on("new_message", (msg, room, done) => {
      socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
      done();
    });

    socket.on("nickname", nickname => socket["nickname"] = nickname);

    socket.on('chat message', (msg, id) => {
      userId = id;
      console.log('message: ' + msg + ', ' + id);
      io.emit('chat message', msg, id);
    });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});