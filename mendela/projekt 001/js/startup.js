/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
    Script for defining and re-setting variables in Javascript (ES 2020)
 */

/*
  Generator's directions:
    0: up
    1: right

  Cell state:
    Placement phase:
      0: empty
      1: ship
      2: protected
    Shooting phase:
      null: not yet tested
	  3: hit
      4: missed
      5: empty
 */

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
const timeout = 500
const mode = 1
const ship_list = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

ship_cells_number = 0
ship_list.forEach(ship => {
    ship_cells_number += ship
})

function startup() {
    salvo_count = 0
    salvo_cells = [
        '10', '60',
        '31', '81',
        '02', '52',
        '23', '73',
        '44', '94',
        '15', '65',
        '36', '86',
        '07', '57',
        '28', '78',
        '49', '99'
    ]
    
    result = 0
    state = 0
    cell = 0
    row = 0
    child = ''
    placed_ships = 0
    
    direction = 0
    ship = 4
    last = 0
    hover_bool = true

    turn = 0
    restart = false
    end_of_game = false
    count_player = 0

    count_bot = 0
    x = 0
    y = 0
    old_x = 0
    old_y = 0

    player_cells = []
    for (i = 0; i < 12; i++) {
        row = []
        for (j = 0; j < 12; j++) {
            row.push(0)
        }
        player_cells.push(row)
    }

    bot_cells = []
    for (i = 0; i < 12; i++) {
        row = []
        for (j = 0; j < 12; j++) {
            row.push(0)
        }
        bot_cells.push(row)
    }

    bot_empty = []
    for (i = 0; i < 12; i++) {
        row = []
        for (j = 0; j < 12; j++) {
            row.push(0)
        }
        bot_empty.push(row)
    }

    hit_by_player = []
    for (i = 0; i < 10; i++) {
        row = []
        for (j = 0; j < 10; j++) {
            row.push(null)
        }
        hit_by_player.push(row)
    }

    hit_by_bot = []
    for (i = 0; i < 10; i++) {
        row = []
        for (j = 0; j < 10; j++) {
            row.push(null)
        }
        hit_by_bot.push(row)
    }
}

startup()
