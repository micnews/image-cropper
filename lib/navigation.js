var dom = require('dom-events')

  , ensureElement = require('./ensure-element')
  , resizeImage = require('./resize-image')
  , slider = require('./slider')

  , navigation = function (options) {
      var container = options.container
        , sliderElm = ensureElement({ container: container, className: 'slider' })
        , images = options.images
        , cancelElm = ensureElement({ container: container, className: 'cancel', innerHTML: 'cancel'})
        , saveElm = ensureElement({ container: container, className: 'save', innerHTML: 'save' })


      slider(sliderElm, { width: 260, lineHeight: 2, handleSize: 10 }, function (sliderValue) {

        var zoomFactor = 1 + (sliderValue * (options.maxZoom - 1))

        images.forEach(function (image) {
          resizeImage(image, options.scaleFactor * zoomFactor, options.width, options.height)
        })
      })

      return {
          enable: function (callback) {
            var onsave = function () {
                  if (callback) callback(null, { save: true })
                  dom.off(cancelElm, 'click', oncancel)
                }
              , oncancel = function () {
                  callback(null, { save: false })
                  dom.off(saveElm, 'click', onsave)
                }

            dom.once(saveElm, 'click', onsave)
            dom.once(cancelElm, 'click', oncancel)
          }
      }
    }

module.exports = navigation