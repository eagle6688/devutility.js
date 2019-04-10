var image = document.getElementById('img');

var cropper = new Cropper(image, {
    viewMode: 1,
    responsive: false,
    aspectRatio: 1 / 1,
    preview: '.preview',
    ready: function (e) {
        console.log(e.type);
    },
    cropstart: function (e) {
        console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
        console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
        console.log(e.type, e.detail.action);
    },
    crop: function (e) {
        var data = e.detail;
        console.log(e.type);
        // dataX.value = Math.round(data.x);
        // dataY.value = Math.round(data.y);
        // dataHeight.value = Math.round(data.height);
        // dataWidth.value = Math.round(data.width);
        // dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
        // dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
        // dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
    },
    zoom: function (e) {
        console.log(e.type, e.detail.ratio);
    }
});

var $modal = $('#div-modal');

$('#file').change(function (event) {
    var file = event.target.files[0];
    $('label[for="file"]').text(file.name);
    var url = devutility.image.getUrl(file);
    image.src = url;
    cropper.replace(url).crop();
});

$('#btn-getCroppedCanvas').click(function () {
    var options = {
        width: ~~$('#txt-width').val(),
        height: ~~$('#txt-height').val(),
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff'
    };

    var result = cropper.getCroppedCanvas(options);
    var dataUrl = result.toDataURL();

    $('#div-modal').find('.modal-body').html(result);
    $('#div-modal').modal('show');
    $('#a-download').attr('href', dataUrl);

    console.log(Object.prototype.toString.call(result));
    console.log(dataUrl);
});