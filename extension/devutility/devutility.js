/**
 * @license devutility.js v20190307
 * (c) Aldwin. https://github.com/eagle6688
 * License: MIT
 */

(function (window, document, undefined) {
    var devutility = {
        url: {},
        date: {},
        string: {},
        select: {}
    };

    /* url */

    var url = {};

    url.addParam = function (url, name, value) {
        if (url.indexOf('?') != -1) {
            url += '&';
        } else {
            url += '?';
        }

        url += name + '=' + value;
        return url;
    };

    devutility.url = url;

    /* url end */

    /* date */

    var date = {};

    date.extract = function (str, format, pattern) {
        var index = format.indexOf(pattern);

        if (index < 0 || str.length != format.length) {
            return null;
        }

        return str.substr(index, pattern.length);
    };

    date.extractToInt = function (str, format, pattern) {
        var value = date.extract(str, format, pattern);

        if (!value) {
            return -1;
        }

        return parseInt(value);
    };

    date.addPrefix = function (part, length) {
        var value = part.toString();
        var lengthSub = length - value.length;

        while (lengthSub > 0) {
            value = string.addPrefix(value, '0');
            lengthSub--;
        }

        return value;
    };

    date.serialize = {
        yyyy: function (_date) {
            return _date.getFullYear().toString();
        },
        MM: function (_date) {
            return date.addPrefix(_date.getMonth() + 1, 2);
        },
        dd: function (_date) {
            return date.addPrefix(_date.getDate() + 1, 2);
        },
        HH: function (_date) {
            return date.addPrefix(_date.getHours() + 1, 2);
        },
        mm: function (_date) {
            return date.addPrefix(_date.getMinutes() + 1, 2);
        },
        ss: function (_date) {
            return date.addPrefix(_date.getSeconds() + 1, 2);
        },
        ccc: function (_date) {
            return date.addPrefix(_date.getSeconds() + 1, 3);
        }
    };

    date.deserialize = {
        year: {
            yyyy: function (str, format) {
                return date.extractToInt(str, format, 'yyyy');
            }
        },
        month: {
            MM: function (str, format) {
                return date.extractToInt(str, format, 'MM') - 1;
            }
        },
        day: {
            dd: function (str, format) {
                return date.extractToInt(str, format, 'dd');
            }
        },
        hour: {
            HH: function (str, format) {
                return date.extractToInt(str, format, 'HH');
            }
        },
        minute: {
            mm: function (str, format) {
                return date.extractToInt(str, format, 'mm');
            }
        },
        second: {
            ss: function (str, format) {
                return date.extractToInt(str, format, 'ss');
            }
        },
        millisecond: {
            ccc: function (str, format) {
                return date.extractToInt(str, format, 'ccc');
            }
        }
    };

    date.format = function (_date, format) {
        var value = format;

        for (var pattern in date.serialize) {
            var regExp = new RegExp(pattern, 'g');
            var patternValue = date.serialize[pattern].call(this, _date);
            value = value.replace(regExp, patternValue);
        }

        return value;
    };

    date.parse = function (str, format) {
        var params = {
            year: 1970,
            month: 1,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        };

        for (var param in date.deserialize) {
            var value = 0;

            for (var pattern in date.deserialize[param]) {
                if (string.contain(format, pattern)) {
                    value = date.deserialize[param][pattern].call(this, str, format);
                    break;
                }
            }

            if (value < 0) {
                console.error('Invalid str or format!');
                return null;
            }

            if (value > 0) {
                params[param] = value;
            }
        }

        return new Date(params.year, params.month, params.day, params.hour, params.minute, params.second, params.millisecond);
    };

    devutility.date = date;

    /* date end */

    /* string */

    var string = {};

    string.contain = function (str, value) {
        return str.indexOf(value) > -1;
    };

    string.addPrefix = function (str, prefix, count) {
        if (!count) {
            count = 1;
        }

        var value = str;

        for (var i = 0; i < count; i++) {
            value = prefix + value;
        }

        return value;
    };

    devutility.string = string;

    /* string end */

    /* select */

    var select = {};

    select.setByText = function (select, text) {
        var optionCount = select.options.length;

        for (var i = 0; i < optionCount; i++) {
            if (text == select.options[i].text) {
                select.options[i].selected = true;
                break;
            }
        }
    };

    devutility.select = select;

    /* select end */

    window.devutility = devutility;
})(window, document);