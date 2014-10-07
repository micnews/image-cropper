var test = require('tape')

  , createTestImage = require('./common').createTestImage

  , imageCropper = require('../image-cropper')

test('initialization', function (t) {
  var image = createTestImage(100, 100)
    , container = document.createElement('div')

  container.setAttribute('class', 'beep-boop')

  imageCropper(container, { src: image.src, width: 50, height: 60 }, function (err, cropper) {
    var images = container.querySelectorAll('img')

    t.equal(images.length, 1, 'container should have 1 image')
    for(var i = 0; i < images.length; ++i) {
      t.equal(images[i].style.opacity, '', 'should have no opacity value')
    }
    t.end()
  })


  var images = container.querySelectorAll('img')

  t.equal(images.length, 1, 'container should have 1 image')
  for(var i = 0; i < images.length; ++i) {
    t.equal(images[i].style.opacity, '0', 'should be hidden')
  }

  t.equal(container.style.width, '50px')
  t.equal(container.style.height, '60px')
  t.equal(container.style.position, 'relative')
})

test('initialization', function (t) {
  var image = createTestImage(100, 100)
    , container = document.createElement('div')
    , options = { src: image.src, width: 50, height: 60, overlay: true }

  container.setAttribute('class', 'beep-boop')

  imageCropper(container, options, function (err, cropper) {
    var images = container.querySelectorAll('img')

    t.equal(images.length, 2, 'container should have 2 images')
    for(var i = 0; i < images.length; ++i) {
      t.equal(images[i].style.opacity, '', 'should have no opacity value')
    }
    t.end()
  })


  var images = container.querySelectorAll('img')

  t.equal(images.length, 2, 'container should have 2 images')
  for(var i = 0; i < images.length; ++i) {
    t.equal(images[i].style.opacity, '0', 'should be hidden')
  }

  t.equal(container.style.width, '50px')
  t.equal(container.style.height, '60px')
  t.equal(container.style.position, 'relative')
});