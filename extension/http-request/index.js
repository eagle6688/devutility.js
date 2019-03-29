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

    options.complete = function (data) {
        console.log(data);
        console.log(++count);
    };

    var httpRequestA = new HttpRequest(options);
    var httpRequestB = new HttpRequest(options);
    var httpRequestC = new HttpRequest(options);

    httpRequestA.request();
    httpRequestB.request();
    httpRequestC.request();

    httpRequestA = new HttpRequest($.extend(true, {}, options, {
        progress: null,
        complete: function (data) {
            console.log('I am A');
            count++;
            console.log(count);
        }
    }));

    httpRequestB = new HttpRequest($.extend(true, {}, options, {
        progress: null,
        complete: function (data) {
            console.log('I am B');
            count++;
            console.log(count);
        }
    }));

    httpRequestC = new HttpRequest($.extend(true, {}, options, {
        progress: null,
        complete: function (data) {
            console.log('I am C');
            count++;
            console.log(count);
        }
    }));

    httpRequestA.request();
    httpRequestB.request();
    httpRequestC.request();
});