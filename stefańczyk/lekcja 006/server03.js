var express = require('express')
var app = express()
const PORT = 3000;
var path = require('path')

app.get('/', function(req, res) {
    console.log('Ścieżka do katalogu głównego aplikacji: ' + __dirname)
    res.sendFile(path.join(__dirname + '/static/strona.html'))
})

app.get('/strona', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/strona.html'))
    console.log(__dirname)
})

app.use(express.static('static'))

app.listen(PORT, function() {
    console.log('Start serwera 03 na porcie ' + PORT)
})