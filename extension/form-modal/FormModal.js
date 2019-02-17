/**
 * @license form-modal.js v20190217
 * (c) Aldwin. https://github.com/eagle6688
 * License: MIT
 */

(function ($, window, document, undefined) {
    var pluginName = 'FormModal';

    var defaults = {
        modalSelector: null, //Selector for modal.
        formSelector: null, //Selector for form.
        saveBtnSelector: null, //Selector for save button.
        saveUrl: null, //Save url for form data.
        loadFormDataBeforeShow: false, //Whether load form data or not before the modal shows.
        formDataUrlFormat: null, //Url format of request form data, for example http://www.test.com?p1={0}&p2={1}.
        formDataName: '', //Name of form data object name, for example 'name1.name2.name3'.
        beforeRequestFormData: function (modal) {}, //Event before request form data, for example display loading image.
        afterRequestFormData: function (modal) {}, //Event after request form data.
        checkFormData: function (result, modal) {}, //Event for validating result data from formDataUrl, plugin does nothing if validation failed.
        saveClick: function (modal) {}, //Event when click save button.
        checkSaveResult: function (result, modal) {}, //Event for validating result data from save url, plugin does nothing if validation failed.
        afterSave: function (data, modal) {} //Event after saved form data.
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

        this.$modal = $(this.options.modalSelector).clone();
        this.$form = this.$modal.find(this.options.formSelector);
        this.$saveBtn = this.$modal.find(this.options.saveBtnSelector);
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

    Plugin.prototype._bind = function () {
        var self = this;

        this.$saveBtn.click(function () {
            self.options._saveClick(self);
        });
    };

    Plugin.prototype._save = function (data) {
        var self = this;

        $.post(this.options.saveUrl, data, function (data) {
            self._savedEvent(data);
        });
    };

    Plugin.prototype._getFormDataFromResult = function (result) {
        if (!this.options.formDataName) {
            return result;
        }

        var data = result[array[0]];
        var array = this.options.formDataName.split('.');

        for (var i = 1; i < array.length; i++) {
            data = data[array[i]];
        }

        return data;
    };

    Plugin.prototype._setFields = function (model) {
        if (!model) {
            return;
        }

        this.$form.find(':input').each(function () {
            var $this = $(this);
            var name = $this.attr('name');

            if (name) {
                var value = model[name];

                if (value) {
                    $this.val(value);
                }
            }
        });
    };

    Plugin.prototype._loadData = function (paramters) {
        if (!this.options.loadFormDataBeforeShow) {
            return;
        }

        if (this.options.beforeRequestFormData) {
            this.options.beforeRequestFormData(this);
        }

        var self = this;
        var url = this._getFormDataUrl(paramters);

        $.getJSON(url, function (result) {
            var data = self._getFormDataFromResult(result);
            self._setFields(data);
        });
    };

    Plugin.prototype._getFormDataUrl = function (paramters) {
        var url = this.options.formDataUrlFormat;

        for (var i = 0; i < paramters.length; i++) {
            var regExp = new RegExp('{' + i + '}', 'i');
            url = url.replace(regExp, paramters[i]);
        }

        return url;
    };

    Plugin.prototype._beforeShow = function (paramters) {
        this._loadData();

        if (this.options.beforeShow) {
            this.options.beforeShow(this);
        }
    };

    Plugin.prototype._afterShow = function () {
        if (this.options.afterShow) {
            this.options.afterShow(this);
        }
    };

    Plugin.prototype._saveClick = function () {
        if (this.options.saveClick) {
            this.options.saveClick(this);
        }

        this._save(this.$form.serialize());
    };

    Plugin.prototype._savedEvent = function (data) {
        if (this.options.savedEvent) {
            this.options.savedEvent(data, this);
        }
    };

    Plugin.prototype.clear = function () {
        this.$form.find(':input').each(function () {
            var $this = $(this);

            if (!($this.attr('readonly') || $this.attr('disabled'))) {
                $this.val('');
            }
        });
    };

    Plugin.prototype.show = function () {
        this._beforeShow(arguments);
        this.$modal.modal('show');
        this._afterShow();
    };

    Plugin.prototype.hide = function () {
        this.$modal.modal('hide');
    };

    window[pluginName] = Plugin;
})(jQuery, window, document);