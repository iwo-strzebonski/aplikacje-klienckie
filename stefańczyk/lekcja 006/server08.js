var express = require('express')
var path = require('path')
var app = express()
const PORT = 3000;

var site

app.use(express.static('static'))

app.get('/:site', function(req, res) {
    site = req.params.site
    console.log(site)

    switch (site) {
        case 'strona1':
        case 'strona1.html':
            res.sendFile(path.join(__dirname + '/static/pages/strona1.html'))
            break;

        case 'strona2':
        case 'strona2.html':
            res.sendFile(path.join(__dirname + '/static/pages/strona2.html'))
            break;

        case 'strona3':
        case 'strona3.html':
            res.sendFile(path.join(__dirname + '/static/pages/strona3.html'))
            break;

        default:
            res.send('Taka strona nie istnieje')
            break;
    }
})

app.listen(PORT, function() {
    console.log('Start serwera 08 na porcie ' + PORT)
})