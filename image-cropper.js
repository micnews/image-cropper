var dom = require('dom-events')
  , imageLoaded = require('image-loaded')

  , moveImage = require('./lib/move-image')
  , resetZoom = require('./lib/reset-zoom')
  , resizeImage = require('./lib/resize-image')

  , ImageCropper = function (containerElm, image, options) {
      this._containerElm = containerElm;
      this._imageElm = image;
      this._width = options.width;
      this._height = options.height;
      this._enabled = false;

      this._wrap()
      this._makeDraggable()
    }

  , init = function (containerElm, options, callback) {
      var image = new Image()
        , imageCropper = new ImageCropper(containerElm, image, options)

      image.src = options.src

      imageLoaded(image, function (err) {
        if (err)
          return callback(err)

        resetZoom(image, options.width, options.height)

        callback(null, imageCropper)
      })
    }

ImageCropper.prototype.enable = function () {
  this._enabled = true;
  this._imageElm.style.cursor = 'move';
}

ImageCropper.prototype.disable = function () {
  this._enabled = false;
  this._imageElm.style.cursor = '';
}

ImageCropper.prototype._resizeImage = function (changeFactor) {
  resizeImage(this._imageElm, changeFactor, this._width, this._height)
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
  container.style.overflow = 'hidden'

  this._imageElm.style.position = 'absolute'

  container.appendChild(this._imageElm)
}

ImageCropper.prototype._moveImage = function (leftChange, topChange) {
  moveImage(this._imageElm, leftChange, topChange, this._width, this._height)
}

ImageCropper.prototype._makeDraggable = function () {
  var self = this

  // subscribe for mousedown on the image element
  dom.on(this._imageElm, 'mousedown', function () {
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
