/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
	Events script in Javascript (ES 2020)
 */

var button_list = document.getElementsByTagName('button')
var player = document.getElementById('player')
var randomise = document.getElementById('randomise')
var reset = document.getElementById('reset')
var start = document.getElementById('start')

player.onmouseover = function(e) {
    console.log(e.target.style.left.replace('px', '') / 32, e.target.style.top.replace('px', '') / 32)
}

randomise.onmousedown = function() {
    this.style.backgroundColor = '#080808'
}
reset.onmousedown = function() {
    this.style.backgroundColor = '#080808'
}
start.onmousedown = function() {
    this.style.backgroundColor = '#080808'
}

randomise.onmouseup = function() {
    player_cells = generate_ships(player_cells)
    ship_presenter('player', player_cells)
    
    randomise.style.pointerEvents = 'none'
    randomise.style.backgroundColor = '#121212'
    randomise.style.color = 'rgba(255, 255, 0, 0.5)'

    reset.style.pointerEvents = 'all'
    reset.style.color = 'rgb(255, 255, 0)'

    start.style.pointerEvents = 'all'
    start.style.color = 'rgb(255, 255, 0)'
}

reset.onmouseup = function() {
    player_cells = []

    for (i = 0; i < 12; i++) {
        row = []
        for (j = 0; j < 12; j++) {
            row.push(0)
        }
        player_cells.push(row)
    }

    ship_presenter('player', player_cells)

    reset.style.pointerEvents = 'none'
    reset.style.backgroundColor = '#121212'
    reset.style.color = 'rgba(255, 255, 0, 0.5)'

    randomise.style.pointerEvents = 'all'
    randomise.style.color = 'rgb(255, 255, 0)'

    start.style.pointerEvents = 'none'
    start.style.color = 'rgba(255, 255, 0, 0.5)'
}

start.onmouseup = function() {
    bot_cells = generate_ships(bot_cells)
    ship_presenter('bot', bot_cells)

    start.style.backgroundColor = '#121212'

    for (i = 0; i < button_list.length; i++) {
        button_list[i].style.pointerEvents = 'none'
        button_list[i].style.color = 'rgba(255, 255, 0, 0.5)'
    }
}