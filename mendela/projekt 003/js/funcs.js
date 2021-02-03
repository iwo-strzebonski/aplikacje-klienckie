/* eslint-disable require-jsdoc */
'use strict'

async function pill_fall() {
    while (!VARS.game_over && !VARS.is_pill_falling) {
        FUNCS.pill.get_max_fall()

        let array = document.getElementsByClassName('pill').toArray()
        let pill = []

        for (let i = 0; i < array.length; i++) {
            if (FUNCS.pill.get_pill_no(array[i]) === VARS.current_pill) {
                pill.push(array[i])
            }
        }

        while (parseInt(pill[0].style.top) < await 336) {
            await FUNCS.timer.sleep(CONSTS.time)
            if (parseInt(pill[0].style.top) === await 336) break
            FUNCS.pill.move_down(pill[0])
            FUNCS.pill.move_down(pill[1])
        }

        await FUNCS.timer.sleep(CONSTS.time)
        GEN_HTML.pill()
    }
}

async function get_max_fall() {
    let array = document.getElementsByClassName('pill').toArray()
    let pill = []
    let max_y_at_x
    let current_y

    for (let i = 0; i < array.length; i++) {
        if (FUNCS.pill.get_pill_no(array[i]) === VARS.current_pill) {
            pill.push(array[i])
        }
    }

    switch (FUNCS.pill.get_pill_rotation(pill[0])) {
    case 1:
    case 3:
        current_y =
        parseInt(pill[0].style.top) > parseInt(pill[1].style.top)
            ? parseInt(pill[0].style.top)
            : parseInt(pill[1].style.top)

        for (let i = 0; i < array.length; i++) {
            if (FUNCS.pill.get_pill_no(array[i]) != VARS.current_pill &&
                parseInt(array[i].style.top) >= current_y) {
                console.log(parseInt(array[i].style.top))
            }
        }

        break
        
    case 2:
    case 4:
        current_y = parseInt(pill[0].style.top)
        break
            
    default:
        break
    }

    return max_y_at_x
}

async function fall_down(pill) {
    while(parseInt(pill.style.top) < 336) {
        await FUNCS.timer.sleep(10)
        pill.style.top = parseInt(pill.style.top) + 16 + 'px'
    }
    VARS.is_pill_falling = false
}

function rotate_left(pill, rot) {
    if ((rot === 1 || rot === 3) && parseInt(pill[0].style.left) === 384) {
        pill[0].style.left = parseInt(pill[0].style.left) - 16 + 'px'
        pill[1].style.left = parseInt(pill[1].style.left) - 16 + 'px'
    }
    
    switch (rot) {
    case 1:
        pill[0].innerText = pill[0].innerText.substring(0, pill[0].innerText.indexOf('\n') + 1) + 1
        pill[1].innerText = pill[1].innerText.substring(0, pill[1].innerText.indexOf('\n') + 1) + 1

        pill[0].style.top = parseInt(pill[0].style.top) + 16 + 'px'
        pill[1].style.left = parseInt(pill[1].style.left) + 16 + 'px'

        pill[0].style.backgroundImage = pill[0].style.backgroundImage.replace('up', 'left')
        pill[1].style.backgroundImage = pill[1].style.backgroundImage.replace('down', 'right')

        break

    case 2:
        pill[0].innerText = pill[0].innerText.substring(0, pill[0].innerText.indexOf('\n') + 1) + 2
        pill[1].innerText = pill[1].innerText.substring(0, pill[1].innerText.indexOf('\n') + 1) + 2

        pill[0].style.left = parseInt(pill[0].style.left) - 16 + 'px'
        pill[0].style.top = parseInt(pill[0].style.top) - 16 + 'px'

        pill[0].style.backgroundImage = pill[0].style.backgroundImage.replace('right', 'up')
        pill[1].style.backgroundImage = pill[1].style.backgroundImage.replace('left', 'down')

        break

    case 3:
        pill[0].innerText = pill[0].innerText.substring(0, pill[0].innerText.indexOf('\n') + 1) + 3
        pill[1].innerText = pill[1].innerText.substring(0, pill[1].innerText.indexOf('\n') + 1) + 3

        pill[0].style.left = parseInt(pill[0].style.left) + 16 + 'px'
        pill[1].style.top = parseInt(pill[1].style.top) + 16 + 'px'

        pill[0].style.backgroundImage = pill[0].style.backgroundImage.replace('down', 'right')
        pill[1].style.backgroundImage = pill[1].style.backgroundImage.replace('up', 'left')

        break

    case 4:
        pill[0].innerText = pill[0].innerText.substring(0, pill[0].innerText.indexOf('\n') + 1) + 4
        pill[1].innerText = pill[1].innerText.substring(0, pill[1].innerText.indexOf('\n') + 1) + 4

        pill[1].style.left = parseInt(pill[1].style.left) - 16 + 'px'
        pill[1].style.top = parseInt(pill[1].style.top) - 16 + 'px'

        pill[0].style.backgroundImage = pill[0].style.backgroundImage.replace('left', 'down')
        pill[1].style.backgroundImage = pill[1].style.backgroundImage.replace('right', 'up')
        
        break
    
    default:
        break
    }
}

function rotate_right(pill, rot) {
    if ((rot === 1 || rot === 3) && parseInt(pill[0].style.left) === 384) {
        pill[0].style.left = parseInt(pill[0].style.left) - 16 + 'px'
        pill[1].style.left = parseInt(pill[1].style.left) - 16 + 'px'
    }

    switch (rot) {
    case 1:
        pill[0].innerText = pill[0].innerText.substring(0, pill[0].innerText.indexOf('\n') + 1) + 1
        pill[1].innerText = pill[1].innerText.substring(0, pill[1].innerText.indexOf('\n') + 1) + 1

        pill[1].style.top = parseInt(pill[1].style.top) + 16 + 'px'
        pill[1].style.left = parseInt(pill[1].style.left) + 16 + 'px'

        pill[0].style.backgroundImage = pill[0].style.backgroundImage.replace('down', 'left')
        pill[1].style.backgroundImage = pill[1].style.backgroundImage.replace('up', 'right')

        break

    case 2:
        pill[0].innerText = pill[0].innerText.substring(0, pill[0].innerText.indexOf('\n') + 1) + 2
        pill[1].innerText = pill[1].innerText.substring(0, pill[1].innerText.indexOf('\n') + 1) + 2

        pill[1].style.left = parseInt(pill[1].style.left) - 16 + 'px'
        pill[0].style.top = parseInt(pill[0].style.top) - 16 + 'px'

        pill[0].style.backgroundImage = pill[0].style.backgroundImage.replace('left', 'up')
        pill[1].style.backgroundImage = pill[1].style.backgroundImage.replace('right', 'down')

        break

    case 3:
        pill[0].innerText = pill[0].innerText.substring(0, pill[0].innerText.indexOf('\n') + 1) + 3
        pill[1].innerText = pill[1].innerText.substring(0, pill[1].innerText.indexOf('\n') + 1) + 3

        pill[0].style.left = parseInt(pill[0].style.left) + 16 + 'px'
        pill[0].style.top = parseInt(pill[0].style.top) + 16 + 'px'

        pill[0].style.backgroundImage = pill[0].style.backgroundImage.replace('up', 'right')
        pill[1].style.backgroundImage = pill[1].style.backgroundImage.replace('down', 'left')

        break

    case 4:
        pill[0].innerText = pill[0].innerText.substring(0, pill[0].innerText.indexOf('\n') + 1) + 4
        pill[1].innerText = pill[1].innerText.substring(0, pill[1].innerText.indexOf('\n') + 1) + 4

        pill[0].style.left = parseInt(pill[0].style.left) - 16 + 'px'
        pill[1].style.top = parseInt(pill[1].style.top) - 16 + 'px'

        pill[0].style.backgroundImage = pill[0].style.backgroundImage.replace('right', 'down')
        pill[1].style.backgroundImage = pill[1].style.backgroundImage.replace('left', 'up')
        
        break
    
    default:
        break
    }
}

function move_left(pill, rot) {
    switch (rot) {
    case 1:
    case 2:
    case 4:
        if (parseInt(pill[0].style.left) > 272 ) {
            pill[0].style.left = parseInt(pill[0].style.left) - 16 + 'px'
            pill[1].style.left = parseInt(pill[1].style.left) - 16 + 'px'
        }
        break

    case 3:
        if (parseInt(pill[0].style.left) > 288 ) {
            pill[0].style.left = parseInt(pill[0].style.left) - 16 + 'px'
            pill[1].style.left = parseInt(pill[1].style.left) - 16 + 'px'
        }
        break
    
    default:
        break
    }
}

function move_right(pill, rot) {
    switch (rot) {
    case 2:
    case 3:
    case 4:
        if (parseInt(pill[0].style.left) < 384) {
            pill[0].style.left = parseInt(pill[0].style.left) + 16 + 'px'
            pill[1].style.left = parseInt(pill[1].style.left) + 16 + 'px'
        }
        break

    case 1:
        if (parseInt(pill[0].style.left) < 368) {
            pill[0].style.left = parseInt(pill[0].style.left) + 16 + 'px'
            pill[1].style.left = parseInt(pill[1].style.left) + 16 + 'px'
        }
        break
    
    default:
        break
    }
}

(function(globals) {
    globals.FUNCS = {
        pill: {
            get_pill_rotation: new Function('pill', 'return parseInt(pill.innerText.charAt(pill.innerText.length-1))'),
            get_pill_no: new Function('pill', 'return parseInt(pill.innerText.substring(0,pill.innerText.indexOf("\\n")))'),
            move_down: new Function('pill', 'pill.style.top=parseInt(pill.style.top)+16+"px"'),
            push: new Function('pill', 'pill[0].style.left=parseInt(pill[0].style.top)-16 +"px";pill[1].style.left=parseInt(pill[1].style.top)-16 +"px"'),
            move_left: move_left,
            move_right: move_right,
            fall_down: fall_down,
            rotate_left: rotate_left,
            rotate_right: rotate_right,
            pill_fall: pill_fall,
            get_max_fall: get_max_fall
        },
        timer: {
            time_diff: new CONSTS.AsyncFunction('start', 'return Date.now() - start'),
            sleep: new CONSTS.AsyncFunction('time', 'await new Promise(r => setTimeout(r, time))')
        }
    }
}( (this) ))

HTMLCollection.prototype.toArray = function() {
    return Array.from(this)
}

String.prototype.nthIndexOf = function(pattern, n) {
    let i = -1

    while (n-- && i++ < this.length) {
        i = this.indexOf(pattern, i)
        if (i < 0) break
    }

    return i
}