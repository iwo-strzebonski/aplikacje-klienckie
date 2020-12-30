/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
	Events script in Javascript (ES 2020)
 */

var button_list = document.getElementsByTagName('button')
var panel = document.getElementById('button_panel')
var lamp_buttons = panel.getElementsByTagName('BUTTON')
var player = document.getElementById('player')
var bot = document.getElementById('bot')
var randomise = document.getElementById('randomise')
var reset = document.getElementById('reset')
var start = document.getElementById('start')

function events_startup() {
    panel.onclick = function(e) {
        if (placed_ships < ship_list.length && e.target.tagName == 'BUTTON') {
            lamp_buttons_onclick(e)
        }
    }

    player.oncontextmenu = function(e) {
        direction = direction == 0 ? 1 : 0
        hover_ship(e, direction, player_cells)
    }
    player.onmouseover = function(e) {
        if (e.target.id == 'player') {
            ship_presenter('player', player_cells, hit_by_bot)
        }
        hover_ship(e, direction, player_cells)
    }
    player.onclick = function(e) {
        place_ship(e)
    }
    player.onmouseleave = function() {
        ship_presenter('player', player_cells, hit_by_bot)

        for (i = 0; i < player.childNodes.length; i++) {
            player.childNodes[i].innerHTML = ''
        }
    }

    randomise.onmouseleave = function() {
        this.style.backgroundColor = '#121212'
    }
    randomise.onmousedown = function() {
        this.style.backgroundColor = '#080808'
    }
    randomise.onmouseup = function() {
        player.onmouseover = function() { ship_presenter('player', player_cells, hit_by_bot) }
        player.onmouseleave = function() { ship_presenter('player', player_cells, hit_by_bot) }

        hover_bool = false

        player_cells = generate_ships(player_cells)
        ship_presenter('player', player_cells, hit_by_bot)
        
        randomise.style.pointerEvents = 'none'
        randomise.style.backgroundColor = '#121212'
        randomise.style.color = 'rgba(255, 255, 0, 0.5)'

        reset.style.pointerEvents = 'all'
        reset.style.color = 'rgb(255, 255, 0)'

        start.style.pointerEvents = 'all'
        start.style.color = 'rgb(255, 255, 0)'

        for (i = 0; i < lamp_buttons.length; i++) {
            lamp_buttons[i].style.pointerEvents = 'none'
            lamp_buttons[i].style.backgroundColor = 'rgb(255, 0, 0)'
        }
    }

    reset.onmousedown = function() {
        this.style.backgroundColor = '#080808'
    }
    reset.onmouseleave = function() {
        this.style.backgroundColor = '#121212'
    }
    reset.onmouseup = function() {
        
        hover_bool = true
        player_cells = []

        for (i = 0; i < 12; i++) {
            row = []
            for (j = 0; j < 12; j++) {
                row.push(0)
            }
            player_cells.push(row)
        }

        ship_presenter('player', player_cells, hit_by_bot)

        reset.style.pointerEvents = 'none'
        reset.style.backgroundColor = '#121212'
        reset.style.color = 'rgba(255, 255, 0, 0.5)'

        randomise.style.pointerEvents = 'all'
        randomise.style.color = 'rgb(255, 255, 0)'

        start.style.pointerEvents = 'none'
        start.style.color = 'rgba(255, 255, 0, 0.5)'

        for (i = 0; i < lamp_buttons.length; i++) {
            lamp_buttons[i].style.pointerEvents = 'all'
            lamp_buttons[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        }

        placed_ships = 0
    }

    start.onmousedown = function() {
        this.style.backgroundColor = '#080808'
    }
    start.onmouseleave = function() {
        this.style.backgroundColor = '#121212'
    }
    start.onmouseup = function() {
        player.onmouseover = function() { ship_presenter('player', player_cells, hit_by_bot) }
        player.onmouseleave = function() { ship_presenter('player', player_cells, hit_by_bot) }

        bot_cells = generate_ships(bot_cells)
        // ship_presenter('bot', bot_cells, hit_by_player)

        start.style.backgroundColor = '#121212'

        for (i = 0; i < button_list.length; i++) {
            button_list[i].style.pointerEvents = 'none'
            button_list[i].style.color = 'rgba(255, 255, 0, 0.5)'
        }

        for (i = 0; i < lamp_buttons.length; i++) {
            lamp_buttons[i].style.pointerEvents = 'none'
        }

        for (i = 0; i < player.childNodes.length; i++) {
            player.childNodes[i].style.cursor = 'context-menu'
        }

        for (i = 0; i < bot.childNodes.length; i++) {
            bot.childNodes[i].style.cursor = 'crosshair'
        }

        end_of_game = false
        start_game()
    }
}

events_startup()