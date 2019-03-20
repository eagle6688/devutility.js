/**
 * jquery.countdown.js v20190320
 * dependency: jQuery.js, devutility.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'vueHelper';

    var defaults = {
        
    };

    function Plugin(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, defaults, options);
        this.vueOptions = this.options.vueOptions;
        this._init();
    }

    Plugin.prototype.constructor = Plugin;

    /* Init */

    Plugin.prototype._init = function () {
        if (!this._verify()) {
            return;
        }

        this._initVue();
        this._initData();
    };

    Plugin.prototype._verify = function () {
        if (!this.$element.attr('id')) {
            console.error('Invalid value of attribute "id"!');
            return false;
        }

        return true;
    };

    

    /* Init end */

    /* Methods */

    /* Events end */

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);