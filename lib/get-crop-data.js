var getCropData = function (options) {
      var zoomFactor = options.image.naturalWidth / options.image.width
        , left =  - parseFloat(options.image.style.left) || 0
        , top = - parseFloat(options.image.style.top) || 0
        , right = parseFloat(options.container.style.width) + left
        , bottom = parseFloat(options.container.style.height) + top

      return {
          left: left * zoomFactor
        , top: top * zoomFactor
        , right: right * zoomFactor
        , bottom: bottom * zoomFactor
        , width: options.image.width
        , height: options.image.height
      }
    }

module.exports = getCropData