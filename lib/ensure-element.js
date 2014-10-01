var ensure = function (options) {
      var element = options.container.getElementsByClassName(options.className)[0]
        , nodeName = options.nodeName || 'div'

      if (!element) {
        element = document.createElement(nodeName)
        element.setAttribute('class', options.className)
        if (options.innerHTML) {
          element.innerHTML = options.innerHTML
        }
        options.container.appendChild(element)
      }

      return element
    }

module.exports = ensure