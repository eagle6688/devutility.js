const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');

var appConfig = {
    port: 9000
};

var app = express();
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
    extended: false
}));

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'server/uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

var router = require('./server/router')(express.Router(), upload);
app.use(router);

app.listen(appConfig.port, function () {
    console.log('Start listening port: %d', appConfig.port);
});