var express = require('express')
var serveStatic = require('serve-static')

var path = require('path')

var app = express()
console.log(path.resolve("..", "dist"))
app.use(serveStatic(path.resolve("dist")))
app.listen(3000)