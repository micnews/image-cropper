var dom = require('dom-events')
  , test = require('tape')

  , navigation = require('../lib/navigation')

test('navigation.enable should only call callback once', function (t) {
  var container = document.createElement('div')
    , nav = navigation({ container: container, images: [] })
    , saveBtn = container.querySelector('.save')
    , cancelBtn = container.querySelector('.cancel')

  nav.enable(function () {
    // if enable is ran more than once, this will be an error since you're only allowed to call
    // t.end once

    t.end()
  })

  document.body.appendChild(container)

  dom.emit(saveBtn, 'click', { bubbles: true })
  // the eventemitter should be removed from the cancel event when .enable has finished
  dom.emit(saveBtn, 'click', { bubbles: true })
  dom.emit(cancelBtn, 'click', { bubbles: true })
  dom.emit(cancelBtn, 'click', { bubbles: true })
})