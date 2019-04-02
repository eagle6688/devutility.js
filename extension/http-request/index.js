var defaults = {
    progress: function (data) {
        console.log(data);
    },
    complete: function (data) {
        console.log(data);
    },
    failed: function (data) {
        console.log(data);
    },
    abort: function (data) {
        console.log(data);
    },
    upload: {
        progress: function (data) {
            console.log(data);
        },
        complete: function (data) {
            console.log(data);
        },
        failed: function (data) {
            console.log(data);
        },
        abort: function (data) {
            console.log(data);
        }
    }
};

$('#btn-get').click(function () {
    var options = $.extend(true, {}, defaults, {
        url: $('#txt-url').val()
    });

    var httpRequest = new HttpRequest(options);
    httpRequest.request();
});

$('#btn-concurrency-get').click(function () {
    var count = 0;
    var url = $('#txt-concurrency-url').val();

    var options = $.extend(true, {}, defaults, {
        url: url,
        progress: null,
        complete: function (data) {
            console.log(++count);
        }
    });

    var httpRequestA = new HttpRequest(options);
    var httpRequestB = new HttpRequest(options);
    var httpRequestC = new HttpRequest(options);

    httpRequestA.request();
    httpRequestB.request();
    httpRequestC.request();

    httpRequestA = new HttpRequest($.extend(true, {}, defaults, {
        url: url,
        progress: null,
        complete: function (data) {
            console.log('I am A');
            console.log(++count);
        }
    }));

    httpRequestB = new HttpRequest($.extend(true, {}, defaults, {
        url: url,
        progress: null,
        complete: function (data) {
            console.log('I am B');
            console.log(++count);
        }
    }));

    httpRequestC = new HttpRequest($.extend(true, {}, defaults, {
        url: url,
        progress: null,
        complete: function (data) {
            console.log('I am C');
            console.log(++count);
        }
    }));

    httpRequestA.request();
    httpRequestB.request();
    httpRequestC.request();
});

$('#btn-upload').click(function () {
    var options = $.extend(true, {}, defaults, {
        url: $('#txt-upload-url').val(),
        method: 'POST',
        dataType: 'json'
    });

    var httpRequest = new HttpRequest(options);
    httpRequest.request(new FormData(document.getElementById('form-upload')));
});

$('#btn-upload-without-response').click(function () {
    var options = $.extend(true, {}, defaults, {
        url: $('#txt-upload-without-response-url').val(),
        method: 'POST',
        timeout: ~~$('#txt-upload-without-response-timeout').val()
    });

    var httpRequest = new HttpRequest(options);
    httpRequest.request(new FormData(document.getElementById('form-upload-without-response')));
});