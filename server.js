var express = require('express');

var appConfig = {
    port: 9000
};

var app = express();
app.use(express.static(__dirname));

var server = app.listen(appConfig.port, function () {
    console.log('Start listening port: %d', appConfig.port);
});