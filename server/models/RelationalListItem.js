const ListItem = require('./ListItem');

function RelationalListItem() {
    ListItem.apply(this, arguments);
    this.ParentID = 0;

    if (arguments && arguments.length > 0) {
        if (arguments[2] != null) {
            this.ParentID = arguments[2];
        }
    }
}

module.exports = RelationalListItem;