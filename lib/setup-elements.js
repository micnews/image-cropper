var ensureElement = require('./ensure-element')

  , setupElements = function (options) {
      var container = options.containerElm
        , cropContainer = ensureElement({ container: container, className: 'crop-container' })
        , croppedImage = options.croppedImage
        , overlayImage = options.overlayImage

      container.style.width = options.width + 'px'
      container.style.height = options.height + 'px'
      container.style.position = 'relative'

      if (overlayImage) {
        overlayImage.classList.add('overlay')
        overlayImage.style.position = 'absolute'
        overlayImage.style.opacity = '0'
        container.appendChild(overlayImage)
      }

      cropContainer.style.width = options.width + 'px'
      cropContainer.style.height = options.height + 'px'
      cropContainer.style.position = 'absolute'
      cropContainer.style.overflow = 'hidden'

      croppedImage.style.position = 'absolute'

      croppedImage.style.opacity = '0'

      cropContainer.appendChild(croppedImage)

      container.appendChild(options.navigation)
    }

module.exports = setupElements