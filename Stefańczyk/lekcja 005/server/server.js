const express = require('express')
const data = require('./data.json')
const PORT = 4000
const app = express()

app.listen(PORT, () => {
    console.log('App listening on port: ' + PORT)
})

app.get('/json', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(data))
})
