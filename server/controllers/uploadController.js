const OperationResult = require('../models/OperationResult');

module.exports = function (router, upload) {
    router.post('/upload', upload.any(), function (request, response, next) {
        if (request.query.failed) {
            throw new Error("Error response!");
        }

        if (request.query.noresponse) {
            return;
        }

        let result = new OperationResult();
        response.json(result);
    });
};