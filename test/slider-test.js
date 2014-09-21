var dom = require('dom-events')
  , test = require('tape')

  , slider = require('../lib/slider')

test('initialize', function (t) {
  var elm = document.createElement('div')
    , jack
    , line

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

  slider(elm, { width: 150, lineHeight: 3, jackSize: 30 })

  jack = elm.querySelector('.jack')
  line = elm.querySelector('.line')

  dom.emit(line, 'click', { clientX: 100, bubbles: true })

  t.equal(jack.style.left, '85px') // jack should be in middle of click, e.g 15px jack on each side
  t.equal(jack.style.top, '0px')

  t.end()
})
