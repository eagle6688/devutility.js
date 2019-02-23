const ListResponse = require('../models/ListResponse');
const ListItem = require('./models/ListItem');
const RelationalListItem = require('./models/RelationalListItem');

module.exports = function (router) {
    router.get('/data/list', function (request, response, next) {
        var pageIndex = 0;
        var pageSize = 10;
        var length = 101;
        var params = request.query;

        if (params) {
            if (params.pageIndex) {
                pageIndex = ~~params.pageIndex;
            }

            if (params.pageSize) {
                pageSize = ~~params.pageSize;
            }

            if (params.length) {
                length = ~~params.length;
            }
        }

        var array = [];
        var startIndex = (pageIndex - 1) * pageSize;
        var endIndex = Math.min(length, pageIndex * pageSize);

        for (var i = startIndex; i < endIndex; i++) {
            var item = new ListItem(i + 1, 'Name' + i.toString());
            array.push(item);
        }

        let result = new ListResponse();
        result.count = length;
        result.data = array;
        response.json(result);
    });

    router.get('/data/listrelationaldata', function (request, response, next) {
        var pageIndex = 0;
        var pageSize = 10;
        var length = 101;
        var params = request.query;

        if (params) {
            if (params.pageIndex) {
                pageIndex = ~~params.pageIndex;
            }

            if (params.pageSize) {
                pageSize = ~~params.pageSize;
            }

            if (params.length) {
                length = ~~params.length;
            }
        }

        var array = [];
        var startIndex = (pageIndex - 1) * pageSize;
        var endIndex = Math.min(length, pageIndex * pageSize);

        for (var i = startIndex; i < endIndex; i++) {
            var childrenCount = Math.round(Math.random() * 10);
            var id = i + 1;
            var item = new RelationalListItem(id, 'Name' + id.toString());
            array.push(item);

            for (var j = 0; j < childrenCount; j++) {
                var childID = id * 10000 + j + 1;
                var child = new RelationalListItem(childID, 'Child Name' + childID.toString(), id);
                array.push(child);
            }
        }

        let result = new ListResponse();
        result.count = length;
        result.data = array;
        response.json(result);
    });

    router.get('/data/showmore', function (request, response, next) {
        var pageIndex = 0;
        var pageSize = 10;
        var parentID = 0;
        var params = request.query;

        if (params) {
            if (params.pageIndex) {
                pageIndex = ~~params.pageIndex;
            }

            if (params.pageSize) {
                pageSize = ~~params.pageSize;
            }

            if (params.parentID) {
                parentID = ~~params.parentID;
            }
        }

        var array = [];
        var startIndex = (pageIndex - 1) * pageSize;
        var endIndex = pageIndex * pageSize;

        for (var i = startIndex; i < endIndex; i++) {
            var childID = parentID * 10000 + i + 1;
            var child = new RelationalListItem(childID, 'Child Name' + childID.toString(), parentID);
            array.push(child);
        }

        response.json(array);
    });
};