'use strict';

(function(globals) {
    globals.VARS = {
        current_pill: 0,
        game_over: false,
        vir_count: 4
    },
    globals.CONSTS = {
        random_between: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
        AsyncFunction: Object.getPrototypeOf(async function(){}).constructor,
        time: 500
    }
}( (this) ))