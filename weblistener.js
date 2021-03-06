var path = require('path')
var express = require('express')
var api = require('zenircbot-api')
var zen = new api.ZenIRCBot()
var config = api.load_config(path.join(__dirname, 'weblistener.json'))
var app = express()


zen.register_commands('weblistener.js', [])

app.use(express.bodyParser())

app.post('/:app', function(req, res) {
  console.log(req.params.app)
  var message = {
    app: req.params.app,
    body: req.body
  };
  var sending = JSON.stringify(message)
  console.log(sending)
  zen.redis.publish('web_in', sending)
  res.send('', 200)
})

app.listen(config.port)
