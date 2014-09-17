var dom = require('dom-events')
  , imageLoaded = require('image-loaded')

  , wrap = function (image, options) {
      var container = document.createElement('div')

      container.style.width = options.width
      container.style.height = options.height
      container.style.position = 'relative'
      container.style.overflow = 'hidden'

      image.style.position = 'absolute'

      image.parentNode.replaceChild(container, image)
      container.appendChild(image)
    }

  , draggable = function (image, options) {
      var topPosition = 0
        , leftPosition = 0

      dom.on(image, 'mousedown', function () {
        var onmousemove = function () {
              // calculate minTopPosition & minLeftPosition here since we're
              // going to add zooming later
              // so we don't now the width & height of the image earlier
              var minTopPosition = - (image.height - options.height)
                , minLeftPosition = - (image.width - options.width)

              leftPosition += event.movementX
              topPosition += event.movementY

              leftPosition = Math.min(leftPosition, 0)
              leftPosition = Math.max(leftPosition, minLeftPosition)

              topPosition = Math.min(topPosition, 0)
              topPosition = Math.max(topPosition, minTopPosition)

              image.style.left = leftPosition
              image.style.top = topPosition

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

  , imageCropper = function (image, options, callback) {
      wrap(image, options)

      imageLoaded(image, function (err) {
        if (err)
          return callback(err)

        draggable(image, options)

      })
    }

module.exports = imageCropper
