/* 
 * ArrowLeft = 37
 * ArrowDown = 40
 * ArrowRight = 39
*/

'use strict'

document.body.onkeydown = (e) => {
    let array = document.getElementsByClassName('pill').toArray()
    let pill = []

    for (let i = 0; i < array.length; i++) {
        if (FUNCS.pill.get_pill_no(array[i]) === VARS.current_pill) {
            pill.push(array[i])
        }
    }

    switch (e.keyCode) {
    case 37:
        if (parseInt(pill[0].style.left) > 272 ) {
            FUNCS.pill.move_left(pill[0])
            FUNCS.pill.move_left(pill[1])
        }
        break

    case 40:
        if (parseInt(pill[0].style.top) < 336) {
            FUNCS.pill.move_down(pill[0])
            FUNCS.pill.move_down(pill[1])
            if (parseInt(pill[0].style.top) === 336) break
        }
        break

    case 39:
        switch (FUNCS.pill.get_pill_rotation(array[0])) {
        case 'r':
        case 'l':
            if (parseInt(pill[0].style.left) < 368 ) {
                FUNCS.pill.move_right(pill[0])
                FUNCS.pill.move_right(pill[1])
            }
            break
        
        case 'u':
        case 'd':
            if (parseInt(pill[0].style.left) < 384 ) {
                FUNCS.pill.move_right(pill[0])
                FUNCS.pill.move_right(pill[1])
            }
            break
            
        default:
            break
        }
        break
        
    default:
        break
    }
}
