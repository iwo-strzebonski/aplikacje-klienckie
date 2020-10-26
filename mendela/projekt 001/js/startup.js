const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
const timeout = 100
const ship_list = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
// const ship_list = [5, 4, 3, 3, 2, 2, 2]

ship_cells_number = 0
ship_list.forEach(ship => {
    ship_cells_number += ship
})

function startup() {
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
    x = randomBetween(0, 9)
    y = randomBetween(0, 9)
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

    hit_by_player = []
    for (i = 0; i < 10; i++) {
        row = []
        for (j = 0; j < 10; j++) {
            row.push(0)
        }
        hit_by_player.push(row)
    }

    hit_by_bot = []
    for (i = 0; i < 10; i++) {
        row = []
        for (j = 0; j < 10; j++) {
            row.push(0)
        }
        hit_by_bot.push(row)
    }
}

startup()