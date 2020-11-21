const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000;

access = false
sort_type = '0'

user_data = [
    { id: 0, login: 'AAA', passwd: 'PASS1', age: 10, student: 'on', gender: 'M' },
    { id: 1, login: 'qq', passwd: 'qq', age: 20, student: 'off', gender: 'F' },
]

function gen_table_sort(sort_type) {
    var out = `<html>\
    <head><link rel='stylesheet' href='css/style.css' /></head>\
    <body style='background-color: #212021; color: white;'>\
    <nav><a href='sort'>sort</a><a href='gender'>gender</a><a href='show'>show</a></nav>\
    <form method='POST' action='/show' onchange='this.submit()'>\
    <input ${sort_type === '0' ? checked='checked' : ''} default type='radio' id='ascending' name='sort_type' value='0' /><label for='ascending'>ascending</label>\
    <input ${sort_type === '1' ? checked='checked' : ''} type='radio' id='descending' name='sort_type' value='1' /><label for='decending'>descending</label>\
    </form><br /><table>`

    switch (sort_type) {
        default:
            user_data = user_data.sort((a, b) => {
                return parseFloat(a.age) - parseFloat(b.age)
            })
            break

        case '1':
            user_data = user_data.sort((a, b) => {
                return parseFloat(b.age) - parseFloat(a.age)
            })
            break
    }

    for (let i = 0; i < user_data.length; i++) {
        out += `<tr><td>id: ${user_data[i].id}</td>`
        out += `<td>user: ${user_data[i].login} - ${user_data[i].passwd}</td>`   
        out += `<td>age: ${user_data[i].age}</td>`           
    }

    return out + '</table>'
}

function gen_table_show() {
    var out = "<html>\
    <head><link rel='stylesheet' href='css/style.css' /></head>\
    <body style='background-color: #212021;'>\
    <nav><a href='sort'>sort</a><a href='gender'>gender</a><a href='show'>show</a></nav>\
    <table>"
    
    for (let i = 0; i < user_data.length; i++) {
        out += `<tr><td>id: ${user_data[i].id}</td>`
        out += `<td>user: ${user_data[i].login} - ${user_data[i].passwd}</td>`
        out += `<td>student: <input type='checkbox' disabled='disabled' ${user_data[i].student === 'on' ? checked='checked' : ''}></td>`       
        out += `<td>age: ${user_data[i].age}</td>`       
        out += `<td>gender: ${user_data[i].gender}</td></tr>`       
    }

    return out + '</table>'
}

function gen_table_gender() {
    var out = "<html>\
    <head><link rel='stylesheet' href='css/style.css' /></head>\
    <body style='background-color: #212021;'>\
    <nav><a href='sort'>sort</a><a href='gender'>gender</a><a href='show'>show</a></nav>"
    
    table1 = '<table>'
    table2 = '<table>'

    for (let i = 0; i < user_data.length; i++) {
        switch (user_data[i].gender) {
            case 'F':
                table1 += `<tr><td>id: ${user_data[i].id}</td>`     
                table1 += `<td>gender: ${user_data[i].gender}</td></tr>`
                break
        
            default:
                table2 += `<tr><td>id: ${user_data[i].id}</td>`     
                table2 += `<td>gender: ${user_data[i].gender}</td></tr>`
                break
        }
    }

    table1 += '</table>'
    table2 += '</table>'

    out += table1 + '<br />' + table2

    return out
}

app.use(express.static('static'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/:site', (req, res) => {
    site = req.params.site

    switch (site) {
        case 'register':
        case 'register.html':
            res.sendFile(path.join(__dirname + '/static/pages/register.html'))
            break

        case 'login':
        case 'login.html':
            res.sendFile(path.join(__dirname + '/static/pages/login.html'))
            break

        case 'admin':
        case 'admin.html':
            res.sendFile(path.join(__dirname + `/static/pages/${access ? 'admin' : 'denied'}.html`))
            break

        case 'logout':
            access = false
            res.redirect('/login')
            res.end()
            break
        
        case 'sort':
            if (access) {
                res.send(gen_table_sort(sort_type))
            } else {
                res.sendFile(path.join(__dirname + '/static/pages/denied.html'))
            }
            break
        
        case 'gender':
            if (access) {
                res.send(gen_table_gender())
            } else {
                res.sendFile(path.join(__dirname + `/static/pages/denied.html`))
            }
            break
        
        case 'show':
            if (access) {
                res.send(gen_table_show())
            } else {
                res.sendFile(path.join(__dirname + '/static/pages/denied.html'))
            }
            break
        
        default:
            res.send('Taka strona nie istnieje')
            break
    }
})

app.post('/show', function(req, res) {
    sort_type = req.body.sort_type

    res.redirect('sort')
    res.end()
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
        user_data.push(req.body)
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
        res.redirect('admin')
    } else {
        res.send('Invalid credentials')
    }

    res.end()
})

app.listen(PORT, () => {
    console.log('Start serwera Projektu 001 na porcie ' + PORT)
})