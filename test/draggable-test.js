var dom = require('dom-events')
  , test = require('tape')

  , draggable = require('../lib/draggable')

test('drag within element', function (t) {
  var elm = document.createElement('div')

  document.body.appendChild(elm)

  draggable(elm, function (event) {
    t.equal(event.customProperty, 'oh yeah')
    t.end()
  })

  dom.emit(elm, 'mousedown')
  dom.emit(elm, 'mousemove', { bubbles: true, customProperty: 'oh yeah' })
  dom.emit(elm, 'mouseup', { bubbles: true })
})

test('start drag within element drag outside', function (t) {
  var elm = document.createElement('div')

  document.body.appendChild(elm)

  draggable(elm, function (event) {
    t.equal(event.customProperty, 'ohhhh yeah')
    t.end()
  })

  dom.emit(elm, 'mousedown')
  dom.emit(document, 'mousemove', { customProperty: 'ohhhh yeah' })
  dom.emit(document, 'mouseup')
})