calc_slider = {
    get_scroll: () => {
        return slider.scrollLeft != 384 ? slider.scrollLeft / 128 : 0
    },
    get_img: () => {
        switch (calc_slider.get_scroll()) {
            case 0:
                return './gfx/miles-edgeworth.png'
        
            case 1:
                return './gfx/franziska-von-karma.png'
        
            case 2:
                return './gfx/godot.png'
        }
    }
}

cell_array = {
    move_cell: (e) => {
        var empty = document.getElementById(empty_cell)
        var dims = parseInt(empty.style.height.replace('px', ''))
        var pos1 = cell_array.get_cell_pos(e.target.id)
        var pos2 = cell_array.get_cell_pos(empty_cell)
        if (((pos1[0] == pos2[0] - dims) && pos1[1] == pos2[1]) ||
            ((pos1[0] == pos2[0] + dims) && pos1[1] == pos2[1]) ||
            (pos1[0] == pos2[0] && (pos1[1] == pos2[1] - dims)) ||
            (pos1[0] == pos2[0] && (pos1[1] == pos2[1] + dims))) {
                empty.style.left = pos1[0] + 'px'
                empty.style.top = pos1[1] + 'px'
                move.cell(pos1, pos2, e.target)
            }
    },
    clickable_cells: () => {
        for (var n = 0; n < ((parseInt(empty_cell[0]) + 1) ** 2); n++) {
            cells[n].onclick = (e) => {
                var empty = document.getElementById(empty_cell)
                var pos1 = cell_array.get_cell_pos(e.target.id)
                var pos2 = cell_array.get_cell_pos(empty_cell)
                var dims = parseInt(empty.style.height.replace('px', ''))

                cell_array.move_cell(e)

                if (((pos1[0] == pos2[0] - dims) && pos1[1] == pos2[1]) ||
                    ((pos1[0] == pos2[0] + dims) && pos1[1] == pos2[1]) ||
                    (pos1[0] == pos2[0] && (pos1[1] == pos2[1] - dims)) ||
                    (pos1[0] == pos2[0] && (pos1[1] == pos2[1] + dims))) {
                        current_array[pos1[1] / dims][pos1[0] / dims] = empty_cell
                        current_array[pos2[1] / dims][pos2[0] / dims] = e.target.id
                    }

                cell_array.check_victory()
            }
        }
    },
    get_cell_pos: (id) => {
        var cell = document.getElementById(id)
        return [parseInt(cell.style.left.replace('px', '')), parseInt(cell.style.top.replace('px', ''))]
    },
    generate: () => {
        arr = []
        for (var j = 0; j <= parseInt(empty_cell[0]); j++) {
            line = []
            for (var i = 0; i <= parseInt(empty_cell[0]); i++) {
                line.push(j.toString() + i.toString())
            }
            arr.push(line)
        }
        return arr
    },
    check_victory: async () => {
        var bool = false
        for (var j = 0; j <= parseInt(empty_cell[0]); j++) {
            for (var i = 0; i <= parseInt(empty_cell[0]); i++) {
                if (start_array[j][i] != current_array [j][i]) {
                    bool = true
                    break
                }
            }
            if (bool) break
        }
        if (!bool) {
            async_bool = false
        }
    }
}