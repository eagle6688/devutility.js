var defaults = {
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

var progress = new Popuper({
    selector: '.progress'
});

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