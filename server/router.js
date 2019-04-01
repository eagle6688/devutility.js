module.exports = function (router, upload) {
    router.use(function (request, response, next) {
        console.log('Time:', Date.now().toString(), request.path);
        next();
    });

    router.get('/', function (request, response, next) {
        response.end('Hello world!');
    });

    require('./controllers/dataController')(router);
    require('./controllers/userController')(router);
    require('./controllers/systemController')(router);
    require('./controllers/uploadController')(router, upload);
    return router;
};