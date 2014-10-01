var setBackground = function (canvas, bgColor) {
      var ctx = canvas.getContext('2d')

      ctx.fillStyle = bgColor

      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

  , common = {
        createTestImage: function (width, height) {
          var image = new Image()

          image.src = common.createTestImageSrc(width, height)

          return image
        }
      , createTestImageSrc: function (width, height, bgColor) {
          var canvas = document.createElement('canvas')

          canvas.width = width
          canvas.height = height

          if (bgColor) {
            setBackground(canvas, bgColor)
          }

          return canvas.toDataURL('image/jpeg')
        }
    }

module.exports = common