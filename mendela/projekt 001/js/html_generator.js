/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
    Script for appending HTML elements to Document in Javascript (ES 2020)
 */

var player_cells = []
var bot_cells = []
var width = screen.width

/* Monitors */

for (i = 0; i < 2; i++) {
    monitor = document.createElement('DIV')
    monitor.id = i == 0 ? 'monitorplayer' : 'monitorbot'
    monitor.className = 'monitor'
    document.body.appendChild(monitor)

    crt = document.createElement('DIV')
    crt.className = 'noisy frame scanlines'
    crt.id = i == 0 ? 'player' : 'bot'
    monitor.append(crt)
}

/* Game buttons */

for (i = 0; i < 3; i++) {
    button = document.createElement('BUTTON')
    button.className = 'text-button'
    button.style.color = i == 0 ? 'rgb(255, 255, 0)' : 'rgba(255, 255, 0, 0.5)';
    button.style.pointerEvents = i == 0 ? 'all' : 'none';

    switch (i) {
        case 1:
            button.id = 'reset'
            button.innerHTML = 'Reset<br />ships'
            button.style.top = '241px'
            break

        case 2:
            button.id = 'start'
            button.innerHTML = 'Start<br />game'
            button.style.top = '321px'
            break

        default:
            button.id = 'randomise'
            button.innerHTML = 'Rand<br />ships'
            button.style.top = '161px'
            break
    }
    document.body.append(button)
}

/* Ship buttons */

button_panel = document.createElement('DIV')
button_panel.id = 'button_panel'
document.body.append(button_panel)

for (i = 0; i < 4; i++) {
    screw = document.createElement('IMG')
    screw.src = './gfx/screw.png'
    screw.className = 'screw'
    screw.style.left = i < 2 ? '8px' : '940px'
    screw.style.top = i % 2 == 0 ? '8px' : '104px'
    screw.style.transform = `rotate(${10 * i}deg)`
    button_panel.append(screw)
}

for (i = 0; i < ship_list.length; i++) {
    lamp_button_bg = document.createElement('DIV')
    lamp_button_bg.className = 'lamp_button_bg'
    lamp_button_bg.style.top = i < 5 ? '16px' : '80px'
    
    lamp_button = document.createElement('BUTTON')
    lamp_button.className = 'lamp_button'
    lamp_button.id = `s${i}`
    lamp_button_bg.append(lamp_button)
    
    ship_div_bg = document.createElement('DIV')
    ship_div_bg.className = 'ship_div_bg'
    ship_div_bg.style.top = i < 5 ? '16px' : '80px'

    switch (i) {
        default:
        case 5:
            ship_div_bg.style.left = '96px'
            lamp_button_bg.style.left = '48px'
            break

        case 1:
        case 6:
            ship_div_bg.style.left = '288px'
            lamp_button_bg.style.left = '240px'
            break

        case 2:
        case 7:
            ship_div_bg.style.left = '480px'
            lamp_button_bg.style.left = '432px'
            break

        case 3:
        case 8:
            ship_div_bg.style.left = '672px'
            lamp_button_bg.style.left = '624px'
            break

        case 4:
        case 9:
            ship_div_bg.style.left = '864px'
            lamp_button_bg.style.left = '816px'
            break
    }

    button_panel.append(lamp_button_bg)

    ship_div_bg.style.width = ship_list[i] * 19 + 12.6 + 'px'
    button_panel.append(ship_div_bg)

    for (j = 0; j < 4; j++) {
        rivet = document.createElement('IMG')
        rivet.src = './gfx/rivet.png'
        rivet.className = 'rivet'
        rivet.style.left = j < 2 ? '-3.5px' : `${ship_div_bg.style.width.replace('px', '') - 6}px`
        rivet.style.top = j % 2 == 0 ? '-3.5px' : '21.5px'
        ship_div_bg.append(rivet)
    }

    for (j = 0; j < ship_list[i]; j++) {
        ship_div = document.createElement('DIV')
        ship_div.className = 'ship_div'
        ship_div.style.left = j * 19 + 6 + 'px'
        ship_div.style.top = '4px'
        ship_div_bg.append(ship_div)
    }
}

document.getElementsByClassName('lamp_button')[0].style.backgroundColor = 'rgb(255, 255, 0)'
document.getElementsByClassName('lamp_button')[0].style.pointerEvents = 'none'

/* CRT noise */

crt_list = document.getElementsByClassName('noisy')

for (n = 0; n < 2; n++) {
    for (j = 1; j < 11; j++) {
        for (i = 1; i < 11; i++) {
            cell = document.createElement("DIV")
            cell.style.top = 32 * (j - 1) + "px"
            cell.style.left = 32 * (i - 1) + "px"
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