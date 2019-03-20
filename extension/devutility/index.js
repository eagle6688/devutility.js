//url.addParam

$('#btn-url-addParam').click(function () {
    var url = $('#txt-url-addParam-url').val();
    var name = $('#txt-url-addParam-name').val();
    var value = $('#txt-url-addParam-value').val();
    alert(devutility.url.addParam(url, name, value));
});

//url.updateParam

$('#btn-url-updateParam').click(function () {
    var url = $('#txt-url-updateParam-url').val();
    var name = $('#txt-url-updateParam-name').val();
    var value = $('#txt-url-updateParam-value').val();
    alert(devutility.url.updateParam(url, name, value));
});

//url.getParam

$('#btn-url-getParam').click(function () {
    var url = $('#txt-url-getParam-url').val();
    var name = $('#txt-url-getParam-name').val();
    alert(devutility.url.getParam(url, name));
});

//url.removeParam

$('#btn-url-removeParam').click(function () {
    var url = $('#txt-url-removeParam-url').val();
    var name = $('#txt-url-removeParam-name').val();
    alert(devutility.url.removeParam(url, name));
});

//file.getSize

$('#btn-file-getSize').click(function () {
    var size = devutility.file.getSize('txt-file-getSize');
    var message = size + 'b, ' + devutility.file.convertSize(size, 'kb') + 'kb, ' + devutility.file.convertSize(size, 'mb') + 'mb';
    alert(message);
});

//file.getExtension

$('#btn-file-getExtension').click(function () {
    var value = $('#txt-file-getExtension').val();
    alert(devutility.file.getExtension(value));
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

//math.max

$('#btn-math-max').click(function () {
    var array = [1, 2, 9, 1, 5, 6, 8];
    alert(devutility.math.max(array));
});

//math.min

$('#btn-math-min').click(function () {
    var array = [1, 2, 9, 1, 5, 6, 8];
    alert(devutility.math.min(array));
});

//string.trim

$('#btn-string-trim').click(function () {
    var value = $('#txt-string-trim-value').val();
    var trimedValue = devutility.string.trim(value);
    console.log(trimedValue);
    alert(trimedValue);
});

//string.trimPrefix

$('#btn-string-trim-prefix').click(function () {
    var value = $('#txt-string-trim-prefix-value').val();
    var prefix = $('#txt-string-trim-prefix').val();
    alert(devutility.string.trimPrefix(value, prefix));
});

//cookie.save

$('#btn-cookie-save').click(function () {
    var name = $('#txt-cookie-save-name').val();
    var value = $('#txt-cookie-save-value').val();
    var expires = ~~$('#txt-cookie-save-expires').val();
    var domain = $('#txt-cookie-save-domain').val();
    var path = $('#txt-cookie-save-path').val();
    devutility.cookie.save(name, value, expires, domain, path);
    console.log('OK!');
});

//cookie.get

$('#btn-cookie-get').click(function () {
    var name = $('#txt-cookie-get-name').val();
    alert(devutility.cookie.get(name));
});

//cookie.del

$('#btn-cookie-del').click(function () {
    var name = $('#txt-cookie-get-name').val();
    devutility.cookie.del(name);
});

//image.getSize

$('#btn-image-getSize').click(function () {
    var input = document.getElementById('txt-image-getSize');
    console.log(input.files[0]);
    console.log(input.value);

    var windowURL = window.URL || window.webkitURL;
    var src = windowURL.createObjectURL(input.files[0]);
    console.log(src);

    devutility.image.getObject(src, function (img) {
        console.log(img);
        alert('height: ' + img.height + ', width: ' + img.width);
    });
});

$('#btn-src-image-getSize').click(function () {
    var src = $('#txt-src-image-getSize').val();

    devutility.image.getObject(src, function (img) {
        console.log(img);
        alert('height: ' + img.height + ', width: ' + img.width);
    });
});

//checkbox.checkAll

$('#btn-checkbox-check-all').click(function () {
    devutility.checkbox.checkAll('cb-devutility', true);
});

$('#btn-checkbox-check-none').click(function () {
    devutility.checkbox.checkAll('cb-devutility', false);
});