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
        checksum: function (file, callback) {}, //Function to calculate file's checksum, callback(checksumValue).
        progress: function (data) {}, //Target while uploading files.
        complete: function (data) {}, //Target while upload completed.
        failed: function (data) {} //Target while upload failed.
    };

    function Plugin(options) {
        this.options = $.extend({}, defaults, options);
        this._init();
    }

    Plugin.prototype.constructor = Plugin;

    /* Container */

    function Container(uploader, file, pieceCount, pieceIndex) {
        this.name = ''; //File or file piece name.
        this.size = 0; //Actual size of file not file piece.
        this.file = null; //File or file piece.
        this.count = 1; //Amount of file pieces, 1 for whole file.
        this.checksum = null; //Checksum of file or file piece.
        this.timestamp = 0; //Timestamp for uploading.
        this.properties = Object.keys(this);
        this.retry = 0; //Retry times for upload.
        this.uploadIndex = -1;

        var self = this;
        this.set(file, pieceCount, pieceIndex);

        this.httpRequest = new HttpRequest({
            url: uploader.options.url,
            method: 'POST',
            progress: function (data) {
                uploader._progress(data, self);
            },
            complete: function (data) {
                uploader._progress(data, self);
            },
            failed: function (data) {
                uploader._failed(data, self);
            }
        });
    }

    Container.prototype.constructor = Container;

    Container.prototype.set = function (file, pieceCount, pieceIndex) {
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

    Container.prototype.toFormData = function (formData) {
        if (!formData) {
            formData = new FormData();
        }

        for (var name in this.properties) {
            formData.append(name, this[name]);
        }

        return formData;
    };

    Container.prototype.upload = function () {
        var formData = this.toFormData();
        this.httpRequest.request(formData);
    };

    /* Container end */

    /* Init methods */

    Plugin.prototype._init = function () {
        if (!this._verify()) {
            return;
        }
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

    Plugin.prototype._progress = function (data, container) {
        if (data.event.loaded == data.event.total && data.event.type == 'load') {
            this.totalUploadedSize += data.event.loaded;
            this.uploadingSizes[container.uploadIndex] = 0;
        } else {
            this.uploadingSizes[container.uploadIndex] = data.event.loaded;
        }

        if (this.options.progress) {
            this.options.progress(data);
        }

        if (this.totalSize == this.totalUploadedSize) {
            this._complete();
        }

        this._upload();
    };

    Plugin.prototype._complete = function () {
        if (this.options.complete) {
            this.options.complete();
        }
    };

    Plugin.prototype._failed = function (data, container) {
        if (data.status >= 400 && data.status < 500) {
            this._customFailed();
            return;
        }

        this.uploadingSizes[container.uploadIndex] = 0;

        if (this.options.retry >= container.retry) {
            container.retry++;
            this.queue.push(container);
            this._upload();
            return;
        }

        this._customFailed();
    };

    Plugin.prototype._customFailed = function () {
        if (this.options.failed) {
            this.options.failed();
        }
    };

    /* Event methods end */

    /* Methods */

    Plugin.prototype._reset = function () {
        this.total = 0;
        this.totalSize = 0;
        this.totalUploadedSize = 0;

        this.queue = [];
        this.uploadingSizes = [];
    };

    Plugin.prototype._enqueue = function (file) {
        this.totalSize += file.size;

        if (!this.options.needSlice) {
            this.total = this.queue.push(new Container(this, file, 1));
            return;
        }

        var pieceCount = Math.ceil(file.size / this.options.pieceSize);

        for (var i = 0; i < pieceCount; i++) {
            this.total = this.queue.push(new Container(this, file, pieceCount, i));
        }
    };

    Plugin.prototype._percentage = function () {
        if (this.totalSize == 0) {
            return 0;
        }

        var size = this.totalUploadedSize;

        for (var i in this.uploadingSizes) {
            size += this.uploadingSizes[i];
        }

        return Math.floor(100 * size / this.totalSize);
    };

    Plugin.prototype._upload = function (uploadIndex) {
        var container = this.queue.shift();

        if (!container) {
            return;
        }

        container.uploadIndex = uploadIndex;

        if (this.options.checksum) {
            this.options.checksum(container.file, function (value) {
                container.checksum = value;
                container.upload();
            });

            return;
        }

        container.upload();
    };

    /* Methods end */

    /* Public methods */

    Plugin.prototype.upload = function (files) {
        this._reset();

        for (var i = 0; i < files.length; i++) {
            this._enqueue(files[i]);
        }

        for (var j = 0; j < Math.min(this.queue.length, this.options.concurrency); j++) {
            this._upload(j);
        }
    };

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);