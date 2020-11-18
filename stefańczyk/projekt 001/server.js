const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000;

var site
access = false

user_data = [
    { id: 0, login: 'AAA', passwd: 'PASS1', age: 10, student: 'on', gender: 'M' },
]

app.use(express.static('static'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/:site', function(req, res) {
    site = req.params.site

    switch (site) {
        case 'register':
        case 'register.html':
            access = false
            res.sendFile(path.join(__dirname + '/static/pages/register.html'))
            break

        case 'login':
        case 'login.html':
            access = false
            res.sendFile(path.join(__dirname + '/static/pages/login.html'))
            break

        case 'admin':
        case 'admin.html':
            var data = fs.readFileSync(path.join(__dirname + '/static/pages/admin.html'), 'utf8')
            if (access) {
                res.send(data
                    .replace('<h1></h1>','<h1>admin page</h1>')
                    .replace('<nav></nav>', "<div class='nav'><a href='sort'>sort</a><a href='gender'>gender</a><a href='show'>show</a></div>")
                    .replace(" style='display: none;'", ''))
            } else { res.send(data.replace('<h1></h1>','<h1>access denied</h1>')) }
            break

        case 'logout':
            access = false
            res.redirect('/login')
            res.end()
            break

        default:
            res.send('Taka strona nie istnieje')
            break
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

app.post('/login', (req, res) => {
    var bool = false

    for (let i = 0; i < user_data.length; i++) {
        if (req.body.login === user_data[i].login &&
            req.body.passwd === user_data[i].passwd) {
                bool = true
                break
            } else { bool = false }
    }

    if (bool) {
        access = true
        res.redirect('admin');
    } else {
        res.send('Invalid credentials')
    }

    res.end()
})

app.listen(PORT, function() {
    console.log('Start serwera Projektu 001 na porcie ' + PORT)
})