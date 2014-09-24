var ensureElement = require('./ensure-element')

  , setupElements = function (options) {
      var container = options.containerElm
        , cropContainer = ensureElement({ container: container, className: 'crop-container' })

      container.style.width = options.width + 'px'
      container.style.height = options.height + 'px'
      container.style.position = 'relative'

      options.overlayImage.classList.add('overlay')
      options.overlayImage.style.position = 'absolute'

      cropContainer.style.width = options.width + 'px'
      cropContainer.style.height = options.height + 'px'
      cropContainer.style.position = 'absolute'
      cropContainer.style.overflow = 'hidden'

      options.croppedImage.style.position = 'absolute'

      options.croppedImage.style.opacity = '0'
      options.overlayImage.style.opacity = '0'

      cropContainer.appendChild(options.croppedImage)

      container.appendChild(options.overlayImage)
      container.appendChild(options.navigation)
    }

module.exports = setupElements