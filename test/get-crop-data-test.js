var test = require('tape')

  , getCropData = require('../lib/get-crop-data')

  , common = require('./common')

test('simple', function (t) {
  var options = {
          image: common.createTestImage(400, 300)
        , container: document.createElement('div')
      }

  options.container.style.width = '200px'
  options.container.style.height = '200px'

  t.deepEqual(getCropData(options), { left: 0, top: 0, right: 200, bottom: 200, width: 400, height: 300 })

  options.image.style.left = '-2.5px'
  options.image.style.top = '-1.5px'

  t.deepEqual(getCropData(options), { left: 2.5, top: 1.5, right: 202.5, bottom: 201.5, width: 400, height: 300 })

  t.end()
})

test('zoomed in', function (t) {
  var options = {
          image: common.createTestImage(200, 200)
        , container: document.createElement('div')
      }

  options.container.style.width = '200px'
  options.container.style.height = '200px'

  // image is zoomed in to double the size
  options.image.width = 400
  options.image.height = 400

  options.image.style.left = '-100px'
  options.image.style.top = '-200px'

  t.deepEqual(getCropData(options), { left: 50, top: 100, right: 150, bottom: 200, width: 400, height: 400 })
  t.end()
})