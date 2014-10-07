var test = require('tape')

  , setImage = require('../lib/set-image')

  , common = require('./common')

test('setImage should load images & center', function (t) {
  var images = [ new Image(), new Image(), new Image() ]
    , src = common.createTestImageSrc(100, 100)

  setImage({ images: images, src: src, width: 40, height: 50 }, function (err) {
    if (err) return t.end(err)

    images.forEach(function (image) {
      t.equal(image.src, src)
      t.equal(image.style.left, '-5px')
      t.equal(image.style.top, '0px')
      t.equal(image.width, 50)
      t.equal(image.height, 50)
    })

    t.end()
  })

})

test('setImage with cropData', function (t) {
  var images = [ new Image(), new Image() ]
    , src = common.createTestImageSrc(100, 100)
    , cropData = {
          left: 10
        , top: 10
        , width: 200
        , height: 250
      }

  setImage({ images: images, src: src, width: 40, height: 50, cropData: cropData }, function (err) {
    if (err) return t.end(err)

    images.forEach(function (image) {
      t.equal(image.src, src)

      t.equal(image.style.left, '-20px')
      t.equal(image.style.top, '-20px')
      t.equal(image.width, 200)
      t.equal(image.height, 250)
    })

    t.end()
  })
})