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
    let temp = document.getElementsByClassName('pill')
    let pill = []

    temp.toArray().forEach(cell => {
        console.log(cell.innerText[0])
        // if (pill.innerText[0] === VARS.current_pill) {
        //     pill = pill.push(cell)
        // }
    })

    console.log(pill)

    switch (e.keyCode) {
    case 65:
    case 37:
        if (pill[0].style.left != '0px' ) {
            FUNCS.move_pill.left(pill[0])
            FUNCS.move_pill.left(pill[1])
        }
        break

    case 83:
    case 40:
        if (pill[0].style.top != '480px' ) {
            FUNCS.move_pill.down(pill[0])
            FUNCS.move_pill.down(pill[1])
        }
        break
    
    case 68:
    case 39:
        if (pill[0].style.left != '224px' ) {
            FUNCS.move_pill.right(pill[0])
            FUNCS.move_pill.right(pill[1])
        }
        break
        
    default:
        break
    }
}

