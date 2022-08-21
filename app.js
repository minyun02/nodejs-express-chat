const express = require('express');
const app = express();

let DBconnect = require('./models/connect')(app);

let login = require('./routes/login')(app);
app.use('/login', login);

let signup = require('./routes/signup')(app);
app.use('/signup', signup);

let chats = require('./routes/chats')(app);
app.use('/chats', chats);

app.listen(3000, () => {
    console.log('listening on *:3000');
    console.log(__dirname);
});