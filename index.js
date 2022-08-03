require('dotenv').config();
const {MONGODB_URI} = process.env;
const mongoose = new require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

mongoose.connect(MONGODB_URI)
.then(() => { console.log('MongoDB Connected successfully') })
.catch(err => console.log(err));

let UserSchema = new mongoose.Schema({
  userid : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  }
});

let Users = mongoose.model('Users', UserSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit : '1gb', extended : false}));
app.use(express.static(__dirname + '/src'));

let userId = '';

app.get('/', (req, res) => {
  console.log(__dirname)
  // res.sendFile(__dirname + '/src/views/index.html');
  res.sendFile(__dirname + '/src/views/login.html');
});

app.post('/', (req, res) => {
  Users.findOne({userid : req.body.userid, password : req.body.password }, (err, user) => {
    console.log(req.body);
    if (err) return res.status(500).json({message : "에러발생.."});
    else if (user) return res.status(200).json({message : "반갑습니다! " + req.body.userid + "님!"});
    else return res.status(404).json({message : "아이디/비밀번호를 확인해주세요."});
  });
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/src/views/signup.html');
});

app.post('/signup', (req, res) => {
  Users.findOne({userid : req.body.userid, password : req.body.password }, (err, user) => {
    if (err) return res.status(500).json({ message : "에러발생.."}); 
    else if (user) return res.status(404).json({errors : [{ message : "아이디/비밀번호를 확인해주세요."}] }); 
    else {
      const user = new Users(req.body);
      user.save((error) => {
      if(error) return res.status(500).json({message : "저장 실패"});
      else return res.status(200).json({message : "저장 성공", data : user});
      });
    }
  });
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