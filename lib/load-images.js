var imageLoaded = require('image-loaded')
  , after = require('after')

  , loadImages = function (input, src, callback) {
      var done = after(input.length, callback)

      input.forEach(function (image) {
        imageLoaded(image, done)
        image.src = src
      })
    }

module.exports = loadImages