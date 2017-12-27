var models = {};

models.ListItem = function () {
    this.MyID = 0;
    this.Name = null;
    this.CreateTime = new Date();

    if (arguments && arguments.length > 0) {
        if (arguments[0] != null) {
            this.MyID = arguments[0];
        }

        if (arguments[1] != null) {
            this.Name = arguments[1];
        }
    }
};

models.RelationalListItem = function () {
    models.ListItem.apply(this, arguments);
    this.ParentID = 0;

    if (arguments && arguments.length > 0) {
        if (arguments[2] != null) {
            this.ParentID = arguments[2];
        }
    }
};

module.exports = models;