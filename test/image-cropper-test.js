// these are tests invovling the main image-cropper module, so it'll mainly be tests
// where some of the other modules are interacting with each other
// if there's too many tests here that's a sign that the module isn't modular enough

var dom = require('dom-events')
  , test = require('tape')

  , common = require('./common')

  , imageCropper = require('../image-cropper')

test('cancel should reset zoom-slider position', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)

  document.body.appendChild(container)

  imageCropper(container, { src: imageSrc, width: 100, height: 100 }, function (err, cropper) {
    if (err) return t.end(err)

    var slider = container.querySelector('.slider')
      , handle = slider.querySelector('.handle')
      , line = slider.querySelector('.line')
      , cancelBtn = container.querySelector('.navigation .cancel')

    cropper.enable(function (err) {
      if (err) return t.end(err)

      t.equal(handle.style.left, '0px')

      t.end()
    })

    // this should zoom in
    dom.emit(line, 'click', { clientX: 85, clientY: 15, bubbles: true })
    dom.emit(cancelBtn, 'click', { bubbles: true })
  })

})