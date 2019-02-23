module.exports = function (router) {
    router.use(function (req, res, next) {
        console.log('Time: ' + Date.now());
        next();
    });

    require('./controllers/dataController')(router);
    require('./controllers/userController')(router);
    return router;
};