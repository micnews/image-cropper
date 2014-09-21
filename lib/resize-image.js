var moveImage = require('./move-image')

  , resizeImage = function (image, zoomFactor, width, height) {
      var newWidth = image.naturalWidth * zoomFactor
        , newHeight = image.naturalHeight * zoomFactor
        , widthChange = newWidth - image.width
        , heightChange = newHeight - image.height

      if (image.width + widthChange < width) {
        // if change is wider than allowed width,
        // change it to the allowed width
        widthChange = width - image.width
        heightChange = image.height / image.width * widthChange
      }

      if (image.height + heightChange < height) {
        heightChange = height - image.height
        widthChange = image.width / image.height * heightChange
      }

      image.width = image.width + widthChange
      image.height = image.height + heightChange

      moveImage(image, - widthChange / 2, - heightChange / 2, width, height)
    }

module.exports = resizeImage