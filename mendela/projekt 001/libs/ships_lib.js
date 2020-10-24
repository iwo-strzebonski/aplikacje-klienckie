/*
  Generator's directions:
    0: up
    1: right

  Cell state:
    0: empty
    1: ship
    2: protected
 */

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
const ship_list = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

var result, state, cell, direction, row, child
var placed_ships = 0
var frame = document.getElementById('bot')

function check_for_ship(list, d, s) {
	if (d === 0) {
		for (i = -1; i <= 1; i++) {
			for (j = -1; j <= s; j++) {
				if (list[row + j][cell + i] === 0) {
					state += 1
				} else if (list[row + j][cell + i] === 2 &&
					(j === -1 || j === s)) {
					state += 1
				}
			}
		}
	} else {
		for (i = -1; i <= s; i++) {
			for (j = -1; j <= 1; j++) {
				if (list[row + j][cell + i] === 0) {
					state += 1
				} else if (list[row + j][cell + i] === 2 &&
					(i === -1 || i === s)) {
					state += 1
				}
			}
		}
	}
}

function generate_ships(list) {
	list = []

	for (i = 0; i < 12; i++) {
		row = []
		for (j = 0; j < 12; j++) {
			row.push(0)
		}
		list.push(row)
	}

	ship_list.forEach(ship => {

		state = 0

		while (state < 3 * (ship + 2)) {

			state = 0

			row = 12
			cell = 12
			direction = randomBetween(0, 1)

			if (direction === 0) {
				while (cell + 1 > 11) cell = randomBetween(1, 10)
				while (row + ship > 11) row = randomBetween(1, 10)

				check_for_ship(list, direction, ship)
			} else {
				while (cell + ship > 11) cell = randomBetween(1, 10)
				while (row + 1 > 11) row = randomBetween(1, 10)

				check_for_ship(list, direction, ship)
			}
		}

		if (direction == 0) {
			for (i = -1; i <= 1; i++) {
				for (j = -1; j <= ship; j++) {
					if (j >= 0 && j < ship) {
						list[row + j][cell] = 1
					}
					list[row + j][cell + i] = 2
				}
			}
		} else {
			for (i = -1; i <= ship; i++) {
				for (j = -1; j <= 1; j++) {
					if (i >= 0 && i < ship) {
						list[row][cell + i] = 1
					}
					list[row + j][cell + i] = 2
				}
			}
		}
	})

	return list
}

function ship_presenter(id, list) {
	for (j = 1; j < 11; j++) {
		for (i = 1; i < 11; i++) {
			child = document.getElementById(id).childNodes[10 * (j - 1) + i - 1]
			child.style.backgroundColor = list[j][i] === 1 ? 'rgba(0, 255, 65, 0.5)' : 'transparent'
			child.style.borderColor = list[j][i] === 1 ? 'transparent' : 'rgba(0, 255, 65, 0.25)'
		}
	}
}

function place_ship(e) {
	var x = e.target.style.left.replace('px', '') / 32
    var y = e.target.style.top.replace('px', '') / 32
    var bool = false

    if (direction == 0 && x + ship > 10) {
        x = 10 - ship
    } else if (direction == 1 && y + ship > 10) {
        y = 10 - ship
    }

    for (i = 0; i < ship; i++) {
        if (direction == 0) {
            if (player_cells[y + 1][x + i + 1] == 0) { bool = true } else { bool = false }
        } else {
            if (player_cells[y + i + 1][x + 1] == 0) { bool = true } else { bool = false }
        }
    }

    if (bool) {
        if (direction == 0) {
			for (i = -1; i <= ship; i++) {
				for (j = -1; j <= 1; j++) {
					if (i >= 0 && i < ship) {
						player_cells[y + 1][x + i + 1] = 1
					}
					player_cells[y + j + 1][x + i + 1] = 2
				}
			}
		} else {
            for (i = -1; i <= 1; i++) {
				for (j = -1; j <= ship; j++) {
					if (j >= 0 && j < ship) {
						player_cells[y + j + 1][x + 1] = 1
					}
					player_cells[y + j + 1][x + i + 1] = 2
				}
			}
        }
        ship_presenter('player', player_cells)

        randomise.style.pointerEvents = 'none'
        randomise.style.backgroundColor = '#121212'
        randomise.style.color = 'rgba(255, 255, 0, 0.5)'

        reset.style.pointerEvents = 'all'
        reset.style.color = 'rgb(255, 255, 0)'

        player.oncontextmenu = function() {}

        ship = 0

		lamp_buttons[last].style.backgroundColor = 'rgb(255, 0, 0)'

		placed_ships += 1
	}
	
	if (placed_ships == 10) {
		all_ships_placed()
	}
}

function hover_ship(e) {
	if (e.target.id != 'player') {
		var x = e.target.style.left.replace('px', '') / 32
		var y = e.target.style.top.replace('px', '') / 32

		e.target.onmouseout = function(e) {
			player.childNodes[10 * y + x].style.backgroundColor = 'transparent'
		}
		
		if (direction == 0) {
			if (x + ship <= 10) {
				for (i = 0; i < ship; i++) {
					player.childNodes[10 * y + x + i].style.backgroundColor = 'rgba(0, 255, 65, 0.25)'
				}
				e.target.onmouseout = function() {
					for (i = 0; i < ship; i++) {
						try { player.childNodes[10 * y + x + i].style.backgroundColor = 'transparent' } catch {}
					}
				}
			} else {
				for (i = 0; i < ship; i++) {
					player.childNodes[10 * y + 9 - i].style.backgroundColor = 'rgba(0, 255, 65, 0.25)'
				}
				e.target.onmouseout = function() {
					for (i = 0; i < ship; i++) {
						try { player.childNodes[10 * y + 9 - i].style.backgroundColor = 'transparent' } catch {}
					}
				}
			}
		} else {
			if (y + ship <= 10) {
				for (i = 0; i < ship; i++) {
					player.childNodes[10 * y + x + 10 * i].style.backgroundColor = 'rgba(0, 255, 65, 0.25)'
				}
				e.target.onmouseout = function() {
					for (i = 0; i < ship; i++) {
						try { player.childNodes[10 * y + x + 10 * i].style.backgroundColor = 'transparent' } catch {}
					}
				}
			} else {
				for (i = 0; i < ship; i++) {
					player.childNodes[90 + x - 10 * i].style.backgroundColor = 'rgba(0, 255, 65, 0.25)'
				}
				e.target.onmouseout = function() {
					for (i = 0; i < ship; i++) {
						try { player.childNodes[90 + x - 10 * i].style.backgroundColor = 'transparent' } catch {}
					}
				}
			}
		}
	}
}

function all_ships_placed() {
	reset.style.pointerEvents = 'all'
    reset.style.color = 'rgb(255, 255, 0)'

    start.style.pointerEvents = 'all'
    start.style.color = 'rgb(255, 255, 0)'
}