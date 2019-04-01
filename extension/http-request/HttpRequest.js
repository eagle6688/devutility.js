/**
 * HttpRequest.js v20190328
 * dependency: jQuery.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'HttpRequest';

    var defaults = {
        url: '',
        method: 'GET',
        timeout: 0,
        withCredentials: true,
        headers: null,
        dataType: 'json',
        progress: function (data) {},
        complete: function (data) {},
        failed: function (data) {},
        abort: function (data) {},
        upload: {
            progress: function (data) {},
            complete: function (data) {},
            failed: function (data) {},
            abort: function (data) {}
        }
    };

    function Plugin(options) {
        this.options = $.extend(true, {}, defaults, options);
        this._init();
    }

    Plugin.prototype.constructor = Plugin;

    /* Init methods */

    Plugin.prototype._init = function () {
        if (!this._verify()) {
            return;
        }

        this.xhr = new XMLHttpRequest();
        this._bind();
    };


    Plugin.prototype._verify = function () {
        if (!this.options.url) {
            console.error('Need paramter "url"!');
            return false;
        }

        return true;
    };

    /* Init methods end */

    /* Bind methods */

    Plugin.prototype._bind = function () {
        var self = this;

        this.requestEvent = new RequestEvent({
            request: this.xhr,
            dataType: this.options.dataType,
            progress: this.options.progress,
            complete: this.options.complete,
            failed: this.options.failed,
            abort: this.options.abort
        });

        this.uploadRequestEvent = new RequestEvent({
            request: this.xhr.upload,
            dataType: this.options.dataType,
            progress: this.options.upload.progress,
            complete: this.options.upload.complete,
            failed: this.options.upload.failed,
            abort: this.options.upload.abort
        });
    };

    /* Bind methods end */

    /* Methods */

    Plugin.prototype._setXhr = function () {
        if (this.options.timeout > 0) {
            this.xhr.timeout = this.options.timeout;
        }

        if (this.options.withCredentials) {
            this.xhr.withCredentials = this.options.withCredentials;
        }

        if (this.options.headers) {
            for (var name in this.options.headers) {
                this.setRequestHeader(name, this.options.headers[name]);
            }
        }
    };

    /* Methods end */

    /* RequestEvent */

    function RequestEvent(options) {
        var defaults = {
            request: null,
            dataType: null,
            progress: function (data) {},
            complete: function (data) {},
            failed: function (data) {},
            abort: function (data) {}
        };

        this.options = $.extend(true, {}, defaults, options);
        this.bind();
    }

    RequestEvent.prototype.bind = function () {
        var self = this;

        this.options.request.addEventListener('progress', function (event) {
            self.progress(event);
        });

        this.options.request.addEventListener('load', function (event) {
            self.complete(event);
        });

        this.options.request.addEventListener('error', function (event) {
            self.failed(event);
        });

        this.options.request.addEventListener('abort', function (event) {
            self.abort(event);
        });
    };

    RequestEvent.prototype.progress = function (event) {
        var result = this.result(event);

        if (this.options.progress) {
            this.options.progress(result);
        }
    };

    RequestEvent.prototype.complete = function (event) {
        var result = this.result(event);

        if (this.options.complete) {
            this.options.complete(result);
        }
    };

    RequestEvent.prototype.failed = function (event) {
        var result = this.result(event);

        if (this.options.failed) {
            this.options.failed(result);
        }
    };

    RequestEvent.prototype.abort = function (event) {
        var result = this.result(event);

        if (this.options.abort) {
            this.options.abort(result);
        }
    };

    RequestEvent.prototype.result = function (event) {
        var result = {
            type: event.type,
            event: event,
            status: 0,
            readyState: 0
        };

        if (Object.prototype.toString.call(event.target) == '[object XMLHttpRequestUpload]') {
            result.type = 'upload-' + result.type;
            return result;
        }

        result.status = event.target.status;
        result.readyState = event.target.readyState;

        if (this.options.dataType == 'json') {
            result.response = $.parseJSON(event.target.responseText);
        } else {
            result.response = event.target.responseText;
        }

        return result;
    };

    /* RequestEvent end */

    /* Public methods */

    Plugin.prototype.abort = function () {
        this.xhr.abort();
    };

    Plugin.prototype.request = function (data) {
        this.xhr.open(this.options.method, this.options.url);
        this._setXhr();
        this.xhr.send(data);
    };

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);