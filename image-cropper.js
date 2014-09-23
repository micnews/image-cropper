var dom = require('dom-events')

  , draggable = require('./lib/draggable')
  , ensureElement = require('./lib/ensure-element')
  , getCroppingData = require('./lib/get-cropping-data')
  , loadImages = require('./lib/load-images')
  , moveImage = require('./lib/move-image')
  , navigation = require('./lib/navigation')
  , resetZoom = require('./lib/reset-zoom')
  , setupElements = require('./lib/setup-elements')

  , init = function (containerElm, options, callback) {
      var navigationElm = ensureElement({ container: containerElm, className: 'navigation' })
        , croppedImage = new Image()
        , overlayImage = new Image()
        , images = [ croppedImage, overlayImage ]
        , width = options.width
        , height = options.height
        , maxZoom = options.maxZoom || 3
        , enabled = false
          // need to save these for the cancel-button to work properly
        , originalImageProperties = {
              width: croppedImage.width
            , height: croppedImage.height
            , top: croppedImage.style.top
            , left: croppedImage.style.left
          }
        , enable = function (options) {
            var callback = options.callback || function () {}

            enabled = true
            croppedImage.style.cursor = 'move'
            overlayImage.style.opacity = '0.5'
            overlayImage.style['z-index'] = ''
            navigationElm.style.opacity = '1'
            navigationElm.style['z-index'] = ''

            originalImageProperties = {
                width: croppedImage.width
              , height: croppedImage.height
              , top: croppedImage.style.top
              , left: croppedImage.style.left
            }

            options.navigation.enable(function (err, data) {
              if (err) return callback(err)

              if (data && !data.save) {
                images.forEach(function (image) {
                  image.width = originalImageProperties.width
                  image.height = originalImageProperties.height
                  image.style.top = originalImageProperties.top
                  image.style.left = originalImageProperties.left
                })
              }

              disable()
              callback(null, data)
            })
          }
        , disable = function () {
            enabled = false
            croppedImage.style.cursor = ''
            overlayImage.style.opacity = '0'
            overlayImage.style['z-index'] = '-1000'
            navigationElm.style.opacity = '0'
            navigationElm.style['z-index'] = '-1000'
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

        var nav = navigation({
                container: navigationElm
              , scaleFactor: croppedImage.width / croppedImage.naturalWidth
              , maxZoom: maxZoom
              , images: images
              , width: width
              , height: height
            })
          , results = {
              enable: function (callback) {
                enable({ navigation: nav, callback: callback })
              }

            , getCroppingData: function () {
                return getCroppingData({ image: croppedImage, container: containerElm })
              }
          }

        disable()

        callback(null, results)
      })
    }

module.exports = init
