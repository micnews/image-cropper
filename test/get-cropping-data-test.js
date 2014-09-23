var test = require('tape')

  , getCroppingData = require('../lib/get-cropping-data')

  , common = require('./common')

test('simple', function (t) {

  var options = {
          image: common.testImage(400, 300)
        , container: document.createElement('div')
      }

  options.container.style.width = '200px'
  options.container.style.height = '200px'

  t.deepEqual(getCroppingData(options), { left: 0, top: 0, right: 200, bottom: 100 })

  options.image.style.left = '-2.5px'
  options.image.style.top = '-1.5px'

  t.deepEqual(getCroppingData(options), { left: 2.5, top: 1.5, right: 197.5, bottom: 98.5 })

  t.end()
})

test('zoomed in', function (t) {
  var options = {
          image: common.testImage(200, 200)
        , container: document.createElement('div')
      }

  options.container.style.width = '200px'
  options.container.style.height = '200px'
  // image is zoomed in to double the size
  options.image.width = 400
  options.image.height = 400

  options.image.style.left = '-100px'
  options.image.style.top = '-200px'

  t.deepEqual(getCroppingData(options), { left: 50, top: 100, right: 50, bottom: 0 })
  t.end()
})