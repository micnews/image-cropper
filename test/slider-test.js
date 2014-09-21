var dom = require('dom-events')
  , test = require('tape')

  , slider = require('../lib/slider')

test('initialize', function (t) {
  var elm = document.createElement('div')
    , jack
    , line

  document.body.appendChild(elm)

  slider(elm, { width: 200, jackSize: 20, lineHeight: 2 })

  t.equal(elm.style.width, '200px')
  t.equal(elm.style.height, '20px')
  t.equal(elm.style.position, 'relative')

  jack = elm.querySelector('.jack')

  t.ok(jack)
  if (jack) {
    t.equal(jack.style.position, 'absolute')
    t.equal(jack.style.width, '20px')
    t.equal(jack.style.height, '20px')
    t.equal(jack.style.left, '0px')
    t.equal(jack.style.top, '0px')
  }

  line = elm.querySelector('.line')
  t.ok(line)

  if (line) {
    t.equal(line.style.position, 'absolute')
    t.equal(line.style.width, '180px') // line of slider - space for jack
    t.equal(line.style.height, '2px')
    t.equal(line.style.left, '10px')
    t.equal(line.style.top, '9px') // vertically in the middle
  }

  t.end()
})

test('click exactly on line', function (t) {
  var elm = document.createElement('div')
    , jack
    , line

  document.body.appendChild(elm)

  slider(elm, { width: 150, lineHeight: 3, jackSize: 30 })

  jack = elm.querySelector('.jack')
  line = elm.querySelector('.line')

  // clientX: 100 => offsetX: 85 (line has left: 15px)
  dom.emit(line, 'click', { clientX: 100, bubbles: true })

  // jack should be in middle of click, e.g 15px jack on each side
  // offsetX (see above) is 85, so then jack.style.left === 70px
  t.equal(jack.style.left, '70px')
  t.equal(jack.style.top, '0px')

  t.end()
})

test('click inside container', function (t) {
  var elm = document.createElement('div')
    , jack

  document.body.appendChild(elm)

  slider(elm, { width: 140, lineHeight: 4, jackSize: 10 })
  jack = elm.querySelector('.jack')

  dom.emit(elm, 'click', { clientX: 100, clientY: 2, bubbles: true })

  t.equal(jack.style.left, '95px')
  t.equal(jack.style.top, '0px')

  dom.emit(elm, 'click', { clientX: 0, clientY: 0, bubbles: true })

  t.equal(jack.style.left, '0px')
  t.equal(jack.style.top, '0px')


  dom.emit(elm, 'click', { clientX: 140, clientY: 0, bubbles: true })

  t.equal(jack.style.left, '130px')

  t.end()
})