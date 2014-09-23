var ensure = function (options) {
      var element = options.container.getElementsByClassName(options.className)[0]

      if (!element) {
        element = document.createElement('div')
        element.setAttribute('class', options.className)
        options.container.appendChild(element)
      }

      return element
    }

module.exports = ensure