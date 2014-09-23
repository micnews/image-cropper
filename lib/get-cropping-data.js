var getCroppingData = function (options) {
      var left =  - parseFloat(options.image.style.left) || 0
        , top = - parseFloat(options.image.style.top) || 0
        , right = options.image.width - parseFloat(options.container.style.width) - left
        , bottom = options.image.height - parseFloat(options.container.style.height) - top

      return {
          left: left
        , top: top
        , right: right
        , bottom: bottom
      }
    }

module.exports = getCroppingData