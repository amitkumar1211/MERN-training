var express = require('express')
var app = express()

// define middleware function
function logger(req, res, next) {
   console.log(new Date(), req.url)
   next()
}

// calls logger:middleware for each request-response cycle
app.use(logger)

// route that gets executed for the path '/'
app.get('/', function (req, res) {
   res.send('This is a basic Example of logger')
})

// start the server
var server = app.listen(8000, function(){
    console.log('Listening on port 8000...')
})
