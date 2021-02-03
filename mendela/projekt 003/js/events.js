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
    let array = document.getElementsByClassName('pill').toArray()
    let pill = []

    for (let i = 0; i < array.length; i++) {
        if (FUNCS.pill.get_pill_no(array[i]) === VARS.current_pill) {
            pill.push(array[i])
        }
    }

    for (let i = 0; i < pill.length; i++) {
        let temp
        if (pill[0].innerText.charAt(pill[0].innerText.indexOf('\n')) === 1) {
            temp = pill[0]
            pill[0] = pill[1]
            pill[1] = temp
        }
    }

    let rotation = FUNCS.pill.get_pill_rotation(pill[0])

    switch (e.keyCode) {
    case 38:
    case 87:
        rotation =
        rotation === 1 ?
            4 :
            rotation - 1

        FUNCS.pill.rotate_left(pill, rotation)
        break

    case 16:
    case 81:
        rotation =
        rotation === 4 ?
            1 :
            rotation + 1
            
        FUNCS.pill.rotate_right(pill, rotation)
        break

    case 37:
    case 65:
        FUNCS.pill.move_left(pill, rotation)
        break

    case 40:
    case 83:
        if (parseInt(pill[0].style.top) < await 336 - 16) {
            if (!VARS.is_pill_falling) {
                VARS.is_pill_falling = true
                FUNCS.pill.fall_down(pill[0])
                FUNCS.pill.fall_down(pill[1])
            }
        }
        break

    case 39:
    case 68:
        FUNCS.pill.move_right(pill, rotation)
        break
        
    default:
        break
    }
}
