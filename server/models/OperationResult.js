function OperationResult() {
    this.succeeded = true;
    this.message = '';
    this.data = null;

    if (arguments && arguments.length > 0) {
        if (arguments[0] != null) {
            this.succeeded = arguments[0];
        }

        if (arguments[1] != null) {
            this.message = arguments[1];
        }

        if (arguments[2] != null) {
            this.data = arguments[2];
        }
    }
}

module.exports = OperationResult;