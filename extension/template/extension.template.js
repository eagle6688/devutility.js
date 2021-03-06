/**
 * {PluginName}.js v{yyyyMMdd}
 * dependency: jQuery.js, devutility.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = '{PluginName}';

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

    /* Methods internal methods */

    /* Methods end */

    /* Public methods */

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);