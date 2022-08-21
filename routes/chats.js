module.exports = (app) => {
    const path = require('path');
    const express = require('express');
    const router = express.Router();
    const bodyParser = require('body-parser');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ limit : '1gb', extended : false}));

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '/src/views/chats.html'));
    });

    return router;
};