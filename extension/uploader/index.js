var options = {
    progress: function (data) {
        console.log(data);
    },
    complete: function (data) {
        console.log(data);
    },
    failed: function (data) {
        console.log(data);
    }
};

$('#btn-upload').click(function () {
    options.url = $('#txt-url').val();
    var uploader = new Uploader(options);
    uploader.upload(document.getElementById('file').files);
});