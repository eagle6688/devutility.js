/**
 * ext.js v20190206
 * Javascript extensions libraries.
 * dependency: devutility.js
 * @license: MIT (c) 2010-2016 Aldwin. https://github.com/eagle6688
 */

(function (window, document, undefined) {
    /**
     * Date extensions
     */
    Date.prototype.subtract = function (time) {
        return this.getTime() - time.getTime();
    };

    Date.prototype.subtractDays = function (time) {
        var subtraction = this.subtract(time);
        return Math.floor(subtraction / (24 * 60 * 60 * 1000));
    };

    Date.prototype.subtractHours = function (time) {
        var subtraction = this.subtract(time);
        return Math.floor(subtraction / (60 * 60 * 1000));
    };

    Date.prototype.subtractMinutes = function (time) {
        var subtraction = this.subtract(time);
        return Math.floor(subtraction / (60 * 1000));
    };

    Date.prototype.subtractSeconds = function (time) {
        var subtraction = this.subtract(time);
        return Math.floor(subtraction / 1000);
    };

    Date.prototype.add = function (milliseconds) {
        var time = this.getTime();
        return new Date(time + milliseconds);
    };

    Date.prototype.addHours = function (hours) {
        var milliseconds = hours * 60 * 60 * 1000;
        return this.add(milliseconds);
    };

    Date.prototype.addDays = function (days) {
        var milliseconds = days * 24 * 60 * 60 * 1000;
        return this.add(milliseconds);
    };

    /**
     * String extensions
     */
    String.prototype.toDate = function (format) {
        return devutility.date.parse(this, format);
    };
})(window, document);