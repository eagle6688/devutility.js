/**
 * Uploader.js v20190322
 * dependency: jQuery.js, HttpRequest.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'Uploader';

    var defaults = {
        url: '', //Post url for uploading file.
        concurrency: 1, //Concurrency thread for uploading.
        needSlice: false, //Whether slice a file to multi pieces or not?
        pieceSize: 1 * 1024 * 1024, //Bytes for each piece, worked if "needSlice"=true.
        retry: 1, //Retry times after upload failed.
        formData: null, //FormData for each upload request.
        checksum: function (callback) {} //Function to calculate file's checksum.
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

        this.total = 0;
        this.queue = [];
        this.failedQueue = [];
    };

    Plugin.prototype._verify = function () {
        if (!window.FormData) {
            console.error('Your browser does not support this function!');
            return false;
        }

        if (!this.options.url) {
            console.error('Need paramter "url"!');
            return false;
        }

        if (!this.options.files || this.options.files.length == 0) {
            console.error('Need paramter "files"!');
            return false;
        }

        if (this.options.concurrency < 1) {
            console.error('Invalid paramter "concurrency"!');
            return false;
        }

        if (this.options.retry < 0) {
            console.error('Invalid paramter "retry"!');
            return false;
        }

        return true;
    };

    /* Init methods end */

    /* Event methods */

    /* Event methods end */

    /* Methods */

    function UploaderData() {
        this.name = ''; //File or file piece name.
        this.size = 0; //Actual size or file or file piece.
        this.index = 0; //Index of file piece, 0 for file.
        this.count = 1; //Amount of file pieces, 1 for whole file.
        this.checksum = null; //Checksum of file or file piece.
        this.timestamp = 0; //Timestamp for uploading.
        this.properties = Object.keys(this);
    }

    UploaderData.prototype.toFormData = function () {
        var formData = this.options.formData;

        if (!formData) {
            formData = new FormData();
        }

        for (var name in this.properties) {
            formData.set(name, this[name]);
        }

        return formData;
    };

    Plugin.prototype._enqueue = function (file) {
        if (!this.options.needSlice) {
            this.total = this.queue.push(file);
            return;
        }

        var pieceCount = Math.ceil(file.size / this.options.pieceSize);

        for (var i = 0; i < pieceCount; i++) {
            var start = i * this.options.pieceSize,
                end = Math.min(file.size, start + this.options.pieceSize);

            var piece = this._createSlice(i, start, end);
        }
    };

    Plugin.prototype._createUploaderData = function (file) {

    };

    Plugin.prototype._percentage = function () {
        return Math.floor(100 * (this.total - this.queue.length) / this.total);
    };

    /* Methods end */

    /* Public methods */

    Plugin.prototype.upload = function (files) {

    };

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);