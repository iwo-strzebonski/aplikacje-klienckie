var express = require('express')
var app = express()
const PORT = 3000;

var id

app.get('/:id', function(req, res) {
    id = req.params.id

    switch (id) {
        case '2':
            res.send('Odsyłam stronę użytkownika z ID 2')
            break;

        default:
            res.send('Taki użytkownik nie istnieje')
            break;
    }
})

app.listen(PORT, function() {
    console.log('Start serwera 05 na porcie ' + PORT)
})