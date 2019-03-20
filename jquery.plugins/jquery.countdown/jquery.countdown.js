/**
 * jquery.countdown.js v20190320
 * dependency: jQuery.js, devutility.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'countdown';

    var defaults = {};

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

    /* Methods */

    /* Methods end */

    /* Public methods */

    /* Public methods end */

    window[pluginName] = $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);