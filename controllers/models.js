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

module.exports = models;