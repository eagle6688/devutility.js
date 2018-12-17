const dataController = require('./data-controller');

module.exports = function (router) {
    router.use(function (req, res, next) {
        console.log('Time: ' + Date.now());
        next();
    });

    router.get('/data/list', dataController.list);

    router.get('/data/listdata', dataController.listdata);

    router.get('/data/listrelationaldata', dataController.listrelationaldata);

    router.get('/data/showmore', dataController.showmore);

    router.post('/modal/save', function (request, response, next) {
        var result = {};
        result.name = request.body.name;
        result.cellphone = request.body.cellphone;
        response.json(result);
    });

    return router;
};