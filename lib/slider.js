var dom = require('dom-events')
  , makeDraggable = require('./draggable')
  , ensureElement = require('./ensure-element')

  , setupHandle = function (container, options) {
      var handle = ensureElement({ container: container, className: 'handle' })

      handle.style.position = 'absolute'
      handle.style.left = '0px'
      handle.style.top = '0px'
      handle.style.width = options.handleSize + 'px'
      handle.style.height = options.handleSize + 'px'

      return handle
    }

  , setupLine = function (container, options) {
      var line = ensureElement({ container: container, className: 'line' })

      line.style.position = 'absolute'
      line.style.left = options.handleSize / 2 + 'px'
      line.style.top = (options.handleSize / 2 - options.lineHeight / 2) + 'px'
      line.style.height = options.lineHeight + 'px'
      line.style.width = (options.width - options.handleSize) + 'px'

      return line
    }

  , slider = function (container, options, callback) {
      var handle = setupHandle(container, options)
        , line = setupLine(container, options)
        , minHandleLeft = 0
        , maxHandleLeft = options.width - options.handleSize
        , positionHandle = function (event) {
            var left = event.pageX - line.getBoundingClientRect().left

            left = Math.max(left, minHandleLeft)
            left = Math.min(left, maxHandleLeft)

            handle.style.left = left + 'px'

            callback(left / maxHandleLeft)
          }
        , draggable = makeDraggable(handle, positionHandle)

      container.style.position = 'absolute'
      container.style.width = options.width + 'px'
      container.style.height = options.handleSize + 'px'

      return {
          enable: function () {
            dom.on(container, 'click', positionHandle)
            draggable.enable()
          }
        , disable: function () {
            dom.off(container, 'click', positionHandle)
            draggable.disable()
          }
      }
    }

module.exports = slider