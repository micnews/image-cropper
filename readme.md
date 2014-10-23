# image-cropper

Vanilla js-widget for the browser dealing with cropping images

[![NPM](https://nodei.co/npm/image-cropper.png?downloads&stars)](https://nodei.co/npm/image-cropper/)

[![NPM](https://nodei.co/npm-dl/image-cropper.png)](https://nodei.co/npm/image-cropper/)

## Usage
```js
var container = document.querySelector('#image-cropper-wrapper')

// the image cropper will be appended to the container-element
// the callback will be called when the image-cropper has finished loading
imageCropper(container, { width: 500, height: 268, src: 'image.jpg' }, function (err, cropper) {

  // enabling the image-cropper opens up the actually cropping view,
  // and then the callback is ran when the user has exited that view
  cropper.enable(function (err, results) {
    // results.save === true -> user pressed the save-button
    // results.save === false -> user pressed the cancel-button
  })


  // change the image that is being cropped
  cropper.changeImage({ src: 'image2.jpg' }, function () {})
})
```

For more information on how to use the image-cropper, see the [example](https://github.com/micnews/image-cropper/tree/master/example).

## Installation

```
npm install image-cropper
```

## Licence

Copyright (c) 2014 Mic Network, Inc

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
