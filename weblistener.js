var api = require('zenircbot-api')
var bot_config = api.load_config('../../bot.json')
var zen = new api.ZenIRCBot(bot_config.redis.host,
                            bot_config.redis.port,
                            bot_config.redis.db)
var weblistener_config = api.load_config('./weblistener.json')
var express = require('express')
var app = express();


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

app.listen(weblistener_config.port)
