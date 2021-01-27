'use strict';

(function(globals) {
    globals.VARS = {
        bottle_list: []
    },
    globals.CONSTS = {
        AsyncFunction: Object.getPrototypeOf(async function(){}).constructor
    }
}( (this) ));

(function() {
    for (let j = 0; j < 16; j++) {
        let row = []
        for (let i = 0; i < 8; i++) {
            row.push({})
        }
        VARS.bottle_list.push(row)
    }
})()