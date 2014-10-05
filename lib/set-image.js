var loadImages = require('./load-images')
  , resetZoom = require('./reset-zoom')

  , setImage = function (options, callback) {
      loadImages(options.images, options.src, function (err) {
        if (err) return callback(err)

        options.images.forEach(function (image) {
          resetZoom(image, options.width, options.height)
        })

        callback()
      })
    }

module.exports = setImage