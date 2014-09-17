var dom = require('dom-events')
  , imageLoaded = require('image-loaded')

  , moveImage = require('./lib/move-image')

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

        imageCropper.resetZoom()

        callback(null, imageCropper)
      })
    }

ImageCropper.prototype._heightFromWidth = function (width) {
  return this._imageElm.height / this._imageElm.width * width
}

ImageCropper.prototype._widthFromHeight = function (height) {
  return this._imageElm.width / this._imageElm.height * height
}

ImageCropper.prototype._resizeImage = function (widthChange) {
  var image = this._imageElm
    , heightChange = this._heightFromWidth(widthChange)

  if (image.width + widthChange < this._width) {
    widthChange = this._width - image.width
    heightChange = this._heightFromWidth(widthChange)
  }
  if (image.height + heightChange < this._height) {
    heightChange = this._height - image.height
    widthChange = this._widthFromHeight(heightChange)
  }

  image.width = image.width + widthChange
  image.height = image.height + heightChange

  this._moveImage(- widthChange / 2, - heightChange / 2)
}

ImageCropper.prototype.enable = function () {
  this._enabled = true;
  this._imageElm.style.cursor = 'move';
}

ImageCropper.prototype.disable = function () {
  this._enabled = false;
  this._imageElm.style.cursor = '';
}

ImageCropper.prototype.zoomIn = function () {
  if (!this._enabled)
    return

  var widthChange = Math.round(this._imageElm.width * 0.1)

  this._resizeImage(widthChange)
}

ImageCropper.prototype.zoomOut = function () {
  if (!this._enabled)
    return

  var widthChange = - Math.round(this._imageElm.width - this._imageElm.width / 1.1)

  this._resizeImage(widthChange)
}

ImageCropper.prototype.resetZoom = function () {
  var image = this._imageElm
    , widthRatio = image.naturalWidth / this._width
    , heightRation = image.naturalHeight / this._height
    , ratio = Math.min(widthRatio, heightRation)
      // need to set these now, since changing height might affect width
    , newWidth = image.width / ratio
    , newHeight = image.height / ratio

  image.height = newHeight
  image.width = newWidth

  // as default start in the middle of the image
  image.style.top = - ((image.height - this._height) / 2) + 'px'

  // as default start in the middle of the image
  image.style.left = - ((image.width - this._width) / 2) + 'px'
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
  moveImage(this._imageElm, leftChange, topChange, this._height, this._width)
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
