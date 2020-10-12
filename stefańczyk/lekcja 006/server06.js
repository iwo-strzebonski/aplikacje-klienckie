var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
const PORT = 3000;

app.use(cookieParser())

app.get('/', function(req, res) {
    res
        .cookie('cookieA', 'aaa', {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 4),
            httpOnly: true
        })
        .send('cookieA zostało ustawione')

    console.log('cookies :  ', req.cookies);

});

app.listen(PORT, function() {
    console.log('Start serwera 06 na porcie ' + PORT)
})