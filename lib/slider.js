var dom = require('dom-events')

  , createJack = function (options) {
      var jack = document.createElement('div')

      jack.style.position = 'absolute'
      jack.style.left = '0px'
      jack.style.top = '0px'
      jack.style.width = options.jackSize + 'px'
      jack.style.height = options.jackSize + 'px'
      jack.setAttribute('class', 'jack')

      return jack
    }

  , createLine = function (options) {
      var line = document.createElement('div')

      line.style.position = 'absolute'
      line.style.left = options.jackSize / 2 + 'px'
      line.style.top = (options.jackSize / 2 - options.lineHeight / 2) + 'px'
      line.style.height = options.lineHeight + 'px'
      line.style.width = (options.width - options.jackSize) + 'px'
      line.setAttribute('class', 'line')

      return line
    }

  , slider = function (container, options) {
      var jack = createJack(options)
        , line = createLine(options)
        , minJackLeft = 0
        , maxJackLeft = options.width - options.jackSize

      container.style.position = 'relative'
      container.style.width = options.width + 'px'
      container.style.height = options.jackSize + 'px'
      container.appendChild(line)
      container.appendChild(jack)

      dom.on(container, 'click', function (event) {
        var left = event.offsetX - options.jackSize / 2

        left = Math.max(left, minJackLeft)
        left = Math.min(left, maxJackLeft)

        jack.style.left = left + 'px'
      })

    }

module.exports = slider