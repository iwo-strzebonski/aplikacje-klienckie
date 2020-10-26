/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
	JavaScript (ES 2020) library file (used for game mechanics)
 */

/*
  Cell state:
    0: empty
    1: ship
    2: protected
    3: hit
    4: missed
 */

function start_game(e) {
    player.onclick = function(e) {
        if (e.target.id != 'player') {
            window.alert('Admirale, czy Wy naprawdę chcecie strzelić w jeden ze swoich statków?')
        }
    }

    bot.onmouseover = function(e) {
        hover_enemy(e)
    }
    bot.onmouseleave = function() {
        ship_presenter('bot', bot_cells, hit_by_player)
    }
    bot.onclick = function(e) {
        if (!end_of_game) {
            if (turn == 0) {
                player_attack(e)

                if (count_player == ship_cells_number) {
                    victory(0)
                    end_of_game = true
                } else {
                    bot_attack()
                }
                if (count_bot == ship_cells_number) {
                    victory(1)
                    end_of_game = true
                }
            } else {
                window.alert('Teraz jest kolej przeciwnika!')
            }
        }
    }
}

function hover_enemy(e) {
	var x = e.target.style.left.replace('px', '') / 32
    var y = e.target.style.top.replace('px', '') / 32

    ship_presenter('bot', bot_cells, hit_by_player)

    bot.childNodes[10 * y + x].innerHTML = '+'
    
    e.target.onmouseout = function() {
        bot.childNodes[10 * y + x].innerHTML = ''
    }
}

function player_attack(e) {
    var x = e.target.style.left.replace('px', '') / 32
    var y = e.target.style.top.replace('px', '') / 32

    if (hit_by_player[y][x] == 0) {
        hit_by_player[y][x] = bot_cells[y + 1][x + 1] == 1 ? 3 : 4
        count_player = bot_cells[y + 1][x + 1] == 1 ? count_player + 1 : count_player
        turn = 1
    } else {
        window.alert('Tutaj już strzelałeś!')
    }

    ship_presenter('bot', bot_cells, hit_by_player)
    return count_player
}


function victory(who) {
    restart = window.confirm(`${who == 0 ? 'Wygrałeś' : 'Przegrałeś'}!\nUruchomić ponownie grę?`)
    if (restart) restart_game()
}

function restart_game() {
    startup()

    events_startup()
    bot.onmouseover = function() {}
    bot.onmouseleave = function() {}
    bot.onclick = function() {}

    for (i = 0; i < player.childNodes.length; i++) {
        player.childNodes[i].style.cursor = 'move'
    }
    for (i = 0; i < bot.childNodes.length; i++) {
        bot.childNodes[i].style.cursor = 'context-menu'
    }

    ship_presenter('player', player_cells, hit_by_bot)
    ship_presenter('bot', bot_cells, hit_by_player)

    randomise.style.pointerEvents = 'all'
    randomise.style.color = 'rgb(255, 255, 0)'

    document.getElementsByClassName('lamp_button')[0].style.backgroundColor = 'rgb(255, 255, 0)'
    for (i = 1; i < lamp_buttons.length; i++) {
        lamp_buttons[i].style.pointerEvents = 'all'
        lamp_buttons[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
    }
}