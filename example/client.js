var dom = require('dom-events')

  , imageCropper = require('../image-cropper.js')

dom.on(window, 'load', function() {
  var containerElm1 = document.querySelector('#image1 .image-cropper-container')

  imageCropper(containerElm1, { width: 100, height: 80, src: 'image.jpg' }, function (err, cropper) {

    dom.on(document.querySelector('#image1 .enable'), 'click', function () {
      cropper.enable()
    })

    dom.on(document.querySelector('#image1 .disable'), 'click', function () {
      cropper.disable()
    })

  })

  var containerElm2 = document.querySelector('#image2 .image-cropper-container')

  imageCropper(containerElm2, { width: 80, height: 100, src: 'image.jpg' }, function (err, cropper) {

    dom.on(document.querySelector('#image2 .enable'), 'click', function () {
      cropper.enable()
    })

    dom.on(document.querySelector('#image2 .disable'), 'click', function () {
      cropper.disable()
    })

  })

  var containerElm3 = document.querySelector('#image3 .image-cropper-container')

  imageCropper(containerElm3, { width: 500, height: 268, src: 'image.jpg' }, function (err, cropper) {

    dom.on(document.querySelector('#image3 .enable'), 'click', function () {
      cropper.enable(function () {
        console.log('finished cropping - cropper is now disabled')
        console.log(JSON.stringify(cropper.getCroppingData()))
      })
    })

    dom.on(document.querySelector('#image3 .disable'), 'click', function () {
      cropper.disable()
    })

  })

})