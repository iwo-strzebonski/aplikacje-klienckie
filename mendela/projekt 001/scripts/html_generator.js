/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
    Script for adding HTML elements to body in Javascript (ES 2020)
 */

var randomise, reset, start
var player_cells = []
var row = []
var cell, monitor, crt, crt_list
var width = screen.width

randomise = document.createElement('BUTTON')
randomise.style.top = '161px'
randomise.id = 'randomise'
randomise.innerHTML = 'Rand<br />ships'
randomise.style.color = 'rgb(255, 255, 0)'
document.body.append(randomise)

reset = document.createElement('BUTTON')
reset.style.top = '241px'
reset.id = 'reset'
reset.innerHTML = 'Reset<br />ships'
document.body.append(reset)

start = document.createElement('BUTTON')
start.style.top = '321px'
start.id = 'start'
start.innerHTML = 'Start<br />game'
document.body.append(start)

monitor = document.createElement('DIV')
crt = document.createElement('DIV')
crt.className = 'noisy frame scanlines'
monitor.className = 'monitor'
crt.id = 'bot'
monitor.append(crt)
monitor.id = 'monitorbot'
monitor.style.left = width / 2 + 64 + 'px'
document.body.appendChild(monitor)

monitor = document.createElement('DIV')
crt = document.createElement('DIV')
crt.className = 'noisy frame scanlines'
monitor.className = 'monitor'
crt.id = 'player'
monitor.append(crt)
monitor.id = 'monitorplayer'
monitor.style.left = width / 2 - 482 + 'px'
document.body.appendChild(monitor)

crt_list = document.getElementsByClassName('noisy')

for (n = 0; n < 2; n++) {
    for (j = 1; j < 11; j++) {
        for (i = 1; i < 11; i++) {
            cell = document.createElement("DIV")
            cell.style.top = 32 * (j - 1) + "px"
            cell.style.left = 32 * (i - 1) + "px"
            cell.style.backgroundColor ='transparent'
            cell.style.borderColor = 'rgba(0, 255, 65, 0.5)'
            cell.className = 'scanlines cell'
            crt_list[n].appendChild(cell)
        }
    }
}

function color() {
    for (i = 0; i < crt_list.length; i++) {
        crt_list[i].style.backgroundColor = crt_list[i].style.backgroundColor == 'rgb(5, 45, 20)' ? 'rgb(6, 53, 24)' : 'rgb(5, 45, 20)'
    }
}

window.setInterval(color, 10)