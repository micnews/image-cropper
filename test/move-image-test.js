var test = require('tape')
  , moveImage = require('../lib/move-image')

test('not moving image', function (t) {
  var image = new Image()
  image.width = 100
  image.height = 100

  moveImage(image, 0, 0, 50, 50)

  t.equal(image.style.left, '0px', 'should have correct image.style.left')
  t.equal(image.style.top, '0px', 'should have correct image.style.top')
  t.end()
})

test('moving it too much left', function (t) {
  var image = new Image()
  image.width = 100
  image.height = 100

  moveImage(image, -200, 0, 50, 50)

  t.equal(image.style.left, '-50px', 'should have correct image.style.left')
  t.equal(image.style.top, '0px', 'should have correct image.style.top')
  t.end()
})

test('moving it too much right', function (t) {
  var image = new Image()
  image.width = 100
  image.height = 100
  image.style.left = '-50px'

  moveImage(image, 200, 0, 50, 50)

  t.equal(image.style.left, '0px', 'should have correct image.style.left')
  t.equal(image.style.top, '0px', 'should have correct image.style.top')
  t.end()
})

test('moving it too much up', function (t) {
  var image = new Image()
  image.width = 100
  image.height = 100
  moveImage(image, 0, -200, 50, 50)

  t.equal(image.style.left, '0px', 'should have correct image.style.left')
  t.equal(image.style.top, '-50px', 'should have correct image.style.top')
  t.end()
})

test('moving it too much down', function (t) {
  var image = new Image()
  image.width = 100
  image.height = 100
  image.style.top = '-50px'

  moveImage(image, 0, 200, 50, 50)

  t.equal(image.style.left, '0px', 'should have correct image.style.left')
  t.equal(image.style.top, '0px', 'should have correct image.style.top')
  t.end()
})

test('moving it within reason', function (t) {
  var image = new Image()
  image.width = 100
  image.height = 100
  image.style.top = '-30px'
  image.style.left = '-30px'

  moveImage(image, 5, 10, 50, 50)

  t.equal(image.style.left, '-25px', 'should have correct image.style.left')
  t.equal(image.style.top, '-20px', 'should have correct image.style.top')
  t.end()
})