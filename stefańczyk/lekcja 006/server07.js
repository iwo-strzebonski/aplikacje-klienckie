var express = require('express')
var app = express()
const PORT = 3000;

app.get('/', function(req, res) {
    res.status(404).send('Brak strony takiego produktu')
})

app.listen(PORT, function() {
    console.log('Start serwera 07 na porcie ' + PORT)
})