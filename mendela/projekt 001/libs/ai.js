/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
	JavaScript (ES 2020) library file (AI)
 */

var checkerboard_count = 0
var hit = false

function bot_attack() {
    while (turn == 1) {
        var start = Date.now()
        while (Date.now() - start < timeout) {}
        var xy = checkerboard_count == 50 ? random_cell() : checkerboard_salvo()

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
    hit = player_cells[y + 1][x + 1] == 1

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
    hit = player_cells[y + 1][x + 1] == 1

    checkerboard_count = 0

    for (j = 0; j < 10; j++) {
        for (i = 0; i < 10; i++) {
            if (hit_by_bot[j][i] == 3 || hit_by_bot[j][i] == 4 || hit_by_bot[j][i] == 5) checkerboard_count++
        }
    }

    return [x, y]
}

/*function destroy_ship(x, y) {
    direction = randomBetween(0, 4)
}*/