/**
 * @license form-modal.js v20190224
 * (c) Aldwin. https://github.com/eagle6688
 * License: MIT
 */

(function ($, window, document, undefined) {
    var pluginName = 'Popuper';

    var defaults = {
        selector: '', //Selector for popup content.
        zIndex: 100, //zIndex for popup.
        backgroundId: '' //Id for background.
    };

    function Plugin(options) {
        this.options = $.extend({}, defaults, options);
        this._init();
    }

    Plugin.prototype.constructor = Plugin;

    Plugin.prototype._init = function () {
        this.$content = $(this.options.selector);
        this._init_content();
    };

    Plugin.prototype._init_content = function () {
        var width = this.$content.width();
        var height = this.$content.height();
        var marginLeft = -(width / 2);
        var marginTop = -(height / 2);

        this.$content.css({
            'zIndex': this.options.zIndex,
            'position': 'absolute',
            'display': 'none'
        });

        this.$content.css({
            'left': '50%',
            'top': '50%',
            'margin-left': marginLeft,
            'margin-top': marginTop
        });
    };

    Plugin.prototype._background = function () {

    };

    window[pluginName] = Plugin;
})(jQuery, window, document);