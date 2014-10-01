var fs = require('fs')
  , serveBrowserify = require('serve-browserify')({
        root: __dirname
      , debug: true
      , gzip: true
    })

require('http').createServer(function (req, res) {
  if (req.url === '/client.js') {
    serveBrowserify(req, res)
  } else if (req.url === '/image.jpg' || req.url === '/image2.jpg') {
    res.writeHead(200, { 'content-type': 'image/jpeg'})
    fs.createReadStream(__dirname + req.url).pipe(res)
  } else {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream(__dirname + '/index.html').pipe(res)
  }

}).listen(3000, function () {
  console.log('example page loaded on port 3000')
})