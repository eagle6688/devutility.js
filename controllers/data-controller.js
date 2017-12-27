var models = require('./models');
var data = {};

data.list = function (request, response, next) {
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
        var item = new models.ListItem(i + 1, 'Name' + i.toString());
        array.push(item);
    }

    var result = {
        Count: length,
        Data: array
    };

    response.json(result);
};

data.listdata = function (request, response, next) {
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
        var item = new models.ListItem(i + 1, 'Name' + i.toString());
        array.push(item);
    }

    var result = {
        count: length,
        data: array
    };

    response.json(result);
};

data.listrelationaldata = function (request, response, next) {
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
        var item = new models.RelationalListItem(i + 1, 'Name' + i.toString());
        array.push(item);

        for (var j = 0; j < childrenCount; j++) {
            var child = new models.RelationalListItem(length + j + 1, 'Child Name' + (length + j).toString(), i + 1);
            array.push(child);
        }
    }

    var result = {
        count: length,
        data: array
    };

    response.json(result);
};

module.exports = data;