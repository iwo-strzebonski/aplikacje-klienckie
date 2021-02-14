/* eslint-disable require-jsdoc */
'use strict'

function bottle() {
    let container = document.createElement('DIV')
    container.id = 'bottle'
    let bottle = document.createElement('TABLE')
    container.appendChild(bottle)
    document.body.appendChild(container)
}

function cells() {
    for (let y = 0; y < 17; y++) {
        let html_row = document.createElement('TR')
        let row = []

        for (let x = 0; x < 8; x++) {
            let html_cell = document.createElement('TH')
            html_cell.className = 'cell'
            html_row.appendChild(html_cell)

            let cell = '0.0.0.0'
            row.push(cell)
        }
        document.getElementsByTagName('table')[0].appendChild(html_row)
        VARS.bottle_arr.push(row)
    }

    for (let i = 0; i < 8; i++) {
        if (i < 3 || i > 4) VARS.bottle_arr[0][i] = '-2.-2.-2.-2'
    }
}

function pill() {
    VARS.has_pill_fallen = false
    let colors = ''
    
    for (let i = 0; i < 2; i++) {
        if (VARS.bottle_arr[1][3 + i] != '0.0.0.0') {
            VARS.is_game_over = true
        }
        VARS.bottle_arr[1][3 + i] = VARS.current_pill + '.1.' + (4 - 2 * i) + '.' + CONSTS.random_color()
        colors += FUNCS.pill.get_color(VARS.bottle_arr[1][3 + i])
    }
    
    if (!VARS.is_game_over) {
        GEN_HTML.animate_pill(colors)
        GEN_HTML.renderer()
    }
}

function virus() {
    let x = CONSTS.random_between(0, 7), y = CONSTS.random_between(5, 15)
    let all_x = [], all_y = []

    for (let i = 0; i < VARS.vir_count; i++) {
        while (all_x.includes(x) && all_y.includes(y)) {
            x = CONSTS.random_between(0, 7)
            y = CONSTS.random_between(6, 15)
        }

        all_x.push(x)
        all_y.push(y)

        VARS.bottle_arr[y][x] = '-1.-1.-1.'

        if (i === 1) VARS.bottle_arr[y][x] += 'br'
        else if (i === 2) VARS.bottle_arr[y][x] += 'yl'
        else VARS.bottle_arr[y][x] += 'bl'
    }

    GEN_HTML.renderer()
}

function pill_background(cell, x, y) {
    switch (FUNCS.pill.get_pill_rotation(VARS.bottle_arr[y][x])) {
    case -1:
        cell.style.backgroundImage = 'url(assets/gfx/' + FUNCS.pill.get_color(VARS.bottle_arr[y][x]) + '_' + 'dot.png)'
        break
        
    case 1:
        cell.style.backgroundImage = 'url(assets/gfx/' + FUNCS.pill.get_color(VARS.bottle_arr[y][x]) + '_' + 'up.png)'
        break
        
    case 2:
        cell.style.backgroundImage = 'url(assets/gfx/' + FUNCS.pill.get_color(VARS.bottle_arr[y][x]) + '_' + 'right.png)'
        break
        
    case 3:
        cell.style.backgroundImage = 'url(assets/gfx/' + FUNCS.pill.get_color(VARS.bottle_arr[y][x]) + '_' + 'down.png)'
        break
        
    case 4:
        cell.style.backgroundImage = 'url(assets/gfx/' + FUNCS.pill.get_color(VARS.bottle_arr[y][x]) + '_' + 'left.png)'
        break
        
    default:
        break
    }
}

function renderer() {
    let bottle = document.getElementsByTagName('tr')
    
    for (let y = 0; y < 17; y++) {
        for (let x = 0; x < 8; x++) {
            let cell = bottle[y].children[x]

            if (FUNCS.pill.get_no(VARS.bottle_arr[y][x]) === -1) {
                switch (FUNCS.pill.get_color(VARS.bottle_arr[y][x])) {
                case 'bl':
                    cell.style.backgroundImage = 'url(assets/gfx/covid_blue.png)'
                    break

                case 'br':
                    cell.style.backgroundImage = 'url(assets/gfx/covid_brown.png)'
                    break

                case 'yl':
                    cell.style.backgroundImage = 'url(assets/gfx/covid_yellow.png)'
                    break
                
                default:
                    break
                }
            } else if (FUNCS.pill.get_no(VARS.bottle_arr[y][x]) > 0) {
                GEN_HTML.pill_background(cell, x, y)
            } else {
                cell.style.backgroundImage = ''
            }
        }
    }
}

function game_over() {
    let img = document.createElement('IMG')
    img.src = 'assets/gfx/go_dr.png'
    img.id = 'go-dr'
    document.body.appendChild(img)

    img = document.createElement('IMG')
    img.src = 'assets/gfx/go.png'
    img.id = 'game-over'
    document.body.appendChild(img)
}

function animate_pill(colors) {
    console.log(colors)
}


(function(globals) {
    globals.GEN_HTML = {
        bottle: bottle,
        cells: cells,
        virus: virus,
        pill: pill,
        pill_background: pill_background,
        renderer: renderer,
        game_over: game_over,
        animate_pill: animate_pill
    }
}( (this) ))
