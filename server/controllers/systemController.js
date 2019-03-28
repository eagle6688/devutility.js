const OperationResult = require('../models/OperationResult');

module.exports = function (router) {
    router.get('/system/bigdata', function (request, response, next) {
        if (request.query.failed) {
            throw new Error("Error response!");
        }

        var amount = request.query.amount;

        if (!amount) {
            amount = 60000;
        }

        var data = [];

        for (var i = 0; i < amount; i++) {
            data.push('data-' + i + '-end');
        }

        let result = new OperationResult();
        result.data = data;
        response.json(result);
    });
};