/* 
 * a = 65
 * ArrowLeft = 37
 * s = 83
 * ArrowDown = 40
 * d = 68
 * ArrowRight = 39
*/

'use strict'

document.body.onkeydown = (e) => {
    let pill = document.getElementByTag('div')

    switch (e.keyCode) {
    case 65:
    case 37:
        if ( pill.style.left != '0px' ) {
            FUNCS.move_pill.left(pill)
        }
        break

    case 83:
    case 40:
        if ( pill.style.top != '480px' ) {
            FUNCS.move_pill.down(pill)
        }
        break
    
    case 68:
    case 39:
        if ( pill.style.left != '224px' ) {
            FUNCS.move_pill.right(pill)
        }
        break
        
    default:
        break
    }
}

