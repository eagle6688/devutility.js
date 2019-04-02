var progress = new Popuper({
    selector: '.progress'
});

var progressBar = $('.progress-bar');

var defaults = {
    start: function (data) {
        console.log(data);
        progress.showAll();
    },
    progress: function (data) {
        console.log(data);
        progressBar.css('width', data.percentage + '%').attr('aria-valuenow', data.percentage);
    },
    complete: function (data) {
        console.log(data);
        progress.hideAll();
    },
    failed: function (data) {
        console.log(data);
    }
};

$('#btn-upload').click(function () {
    var options = $.extend(true, {}, defaults, {
        url: $('#txt-url').val()
    });

    var files = document.getElementById('file').files;
    console.log(files.length);
    console.log(files[0].size);

    var uploader = new Uploader(options);
    uploader.upload(files);
});