var ensureElement = require('./ensure-element')

  , resultImage = function (options) {
      var image = ensureElement({
              className: 'result-image'
            , nodeName: 'img'
            , container: options.container
          })
        , enable = function () {
            image.style.opacity = '1'
            image.style['z-index'] = '1000'
          }
        , disable = function () {
            image.style.opacity = '0'
            image.style['z-index'] = '-1000'
          }

      image.src = options.src
      image.style.position = 'absolute'
      image.style.top = '0px'
      image.style.left = '0px'
      image.style.opacity = '1'

      if (options.width)
        image.width = options.width

      if (options.height)
        image.height = options.height

      disable()

      return {
          image: image
        , enable: enable
        , disable: disable
      }
    }

module.exports = resultImage