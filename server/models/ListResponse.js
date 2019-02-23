const OperationResult = require('./OperationResult');

function ListResponse() {
    OperationResult.apply(this, arguments);
    this.count = 0;

    if (arguments && arguments.length > 0) {
        if (arguments[3] != null) {
            this.count = arguments[3];
        }
    }
}

module.exports = ListResponse;