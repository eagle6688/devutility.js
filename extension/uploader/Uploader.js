/**
 * Uploader.js v20190322
 * dependency: jQuery.js, devutility.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'Uploader';

    var defaults = {
        url: '', //Post url for uploading file.
        concurrency: 1, //Concurrency thread for uploading.
        isSliced: true, //Whether slice a file to multi pieces or not?
        pieceSize: 1 * 1024 * 1024, //Bytes for each piece, worked if "isSliced"=true.
        retry: 1, //Retry times after upload failed.
        checksum: function (callback) {} //Function to calculate file's checksum.
    };

    var config = {
        data: {
            name: '', //File or file piece name.
            size: 0, //Actual size or file or file piece.
            index: 0, //Index of file piece, 0 for file.
            count: 1, //Amount of file pieces, 1 for whole file.
            checksum: null, //Checksum of file or file piece.
            timestamp: 0 //Timestamp for uploading.
        }
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

        this._bind();
    };

    Plugin.prototype._initQueue = function () {
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

        if (!this.options.concurrency < 1) {
            console.error('Invalid paramter "concurrency"!');
            return false;
        }

        if (!this.options.retry < 0) {
            console.error('Invalid paramter "retry"!');
            return false;
        }

        return true;
    };

    /* Init methods end */

    /* Bind methods */

    Plugin.prototype._bind = function () {

    };

    /* Bind methods end */

    /* Event methods */

    /* Event methods end */

    /* Methods internal methods */

    /* Methods end */

    /* Public methods */

    Plugin.prototype.upload = function (files) {

    };

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);