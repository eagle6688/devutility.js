var selectedImage = null;
var $previewImg = $('#img-preview');
var $txt_original_width = $('#txt-original-width');
var $txt_original_height = $('#txt-original-height');

$('#file').change(function (e) {
    selectedImage = e.target.files[0];

    if (selectedImage) {
        $('#label-file').text(selectedImage.name);
        console.log('Size of selected image:', selectedImage.size);

        devutility.image.getObject(devutility.image.getUrl(selectedImage), function (img) {
            $txt_original_width.val(img.width);
            $txt_original_height.val(img.height);
        });
    } else {
        $('#label-file').text('');
    }
});

$('#btn-compress').click(function () {
    if (!selectedImage) {
        return;
    }

    var width = ~~$('#txt-width').val();

    new Compressor(selectedImage, {
        maxWidth: 4096,
        maxHeight: 4096,
        width: width,
        success(result) {
            $previewImg.attr('src', devutility.image.getUrl(result));
            console.log(result);
        },
        error(err) {
            console.log(err.message);
        }
    });
});