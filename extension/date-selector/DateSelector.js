/**
 * DateSelector.js v20190310
 * Plugin manage date selector include year, month and day.
 * dependency: jQuery.js, devutility.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'DateSelector';

    var defaults = {
        yearSelector: '', //jQuery selector for year, for example '#selectId'.
        monthSelector: '', //jQuery selector for month.
        daySelector: '', //jQuery selector for day.
        start: null, //Start date of DateSelector date range, support Date object or 'yyyy-MM-dd', default is 10 years ago today.
        end: null, //End date of DateSelector date range, support Date object or 'yyyy-MM-dd', default is 20 years later today.
        initial: new Date(), //Initial date of DateSelector, support Date object or 'yyyy-MM-dd', default is current date.
        change: function (date) {} //Event triggered when any one of three select changed.
    };

    var config = {
        datePattern: 'yyyy-MM-dd',
        datePatternRegExp: new RegExp(/^\d{4}-\d{2}-\d{2}$/),
        monthWithDays31: [1, 3, 5, 7, 8, 10, 12],
        monthWithDays30: [4, 6, 9, 11]
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

        this.current = new Date();
        this.$yearSelector = $(this.options.yearSelector);
        this.$monthSelector = $(this.options.monthSelector);
        this.$daySelector = $(this.options.daySelector);

        this._initStart();
        this._initEnd();
        this._initInitial();
        this._initSelector();

        this._bind();
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

        if (!devutility.date.test(config.datePatternRegExp, this.options.start)) {
            console.error('Invalid "start" format!');
            return false;
        }

        if (!devutility.date.test(config.datePatternRegExp, this.options.end)) {
            console.error('Invalid "end" format!');
            return false;
        }

        if (!devutility.date.test(config.datePatternRegExp, this.options.initial)) {
            console.error('Invalid "initial" format!');
            return false;
        }

        return true;
    };

    Plugin.prototype._initStart = function () {
        if (typeof this.options.start == 'string') {
            this.options.start = devutility.date.parse(config.datePattern, this.options.start);
            return;
        }

        if (this.options.start == null) {
            this.options.start = devutility.date.addYear(this.current, -10);
        }
    };

    Plugin.prototype._initEnd = function () {
        if (this.options.end == null) {
            this.options.end = devutility.date.addYear(this.current, 20);
            return;
        }

        if (typeof this.options.end == 'string') {
            this.options.end = devutility.date.parse(config.datePattern, this.options.end);
        }
    };

    Plugin.prototype._initInitial = function () {
        if (this.options.initial == null) {
            this.options.initial = this.current;
            return;
        }

        if (typeof this.options.initial == 'string') {
            this.options.initial = devutility.date.parse(config.datePattern, this.options.initial);
        }
    };

    Plugin.prototype._initSelector = function () {
        this.selectedYear = this.options.initial.getFullYear();
        this.selectedMonth = this.options.initial.getMonth() + 1;
        this.selectedDay = this.options.initial.getDate();

        this._setSelect(this.$yearSelector, this._getMinYear(), this._getMaxYear(), this.selectedYear);
        this._setSelect(this.$monthSelector, this._getMinMonth(), this._getMaxMonth(), this.selectedMonth);
        this._setSelect(this.$daySelector, this._getMinDay(), this._getMaxDay(), this.selectedDay);
    };

    /* Init methods end */

    /* Bind methods */

    Plugin.prototype._bind = function () {
        var self = this;

        this.$yearSelector.change(function () {
            self.selectedYear = ~~$(this).val();
            self.selectedMonth = self._setSelect(self.$monthSelector, self._getMinMonth(), self._getMaxMonth());
            self.selectedDay = self._setSelect(self.$daySelector, self._getMinDay(), self._getMaxDay());
            self._change();
        });

        this.$monthSelector.change(function () {
            self.selectedMonth = ~~$(this).val();
            self.selectedDay = self._setSelect(self.$daySelector, self._getMinDay(), self._getMaxDay());
            self._change();
        });

        if (this._hasDaySelector()) {
            this.$daySelector.change(function () {
                self.selectedDay = ~~$(this).val();
                self._change();
            });
        }
    };

    /* Bind methods end */

    /* Event methods */

    Plugin.prototype._change = function () {
        var date = this.getDate();

        if (this.options.change) {
            this.options.change(date);
        }
    };

    /* Event methods end */

    /* Methods */

    Plugin.prototype._hasDaySelector = function () {
        return this.options.daySelector && this.$daySelector.length > 0;
    };

    Plugin.prototype._getMinYear = function () {
        return this.options.start.getFullYear();
    };

    Plugin.prototype._getMaxYear = function () {
        return this.options.end.getFullYear();
    };

    Plugin.prototype._getMinMonth = function () {
        if (this.selectedYear == this.options.start.getFullYear()) {
            return this.options.start.getMonth() + 1;
        }

        return 1;
    };

    Plugin.prototype._getMaxMonth = function () {
        if (this.selectedYear == this.options.end.getFullYear()) {
            return this.options.end.getMonth() + 1;
        }

        return 12;
    };

    Plugin.prototype._getMinDay = function () {
        if (this.selectedYear == this.options.start.getFullYear() && this.selectedMonth == this.options.start.getMonth() + 1) {
            return this.options.start.getDate();
        }

        return 1;
    };

    Plugin.prototype._getMaxDay = function () {
        if (this.selectedYear == this.options.end.getFullYear() && this.selectedMonth == this.options.end.getMonth() + 1) {
            return this.options.end.getDate();
        }

        if (devutility.array.contain(config.monthWithDays31, this.selectedMonth)) {
            return 31;
        }

        if (devutility.array.contain(config.monthWithDays30, this.selectedMonth)) {
            return 30;
        }

        if (devutility.date.isLeapYear(this.selectedYear)) {
            return 29;
        }

        return 28;
    };

    Plugin.prototype._setSelect = function ($select, start, end, selected) {
        if (!$select || $select.length == 0) {
            return 0;
        }

        $select.empty();

        for (var index = start; index <= end; index++) {
            var value = index.toString();
            $select.append('<option value="' + value + '">' + value + '</option>');
        }

        if (selected != undefined && selected != null) {
            $select.val(selected);
            return selected;
        }

        return start;
    };

    /* Methods end */

    /* Public methods */

    Plugin.prototype.getDate = function () {
        return new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);
    };

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);