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
        var id = i + 1;
        var item = new models.RelationalListItem(id, 'Name' + id.toString());
        array.push(item);

        for (var j = 0; j < childrenCount; j++) {
            var childID = id * 10000 + j + 1;
            var child = new models.RelationalListItem(childID, 'Child Name' + childID.toString(), id);
            array.push(child);
        }
    }

    var result = {
        count: length,
        data: array
    };

    response.json(result);
};

data.showmore = function (request, response, next) {
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
        var child = new models.RelationalListItem(childID, 'Child Name' + childID.toString(), parentID);
        array.push(child);
    }

    response.json(array);
};

module.exports = data;