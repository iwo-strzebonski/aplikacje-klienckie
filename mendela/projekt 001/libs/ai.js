/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
	JavaScript (ES 2020) library file (AI)
 */

async function bot_attack() {
    while (turn == 1) {
        await new Promise(r => setTimeout(r, timeout))
        // var xy = salvo_count == 50 ? random_cell() : checkerboard_salvo()
        var xy = salvo_cells.length == 0 ? random_cell() : opening_salvo()

        empty_cells(hit_by_bot, xy[0], xy[1])
        ship_presenter('player', player_cells, hit_by_bot)
        turn = player_cells[y + 1][x + 1] == 1 ? 1 : 0
    }
}

function random_cell() {
    while (hit_by_bot[y][x] != null) {
        x = randomBetween(0, 9)
        y = randomBetween(0, 9)
    }

    hit_by_bot[y][x] = player_cells[y + 1][x + 1] == 1 ? 3 : 4
    count_bot = player_cells[y + 1][x + 1] == 1 ? count_bot + 1 : count_bot

    return [x, y]
}

function checkerboard_salvo() {
    while (hit_by_bot[y][x] != null) {
        y = randomBetween(0, 9)
        while (true) {
            if (y % 2 == 0 && x % 2 == 0) break
            else if (y % 2 == 1 && x % 2 == 1) break
            else x = randomBetween(0, 9)
        }
    }

    hit_by_bot[y][x] = player_cells[y + 1][x + 1] == 1 ? 3 : 4
    count_bot = player_cells[y + 1][x + 1] == 1 ? count_bot + 1 : count_bot

    salvo_count += 1

    return [x, y]
}

function opening_salvo() {
    var xy = '00'
    while (!salvo_cells.includes(xy)) {
        x = randomBetween(0, 9)
        y = randomBetween(0, 9)
        xy = x.toString() + y.toString()
    }

    salvo_cells.splice(salvo_cells.indexOf(xy))

    hit_by_bot[y][x] = player_cells[y + 1][x + 1] == 1 ? 3 : 4
    count_bot = player_cells[y + 1][x + 1] == 1 ? count_bot + 1 : count_bot

    return [x, y]
}