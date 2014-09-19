var dom = require('dom-events')

  , draggable = function (element, callback) {
      // subscribe for mousedown on the image element
      dom.on(element, 'mousedown', function () {
        var onmousemove = function (event) {
              callback(event)

              // preventDefault is to make the element movable,
              // for some element it's drag'n'droppable as the default action
              event.preventDefault()
            }

        // but subscribe to mousemove & mouseup on the document, since the mouse
        // might move out of the image when moving it and we want it to continue to
        // work then
        dom.on(document, 'mousemove', onmousemove)
        dom.once(document, 'mouseup', function () {
          dom.off(document, 'mousemove', onmousemove)
        })

      })
    }

module.exports = draggable
