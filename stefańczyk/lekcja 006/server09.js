var express = require('express')
var app = express()
const PORT = 3000;

var div, count, bg

app.use(express.static('static'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/divs.html'))
        /*console.log(req.query)
        count = req.query.count
        bg = req.query.bg
        for (i = 0; i < count; i++) {
            div = document.createElement('DIV')
            div.style.backgroundColor = bg
            div.innerHTML = i + 1
            document.body.append(div)
        }*/
})

app.listen(PORT, function() {
    console.log('Start serwera 09 na porcie ' + PORT)
})