/* 
 * ArrowUp      = 38
 * ArrowLeft    = 37
 * ArrowDown    = 40
 * ArrowRight   = 39
 * KeyW         = 87
 * KeyA         = 65
 * KeyS         = 83
 * KeyD         = 68
 * Shift        = 16
 * KeyQ         = 81
*/

'use strict'

document.body.onkeydown = async(e) => {
    let pill = [], pill_pos = []
    let rotation

    for (let y = 0; y < 17; y++) {
        for (let x = 0; x < 8; x++) {
            if (FUNCS.pill.get_no(VARS.bottle_arr[y][x]) === VARS.current_pill) {
                pill_pos.push([x, y])
                pill.push(VARS.bottle_arr[y][x])
            }
        }
    }

    try {
        rotation = FUNCS.pill.get_rotation(pill[0])
    } catch {
        return
    }

    if (!VARS.has_pill_fallen && !VARS.is_pill_falling) {
        VARS.movement = true
        
        switch (e.keyCode) {
        case 38:
        case 87:
            rotation =
            rotation === 1 ?
                4 :
                rotation - 1

            FUNCS.pill.rotate_left(pill_pos, pill, rotation)
            GEN_HTML.renderer()
            break

        case 16:
        case 81:
            rotation =
            rotation === 4 ?
                1 :
                rotation + 1

            FUNCS.pill.rotate_right(pill_pos, pill, rotation)
            GEN_HTML.renderer()
            break

        case 37:
        case 65:
            while (VARS.movement) {
                FUNCS.pill.move_left(pill_pos, rotation)
                GEN_HTML.renderer()
                await FUNCS.timer.sleep(10)
            }
            break

        case 40:
        case 83:
            FUNCS.pill.move_fall(pill_pos)
            break

        case 39:
        case 68:
            while (VARS.movement) {
                FUNCS.pill.move_right(pill_pos, rotation)
                GEN_HTML.renderer()
                await FUNCS.timer.sleep(10)
            }
            break
                
        default:
            break
        }
    }
}

document.body.onkeyup = async() => {
    VARS.movement = false
}