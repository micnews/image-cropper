var dom = require('dom-events')
  , loadImages = require('./lib/load-images')

  , draggable = require('./lib/draggable')
  , moveImage = require('./lib/move-image')
  , resetZoom = require('./lib/reset-zoom')
  , resizeImage = require('./lib/resize-image')
  , navigation = require('./lib/navigation')

  , ImageCropper = function (options) {
      var self = this
      this._containerElm = options.containerElm
      this._croppedImage = options.croppedImage
      this._overlayImage = options.overlayImage
      this._navigation = options.navigationElm
      this._width = options.width
      this._height = options.height
      this._enabled = false

      this._wrap()

      draggable(options.overlayImage, function (event) {
        ;[ options.overlayImage, options.croppedImage ].forEach(function (image) {
          if (self._enabled)
            moveImage(
                image
              , event.movementX
              , event.movementY
              , options.width
              , options.height
            )
        })
      })
    }

  , init = function (containerElm, options, callback) {
      var navigationElm = document.createElement('div')
        , croppedImage = new Image()
        , overlayImage = new Image()
        , images = [ croppedImage, overlayImage ]
        , width = options.width
        , height = options.height
        , maxZoom = options.maxZoom || 3
        , imageCropper = new ImageCropper({
              containerElm: containerElm
            , navigationElm: navigationElm
            , croppedImage: croppedImage
            , overlayImage: overlayImage
            , width: width
            , height: height
          })

      loadImages(images, options.src, function (err) {
        if (err) return callback(err)

        images.forEach(function (image) { resetZoom(image, width, height) })

        var scaleFactor = croppedImage.width / croppedImage.naturalWidth

        navigation({
            container: navigationElm
          , scaleFactor: scaleFactor
          , maxZoom: maxZoom
          , images: images
          , width: width
          , height: height
        })

        callback(null, imageCropper)
      })
    }

ImageCropper.prototype.enable = function () {
  this._enabled = true
  this._croppedImage.style.cursor = 'move'
  this._overlayImage.style.opacity = '0.5'
}

ImageCropper.prototype.disable = function () {
  this._enabled = false
  this._croppedImage.style.cursor = ''
  this._overlayImage.style.opacity = '0'
}

ImageCropper.prototype._wrap = function () {
  var container = this._containerElm

  container.style.width = this._width
  container.style.height = this._height
  container.style.position = 'relative'

  this._overlayImage.style.position = 'absolute'
  this._overlayImage.style.opacity = '0'

  var cropContainer = document.createElement('div')

  cropContainer.style.width = this._width
  cropContainer.style.height = this._height
  cropContainer.style.position = 'absolute'
  cropContainer.style.overflow = 'hidden'

  this._croppedImage.style.position = 'absolute'

  cropContainer.appendChild(this._croppedImage)

  container.appendChild(cropContainer)
  container.appendChild(this._overlayImage)
  container.appendChild(this._navigation)
}

module.exports = init
