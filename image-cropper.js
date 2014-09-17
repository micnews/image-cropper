var dom = require('dom-events')
  , imageLoaded = require('image-loaded')

  , ImageCropper = function (image, options) {
      this._containerElm = null;
      this._imageElm = image;
      this._options = options;

      this._wrap()
      this._makeDraggable()

    }

  , init = function (image, options, callback) {
      var imageCropper = new ImageCropper(image, options)

      imageLoaded(image, function (err) {
        if (err)
          return callback(err)

        callback(null, imageCropper)

      })
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

ImageCropper.prototype._makeDraggable = function () {
  var image = this._imageElm
    , options = this._options

  dom.on(image, 'mousedown', function () {
    var onmousemove = function (event) {
          // calculate minTopPosition & minLeftPosition here since we're
          // going to add zooming later
          // so we don't now the width & height of the image earlier
          // for similar reason, use the left & top from the image instead of
          // saving it somewhere
          var minTopPosition = - (image.height - options.height)
            , minLeftPosition = - (image.width - options.width)

            , leftPosition = parseInt(image.style.left.slice(0, -2), 10) + event.movementX
            , topPosition = parseInt(image.style.top.slice(0, -2), 10) + event.movementY

          leftPosition = Math.min(leftPosition, 0)
          leftPosition = Math.max(leftPosition, minLeftPosition)

          topPosition = Math.min(topPosition, 0)
          topPosition = Math.max(topPosition, minTopPosition)

          image.style.left = leftPosition + 'px'
          image.style.top = topPosition + 'px'

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
