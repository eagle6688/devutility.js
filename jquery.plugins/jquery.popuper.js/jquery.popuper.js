/**
 * jquery.popuper.js v20190310
 * dependency: jQuery.js, Background.js, devutility.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'popuper';

    var defaults = {
        zIndex: 2001, //zIndex for popup element.
        background: null //Background object.
    };

    function Plugin(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._init();
        this._bind();
    }

    Plugin.prototype.constructor = Plugin;

    /* init */

    Plugin.prototype._init = function () {
        this._initBackground();
        this._initElement();
    };

    Plugin.prototype._initBackground = function () {
        if (this.options.background) {
            return;
        }

        if (typeof Background == 'function') {
            this.options.background = new Background({
                'zIndex': this.options.zIndex - 1
            });
        }
    };

    Plugin.prototype._initElement = function () {
        this.$element.css({
            'zIndex': this.options.zIndex,
            'position': 'absolute',
            'display': 'none'
        });

        this._setPosition();
    };

    /* init end */

    Plugin.prototype._bind = function () {
        var self = this;

        $(window).resize(function () {
            self._setPosition();
        });
    };

    Plugin.prototype._setPosition = function () {
        var width = this.$element.width();
        var height = this.$element.height();
        var marginTop = -(height / 2);
        var marginLeft = -(width / 2);

        this.$element.css({
            'left': '50%',
            'top': '50%',
            'margin-top': marginTop,
            'margin-left': marginLeft
        });
    };

    /* Public methods */

    Plugin.prototype.show = function () {
        this.$element.show();
    };

    Plugin.prototype.showAll = function () {
        this.options.background.show();
        this.show();
    };

    Plugin.prototype.hide = function () {
        this.$element.hide();
    };

    Plugin.prototype.hideAll = function () {
        this.hide();
        this.options.background.hide();
    };

    /* Public methods end */

    $.fn[pluginName] = function (options) {
        var plugin = new Plugin(this, options);

        this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, plugin);
            }
        });

        return plugin;
    };
})(jQuery, window, document);