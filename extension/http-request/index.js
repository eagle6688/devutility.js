var options = {
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
    options.url = $('#txt-url').val();
    var httpRequest = new HttpRequest(options);
    httpRequest.request();
});

$('#btn-concurrency-get').click(function () {
    var count = 0;
    options.url = $('#txt-concurrency-url').val();
    options.progress = null;

    options.complete = function (data) {
        console.log(++count);
    };

    var httpRequestA = new HttpRequest(options);
    var httpRequestB = new HttpRequest(options);
    var httpRequestC = new HttpRequest(options);

    httpRequestA.request();
    httpRequestB.request();
    httpRequestC.request();

    httpRequestA = new HttpRequest($.extend(true, {}, options, {
        complete: function (data) {
            console.log('I am A');
            console.log(++count);
        }
    }));

    httpRequestB = new HttpRequest($.extend(true, {}, options, {
        complete: function (data) {
            console.log('I am B');
            console.log(++count);
        }
    }));

    httpRequestC = new HttpRequest($.extend(true, {}, options, {
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
    options.url = '/upload';
    options.method = 'POST';
    options.dataType = 'text';
    var httpRequest = new HttpRequest(options);
    httpRequest.request(new FormData(document.getElementById('form-upload')));
});