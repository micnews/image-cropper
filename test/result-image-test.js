var test = require('tape')
  , resultImage = require('../lib/result-image')
  , common = require('./common')

test('basic', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(100, 100)
    , image = resultImage({ src: imageSrc, container: container })

  t.equal(image.src, imageSrc, 'should have correct image src')
  t.equal(image.style.position, 'absolute')
  t.equal(image.style.top, '0px')
  t.equal(image.style.left, '0px')
  t.equal(image.style.opacity, '1')
  t.equal(image.width, 100)
  t.equal(image.height, 100)
  t.ok(image.classList.contains('result-image'), 'should have correct class')
  t.equal(container.querySelector('img.result-image'), image, 'image is added to container')

  t.end()
})

test('custom width & height', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(100, 100)
    , image = resultImage({ src: imageSrc, width: 120, height: 120, container: container })

  t.equal(image.width, 120)
  t.equal(image.height, 120)
  t.end()
})

test('reuse existing image element', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(100, 100)
    , expectedImage = (function () {
        var image = new Image()

        image.classList.add('result-image')
        image.classList.add('beep-boop')

        container.appendChild(image)

        return image
      })()
    , actualImage = resultImage({ src: imageSrc, container: container })

  t.equal(actualImage.nodeName, 'IMG', 'should return image')
  t.equal(actualImage, expectedImage, 'should reuse existing image')
  t.end()
})
