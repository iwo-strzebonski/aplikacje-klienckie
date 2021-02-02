'use strict';

(function(globals) {
    globals.FUNCS = {
        move_pill: {
            left: new Function('pill', 'pill.style.left = parseInt(pill.style.left.replace("px", "")) - 32 + "px"'),
            down: new Function('pill', 'pill.style.top = parseInt(pill.style.top.replace("px", "")) + 32 + "px"'),
            right: new Function('pill', 'pill.style.left = parseInt(pill.style.left.replace("px", "")) + 32 + "px"')
        }
    },
    globals.ASYNCIO = {
        timer: {
            time_diff: new CONSTS.AsyncFunction('start', 'return Date.now() - start'),
            sleep: new CONSTS.AsyncFunction('time', 'await new Promise(r => setTimeout(r, time))')
        }
    },
    globals.PROTS = {

    }
}( (this) ))

HTMLCollection.prototype.toArray = () => {
    return Array.from(this)
}