const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))

async_bool = false
current_time = 0

timer = {
    time_diff: async ( start ) => { return Date.now() - start },
    sleep: async (time) => {
        await new Promise(r => setTimeout(r, time))
    },
    display_time: async () => {
        var start = Date.now()
        while (async_bool) {
            current_time = await timer.get_time(await timer.time_diff(start))
            var span = document.getElementsByTagName('SPAN')[0]
            while (span.firstChild) {
                span.removeChild(span.firstChild)
            }
            for (var i = 0; i < current_time.length; i++) {
                var img = document.createElement('IMG')
                img.src = `./gfx/${current_time[i] == '.' ? 'dot' : current_time[i] == ':' ? 'colon' : current_time[i]}.gif`
                span.appendChild(img)
            }
        }
    },
    get_time: async (time) => {
        await timer.sleep(0.1)
        return new Date(time).toISOString().slice(11,23)
    }
}

move = {
    left: async () => {
        var move = slider.scrollLeft
        var steps = 0
        while (steps < 8) {
            await timer.sleep(16)
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
            await timer.sleep(16)
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
                await timer.sleep(16)
                cell.style.top = parseInt(cell.style.top.replace('px', '')) - move + 'px'
                steps++
            }
            cell.style.top = pos2[1] + 'px'
        } else {
            var move = (pos1[0] - pos2[0]) / 8
            while (steps < 8) {
                await timer.sleep(16)
                cell.style.left = parseInt(cell.style.left.replace('px', '')) - move + 'px'
                steps++
            }
            cell.style.left = pos2[0] + 'px'
        }
        if (!async_bool) {
            alert(current_time)
        }
    },
    generate: async () => {
        var btns = document.getElementsByTagName('BUTTON')
        var empty = document.getElementById(empty_cell)
        var dims = parseInt(empty.style.height.replace('px', ''))

        for (var i = 0; i < btns.length; i++) {
            btns[i].style.pointerEvents = 'none'
        }

        var j
        var i
        var id = ''
        var last = ''

        var pos1
        var pos2

        var cell
        var steps = (gamemode + 3) * 50
        // var steps = 4

        var temp1 = ''
        var temp2 = ''

        while (steps != 0) {
            while (true) {
                empty = document.getElementById(empty_cell)
                j = randomBetween(0, parseInt(empty_cell[0]))
                i = randomBetween(0, parseInt(empty_cell[0]))
                id = j.toString() + i.toString()
                while (id == last) {
                    j = randomBetween(0, parseInt(empty_cell[0]))
                i = randomBetween(0, parseInt(empty_cell[0]))
                id = j.toString() + i.toString()
                }

                pos1 = cell_array.get_cell_pos(id)
                pos2 = cell_array.get_cell_pos(empty_cell)

                if (((pos1[0] == pos2[0] - dims) && pos1[1] == pos2[1]) ||
                    ((pos1[0] == pos2[0] + dims) && pos1[1] == pos2[1]) ||
                    (pos1[0] == pos2[0] && (pos1[1] == pos2[1] - dims)) ||
                    (pos1[0] == pos2[0] && (pos1[1] == pos2[1] + dims))) {
                        last = j.toString() + i.toString()
                        cell = document.getElementById(id)
                        temp1 = cell.style.left
                        temp2 = cell.style.top
                        await timer.sleep(16)
                        cell.style.left = empty.style.left
                        cell.style.top = empty.style.top
                        empty.style.left = temp1
                        empty.style.top = temp2
                        break
                    }
            }
            steps--
        }

        for (var i = 0; i < btns.length; i++) {
            btns[i].style.pointerEvents = 'initial'
        }

        async_bool = true
        timer.display_time()
    }
}