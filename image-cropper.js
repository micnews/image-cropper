var dom = require('dom-events')
  , imageLoaded = require('image-loaded')

  , draggable = require('./lib/draggable')
  , moveImage = require('./lib/move-image')
  , resetZoom = require('./lib/reset-zoom')
  , resizeImage = require('./lib/resize-image')

  , ImageCropper = function (options) {
      var self = this
      this._containerElm = options.containerElm
      this._croppedImage = options.croppedImage
      this._overlayImage = options.overlayImage
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
      var croppedImage = new Image()
        , overlayImage = new Image()
        , imageCropper = new ImageCropper({
              containerElm: containerElm
            , croppedImage: croppedImage
            , overlayImage: overlayImage
            , width: options.width
            , height: options.height
          })

      croppedImage.src = options.src
      overlayImage.src = options.src

      imageLoaded(croppedImage, function (err) {
        if (err)
          return callback(err)

        resetZoom(croppedImage, options.width, options.height)

        imageLoaded(overlayImage, function (err) {
          if (err)
            return callback(err)

          resetZoom(overlayImage, options.width, options.height)

          callback(null, imageCropper)

        })
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

ImageCropper.prototype._resizeImage = function (changeFactor) {
  resizeImage(this._overlayImage, changeFactor, this._width, this._height)
  resizeImage(this._croppedImage, changeFactor, this._width, this._height)
}

ImageCropper.prototype.zoomIn = function () {
  if (!this._enabled)
    return

  this._resizeImage(1.1)
}

ImageCropper.prototype.zoomOut = function () {
  if (!this._enabled)
    return

  this._resizeImage(1/1.1)
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
}

module.exports = init
