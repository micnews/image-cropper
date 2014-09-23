var resetZoom = function (image, width, height) {
      var widthRatio = image.naturalWidth / width
        , heightRation = image.naturalHeight / height
        , ratio = Math.min(widthRatio, heightRation)
          // need to set these now, since changing height might affect width
        , newWidth = image.naturalWidth / ratio
        , newHeight = image.naturalHeight / ratio

      image.height = Math.round(newHeight)
      image.width = Math.round(newWidth)

      // as default start in the middle of the image
      image.style.top = - ((image.height - height) / 2) + 'px'

      // as default start in the middle of the image
      image.style.left = - ((image.width - width) / 2) + 'px'
    }

module.exports = resetZoom