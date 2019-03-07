/**
 * Plugin manage date selector include year, month and day.
 * This plugin depend on jQuery and devutility.js
 * @license DateSelector.js v20190306
 * (c) Aldwin. https://github.com/eagle6688
 * License: MIT
 */

(function ($, window, document, undefined) {
    var pluginName = 'DateSelector';

    var defaults = {
        yearSelector: '', //jQuery selector for year, for example '#selectId'.
        monthSelector: '', //jQuery selector for month.
        daySelector: '', //jQuery selector for day.
        start: null, //Start date of DateSelector date range, support Date object or 'yyyy-MM-dd', default is null.
        end: null, //End date of DateSelector date range, support Date object or 'yyyy-MM-dd', default is null.
        initial: new Date() //Initial date of DateSelector, support Date object or 'yyyy-MM-dd', default is current date.
    };

    function Plugin(options) {
        this.options = $.extend({}, defaults, options);
        this._init();
    }

    Plugin.prototype.constructor = Plugin;

    Plugin.prototype._init = function () {
        if (!this._verify()) {
            return;
        }

        this.$yearSelector = $(this.options.yearSelector);
        this.$monthSelector = $(this.options.monthSelector);
        this.$daySelector = $(this.options.daySelector);
    };

    Plugin.prototype._verify = function () {
        if (!this.options.yearSelector) {
            console.error('"yearSelector" cannot be null!');
            return false;
        }

        if (!this.options.monthSelector) {
            console.error('"monthSelector" cannot be null!');
            return false;
        }

        if (!this.options.daySelector) {
            console.error('"daySelector" cannot be null!');
            return false;
        }

        return true;
    };

    /* Public methods */

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);