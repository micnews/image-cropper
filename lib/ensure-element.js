var ensure = function (container, className) {
      var element = container.getElementsByClassName(className)[0]

      if (!element) {
        element = document.createElement('div')
        element.setAttribute('class', className)
        container.appendChild(element)
      }

      return element
    }

module.exports = ensure