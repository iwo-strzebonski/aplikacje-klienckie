/* eslint-disable require-jsdoc */
'use strict'

async function auto_fall() {
    while (!VARS.is_game_over) {
        await FUNCS.timer.sleep(CONSTS.time * 4)
        GEN_HTML.pill()

        while (!VARS.has_pill_fallen) {
            if (VARS.is_game_over) break
            await FUNCS.timer.sleep(CONSTS.time)
            FUNCS.pill.move_down()
            GEN_HTML.renderer()
        }

        VARS.current_pill++
    }

    GEN_HTML.game_over()
    return
}

async function move_fall(pill) {
    VARS.is_pill_falling = true

    while (!VARS.has_pill_fallen) {
        await FUNCS.timer.sleep(CONSTS.time / 25)
        pill = FUNCS.pill.move_down(pill)
        if (!VARS.is_game_over) GEN_HTML.renderer()
    }

    VARS.is_pill_falling = false
}

function rotate_left(pill_pos, pill, rot) {
    let temp1, temp2
    let bool = true
    let x = pill_pos[0][0]
    let y = pill_pos[0][1]

    if (x === 7) {
        if (rot % 2 === 1) x--

        if (rot === 1) bool = FUNCS.pill.move_left(pill_pos, 2)
        else if (rot === 3) bool = FUNCS.pill.move_left(pill_pos, 4)
    }

    if (!bool) return

    switch (rot) {
    case 1:
    case 3:
        if (VARS.bottle_arr[y + 1][x + 1] === '0.0.0.0') {
            VARS.bottle_arr[y][x] =
                pill[0].substring(0, pill[0].indexOf('.') + 1) +
                '3.4.' + FUNCS.pill.get_color(pill[0])
        
            VARS.bottle_arr[y + 1][x] =
                pill[1].substring(0, pill[1].indexOf('.') + 1) +
                    '3.2.' + FUNCS.pill.get_color(pill[1])
        
            temp1 = VARS.bottle_arr[y + 1][x]
            temp2 = VARS.bottle_arr[y][x]
            VARS.bottle_arr[y + 1][x + 1] = temp1
            VARS.bottle_arr[y + 1][x] = temp2
            VARS.bottle_arr[y][x] = '0.0.0.0'
        }
        break
    
    case 2:
    case 4:
        if (VARS.bottle_arr[y - 1][x] === '0.0.0.0') {
            VARS.bottle_arr[y][x] =
                pill[0].substring(0, pill[0].indexOf('.') + 1) +
                '4.3.' + FUNCS.pill.get_color(pill[0])

            VARS.bottle_arr[y][x + 1] =
                pill[1].substring(0, pill[1].indexOf('.') + 1) +
                '4.1.' + FUNCS.pill.get_color(pill[1])

            temp1 = VARS.bottle_arr[y][x + 1]
            VARS.bottle_arr[y][x + 1] = '0.0.0.0'
            VARS.bottle_arr[y - 1][x] = temp1
        }
        break
    
    default:
        break
    }
}

function rotate_right(pill_pos, pill, rot) {
    let temp1, temp2
    let bool = true
    let x = pill_pos[0][0]
    let y = pill_pos[0][1]

    if (x === 7) {
        if (rot % 2 === 1) x--

        if (rot === 1) bool = FUNCS.pill.move_left(pill_pos, 2)
        else if (rot === 3) bool = FUNCS.pill.move_left(pill_pos, 4)
    }

    if (!bool) return

    switch (rot) {
    case 1:
    case 3:
        if (VARS.bottle_arr[y + 1][x + 1] === '0.0.0.0') {
            VARS.bottle_arr[y][x] =
                pill[0].substring(0, pill[0].indexOf('.') + 1) +
                '3.2.' + FUNCS.pill.get_color(pill[0])
        
            VARS.bottle_arr[y + 1][x] =
                pill[1].substring(0, pill[1].indexOf('.') + 1) +
                '3.4.' + FUNCS.pill.get_color(pill[1])
        
            temp1 = VARS.bottle_arr[y][x]
            VARS.bottle_arr[y + 1][x + 1] = temp1
            VARS.bottle_arr[y][x] = '0.0.0.0'
        }
        break
    
    case 2:
    case 4:
        if (VARS.bottle_arr[y - 1][x] === '0.0.0.0') {
            VARS.bottle_arr[y][x] =
                pill[0].substring(0, pill[0].indexOf('.') + 1) +
                '4.1.' + FUNCS.pill.get_color(pill[0])

            VARS.bottle_arr[y][x + 1] =
                pill[1].substring(0, pill[1].indexOf('.') + 1) +
                '4.3.' + FUNCS.pill.get_color(pill[1])

            temp1 = VARS.bottle_arr[y][x]
            temp2 = VARS.bottle_arr[y][x + 1]
            VARS.bottle_arr[y][x + 1] = '0.0.0.0'
            VARS.bottle_arr[y - 1][x] = temp1
            VARS.bottle_arr[y][x] = temp2
        }
        break
    
    default:
        break
    }
}

function move_left(pill_pos, rot) {
    let temp1, temp2
    let x = pill_pos[0][0]
    let y = pill_pos[0][1]

    if (x > 0) {
        switch (rot) {
        case 1:
            if (VARS.bottle_arr[y][x - 1] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y][x]
                temp2 = VARS.bottle_arr[y][x + 1]
                VARS.bottle_arr[y][x + 1] = '0.0.0.0'
                VARS.bottle_arr[y][x - 1] = temp1
                VARS.bottle_arr[y][x] = temp2
                return true
            }
            return false

        case 2:
            if (VARS.bottle_arr[y][x - 1] === '0.0.0.0' && VARS.bottle_arr[y + 1][x - 1] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y][x]
                temp2 = VARS.bottle_arr[y + 1][x]
                VARS.bottle_arr[y][x] = '0.0.0.0'
                VARS.bottle_arr[y + 1][x] = '0.0.0.0'
                VARS.bottle_arr[y][x - 1] = temp1
                VARS.bottle_arr[y + 1][x - 1] = temp2
                return true
            }
            return false

        case 3:
            if (VARS.bottle_arr[y][x - 1] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y][x]
                temp2 = VARS.bottle_arr[y][x + 1]
                VARS.bottle_arr[y][x + 1] = '0.0.0.0'
                VARS.bottle_arr[y][x - 1] = temp1
                VARS.bottle_arr[y][x] = temp2
                return true
            }
            return false

        case 4:
            if (VARS.bottle_arr[y][x - 1] === '0.0.0.0' && VARS.bottle_arr[y + 1][x - 1] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y + 1][x]
                temp2 = VARS.bottle_arr[y][x]
                VARS.bottle_arr[y][x] = '0.0.0.0'
                VARS.bottle_arr[y + 1][x] = '0.0.0.0'
                VARS.bottle_arr[y + 1][x - 1] = temp1
                VARS.bottle_arr[y][x - 1] = temp2
                return true
            }
            return false
            
        default:
            return false
        }
    }
}

function move_right(pill_pos, rot) {
    let temp1, temp2
    let x = pill_pos[0][0]
    let y = pill_pos[0][1]

    if (x < 7) {
        switch (rot) {
        case 1:
        case 3:
            if (VARS.bottle_arr[y][x + 2] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y][x]
                temp2 = VARS.bottle_arr[y][x + 1]
                VARS.bottle_arr[y][x] = '0.0.0.0'
                VARS.bottle_arr[y][x + 1] = temp1
                VARS.bottle_arr[y][x + 2] = temp2
            }
            break

        case 2:
        case 4:
            if (VARS.bottle_arr[y][x + 1] === '0.0.0.0' && VARS.bottle_arr[y + 1][x + 1] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y][x]
                temp2 = VARS.bottle_arr[y + 1][x]
                VARS.bottle_arr[y][x] = '0.0.0.0'
                VARS.bottle_arr[y + 1][x] = '0.0.0.0'
                VARS.bottle_arr[y][x + 1] = temp1
                VARS.bottle_arr[y + 1][x + 1] = temp2
            }
            break
            
        default:
            break
        }
    }
}

function move_down() {
    let pill_pos = [], pill = []
    let rot

    for (let y = 0; y < 17; y++) {
        for (let x = 0; x < 8; x++) {
            if (FUNCS.pill.get_no(VARS.bottle_arr[y][x]) === VARS.current_pill) {
                pill_pos.push([x, y])
                pill.push(VARS.bottle_arr[y][x])
            }
        }
    }

    try {
        rot = FUNCS.pill.get_rotation(pill[0])
    } catch {
        return
    }

    let temp1, temp2
    let x = pill_pos[0][0]
    let y = pill_pos[0][1]

    switch (rot) {
    case 1:
        try {
            if (VARS.bottle_arr[y + 1][x] === '0.0.0.0' && VARS.bottle_arr[y + 1][x + 1] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y][x]
                temp2 = VARS.bottle_arr[y][x + 1]
                VARS.bottle_arr[y][x] = '0.0.0.0'
                VARS.bottle_arr[y][x + 1] = '0.0.0.0'
                VARS.bottle_arr[y + 1][x] = temp1
                VARS.bottle_arr[y + 1][x + 1] = temp2
            } else {
                VARS.has_pill_fallen = true
            }
        } catch {
            VARS.has_pill_fallen = true
        }
        break

    case 2:
        try {
            if (VARS.bottle_arr[y + 2][x] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y][x]
                temp2 = VARS.bottle_arr[y + 1][x]
                VARS.bottle_arr[y][x] = '0.0.0.0'
                VARS.bottle_arr[y + 1][x] = temp1
                VARS.bottle_arr[y + 2][x] = temp2
            } else {
                VARS.has_pill_fallen = true
            }
        } catch {
            VARS.has_pill_fallen = true
        }
        break

    case 3:
        try {
            if (VARS.bottle_arr[y + 1][x] === '0.0.0.0' && VARS.bottle_arr[y + 1][x + 1] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y][x + 1]
                temp2 = VARS.bottle_arr[y][x]
                VARS.bottle_arr[y][x] = '0.0.0.0'
                VARS.bottle_arr[y][x + 1] = '0.0.0.0'
                VARS.bottle_arr[y + 1][x] = temp2
                VARS.bottle_arr[y + 1][x + 1] = temp1
            } else {
                VARS.has_pill_fallen = true
            }
        } catch {
            VARS.has_pill_fallen = true
        }
        break

    case 4:
        try {
            if (VARS.bottle_arr[y + 2][x] === '0.0.0.0') {
                temp1 = VARS.bottle_arr[y + 1][x]
                temp2 = VARS.bottle_arr[y][x]
                VARS.bottle_arr[y][x] = '0.0.0.0'
                VARS.bottle_arr[y + 1][x] = temp2
                VARS.bottle_arr[y + 2][x] = temp1
            } else {
                VARS.has_pill_fallen = true
            }
        } catch {
            VARS.has_pill_fallen = true
        }
        break
        
    default:
        break
    }
}

(function(globals) {
    globals.FUNCS = {
        pill: {
            get_no: new Function('cell', 'return parseInt(cell.substring(0,cell.indexOf(".")))'),
            get_rotation: new Function('cell', 'return parseInt(cell.substring(cell.indexOf(".")+1,cell.nthIndexOf(".",2)))'),
            get_pill_rotation: new Function('cell', 'return parseInt(cell.substring(cell.nthIndexOf(".",2)+1,cell.lastIndexOf(".")))'),
            get_color: new Function('cell', 'return cell.substring(cell.lastIndexOf(".")+1,cell.length)'),
            move_left: move_left,
            move_right: move_right,
            move_down: move_down,
            move_fall: move_fall,
            rotate_left: rotate_left,
            rotate_right: rotate_right,
            auto_fall: auto_fall
        },
        timer: {
            time_diff: new CONSTS.AsyncFunction('start', 'return Date.now()-start'),
            sleep: new CONSTS.AsyncFunction('time', 'await new Promise(r=>setTimeout(r,time))')
        },
        score: {
            create_storage: new Function('if(localStorage.getItem("dr_mario_score")===null){localStorage.setItem("dr_mario_score",100)}')
        }
    }
}( (this) ))
