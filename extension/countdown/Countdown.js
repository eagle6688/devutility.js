/**
 * Countdown.js v20190322
 * dependency: jQuery.js
 * @license: MIT (c) Aldwin Su. https://github.com/eagle6688
 */

(function ($, window, document, undefined) {
    var pluginName = 'Countdown';

    var defaults = {
        buttonSelector: '', //Jquery selector for button which triggered countdown action.
        displaySelector: '', //Jquery selector for display countdown seconds.
        displayFormat: '{seconds}', //Display format of countdown.
        seconds: 60, //Seconds after click button.
        intervalMilliseconds: 1000, //Interval milliseconds for countdown.
        clicked: function () { //Event triggered after button clicked and before diplay countdown seconds, Countdown would stop if clicked method return false.
            return true;
        },
        complete: function () {} //Event triggered after countdown seconds scale down to 0.
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

        this.$button = $(this.options.buttonSelector);
        this.$display = $(this.options.displaySelector).hide();
        this.remainingSeconds = this.options.seconds - 1;
        this._bind();
    };

    Plugin.prototype._verify = function () {
        if (!this.options.buttonSelector) {
            console.error('Parameter "buttonSelector" cannot be null!');
            return false;
        }

        if (!this.options.displaySelector) {
            console.error('Parameter "displaySelector" cannot be null!');
            return false;
        }

        if (this.options.seconds < 0) {
            console.error('Invalid parameter "seconds"!');
            return false;
        }

        if (this.options.intervalMilliseconds < 0) {
            console.error('Invalid parameter "intervalMilliseconds"!');
            return false;
        }

        return true;
    };

    /* Init methods end */

    /* Bind methods */

    Plugin.prototype._bind = function () {
        var self = this;

        this.$button.click(function () {
            if (!self._clicked()) {
                return;
            }

            self.start();
        });
    };

    /* Bind methods end */

    /* Event methods */

    Plugin.prototype._clicked = function () {
        if (this.options.clicked) {
            return this.options.clicked();
        }

        return true;
    };

    Plugin.prototype._complete = function () {
        this.stop();

        if (this.options.complete) {
            this.options.complete();
        }
    };

    /* Event methods end */

    /* Methods */

    Plugin.prototype._circulating = function () {
        if (this.remainingSeconds > 0) {
            this._display();
            return;
        }

        this._complete();
    };

    Plugin.prototype._display = function () {
        var text = this.options.displayFormat.replace(/\{seconds\}/g, this.remainingSeconds--);
        this.$display.text(text);
    };

    /* Methods end */

    /* Public methods */

    Plugin.prototype.start = function () {
        var self = this;
        this.remainingSeconds = this.options.seconds - 1;

        this.circulator = setInterval(function () {
            self._circulating();
        }, this.options.intervalMilliseconds);

        this._display();
        this.$button.hide();
        this.$display.show();
    };

    Plugin.prototype.stop = function () {
        clearInterval(this.circulator);
        this.$display.hide();
        this.$button.show();
    };

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);