var test = require('tape')

  , resetZoom = require('../lib/reset-zoom')

  , createTestImage = require('./common').createTestImage

test('image.{naturalWidth, naturalHeight} same size as area', function (t) {
  var image = createTestImage(60, 80)

  image.width = 200
  image.height = 200

  resetZoom(image, 60, 80)

  t.equal(image.style.left, '0px')
  t.equal(image.style.top, '0px')
  t.equal(image.width, 60)
  t.equal(image.height, 80)
  t.end()
})

test('image smaller than area', function (t) {
  var image = createTestImage(60, 80)

  resetZoom(image, 120, 100)

  t.equal(image.style.left, '0px')
  t.equal(image.style.top, '-30px')
  t.equal(image.width, 120)
  t.equal(image.height, 160)

  resetZoom(image, 100, 160)

  t.equal(image.style.left, '-10px')
  t.equal(image.style.top, '0px')
  t.equal(image.width, 120)
  t.equal(image.height, 160)

  t.end()
})

test('image larger than area', function (t) {
  var image = createTestImage(60, 80)

  // half the size the original image
  resetZoom(image, 30, 40)

  t.equal(image.style.left, '0px')
  t.equal(image.style.top, '0px')
  t.equal(image.width, 30)
  t.equal(image.height, 40)

  resetZoom(image, 20, 40)

  t.equal(image.style.left, '-5px')
  t.equal(image.style.top, '0px')
  t.equal(image.width, 30)
  t.equal(image.height, 40)

  resetZoom(image, 30, 30)

  t.equal(image.style.left, '0px')
  t.equal(image.style.top, '-5px')
  t.equal(image.width, 30)
  t.equal(image.height, 40)

  t.end()
})

test('avoid rounding error', function (t) {
  var image = createTestImage(140, 140)

  resetZoom(image, 500, 268)

  t.equal(image.style.left, '0px')
  t.equal(image.style.top, '-116px')
  t.equal(image.width, 500)
  t.equal(image.height, 500)

  t.end()
})