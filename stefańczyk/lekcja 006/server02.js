var express = require('express')
var app = express()
const PORT = 3000;

app.get('/', function(req, res) {
    res.send('Dane html odesłane z serwera do przeglądarki')
})

app.listen(PORT, function() {
    console.log('Start serwera 02 na porcie ' + PORT)
})