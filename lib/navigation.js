var dom = require('dom-events')

  , ensureElement = require('./ensure-element')
  , resizeImage = require('./resize-image')
  , createSlider = require('./slider')

  , navigation = function (options) {
      var container = options.container
        , sliderElm = ensureElement({ container: container, className: 'slider' })
        , images = options.images
        , cancelElm = ensureElement({ container: container, className: 'cancel', innerHTML: 'cancel'})
        , saveElm = ensureElement({ container: container, className: 'save', innerHTML: 'save' })
        , slider = createSlider(sliderElm, { width: options.sliderWidth || 260, lineHeight: 2, handleSize: 10 }, function (sliderValue) {

            var zoomFactor = 1 + (sliderValue * (options.maxZoom - 1))
              , scaleFactor = options.width / images[0].naturalWidth

            images.forEach(function (image) {
              resizeImage(image, scaleFactor * zoomFactor, options.width, options.height)
            })
          })

      return {
          enable: function (callback) {
            var disable = function () {
                  dom.off(saveElm, 'click', onsave)
                  dom.off(cancelElm, 'click', oncancel)
                  slider.disable()
                }
              , onsave = function () {
                  disable()
                  callback(null, { save: true })
                }
              , oncancel = function () {
                  disable()
                  callback(null, { save: false })
                }

            slider.enable()
            dom.on(saveElm, 'click', onsave)
            dom.on(cancelElm, 'click', oncancel)
          }
      }
    }

module.exports = navigation