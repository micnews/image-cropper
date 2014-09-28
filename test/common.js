var common = {
        createTestImage: function (width, height) {
          var image = new Image()

          image.src = common.createTestImageSrc(width, height)

          return image
        }
      , createTestImageSrc: function (width, height) {
          var canvas = document.createElement('canvas')

          canvas.width = width
          canvas.height = height

          return canvas.toDataURL('image/jpeg')
        }
    }

module.exports = common