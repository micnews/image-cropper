var dom = require('dom-events')
  , draggable = require('./draggable')

  , createHandle = function (options) {
      var handle = document.createElement('div')

      handle.style.position = 'absolute'
      handle.style.left = '0px'
      handle.style.top = '0px'
      handle.style.width = options.handleSize + 'px'
      handle.style.height = options.handleSize + 'px'
      handle.setAttribute('class', 'handle')

      return handle
    }

  , createLine = function (options) {
      var line = document.createElement('div')

      line.style.position = 'absolute'
      line.style.left = options.handleSize / 2 + 'px'
      line.style.top = (options.handleSize / 2 - options.lineHeight / 2) + 'px'
      line.style.height = options.lineHeight + 'px'
      line.style.width = (options.width - options.handleSize) + 'px'
      line.setAttribute('class', 'line')

      return line
    }

  , slider = function (container, options, callback) {
      var handle = createHandle(options)
        , line = createLine(options)
        , minHandleLeft = 0
        , maxHandleLeft = options.width - options.handleSize
        , positionHandle = function (event) {
            var left = event.pageX - line.getBoundingClientRect().left

            left = Math.max(left, minHandleLeft)
            left = Math.min(left, maxHandleLeft)

            handle.style.left = left + 'px'

            callback(left / maxHandleLeft)
          }

      container.style.position = 'absolute'
      container.style.width = options.width + 'px'
      container.style.height = options.handleSize + 'px'
      container.appendChild(line)
      container.appendChild(handle)


      dom.on(container, 'click', positionHandle)
      draggable(handle, positionHandle)
    }

module.exports = slider