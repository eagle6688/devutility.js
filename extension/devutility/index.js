//file.getSize

$('#btn-file-getSize').click(function () {
    var size = devutility.file.getSize('txt-file-getSize');
    var message = size + 'b, ' + devutility.file.convertSize(size, 'kb') + 'kb, ' + devutility.file.convertSize(size, 'mb') + 'mb';
    alert(message);
});

//date.test

$('#btn-date-test-input').click(function () {
    var value = $('#txt-date-test-value').val();
    var regExp = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    alert(devutility.date.test(regExp, value));
});

$('#btn-date-test-date').click(function () {
    var date = new Date();
    var regExp = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    alert(devutility.date.test(regExp, date));
});

//date.format

$('#btn-date-format').click(function () {
    var date = new Date();
    var format = $('#txt-date-format-format').val();
    var value = devutility.date.format(format, date);
    alert(value);
});

$('#btn-date-format1').click(function () {
    var date = new Date(2019, 8, 9);
    var format = $('#txt-date-format-format1').val();
    var value = devutility.date.format(format, date);
    alert(value);
});

//date.parse

$('#btn-date-parse').click(function () {
    var format = $('#txt-date-parse-format').val();
    var value = $('#txt-date-parse-value').val();
    var date = devutility.date.parse(format, value);
    alert(date.toString());
});

//string.trimPrefix

$('#btn-string-trim-prefix').click(function () {
    var value = $('#txt-string-trim-prefix-value').val();
    var prefix = $('#txt-string-trim-prefix').val();
    alert(devutility.string.trimPrefix(value, prefix));
});