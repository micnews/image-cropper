var dom = require('dom-events')
  , imageLoaded = require('image-loaded')

  , ImageCropper = function (image, options) {
      this._containerElm = null;
      this._imageElm = image;
      this._options = options;
      this._enabled = false;
    }

  , init = function (image, options, callback) {
      var imageCropper = new ImageCropper(image, options)

      imageLoaded(image, function (err) {
        if (err)
          return callback(err)

        imageCropper._initialZoom()
        imageCropper._wrap()
        imageCropper._makeDraggable()

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

  if (image.width + widthChange < this._options.width) {
    widthChange = this._options.width - image.width
    heightChange = this._heightFromWidth(widthChange)
  }
  if (image.height + heightChange < this._options.height) {
    heightChange = this._options.height - image.height
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

ImageCropper.prototype._initialZoom = function () {
  // TODO: Handle if image is smaller than container
  var image = this._imageElm
    , widthRatio = image.naturalWidth / this._options.width
    , heightRation = image.naturalHeight / this._options.height
    , ratio = Math.min(widthRatio, heightRation)
      // need to set these now, since changing height might affect width
    , newWidth = image.width / ratio
    , newHeight = image.height / ratio

  image.height = newHeight
  image.width = newWidth
}

ImageCropper.prototype._wrap = function () {
  var container = this._containerElm = document.createElement('div')

  container.style.width = this._options.width
  container.style.height = this._options.height
  container.style.position = 'relative'
  container.style.overflow = 'hidden'

  this._imageElm.style.position = 'absolute'
  if (!this._imageElm.style.top) {
    // as default start in the middle of the image
    this._imageElm.style.top = - ((this._imageElm.height - this._options.height) / 2) + 'px'
  }

  if (!this._imageElm.style.left) {
    // as default start in the middle of the image
    this._imageElm.style.left = - ((this._imageElm.width - this._options.width) / 2) + 'px'
  }

  this._imageElm.parentNode.replaceChild(container, this._imageElm)
  container.appendChild(this._imageElm)
}

// move the image, making sure that it keeps it place in the container
ImageCropper.prototype._moveImage = function (left, top) {
  var minTopPosition = - (this._imageElm.height - this._options.height)
    , minLeftPosition = - (this._imageElm.width - this._options.width)

    , leftPosition = parseInt(this._imageElm.style.left.slice(0, -2), 10) + left
    , topPosition = parseInt(this._imageElm.style.top.slice(0, -2), 10) + top

  leftPosition = Math.min(leftPosition, 0)
  leftPosition = Math.max(leftPosition, minLeftPosition)

  topPosition = Math.min(topPosition, 0)
  topPosition = Math.max(topPosition, minTopPosition)

  this._imageElm.style.left = leftPosition + 'px'
  this._imageElm.style.top = topPosition + 'px'
}

ImageCropper.prototype._makeDraggable = function () {
  var self = this

  dom.on(this._imageElm, 'mousedown', function () {
    if (!self._enabled)
      return

    var onmousemove = function (event) {
          self._moveImage(event.movementX, event.movementY)

          // preventDefault is to make the image movable,
          // it's drag'n'droppable as the default action
          event.preventDefault()
        }

    dom.on(document, 'mousemove', onmousemove)
    dom.once(document, 'mouseup', function () {
      dom.off(document, 'mousemove', onmousemove)
    })

  })
}

module.exports = init
