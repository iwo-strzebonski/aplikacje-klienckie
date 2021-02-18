/* eslint-disable require-jsdoc */
'use strict'

async function check_colors() {
    let bl = 0, br = 0, yl = 0
    let pos_arr = []
    let temp_bl = [], temp_br = [], temp_yl = []
    let temp = ''

    for (let y = 16; y > 0; y--) {
        for (let x = 0; x < 8; x++) {
            switch (FUNCS.pill.get_color(VARS.bottle_arr[y][x])) {
            case 'bl':
                br = 0, yl = 0
                temp_br = [], temp_yl = []
                bl++

                temp_bl[bl - 1] = [x, y]

                if (bl >= 4) {
                    for (let i = 0; i < temp_bl.length; i++) {
                        pos_arr.push(temp_bl[i])
                    }

                    temp_bl = []
                }

                break

            case 'br':
                bl = 0, yl = 0
                temp_bl = [], temp_yl = []
                br++

                temp_br[br - 1] = [x, y]

                if (br >= 4) {
                    for (let i = 0; i < temp_br.length; i++) {
                        pos_arr.push(temp_br[i])
                    }
                    
                    temp_br = []
                }

                break

            case 'yl':
                bl = 0, br = 0
                temp_bl = [], temp_br = []
                yl++
                
                temp_yl[yl - 1] = [x, y]

                if (yl >= 4) {
                    for (let i = 0; i < temp_yl.length; i++) {
                        pos_arr.push(temp_yl[i])
                    }
                    
                    temp_yl = []
                }
                
                break
        
            default:
                bl = 0
                br = 0
                yl = 0
                break
            }
        }
    }

    for (let x = 0; x < 8; x++) {
        for (let y = 16; y > 0; y--) {
            switch (FUNCS.pill.get_color(VARS.bottle_arr[y][x])) {
            case 'bl':
                br = 0, yl = 0
                temp_br = [], temp_yl = []
                bl++

                temp_bl[bl - 1] = [x, y]

                if (bl >= 4) {
                    for (let i = 0; i < temp_bl.length; i++) {
                        pos_arr.push(temp_bl[i])
                    }

                    temp_bl = []
                }

                break

            case 'br':
                bl = 0, yl = 0
                temp_bl = [], temp_yl = []
                br++

                temp_br[br - 1] = [x, y]

                if (br >= 4) {
                    for (let i = 0; i < temp_br.length; i++) {
                        pos_arr.push(temp_br[i])
                    }
                    
                    temp_br = []
                }

                break

            case 'yl':
                bl = 0, br = 0
                temp_bl = [], temp_br = []
                yl++
                
                temp_yl[yl - 1] = [x, y]

                if (yl >= 4) {
                    for (let i = 0; i < temp_yl.length; i++) {
                        pos_arr.push(temp_yl[i])
                    }
                    
                    temp_yl = []
                }
                
                break
        
            default:
                bl = 0
                br = 0
                yl = 0
                break
            }
        }
    }

    if (pos_arr.length >= 4) {
        for (let i = 0; i < pos_arr.length; i++) {
            try {
                temp = VARS.bottle_arr[pos_arr[i][1]][pos_arr[i][0]]

                if (FUNCS.pill.get_rotation(VARS.bottle_arr[pos_arr[i][1]][pos_arr[i][0]]) === -1) {
                    switch (FUNCS.pill.get_color(VARS.bottle_arr[pos_arr[i][1]][pos_arr[i][0]])) {
                    case 'bl':
                        VARS.removed_blues++
                        break
                    case 'br':
                        VARS.removed_browns++
                        break
                    case 'yl':
                        VARS.removed_yellows++
                        break
                    
                    default:
                        break
                    }
                    EVENTS.update_score()
                    VARS.bottle_arr[pos_arr[i][1]][pos_arr[i][0]] =
                        FUNCS.pill.get_no(temp) + '.-4.' +
                        FUNCS.pill.get_pill_rotation(temp) + '.' +
                        FUNCS.pill.get_color(temp)
                } else {
                    VARS.bottle_arr[pos_arr[i][1]][pos_arr[i][0]] =
                        FUNCS.pill.get_no(temp) + '.-3.' +
                        FUNCS.pill.get_pill_rotation(temp) + '.' +
                        FUNCS.pill.get_color(temp)
                }
            } catch { null }
        }

        GEN_HTML.renderer()
        await FUNCS.timer.sleep(CONSTS.TIME * 2)

        for (let i = 0; i < pos_arr.length; i++) {
            try {
                VARS.bottle_arr[pos_arr[i][1]][pos_arr[i][0]] = '0.0.0.0'
            } catch { null }
        }

        GEN_HTML.renderer()
    }
}

function update_score() {
    let img1 = document.getElementById('score')
    let img2 = document.getElementById('high')
    let img3 = document.getElementById('count')

    VARS.vir_count--
    img1.src = 'assets/gfx/nums/' + (4 - VARS.vir_count) + '.png'
    img3.src = 'assets/gfx/nums/' + VARS.vir_count + '.png'

    if (4 - VARS.vir_count > FUNCS.score.get_high()) {
        FUNCS.score.set_high(4 - VARS.vir_count)
        img2.src = 'assets/gfx/nums/' + FUNCS.score.get_high() + '.png'
    }
}

async function update_loupe() {
    let img1 = document.getElementById('loupe1')
    let img2 = document.getElementById('loupe2')
    let img3 = document.getElementById('loupe3')

    while (!VARS.is_game_over && !VARS.was_game_won) {
        await FUNCS.timer.sleep(10)

        if (VARS.removed_blues === 2) {
            img1.outerHTML = ''
            VARS.removed_blues = 0
        }
        if (VARS.removed_browns === 1) {
            img2.outerHTML = ''
            VARS.removed_browns = 0
        }
        if (VARS.removed_yellows === 1) {
            img3.outerHTML = ''
            VARS.removed_yellows = 0
        }
    }
}

(function(globals) {
    globals.EVENTS = {
        check_colors: check_colors,
        update_score: update_score,
        update_loupe: update_loupe
    }
}( (this) ))
