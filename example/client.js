var dom = require('dom-events')

  , imageCropper = require('../image-cropper.js')

dom.on(window, 'load', function() {
  var image1 = document.querySelector('#image1 .image')

  imageCropper(image1, { width: 100, height: 80 }, function (err, cropper) {

    dom.on(document.querySelector('#image1 .zoom-in'), 'click', function () {
      cropper.zoomIn()
    })

    dom.on(document.querySelector('#image1 .zoom-out'), 'click', function () {
      cropper.zoomOut()
    })

    dom.on(document.querySelector('#image1 .enable'), 'click', function () {
      cropper.enable()
    })

    dom.on(document.querySelector('#image1 .disable'), 'click', function () {
      cropper.disable()
    })

  })

  var image2 = document.querySelector('#image2 .image')

  imageCropper(image2, { width: 80, height: 100 }, function (err, cropper) {

    dom.on(document.querySelector('#image2 .zoom-in'), 'click', function () {
      cropper.zoomIn()
    })

    dom.on(document.querySelector('#image2 .zoom-out'), 'click', function () {
      cropper.zoomOut()
    })

    dom.on(document.querySelector('#image2 .enable'), 'click', function () {
      cropper.enable()
    })

    dom.on(document.querySelector('#image2 .disable'), 'click', function () {
      cropper.disable()
    })

  })

})