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
      , saveBtn = container.querySelector('.navigation .save')

    cropper.enable(function (err) {
      if (err) return t.end(err)

      // assure the handle is restored to the original style.left value
      t.equal(handle.style.left, '0px')

      // enable the cropper, move handle and save
      cropper.enable(function (err) {
        if (err) return t.end(err)

        var handleLeft = handle.style.left

        // then enable the cropper, move handle and cancel
        cropper.enable(function (err) {
          if (err) return t.end(err)

          // should restore to the previously saved value
          t.equal(handle.style.left, handleLeft, 'should restore handleLeft correctly')
          t.end()

        })

        dom.emit(line, 'click', { clientX: 0, clientY: 15, bubbles: true})
        dom.emit(cancelBtn, 'click', { bubbles: true })
      })

      dom.emit(line, 'click', { clientX: 85, clientY: 15, bubbles: true })
      dom.emit(saveBtn, 'click', { bubbles: true })
    })

    // this should zoom in
    dom.emit(line, 'click', { clientX: 85, clientY: 15, bubbles: true })
    dom.emit(cancelBtn, 'click', { bubbles: true })
  })

})

test('can start zoomed in/moved with input from getCropData', function (t) {
  var container = document.createElement('div')
    , container2 = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)

  document.body.appendChild(container)

  imageCropper(container, { src: imageSrc, width: 100, height: 100 }, function (err, cropper) {

    var line = container.querySelector('.navigation .slider .line')
      , saveBtn = container.querySelector('.navigation .save')
      , overlayImage = container.querySelector('.overlay')

    cropper.enable(function () {
      var cropData = cropper.getCropData()

      imageCropper(container2, { src: imageSrc, width: 100, height: 100, cropData: cropData }, function (err, cropper2) {
        t.deepEqual(cropper2.getCropData(), cropper.getCropData())
        t.end()
      })

    })

    // zoom in
    dom.emit(line, 'click', { clientX: 80, clientY: 15, bubbles: true })

    // save it
    dom.emit(saveBtn, 'click', { bubbles: true })
  })
})

test('result image', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)
    , resultSrc = common.createTestImageSrc(100, 100)
    , options = { src: imageSrc, width: 100, height: 100, resultSrc: resultSrc }

  document.body.appendChild(container)

  imageCropper(container, options, function (err, cropper) {

    var resultImage = container.querySelector('img.result-image')
    t.ok(resultImage, 'should have a result image')

    if (!resultImage) return t.end()

    t.equal(resultImage.style.opacity, '1', 'should be visible when cropper is disabled')

    cropper.enable(function () {
      t.equal(resultImage.style.opacity, '1', 'should be visible when cropper is disabled')
      t.end()
    })

    t.equal(resultImage.style.opacity, '0', 'should be hidden when cropper is enabled')

    dom.emit(container.querySelector('.navigation .save'), 'click')
  })
})

test('cropper.setResultImage', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)
    , resultSrc = common.createTestImageSrc(100, 100)
    , resultSrc2 = common.createTestImageSrc(100, 100, '#ff0000')
    , options = { src: imageSrc, width: 100, height: 100, resultSrc: resultSrc }

  document.body.appendChild(container)

  imageCropper(container, options, function (err, cropper) {
    cropper.enable(function () {
      cropper.setResultImage({ src: resultSrc2 })
      t.equal(container.querySelector('.result-image').src, resultSrc2)
      t.end()
    })

    dom.emit(container.querySelector('.navigation .save'), 'click')
  })
})

test('result image with not result image in options', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)
    , resultSrc = common.createTestImageSrc(100, 100)
    , options = { src: imageSrc, width: 100, height: 100 }

  document.body.appendChild(container)

  imageCropper(container, options, function (err, cropper) {
    cropper.setResultImage({ src: resultSrc })

    var resultImage = container.querySelector('img.result-image')
    t.ok(resultImage, 'should have a result image')

    if (!resultImage) return t.end()

    t.equal(resultImage.style.opacity, '1', 'should be visible when cropper is disabled')

    cropper.enable(function () {
      t.equal(resultImage.style.opacity, '1', 'should be visible when cropper is disabled')
      t.end()
    })

    t.equal(resultImage.style.opacity, '0', 'should be hidden when cropper is enabled')

    dom.emit(container.querySelector('.navigation .save'), 'click')
  })
})

test('result image whose width/height is different than the viewport', function (t) {
  var container = document.createElement('div')
    , container2 = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)
    , resultSrc = common.createTestImageSrc(120, 160)
    , options = { src: imageSrc, width: 60, height: 80, resultSrc: resultSrc }
    , options2 = { src: imageSrc, width: 60, height: 80}

  document.body.appendChild(container)

  imageCropper(container, options, function (err, cropper) {
    var resultImage = container.querySelector('img.result-image')

    t.equal(resultImage.width, 60)
    t.equal(resultImage.height, 80)

    imageCropper(container2, options2, function (err, cropper2) {
      cropper2.setResultImage({ src: resultSrc })
      var resultImage2 = container2.querySelector('img.result-image')      

      t.equal(resultImage2.width, 60)
      t.equal(resultImage2.height, 80)

      t.end()
    })
  })
})

test('imageCropper.setImage reset zoom slider-position', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)
    , imageSrc2 = common.createTestImageSrc(200, 200, '#ff0000')

  document.body.appendChild(container)

  imageCropper(container, { src: imageSrc, width: 100, height: 100 }, function (err, cropper) {
    if (err) return t.end(err)

    var slider = container.querySelector('.slider')
      , handle = slider.querySelector('.handle')
      , line = slider.querySelector('.line')
      , saveBtn = container.querySelector('.navigation .save')

    cropper.enable(function (err) {
      if (err) return t.end(err)

      // then enable the cropper, move handle and cancel
      cropper.changeImage({ src: imageSrc2 }, function (err) {
        if (err) return t.end(err)

        // should restore to the previously saved value
        t.equal(handle.style.left, '0px', 'should restore handleLeft correctly')
        t.end()
      })
    })

    // this should zoom in
    dom.emit(line, 'click', { clientX: 85, clientY: 15, bubbles: true })
    dom.emit(saveBtn, 'click', { bubbles: true })
  })
})


test('imageCropper.changeImage', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)
    , imageSrc2 = common.createTestImageSrc(200, 200, '#ff0000')

  document.body.appendChild(container)

  imageCropper(container, { src: imageSrc, width: 100, height: 100 }, function (err, cropper) {
    if (err) return t.end(err)

      cropper.changeImage({ src: imageSrc2 }, function (err) {
        if (err) return t.end(err)

        // Should have loaded the new image
        t.equal(container.querySelector('img').src, imageSrc2)
        t.end()
      })
  })
})

test('imageCropper.changeImage and resize', function (t) {
  var container = document.createElement('div')
    , imageSrc = common.createTestImageSrc(200, 200)
    , imageSrc2 = common.createTestImageSrc(400, 400, '#ffaa33')

  document.body.appendChild(container)

  imageCropper(container, { src: imageSrc, width: 100, height: 100 }, function (err, cropper) {
    if (err) return t.end(err)

    var slider = container.querySelector('.slider')
      , handle = slider.querySelector('.handle')
      , line = slider.querySelector('.line')
      , saveBtn = container.querySelector('.navigation .save')
      , image = container.querySelector('img')
      , zoomIn = function () {
          dom.emit(line, 'click', { clientX: 180, clientY: 15, bubbles: true })
          dom.emit(saveBtn, 'click', { bubbles: true })
        }

    cropper.enable(function (err, data) {
      if (err) return t.end(err)

      var imageWidthAfterResize = image.width;

      cropper.changeImage({ src: imageSrc2 }, function (err) {
        if (err) return t.end(err)

        cropper.enable(function (err, data) {
          t.equal(imageWidthAfterResize, image.width)
          t.end()
        })

        zoomIn()
      })

    })

    zoomIn()
  })
})

