var test = require('tape')
  , resultImage = require('../lib/result-image')
  , common = require('./common')

test('basic', function (t) {
  var imageSrc = common.createTestImageSrc(100, 100)
    , image = resultImage({ src: imageSrc })

  t.equal(image.src, imageSrc, 'should have correct image src')
  t.equal(image.style.position, 'absolute')
  t.equal(image.style.top, '0px')
  t.equal(image.style.left, '0px')
  t.equal(image.style.opacity, '1')
  t.equal(image.width, 100)
  t.equal(image.height, 100)
  t.end()
})

test('custom width', function (t) {
  var imageSrc = common.createTestImageSrc(100, 100)
    , image = resultImage({ src: imageSrc, width: 120, height: 120 })

  t.equal(image.width, 120)
  t.equal(image.height, 120)
  t.end()
})
