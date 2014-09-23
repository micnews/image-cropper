var test = require('tape')

  , resizeImage = require('../lib/resize-image')
  , image = require('./common').createTestImage(60, 80)

test('not resizing image', function (t) {
  resizeImage(image, 1, 60, 80)

  t.equal(image.style.left, '0px')
  t.equal(image.style.top, '0px')
  t.equal(image.width, 60)
  t.equal(image.height, 80)
  t.end()
})

test('make image larger', function (t) {
  resizeImage(image, 2, 60, 80)

  t.equal(image.style.left, '-30px')
  t.equal(image.style.top, '-40px')
  t.equal(image.width, 120)
  t.equal(image.height, 160)
  t.end()
})

test('make image smaller', function (t) {
  // reset image size
  image.width = 60
  image.height = 80

  // put image in the middle of this viewport
  image.style.left = '-20px'
  image.style.top = '-30px'

  resizeImage(image, 0.5, 20, 20)

  t.equal(image.style.left, '-5px')
  t.equal(image.style.top, '-10px')
  t.equal(image.width, 30)
  t.equal(image.height, 40)
  t.end()
})

test('try to make image to small', function (t) {
  // reset image size
  image.width = 60
  image.height = 80

  // put image in th middle of this viewport
  image.style.left = '-15px'
  image.style.top = '-40px'

  resizeImage(image, 0.000001, 30, 20)

  t.equal(image.style.left, '0px')
  t.equal(image.style.top, '-20px')
  t.end()
})