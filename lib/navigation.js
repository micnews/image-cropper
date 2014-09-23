var ensureElement = require('./ensure-element')
  , resizeImage = require('./resize-image')
  , slider = require('./slider')

  , navigation = function (options) {
      var container = options.container
        , sliderElm = ensureElement({ container: container, className: 'slider' })
        , images = options.images

      slider(sliderElm, { width: 260, lineHeight: 2, handleSize: 10 }, function (sliderValue) {

        var zoomFactor = 1 + (sliderValue * (options.maxZoom - 1))

        images.forEach(function (image) {
          resizeImage(image, options.scaleFactor * zoomFactor, options.width, options.height)
        })
      })

      container.style.position = 'absolute'
      container.style.background = 'rgba(0,0,0,0.3)'
      container.style.height = '50px'
      container.style.width = '100%'
      container.style.top = '0'
      container.style.left = '0'
    }

module.exports = navigation