/*
    Battleship game
    © Copyright 2020 Iwo Strzeboński
	Published under WTFPLv2
	Languages: HTML5, CSS3, JavaScript (ES 2020)
	JavaScript (ES 2020) library file (used for presenting and placing ships)
 */

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

function ship_presenter(id, list1, list2) {
	for (j = 1; j < 11; j++) {
		for (i = 1; i < 11; i++) {
			child = document.getElementById(id).childNodes[10 * (j - 1) + i - 1]
			child.style.backgroundColor = list1[j][i] == 1 ? 'rgba(0, 255, 65, 0.6)' : 'transparent'
			child.style.borderColor = list1[j][i] == 1 ? 'transparent' : 'rgba(0, 255, 65, 0.25)'
			switch (list2[j - 1][i - 1]) {
				case 3:
					child.innerHTML = 'X'
					break
				case 4:
					child.innerHTML = 'M'
					break
				case 5:
					child.innerHTML = 'O'
					break
				default:
					child.innerHTML = ''
					break
			}
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
            if (player_cells[y + 1][x + i + 1] == 0) { bool = true } else { bool = false; break }
        } else {
            if (player_cells[y + i + 1][x + 1] == 0) { bool = true } else { bool = false; break }
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
        ship_presenter('player', player_cells, hit_by_bot)

        randomise.style.pointerEvents = 'none'
        randomise.style.backgroundColor = '#121212'
        randomise.style.color = 'rgba(255, 255, 0, 0.5)'

        reset.style.pointerEvents = 'all'
        reset.style.color = 'rgb(255, 255, 0)'

        ship = 0

		lamp_buttons[last].style.backgroundColor = 'rgb(255, 0, 0)'

		placed_ships += 1
	}
	
	if (placed_ships == ship_list.length) {
		all_ships_placed()
	}
}

function hover_ship(e, direction, list) {
	var x = e.target.style.left.replace('px', '') / 32
	var y = e.target.style.top.replace('px', '') / 32

	ship_presenter('player', list, hit_by_bot)

	if (direction == 0) {
		if (x + ship <= 10) {
			for (i = 0; i < ship; i++) {
				player.childNodes[10 * y + x + i].style.backgroundColor = 'rgba(0, 255, 65, 0.25)'
				player.childNodes[10 * y + x + i].innerHTML = list[y + 1][x + i + 1] != 0 ? 'E' : ''
			}
			e.target.onmouseout = function() {
				for (i = 0; i < ship; i++) {
					try {
						player.childNodes[10 * y + x + i].style.backgroundColor = 'transparent'
						player.childNodes[10 * y + x + i].innerHTML = ''
					} catch {}
				}
			}
		} else {
			for (i = 0; i < ship; i++) {
				player.childNodes[10 * y + 9 - i].style.backgroundColor = 'rgba(0, 255, 65, 0.25)'
				player.childNodes[10 * y + 9 - i].innerHTML = list[y + 1][9 - i + 1] != 0 ? 'E' : ''
			}
			e.target.onmouseout = function() {
				for (i = 0; i < ship; i++) {
					try {
						player.childNodes[10 * y + 9 - i].style.backgroundColor = 'transparent'
						player.childNodes[10 * y + x + i].innerHTML = ''
					} catch {}
				}
			}
		}
	} else {
		if (y + ship <= 10) {
			for (i = 0; i < ship; i++) {
				player.childNodes[10 * y + x + 10 * i].style.backgroundColor = 'rgba(0, 255, 65, 0.25)'
				player.childNodes[10 * y + x + 10 * i].innerHTML = list[y + i + 1][x + 1] != 0 ? 'E' : ''
			}
			e.target.onmouseout = function() {
				for (i = 0; i < ship; i++) {
					try {
						player.childNodes[10 * y + x + 10 * i].style.backgroundColor = 'transparent'
						player.childNodes[10 * y + x + 10 * i].innerHTML = ''
					} catch {}
				}
			}
		} else {
			for (i = 0; i < ship; i++) {
				player.childNodes[90 + x - 10 * i].style.backgroundColor = 'rgba(0, 255, 65, 0.25)'
				player.childNodes[90 + x - 10 * i].innerHTML = list[9 - i + 1][x + 1] != 0 ? 'E' : ''
			}
			e.target.onmouseout = function() {
				for (i = 0; i < ship; i++) {
					try {
						player.childNodes[90 + x - 10 * i].style.backgroundColor = 'transparent'
						player.childNodes[90 + x - 10 * i].innerHTML = ''
					} catch {}
				}
			}
		}
	}
}

function all_ships_placed() {
    start.style.pointerEvents = 'all'
    start.style.color = 'rgb(255, 255, 0)'
}

function lamp_buttons_onclick(e) {
	e.target.style.backgroundColor = 'rgb(255, 255, 0)'

	var id = parseInt(e.target.id[1])

	if (lamp_buttons[last]?.style.backgroundColor != 'rgb(255, 0, 0)') {
		lamp_buttons[last].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
		lamp_buttons[last].style.pointerEvents = 'all'
	}

	switch (id) {
		case 0:
			ship = 4
			break

		case 1:
		case 2:
			ship = 3
			break
	
		case 3:
		case 4:
		case 5:
			ship = 2
			break

		case 6:
		case 7:
		case 8:
		case 9:
			ship = 1
			break

		default:
			break
	}

	last = id

	e.target.style.pointerEvents = 'none'
}

function empty_cells(list, x, y) {
    if (list[y][x] == 3) {
        if (x == 0 && y == 0) {
            list[y + 1][x + 1] = list[y + 1][x + 1] == null ? 5 : list[y + 1][x + 1]
        } else if (x == 0 && y == 9) {
            list[y - 1][x + 1] = list[y - 1][x + 1] == null ? 5 : list[y - 1][x + 1]
        } else if (x == 9 && y == 0) {
            list[y + 1][x - 1] = list[y + 1][x - 1] == null ? 5 : list[y + 1][x - 1]
        } else if (x == 9 && y == 9) {
            list[y - 1][x - 1] = list[y - 1][x - 1] == null ? 5 : list[y - 1][x - 1]
        } else if (x == 0) {
            list[y - 1][x + 1] = list[y - 1][x + 1] == null ? 5 : list[y - 1][x + 1]
            list[y + 1][x + 1] = list[y + 1][x + 1] == null ? 5 : list[y + 1][x + 1]
        } else if (y == 0) {
            list[y + 1][x - 1] = list[y + 1][x - 1] == null ? 5 : list[y + 1][x - 1]
            list[y + 1][x + 1] = list[y + 1][x + 1] == null ? 5 : list[y + 1][x + 1]
        } else if (x == 9) {
            list[y - 1][x - 1] = list[y - 1][x - 1] == null ? 5 : list[y - 1][x - 1]
            list[y + 1][x - 1] = list[y + 1][x - 1] == null ? 5 : list[y + 1][x - 1]
        } else if (y == 9) {
            list[y - 1][x - 1] = list[y - 1][x - 1] == null ? 5 : list[y - 1][x - 1]
            list[y - 1][x + 1] = list[y - 1][x + 1] == null ? 5 : list[y - 1][x + 1]
        } else {
            list[y - 1][x - 1] = list[y - 1][x - 1] == null ? 5 : list[y - 1][x - 1]
            list[y - 1][x + 1] = list[y - 1][x + 1] == null ? 5 : list[y - 1][x + 1]
            list[y + 1][x - 1] = list[y + 1][x - 1] == null ? 5 : list[y + 1][x - 1]
            list[y + 1][x + 1] = list[y + 1][x + 1] == null ? 5 : list[y + 1][x + 1]
        }
    }
}