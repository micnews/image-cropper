var imageLoaded = require('image-loaded')
  , after = require('after')

  , loadImages = function (input, src, callback) {
      var done = after(input.length, callback)

      input.forEach(function (image) {
        // imageLoaded must be initialized first, to assure
        // that we're always running this asynchronous, even if we have a cached image
        imageLoaded(image, done)
        image.src = src
      })
    }

module.exports = loadImages