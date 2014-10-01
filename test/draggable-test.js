var dom = require('dom-events')
  , test = require('tape')

  , makeDraggable = require('../lib/draggable')

test('drag within element', function (t) {
  var elm = document.createElement('div')

  document.body.appendChild(elm)

  makeDraggable(elm, function (event) {
    t.equal(event.customProperty, 'oh yeah')
    t.end()
  }).enable()

  dom.emit(elm, 'mousedown')
  dom.emit(elm, 'mousemove', { bubbles: true, customProperty: 'oh yeah' })
  dom.emit(elm, 'mouseup', { bubbles: true })
})

test('start drag within element drag outside', function (t) {
  var elm = document.createElement('div')

  document.body.appendChild(elm)

  makeDraggable(elm, function (event) {
    t.equal(event.customProperty, 'ohhhh yeah')
    t.end()
  }).enable()

  dom.emit(elm, 'mousedown')
  dom.emit(document, 'mousemove', { customProperty: 'ohhhh yeah' })
  dom.emit(document, 'mouseup')
})

test('start disabled', function (t) {
  var elm = document.createElement('div')

  document.body.appendChild(elm)

  makeDraggable(elm, function () {
    t.fail('should not call callback')
  })

  dom.emit(elm, 'mousedown')
  dom.emit(document, 'mousemove')
  dom.emit(document, 'mouseup')

  process.nextTick(function () {
    t.end()
  })
})

test('disable()', function (t) {
  var elm = document.createElement('div')
   , draggable = makeDraggable(elm, function (event) {
        t.fail('should not call callback')
      })

  document.body.appendChild(elm)

  draggable.enable()
  draggable.disable()

  dom.emit(elm, 'mousedown')
  dom.emit(document, 'mousemove')
  dom.emit(document, 'mouseup')

  process.nextTick(function () {
    t.end()
  })
})
