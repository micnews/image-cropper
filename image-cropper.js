var dom = require('dom-events')
  , imageLoaded = require('image-loaded')

  , moveImage = require('./lib/move-image')
  , resetZoom = require('./lib/reset-zoom')
  , resizeImage = require('./lib/resize-image')

  , ImageCropper = function (containerElm, croppedImage, backgroundImage, options) {
      this._containerElm = containerElm
      this._croppedImage = croppedImage
      this._backgroundImage = backgroundImage
      this._width = options.width
      this._height = options.height
      this._enabled = false

      this._backgroundImage.src = options.src

      this._wrap()
      this._makeDraggable()
    }

  , init = function (containerElm, options, callback) {
      var croppedImage = new Image()
        , backgroundImage = new Image()
        , imageCropper = new ImageCropper(containerElm, croppedImage, backgroundImage, options)

      croppedImage.src = options.src
      backgroundImage.src = options.src

      imageLoaded(croppedImage, function (err) {
        if (err)
          return callback(err)

        resetZoom(croppedImage, options.width, options.height)

        imageLoaded(backgroundImage, function (err) {
          if (err)
            return callback(err)

          resetZoom(backgroundImage, options.width, options.height)

          callback(null, imageCropper)

        })
      })
    }

ImageCropper.prototype.enable = function () {
  this._enabled = true
  this._croppedImage.style.cursor = 'move'
  this._backgroundImage.style.opacity = '0.5'
}

ImageCropper.prototype.disable = function () {
  this._enabled = false
  this._croppedImage.style.cursor = ''
  this._backgroundImage.style.opacity = '0'
}

ImageCropper.prototype._resizeImage = function (changeFactor) {
  resizeImage(this._backgroundImage, changeFactor, this._width, this._height)
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

  this._backgroundImage.style.position = 'absolute'
  this._backgroundImage.style.opacity = '0'
  this._backgroundImage.style['z-index'] = '1000'

  var cropContainer = document.createElement('div')

  cropContainer.style.width = this._width
  cropContainer.style.height = this._height
  cropContainer.style.position = 'absolute'
  cropContainer.style.overflow = 'hidden'

  this._croppedImage.style.position = 'absolute'

  cropContainer.appendChild(this._croppedImage)

  container.appendChild(this._backgroundImage)
  container.appendChild(cropContainer)
}

ImageCropper.prototype._moveImage = function (leftChange, topChange) {
  moveImage(this._backgroundImage, leftChange, topChange, this._width, this._height)
  moveImage(this._croppedImage, leftChange, topChange, this._width, this._height)
}

ImageCropper.prototype._makeDraggable = function () {
  var self = this

  // subscribe for mousedown on the image element
  // todo: make some nicer abstraction of this
  dom.on(this._backgroundImage, 'mousedown', function () {
    if (!self._enabled)
      return

    var onmousemove = function (event) {
          self._moveImage(event.movementX, event.movementY)

          // preventDefault is to make the image movable,
          // it's drag'n'droppable as the default action
          event.preventDefault()
        }

    // but subscribe to mousvemove & mouseup on the document, since the mouse
    // might move out of the image when moving it and we want it to continue to
    // work then
    dom.on(document, 'mousemove', onmousemove)
    dom.once(document, 'mouseup', function () {
      dom.off(document, 'mousemove', onmousemove)
    })

  })
}

module.exports = init
