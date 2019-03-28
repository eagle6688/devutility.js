var options = {
    withCredentials: true,
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