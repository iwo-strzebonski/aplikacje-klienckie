const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")

const app = express()
const PORT = 3000;

var site
var access = false

user_data = [
    { id: 0, login: 'AAA', passwd: 'PASS1', age: 10, student: 'on', gender: 'M' },
]

app.use(express.static('static'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'))
})

app.get('/:site', function(req, res) {
    site = req.params.site

    switch (site) {
        case 'index.html':
            res.sendFile(path.join(__dirname + '/static/index.html'))
            break;

        case 'register':
        case 'register.html':
            res.sendFile(path.join(__dirname + '/static/pages/register.html'))
            break;

        case 'login':
        case 'login.html':
            res.sendFile(path.join(__dirname + '/static/pages/login.html'))
            break;

        case 'admin':
        case 'admin.html':
            if (access) {
                res.sendFile(path.join(__dirname + '/static/pages/admin.html'))
            } else {
                res.sendFile(path.join(__dirname + '/static/pages/denied.html'))
            }
            break;

        default:
            res.send('Taka strona nie istnieje')
            break;
    }
})

app.post('/register', (req, res) => {
    var bool = false

    for (let i = 0; i < user_data.length; i++) {
        bool = req.body.login === user_data[i].login ? false : true
    }

    if (bool) {
        res.send('Hello ' + req.body.login + '!')
        req.body.id = user_data.length
        req.body.student = req.body.student === undefined ? 'off' : 'on'
        user_data.push(req.body.id)
    } else {
        res.send('User with that login already exists!')
    }

    res.end()
})

app.listen(PORT, function() {
    console.log('Start serwera Projektu 001 na porcie ' + PORT)
})