/**
 * HttpRequest.js v20190328
 * dependency: devutility.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function (window, document, undefined) {
    var pluginName = 'HttpRequest';

    var defaults = {
        url: '',
        method: 'GET',
        timeout: 0,
        withCredentials: false,
        headers: null,
        progress: function (data) {},
        complete: function (data) {},
        failed: function (data) {},
        abort: function (data) {}
    };

    function Plugin(options) {
        this.options = $.extend({}, defaults, options);
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

        this.xhr.addEventListener('progress', function (event) {
            self._progress(event);
        });

        this.xhr.addEventListener('load', function (event) {
            self._complete(event);
        });

        this.xhr.addEventListener('error', function (event) {
            self._failed(event);
        });

        this.xhr.addEventListener('abort', function (event) {
            self._abort(event);
        });
    };

    /* Bind methods end */

    /* Event methods */

    Plugin.prototype._progress = function (event) {
        var result = this._result(event);

        if (this.options.progress) {
            this.options.progress(result);
        }
    };

    Plugin.prototype._complete = function (event) {
        var result = this._result(event);

        if (this.options.complete) {
            this.options.complete(result);
        }
    };

    Plugin.prototype._failed = function (event) {
        var result = this._result(event);

        if (this.options.failed) {
            this.options.failed(result);
        }
    };

    Plugin.prototype._abort = function (event) {
        var result = this._result(event);

        if (this.options.abort) {
            this.options.abort(result);
        }
    };

    /* Event methods end */

    /* Methods */

    Plugin.prototype._result = function (event) {
        return {
            event: event,
            status: this.xhr.status,
            response: this.xhr.responseText,
            readyState: this.xhr.readyState
        };
    };

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
})(window, document);