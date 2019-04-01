const OperationResult = require('../models/OperationResult');

module.exports = function (router, upload) {
    router.post('/upload', upload.array('file'), function (request, response, next) {
        if (request.query.failed) {
            throw new Error("Error response!");
        }

        let result = new OperationResult();
        response.json(result);
    });
};