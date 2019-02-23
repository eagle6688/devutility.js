const OperationResult = require('./models/OperationResult');

module.exports = function (router) {
    router.get('/user/detail', function (request, response, next) {
        let result = new OperationResult();

        if (request.query.failed) {
            result.succeeded = false;
            result.message = 'Failed operation!';
            response.json(result);
            return;
        }

        result.data.name = 'user_' + request.query.id;
        result.data.cellphone = 13800138000;
        response.json(result);
    });

    router.post('/user/save', function (request, response, next) {
        let result = new OperationResult();

        if (request.query.failed) {
            result.succeeded = false;
            result.message = 'Failed operation!';
            response.json(result);
            return;
        }

        result.data.name = request.body.name;
        result.data.cellphone = request.body.cellphone;
        response.json(result);
    });
};