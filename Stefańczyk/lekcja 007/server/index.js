'use strict'
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
// app.use(express.text())
// app.use(express.urlencoded())

const PORT = 3000

let count = 0

const USERS = [
    { 'id': count, 'user': 'admin', 'pass': 'admin', 'date': new Date() }
]

app.get('/add', function(req, res) {
    if (req.query.user && req.query.pass) {
        if (!USERS.some(el => {return el.user == req.query.user})) {
            count++

            USERS.push({
                'id': count,
                'user': req.query.user,
                'pass': req.query.pass,
                'date': new Date()
            })
            console.log(USERS)

            res.send({'error': false})
        } else {
            res.send({'error': 'USEREXISTS'})
        }
    } else {
        res.send({'error': 'INVALIDDATA'})
    }
})

app.get('/delete', function(req, res) {
    for (const i in USERS) {
        if (USERS[i].id == req.query.id) {
            USERS.splice(i, 1)
        }
    }
    console.log(USERS)

    res.end()
})

app.get('/get', function(req, res) {
    if (req.query.user) {
        res.send(USERS.filter(el => {return el.user == req.query.user}))
    } else { res.send(USERS) }
})

app.listen(PORT, function() {
    console.log('start serwera na porcie ' + PORT)
})
