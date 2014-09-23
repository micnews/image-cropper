var common = {
        testImage: function (width, height) {
          var canvas = document.createElement('canvas')
            , image = new Image()

          canvas.width = width
          canvas.height = height

          image.src = canvas.toDataURL("image/jpeg")

          return image
        }
    }

module.exports = common