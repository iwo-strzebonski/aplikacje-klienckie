'use strict';

(function(globals) {
    globals.MODE = 'normal', //normal || slow
    globals.VARS = {
        bottle_arr: [],
        current_pill: 1,
        is_game_over: false,
        was_game_won: false,
        is_pill_falling: false,
        has_pill_fallen: true,
        vir_count: 4,
        removed_blues: 0,
        removed_browns: 0,
        removed_yellows: 0
    },
    globals.CONSTS = {
        random_between: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
        random_color: () => ['bl', 'br', 'yl'][Math.floor(Math.random() * 3)],
        AsyncFunction: Object.getPrototypeOf(async function(){}).constructor,
        TIME: MODE === 'normal' ? 500 : 1000
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
