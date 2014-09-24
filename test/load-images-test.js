var test = require('tape')
  , createTestImage = require('./common').createTestImage

  , loadImages = require('../lib/load-images')

  , testImageSrc = createTestImage(100, 100).src

test('basic', function (t) {
  var images = [ new Image(), new Image() ]

  loadImages(images, testImageSrc, function () {
    t.equal(images[0].src, testImageSrc)
    t.equal(images[1].src, testImageSrc)
    t.end()
  })

})

test('load-images is always async', function (t) {
  var isAsync = false
    , images = [ new Image() ]

  loadImages(images, testImageSrc, function () {
    t.ok(isAsync)
    t.end()
  })
  isAsync = true
})