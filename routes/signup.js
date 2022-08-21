module.exports = (app) => {
    const path = require('path');
    const bodyParser = require('body-parser');

    const express = require('express');
    const router = express.Router();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ limit : '1gb', extended : false}));

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '/src/views/signup.html'));
    });

    router.post('/', (req, res) => {
        console.log(req.body.userid);
        let Users = require('../models/User');
        Users.User.findOne({userid : req.body.userid, password : req.body.password }, (err, user) => {
            
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

    return router;
};