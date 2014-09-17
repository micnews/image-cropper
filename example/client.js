var dom = require('dom-events')

  , imageCropper = require('../image-cropper.js')


dom.on(window, 'load', function() {
  var image = image = document.querySelector('#image')

  imageCropper(image, { width: 100, height: 100 }, function (err, cropper) {
    cropper.enable()
  })
})