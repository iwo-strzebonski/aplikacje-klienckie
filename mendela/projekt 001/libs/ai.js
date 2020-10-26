/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
	JavaScript (ES 2020) library file (AI)
 */

function bot_attack() {
    if (turn == 1) {
        setTimeout(() => {
            random_cell()
            ship_presenter('player', player_cells, hit_by_bot)
            turn = 0
            return count_bot
        }, timeout)
    }
}

function random_cell() {
    while (hit_by_bot[y][x] != 0) {
        x = randomBetween(0, 9)
        y = randomBetween(0, 9)
    }

    hit_by_bot[y][x] = player_cells[y + 1][x + 1] == 1 ? 3 : 4
    count_bot = player_cells[y + 1][x + 1] == 1 ? count_bot + 1 : count_bot

    old_x = x
    old_y = y
}