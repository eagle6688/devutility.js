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
        checksum: function (callback) {}, //Function to calculate file's checksum.
        progress: function (data) {}, //Target while uploading files.
        complete: function (data) {}, //Target while upload completed.
        failed: function (data) {} //Target while upload failed.
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

        if (this.options.formData && Object.prototype.toString.call(this.options.formData) != '[object FormData]') {
            console.error('Invalid paramter "formData"!');
            return false;
        }

        return true;
    };

    /* Init methods end */

    /* Event methods */

    Plugin.prototype._progress = function (data) {
        if (this.options.progress) {
            this.options.progress(data);
        }
    };

    /* Event methods end */

    /* Methods */

    function UploadData() {
        this.name = ''; //File or file piece name.
        this.size = 0; //Actual size of file not file piece.
        this.file = null; //File or file piece.
        this.count = 1; //Amount of file pieces, 1 for whole file.
        this.checksum = null; //Checksum of file or file piece.
        this.timestamp = 0; //Timestamp for uploading.
        this.properties = Object.keys(this);
        this.set(arguments[0], arguments[1], arguments[2]);
    }

    UploadData.prototype.set = function (file, pieceCount, pieceIndex) {
        if (pieceCount == 1) {
            this.name = file.name;
            this.size = file.size;
            this.file = file;
            return;
        }

        var start = pieceIndex * this.options.pieceSize;
        var end = Math.min(file.size, start + this.options.pieceSize);

        this.name = file.name + '_' + pieceIndex;
        this.size = file.size;
        this.file = file.slice(start, end);
        this.count = pieceCount;
    };

    UploadData.prototype.toFormData = function (formData) {
        if (!formData) {
            formData = new FormData();
        }

        for (var name in this.properties) {
            formData.append(name, this[name]);
        }

        return formData;
    };

    Plugin.prototype._enqueue = function (file) {
        if (!this.options.needSlice) {
            this.total = this.queue.push(new UploadData(file, 1));
            return;
        }

        var pieceCount = Math.ceil(file.size / this.options.pieceSize);

        for (var i = 0; i < pieceCount; i++) {
            this.total = this.queue.push(new UploadData(file, pieceCount, i));
        }
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