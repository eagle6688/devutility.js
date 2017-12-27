var express = require('express');
var router = express.Router();
var dataController = require('./data-controller');

router.use(function (req, res, next) {
    console.log('Time: ' + Date.now());
    next();
});

router.get('/data/list', dataController.list);

router.get('/data/listdata', dataController.listdata);

module.exports = router;