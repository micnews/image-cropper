var dom = require('dom-events')

  , makeDraggable = require('./lib/draggable')
  , ensureElement = require('./lib/ensure-element')
  , getCropData = require('./lib/get-crop-data')
  , moveImage = require('./lib/move-image')
  , navigation = require('./lib/navigation')
  , setImage = require('./lib/set-image')
  , setupElements = require('./lib/setup-elements')
  , setupResultImage = require('./lib/result-image')

  , init = function (containerElm, options, callback) {
      var navigationElm = ensureElement({ container: containerElm, className: 'navigation' })
        , croppedImage = new Image()
        , overlayImage = options.overlay ? new Image() : undefined
        , images = options.overlay ? [ croppedImage, overlayImage ] : [ croppedImage ]
        , width = options.width
        , height = options.height
        , maxZoom = options.maxZoom || 3
        , draggable = makeDraggable((overlayImage || croppedImage), function (event) {
            images.forEach(function (image) {
              moveImage(
                  image
                , event.movementX
                , event.movementY
                , options.width
                , options.height
              )
            })
          })
        , resultImage
        , enable = function (options) {
            var callback = options.callback || function () {}
              , sliderHandle = containerElm.querySelector('.navigation .slider .handle')
              , originalState = {
                    imageWidth: croppedImage.width
                  , imageHeight: croppedImage.height
                  , imageTop: croppedImage.style.top
                  , imageLeft: croppedImage.style.left
                  , sliderHandleLeft: sliderHandle.style.left
                }

            containerElm.classList.add('enabled')

            draggable.enable()

            // disable resultImage when cropper is enabled
            if (resultImage) {
              resultImage.disable()
            }

            options.navigation.enable(function (err, data) {
              if (err) return callback(err)

              if (data && !data.save) {
                images.forEach(function (image) {
                  image.width = originalState.imageWidth
                  image.height = originalState.imageHeight
                  image.style.top = originalState.imageTop
                  image.style.left = originalState.imageLeft
                })
                sliderHandle.style.left = originalState.sliderHandleLeft
              }

              disable()
              callback(null, data)
            })
          }
        , disable = function () {
            // enable resultImage when cropper is disabled
            if (resultImage) {
              resultImage.enable()
            }
            draggable.disable()
            containerElm.classList.remove('enabled')
          }

      if (options.resultSrc) {
        resultImage = setupResultImage({
            container: containerElm
          , src: options.resultSrc
          , width: options.width
          , height: options.height
        })
      }

      setupElements({
          containerElm: containerElm
        , croppedImage: croppedImage
        , overlayImage: overlayImage
        , navigation: navigationElm
        , width: width
        , height: height
      })

      var setImageOptions = {
          images: images
        , src: options.src
        , width: width
        , height: height
        , cropData: options.cropData
      }

      setImage(setImageOptions, function (err) {
        if (err) return callback(err)

        // reset opacity, e.g. show the image
        images.forEach(function (image) { image.style.opacity = '' })

        var nav = navigation({
                container: navigationElm
              , maxZoom: maxZoom
              , images: images
              , width: width
              , height: height
              , sliderWidth: options.sliderWidth
            })
          , results = {
              enable: function (callback) {
                enable({ navigation: nav, callback: callback })
              }

            , getCropData: function () {
                return getCropData({ image: croppedImage, container: containerElm })
              }
            , changeImage: function (options, callback) {
                var sliderHandle = containerElm.querySelector('.navigation .slider .handle')

                sliderHandle.style.left = '0px'

                setImage({
                        images: images
                      , src: options.src
                      , width: width
                      , height: height
                    }
                  , callback
                )
              }
            , setResultImage: function (options) {
                resultImage = setupResultImage({
                    src: options.src
                  , container: containerElm
                  , width: width
                  , height: height
                })
                resultImage.enable()
              }
          }

        disable()

        callback(null, results)
      })
    }

module.exports = init
