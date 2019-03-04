/**
 * @license DateSelector.js v20190304
 * (c) Aldwin. https://github.com/eagle6688
 * License: MIT
 */

(function ($, window, document, undefined) {
    var pluginName = 'DateSelector';

    var defaults = {
        
    };

    var config = {
        indexName: 'data-form-modal-index',
        currentIndexName: 'data-form-modal-current-index'
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

        this.$modal = $(this.options.modalSelector);

        if (this.options.cloneModal) {
            this.$modal = this.$modal.clone();
        }

        this.$form = this.$modal.find(this.options.formSelector);
        this.$saveBtn = this.$modal.find(this.options.saveBtnSelector);
        this._initIndex();
        this._bind();
    };

    Plugin.prototype._verify = function () {
        if (!this.options.modalSelector) {
            console.error('"modalSelector" cannot be null!');
            return false;
        }

        if (!this.options.formSelector) {
            console.error('"formSelector" cannot be null!');
            return false;
        }

        if (!this.options.saveBtnSelector) {
            console.error('"saveBtnSelector" cannot be null!');
            return false;
        }

        if (!this.options.saveUrl) {
            var saveUrl = $(this.options.formSelector).attr('action');

            if (!saveUrl) {
                console.error('"saveUrl" cannot be null!');
                return false;
            }

            this.options.saveUrl = saveUrl;
        }

        return true;
    };

    
    /* Public methods */

    /* Public methods end */

    window[pluginName] = Plugin;
})(jQuery, window, document);