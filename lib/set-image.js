var loadImages = require('./load-images')
  , resetZoom = require('./reset-zoom')

  , setImage = function (options, callback) {
      loadImages(options.images, options.src, function (err) {
        if (err) return callback(err)

        if (options.cropData) {
          options.images.forEach(function (image) {
            var zoomFactor = image.naturalWidth / options.cropData.width
            image.style.top = - (options.cropData.top / zoomFactor) + 'px'
            image.style.left = - (options.cropData.left / zoomFactor) + 'px'
            image.width = options.cropData.width
            image.height = options.cropData.height
          })
        } else {
          options.images.forEach(function (image) {
            resetZoom(image, options.width, options.height)
          })
        }

        callback()
      })
    }

module.exports = setImage