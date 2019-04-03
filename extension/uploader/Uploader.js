/**
 * Uploader.js v20190322
 * dependency: jQuery.js, HttpRequest.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'Uploader';

    var defaults = {
        url: '', //Post url for uploading file.
        responseType: 'json', //Data type of response.
        concurrency: 1, //Concurrency thread for uploading.
        needSlice: false, //Whether slice a file to multi pieces or not?
        pieceSize: 1 * 1024 * 1024, //Bytes for each piece, worked if "needSlice"=true.
        retry: 1, //Retry times after upload failed.
        formData: null, //FormData for each upload request.
        checksum: null, //Function to calculate file's checksum, format: function (file, callback) {}, callback(checksumValue).
        start: function (data) {}, //Target while begin uploading.
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

    Plugin.prototype._start = function (data, package) {
        var result = this._result(data, package);
        result.type = 'start';

        if (this.options.start) {
            this.options.start(result);
        }
    };

    Plugin.prototype._progress = function (data, package) {
        if (data.type == 'upload-progress') {
            this.channels[package.channelIndex] = data.event.loaded;
        } else if (data.type == 'load') {
            if (data.event.loaded == data.event.total) {
                this.totalUploadedSize += package.file.size;
                this.channels[package.channelIndex] = 0;
            }
        }

        var result = this._result(data, package);
        this._customProgress(result);

        if (data.type == 'load' && this.totalSize == this.totalUploadedSize) {
            this._complete(result);
            return;
        }

        this._upload();
    };

    Plugin.prototype._customProgress = function (result) {
        result.type = 'progress';

        if (this.options.progress) {
            this.options.progress(result);
        }
    };

    Plugin.prototype._complete = function (result) {
        result.type = 'complete';

        if (this.options.complete) {
            this.options.complete(result);
        }
    };

    Plugin.prototype._failed = function (data, package) {
        var result = this._result(data, package);

        if (data.status >= 400 && data.status < 500) {
            this._customFailed(result);
            return;
        }

        this.channels[package.channelIndex] = 0;

        if (this.options.retry >= package.uploadTimes) {
            this.queue.push(package);
            this._upload();
            return;
        }

        this._customFailed(result);
    };

    Plugin.prototype._customFailed = function (result) {
        result.type = 'failed';

        if (this.options.failed) {
            this.options.failed(result);
        }
    };

    /* Event methods end */

    /* Methods */

    Plugin.prototype._reset = function () {
        this.total = 0;
        this.totalSize = 0;
        this.totalUploadedSize = 0;

        this.queue = [];
        this.channels = [];
    };

    Plugin.prototype._result = function (data, package) {
        return {
            type: '',
            status: data.status,
            response: data.response,
            file: package.name, //Current file.
            total: this.totalSize,
            loaded: this.totalUploadedSize + this._totalUploadingSize(),
            percentage: this._percentage()
        };
    };

    Plugin.prototype._enqueue = function (file) {
        this.totalSize += file.size;

        if (!this.options.needSlice) {
            this.total = this.queue.push(new Package(this, file, 1));
            return;
        }

        var pieceCount = Math.ceil(file.size / this.options.pieceSize);

        for (var i = 0; i < pieceCount; i++) {
            this.total = this.queue.push(new Package(this, file, pieceCount, i));
        }
    };

    Plugin.prototype._totalUploadingSize = function () {
        var size = 0;

        for (var i in this.channels) {
            size += this.channels[i];
        }

        return size;
    };

    Plugin.prototype._percentage = function () {
        if (this.totalSize == 0) {
            return 0;
        }

        var size = this.totalUploadedSize;
        size += this._totalUploadingSize();
        return Math.floor(100 * size / this.totalSize);
    };

    Plugin.prototype._upload = function (channelIndex) {
        var package = this.queue.shift();

        if (!package) {
            return;
        }

        package.channelIndex = channelIndex;

        if (this.options.checksum) {
            this.options.checksum(package.file, function (value) {
                package.checksum = value;
                package.upload();
            });

            return;
        }

        package.upload();
    };

    /* Methods end */

    /* Package */

    function Package(uploader, file, pieceCount, pieceIndex) {
        this.fileSize = 0; //Size of file.
        this.name = ''; //Name of file or blob.
        this.count = 1; //Amount of blob, 1 for whole file.
        this.checksum = null; //Checksum value of file or blob.
        this.timestamp = 0; //Timestamp for uploading.
        this.file = null; //File or blob, must put file property at the end of properties list, no property will be parsed by node.js after file.
        this.properties = Object.keys(this);

        this.uploadTimes = 0;
        this.channelIndex = 0;
        this.uploader = uploader;
        this.set(file, pieceCount, pieceIndex);
        var self = this;

        this.httpRequest = new HttpRequest({
            url: uploader.options.url,
            method: 'POST',
            responseType: uploader.options.responseType,
            complete: function (data) {
                uploader._progress(data, self);
                self = null;
            },
            failed: function (data) {
                uploader._failed(data, self);
            },
            upload: {
                loadstart: function (data) {
                    uploader._start(data, self);
                },
                progress: function (data) {
                    uploader._progress(data, self);
                },
                complete: function (data) {
                    uploader._progress(data, self);
                },
                failed: function (data) {
                    uploader._failed(data, self);
                }
            }
        });
    }

    Package.prototype.constructor = Package;

    Package.prototype.set = function (file, pieceCount, pieceIndex) {
        this.fileSize = file.size;

        if (pieceCount == 1) {
            this.file = file;
            this.name = file.name;
            return;
        }

        var pieceSize = this.uploader.options.pieceSize;
        var start = pieceIndex * pieceSize;
        var end = Math.min(file.size, start + pieceSize);

        this.name = file.name + '_' + pieceIndex;
        this.file = file.slice(start, end);
        this.count = pieceCount;
    };

    Package.prototype.toFormData = function (formData) {
        if (!formData) {
            formData = new FormData();
        }

        for (var index in this.properties) {
            var name = this.properties[index];
            var value = this[name];
            formData.append(name, value);
        }

        return formData;
    };

    Package.prototype.upload = function () {
        this.uploadTimes++;
        this.timestamp = new Date().getTime();
        this.httpRequest.request(this.toFormData());
    };

    /* Package end */

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