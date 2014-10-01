var resultImage = function (options) {
      var image = new Image()

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