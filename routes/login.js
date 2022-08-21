module.exports = (app) => {
    const path = require('path');
    const express = require('express');
    const router = express.Router();
    const bodyParser = require('body-parser');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ limit : '1gb', extended : false}));

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '/src/views/login.html'));
    });

    router.post('/', (req, res) => {
        let Users = require('../models/User');
        Users.User.findOne({userid : req.body.userid, password : req.body.password }, (err, user) => {
            if (err) return res.status(500).json({message : "에러발생.."});
            else if (user) return res.redirect('/chats?userid='+req.body.userid);
            // res.status(200).json({message : "반갑습니다! " + req.body.userid + "님!"});
            else return res.status(404).json({message : "아이디/비밀번호를 확인해주세요."});
        });
    });

    return router;
};