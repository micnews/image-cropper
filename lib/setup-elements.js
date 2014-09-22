var ensureElement = require('./ensure-element')

  , setupElements = function (options) {
      var container = options.containerElm

      container.style.width = options.width
      container.style.height = options.height
      container.style.position = 'relative'

      options.overlayImage.style.position = 'absolute'
      options.overlayImage.style.opacity = '0'

      var cropContainer = ensureElement(container, 'crop-container')

      cropContainer.style.width = options.width
      cropContainer.style.height = options.height
      cropContainer.style.position = 'absolute'
      cropContainer.style.overflow = 'hidden'

      options.croppedImage.style.position = 'absolute'

      cropContainer.appendChild(options.croppedImage)

      container.appendChild(options.overlayImage)
      container.appendChild(options.navigation)
    }

module.exports = setupElements