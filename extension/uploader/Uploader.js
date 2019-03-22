/**
 * Uploader.js v20190322
 * dependency: jQuery.js, devutility.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'Uploader';

    var defaults = {
        url: '', //Post url for uploading file.
        files: [], //Files for uploading, note that all files should be in a same queue.
        concurrency: 1, //Concurrency thread for uploading.
        isSliced: true, //Whether slice a file to multi pieces or not?
        pieceSize: 1 * 1024 * 1024, //Bytes for each piece, worked if "isSliced"=true.
        checksum: function (callback) {} //
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

    Plugin.prototype._verify = function () {
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

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);