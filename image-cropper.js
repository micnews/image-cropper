var dom = require('dom-events')

  , draggable = require('./lib/draggable')
  , loadImages = require('./lib/load-images')
  , moveImage = require('./lib/move-image')
  , navigation = require('./lib/navigation')
  , resetZoom = require('./lib/reset-zoom')
  , setupElements = require('./lib/setup-elements')

  , init = function (containerElm, options, callback) {
      var navigationElm = document.createElement('div')
        , croppedImage = new Image()
        , overlayImage = new Image()
        , images = [ croppedImage, overlayImage ]
        , width = options.width
        , height = options.height
        , maxZoom = options.maxZoom || 3
        , enabled = false
        , results = {
              enable: function () {
                enabled = true
                croppedImage.style.cursor = 'move'
                overlayImage.style.opacity = '0.5'
                overlayImage.style['z-index'] = ''
              }
            , disable: function () {
                enabled = false
                croppedImage.style.cursor = ''
                overlayImage.style.opacity = '0'
                overlayImage.style['z-index'] = '-1000'
              }
          }

      draggable(overlayImage, function (event) {
        images.forEach(function (image) {
          if (enabled)
            moveImage(
                image
              , event.movementX
              , event.movementY
              , options.width
              , options.height
            )
        })
      })

      setupElements({
          containerElm: containerElm
        , croppedImage: croppedImage
        , overlayImage: overlayImage
        , navigation: navigationElm
        , width: width
        , height: height
      })

      loadImages(images, options.src, function (err) {
        if (err) return callback(err)

        images.forEach(function (image) { resetZoom(image, width, height) })

        navigation({
            container: navigationElm
          , scaleFactor: croppedImage.width / croppedImage.naturalWidth
          , maxZoom: maxZoom
          , images: images
          , width: width
          , height: height
        })

        results.disable()

        callback(null, results)
      })
    }

module.exports = init
