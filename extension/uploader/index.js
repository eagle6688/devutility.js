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

        if (confirm('The file has been uploaded completed!')) {
            progress.hideAll();
            progressBar.css('width', '0').attr('aria-valuenow', 0);
        }
    },
    failed: function (data) {
        console.log('Failed');
        console.log(data);
        progress.hideAll();
        progressBar.css('width', '0').attr('aria-valuenow', 0);
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

$('#btn-upload-slice').click(function () {
    var options = $.extend(true, {}, defaults, {
        url: $('#txt-url-upload-slice').val(),
        needSlice: true
    });

    var uploader = new Uploader(options);
    uploader.upload(document.getElementById('file-upload-slice').files);
});

$('#btn-upload-concurrent-slice').click(function () {
    var options = $.extend(true, {}, defaults, {
        url: $('#txt-url-upload-concurrent-slice').val(),
        concurrency: 3,
        needSlice: true
    });

    var uploader = new Uploader(options);
    uploader.upload(document.getElementById('file-upload-concurrent-slice').files);
});