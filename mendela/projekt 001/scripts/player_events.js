/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
	Player events script in Javascript (ES 2020)
 */

reset.style.pointerEvents = 'none'
start.style.pointerEvents = 'none'

randomise.onmousedown = function() {
    randomise.style.backgroundColor = '#080808'
    player_cells = generate_ships(player_cells)
    ship_presenter('player', player_cells)
}

randomise.onmouseup = function() {
    randomise.style.pointerEvents = 'none'
    randomise.style.backgroundColor = '#121212'
    randomise.style.color = 'rgba(255, 255, 0, 0.5)'

    reset.style.pointerEvents = 'all'
    reset.style.color = 'rgb(255, 255, 0)'

    start.style.pointerEvents = 'all'
    start.style.color = 'rgb(255, 255, 0)'
}

reset.onmousedown = function() {
    reset.style.backgroundColor = '#080808'
    player_cells = []

    for (i = 0; i < 12; i++) {
        row = []
        for (j = 0; j < 12; j++) {
            row.push(0)
        }
        player_cells.push(row)
    }

    ship_presenter('player', player_cells)
}

reset.onmouseup = function() {
    reset.style.pointerEvents = 'none'
    reset.style.backgroundColor = '#121212'
    reset.style.color = 'rgba(255, 255, 0, 0.5)'

    randomise.style.pointerEvents = 'all'
    randomise.style.color = 'rgb(255, 255, 0)'

    start.style.pointerEvents = 'none'
    start.style.color = 'rgba(255, 255, 0, 0.5)'
}

start.onmousedown = function() {
    start.style.backgroundColor = '#080808'
}

start.onmouseup = function() {
    randomise.style.pointerEvents = 'none'
    randomise.style.color = 'rgba(255, 255, 0, 0.5)'

    reset.style.pointerEvents = 'none'
    reset.style.color = 'rgba(255, 255, 0, 0.5)'

    start.style.backgroundColor = '#121212'
    start.style.color = 'rgba(255, 255, 0, 0.5)'
    start.style.pointerEvents = 'none'
}