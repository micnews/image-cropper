var dom = require('dom-events')

  , imageCropper = require('../image-cropper.js')

dom.on(window, 'load', function() {
  var containerElm = document.querySelector('#image .image-cropper-container')

  imageCropper(containerElm, { width: 500, height: 268, src: 'image.jpg' }, function (err, cropper) {

    dom.on(document.querySelector('#image .enable'), 'click', function () {
      cropper.enable(function (err, results) {
        console.log('finished cropping - cropper is now disabled')
        console.log(JSON.stringify(cropper.getCropData()))
        console.log('some results' + JSON.stringify(results))
      })
    })

    dom.on(document.querySelector('#image .change'), 'click', function () {
      cropper.setImage({ src: 'image2.jpg' }, function () {})
    })

  })

})

dom.on(window, 'load', function() {
  var containerElm = document.querySelector('#image2 .image-cropper-container')

  imageCropper(containerElm, { width: 500, height: 268, src: 'image.jpg', resultSrc: 'image2.jpg', overlay: true }, function (err, cropper) {

    dom.on(document.querySelector('#image2 .enable'), 'click', function () {
      cropper.enable(function (err, results) {
        console.log('finished cropping - cropper is now disabled')
        console.log(JSON.stringify(cropper.getCropData()))
        console.log('some results' + JSON.stringify(results))
      })
    })

  })

})