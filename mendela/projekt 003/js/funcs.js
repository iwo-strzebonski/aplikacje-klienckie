/* eslint-disable require-jsdoc */
'use strict'

async function pill_fall() {
    // eslint-disable-next-line no-constant-condition
    while (!VARS.game_over) {
        let array = document.getElementsByClassName('pill').toArray()
        let pill = []

        for (let i = 0; i < array.length; i++) {
            if (FUNCS.pill.get_pill_no(array[i]) === VARS.current_pill) {
                pill.push(array[i])
            }
        }

        let pos = parseInt(pill[0].style.top)
        while (pos < 320) {
            await FUNCS.timer.sleep()
            pos = parseInt(pill[0].style.top)
            if (pos === 336) break
            FUNCS.pill.move_down(pill[0])
            FUNCS.pill.move_down(pill[1])
        }

        await FUNCS.timer.sleep()
        GEN_HTML.pill()
    }
}

function get_max_fall() {
    let array = document.getElementsByClassName('pill').toArray()
    let max_fall = 336

    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            if (parseInt(array[i].top) === max_fall) {
                max_fall = parseInt(array[i].top) - 16
            }
        }
    }
}

function get_pill_rotation(pill) {
    return pill.innerText.charAt(pill.innerText.length-1)
}

function get_pill_no(pill) {
    return parseInt(pill.innerText.substring(0, pill.innerText.indexOf('\n')))
}

(function(globals) {
    globals.FUNCS = {
        pill: {
            move_left: new Function('pill', 'pill.style.left = parseInt(pill.style.left.replace("px", "")) - 16 + "px"'),
            move_down: new Function('pill', 'pill.style.top = parseInt(pill.style.top.replace("px", "")) + 16 + "px"'),
            move_right: new Function('pill', 'pill.style.left = parseInt(pill.style.left.replace("px", "")) + 16 + "px"'),
            pill_fall: pill_fall,
            get_max_fall: get_max_fall,
            get_pill_rotation: get_pill_rotation,
            get_pill_no: get_pill_no
        },
        timer: {
            time_diff: new CONSTS.AsyncFunction('start', 'return Date.now() - start'),
            sleep: new CONSTS.AsyncFunction('await new Promise(r => setTimeout(r, CONSTS.time))')
        }
    }
}( (this) ))

HTMLCollection.prototype.toArray = function() {
    return Array.from(this)
}
