var EventEmitter = require('events').EventEmitter

  , dom = require('dom-events')
  , test = require('tape')

  , createSlider = require('../lib/slider')
  , noop = function () {}

test('initialize', function (t) {
  var elm = document.createElement('div')
    , handle
    , line

  document.body.appendChild(elm)

  createSlider(elm, { width: 200, handleSize: 20, lineHeight: 2 }, noop)

  t.equal(elm.style.width, '200px')
  t.equal(elm.style.height, '20px')
  t.equal(elm.style.position, 'absolute')

  handle = elm.querySelector('.handle')

  t.ok(handle)
  if (handle) {
    t.equal(handle.style.position, 'absolute')
    t.equal(handle.style.width, '20px')
    t.equal(handle.style.height, '20px')
    t.equal(handle.style.left, '0px')
    t.equal(handle.style.top, '0px')
  }

  line = elm.querySelector('.line')

  t.ok(line)
  if (line) {
    t.equal(line.style.position, 'absolute')
    t.equal(line.style.width, '180px') // line of slider - space for handle
    t.equal(line.style.height, '2px')
    t.equal(line.style.left, '10px')
    t.equal(line.style.top, '9px') // vertically in the middle
  }

  t.end()
})

test('click exactly on line', function (t) {
  var elm = document.createElement('div')
    , slider = createSlider(elm, { width: 150, lineHeight: 3, handleSize: 30 }, noop)
    , handle
    , line

  document.body.appendChild(elm)

  slider.enable()

  handle = elm.querySelector('.handle')
  line = elm.querySelector('.line')

  dom.emit(elm, 'click', { clientX: 85, clientY: 15, bubbles: true })

  // handle should be in middle of click, e.g 15px handle on each side
  // offsetX (see above) is 85, so then handle.style.left === 70px
  t.equal(handle.style.left, '70px')
  t.equal(handle.style.top, '0px')
  t.end()
})

test('click inside container', function (t) {
  var elm = document.createElement('div')
    , slider = createSlider(elm, { width: 140, lineHeight: 4, handleSize: 10 }, noop)
    , handle

  document.body.appendChild(elm)

  slider.enable()

  handle = elm.querySelector('.handle')

  dom.emit(elm, 'click', { clientX: 100, clientY: 2, bubbles: true })

  t.equal(handle.style.left, '95px')
  t.equal(handle.style.top, '0px')

  dom.emit(elm, 'click', { clientX: 0, clientY: 0, bubbles: true })

  t.equal(handle.style.left, '0px')
  t.equal(handle.style.top, '0px')

  dom.emit(elm, 'click', { clientX: 140, clientY: 0, bubbles: true })

  t.equal(handle.style.left, '130px')
  t.end()
})

test('container placed out', function (t) {
  var elm = document.createElement('div')
    , slider = createSlider(elm, { width: 150, lineHeight: 3, handleSize: 30 }, noop)
    , handle
    , line

  elm.style['margin-left'] = '100px'

  document.body.appendChild(elm)

  slider.enable()

  handle = elm.querySelector('.handle')
  line = elm.querySelector('.line')

  // clientX: 200 => offsetX: 85 (line has left: 15px + 100 margin-left)
  dom.emit(elm, 'click', { clientX: 185, clientY: 15, bubbles: true })

  // handle should be in middle of click, e.g 15px handle on each side
  // offsetX (see above) is 85, so then handle.style.left === 70px
  t.equal(handle.style.left, '70px')
  t.equal(handle.style.top, '0px')
  t.end()
})

test('callback get correct factor', function (t) {
  var elm = document.createElement('div')
    , emitter = new EventEmitter()
    , slider = createSlider(elm, { width: 120, lineHeight: 2, handleSize: 10 }, function (factor) {
        emitter.emit('factor', factor)
      })

  document.body.appendChild(elm)

  slider.enable()

  emitter.once('factor', function (factor) {
    t.equal(factor, 0.5)
    emitter.once('factor', function (factor) {
      t.equal(factor, 0)
      emitter.once('factor', function (factor) {
        t.equal(factor, 1)
        t.end()
      })

      dom.emit(elm, 'click', {clientX: 120, bubbles: true })
    })

    dom.emit(elm, 'click', { clientX: 0, bubbles: true })
  })

  dom.emit(elm, 'click', { clientX: 60, bubbles: true })
})

test('start disabled', function (t) {
  var elm = document.createElement('div')
    , slider = createSlider(elm, { width: 150, lineHeight: 3, handleSize: 30 }, function () {
        t.fail('callback should not be called')
      })
    , handle
    , line

  document.body.appendChild(elm)

  dom.emit(elm, 'click', { clientX: 85, clientY: 15, bubbles: true })
  process.nextTick(function () { t.end() })
})

test('disabled works as expected', function (t) {
  var elm = document.createElement('div')
    , slider = createSlider(elm, { width: 150, lineHeight: 3, handleSize: 30 }, function () {
        t.fail('callback should not be called')
      })
    , handle
    , line

  document.body.appendChild(elm)

  slider.enable()
  slider.disable()

  dom.emit(elm, 'click', { clientX: 85, clientY: 15, bubbles: true })
  process.nextTick(function () { t.end() })
})