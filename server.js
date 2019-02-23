const express = require('express');
const bodyParser = require("body-parser");
const router = require('./server/router')(express.Router());

var appConfig = {
    port: 9000
};

var app = express();
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

app.listen(appConfig.port, function () {
    console.log('Start listening port: %d', appConfig.port);
});