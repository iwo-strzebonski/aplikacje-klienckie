const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))

async_bool = true

timer = {
    time_diff: async ( start ) => { return Date.now() - start },
    sleep: async (time) => {
        await new Promise(r => setTimeout(r, time))
    },
    display_time: async () => {
        start = Date.now()
        while (async_bool) {
            await timer.sleep(1)
            // console.log(await timer.time_diff(start))
        }
    }
}

move = {
    left: async () => {
        var move = slider.scrollLeft
        var steps = 0
        while (steps < 8) {
            await timer.sleep(8)
            if (move == 0) {
                move = 384 - 16
            } else {
                move -= 16
            }
            steps += 1
            slider.scrollLeft = move
        }
    },
    right: async () => {
        var move = slider.scrollLeft
        var steps = 0
        while (steps < 8) {
            await timer.sleep(8)
            if (move == 384) {
                move = 16
            } else {
                move += 16
            }
            steps++
            slider.scrollLeft = move
        }
    },
    cell: async (pos1, pos2, cell) => {
        var steps = 0
        if (pos1[0] == pos2[0]) {
            var move = (pos1[1] - pos2[1]) / 8
            while (steps < 8) {
                await timer.sleep(8)
                cell.style.top = parseInt(cell.style.top.replace('px', '')) - move + 'px'
                steps++
            }
            cell.style.top = pos2[1] + 'px'
        } else {
            var move = (pos1[0] - pos2[0]) / 8
            while (steps < 8) {
                await timer.sleep(8)
                cell.style.left = parseInt(cell.style.left.replace('px', '')) - move + 'px'
                steps++
            }
            cell.style.left = pos2[0] + 'px'
        }
    },
    generate: async () => {
        var empty = document.getElementById(empty_cell)
        var dims = parseInt(empty.style.height.replace('px', ''))
        var cell = null
        var bool = false
        var direction = randomBetween(0, 3)
        var steps = (gamemode + 3) * 100
        var temp1 = ''
        var temp2 = ''
        while (steps != 0) {
            empty = document.getElementById(empty_cell)
            pos2 = cell_array.get_cell_pos(empty_cell)
            direction = randomBetween(0, 3)
            while (true) {
                try {
                    switch (direction) {
                        case 0:
                            cell = document.getElementById((parseInt(empty_cell[0]) - 1).toString() + empty_cell[1])
                            break

                        case 1:
                            cell = document.getElementById(empty_cell[0] + parseInt((empty_cell[1]) + 1).toString())
                            break

                        case 2:
                            cell = document.getElementById((parseInt(empty_cell[0]) + 1).toString() + empty_cell[1])
                            break

                        case 3:
                            cell = document.getElementById(empty_cell[0] + parseInt((empty_cell[1]) - 1).toString())
                            break
                    }
                    bool = cell != null ? true : bool
                } catch {
                    direction = randomBetween(0, 3)
                }
                if (bool) {
                    try {
                    temp1 = empty.style.left
                    temp2 = empty.style.top
                    empty.style.left = cell.style.left
                    empty.style.top = cell.style.top
                    timer.sleep(100)
                    cell.style.left = temp2
                    cell.style.top = temp1
                    break
                    } catch {
                        console.log(empty)
                        break
                    }
                } else {
                    direction = randomBetween(0, 3)
                }
            }
            steps--
        }
    }
}