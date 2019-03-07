$('#btn-date-format').click(function () {
    var date = new Date();
    var format = $('#txt-date-format-format').val();
    var value = devutility.date.format(date, format);
    alert(value);
});

$('#btn-date-format1').click(function () {
    var date = new Date(2019, 8, 9);
    var format = $('#txt-date-format-format1').val();
    var value = devutility.date.format(date, format);
    alert(value);
});

$('#btn-date-parse').click(function () {
    var format = $('#txt-date-parse-format').val();
    var value = $('#txt-date-parse-value').val();
    var date = devutility.date.parse(value, format);
    alert(date.toString());
});