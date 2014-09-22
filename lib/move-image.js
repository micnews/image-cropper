/*
 * Relativly move the image, making sure that it stays within height & width
 */
var moveImage = function (image, leftChange, topChange, width, height) {
      var minTopPosition = - (image.height - height)
        , minLeftPosition = - (image.width - width)

        , leftPosition = (parseFloat(image.style.left.slice(0, -2)) || 0) + leftChange
        , topPosition = (parseFloat(image.style.top.slice(0, -2)) || 0) + topChange

      leftPosition = Math.min(leftPosition, 0)
      leftPosition = Math.max(leftPosition, minLeftPosition)

      topPosition = Math.min(topPosition, 0)
      topPosition = Math.max(topPosition, minTopPosition)

      image.style.left = leftPosition + 'px'
      image.style.top = topPosition + 'px'
    }

module.exports = moveImage