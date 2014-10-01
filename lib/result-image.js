var ensureElement = require('./ensure-element')

  , resultImage = function (options) {
      var image = ensureElement({
              className: 'result-image'
            , nodeName: 'img'
            , container: options.container
          })

      image.src = options.src
      image.style.position = 'absolute'
      image.style.top = '0px'
      image.style.left = '0px'
      image.style.opacity = '1'

      if (options.width)
        image.width = options.width

      if (options.height)
        image.height = options.height

      return image
    }

module.exports = resultImage