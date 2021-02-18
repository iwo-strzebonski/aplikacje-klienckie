/* eslint-disable require-jsdoc */
'use strict'

function bottle() {
    let hand = document.createElement('IMG')
    let high = document.createElement('IMG')
    let score = document.createElement('IMG')
    let count = document.createElement('IMG')

    let container = document.createElement('DIV')
    let loupe = document.createElement('DIV')

    let bottle = document.createElement('TABLE')

    loupe.id = 'loupe'

    hand.id = 'hand'
    hand.style.left = '496px'
    hand.style.top = '64px'
    hand.src = 'assets/gfx/hands/up.png'

    high.id = 'high'
    high.style.left = '140px'
    high.style.top = '76px'
    high.src = 'assets/gfx/nums/' + FUNCS.score.get_high() + '.png'

    score.id = 'score'
    score.style.left = '140px'
    score.style.top = '124px'
    score.src = 'assets/gfx/nums/0.png'

    count.id = 'count'
    count.style.left = '572px'
    count.style.top = '332px'
    count.src = 'assets/gfx/nums/4.png'

    container.id = 'bottle'
    container.appendChild(bottle)
    container.appendChild(hand)
    container.appendChild(loupe)
    container.appendChild(high)
    container.appendChild(score)
    container.appendChild(count)
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

function randomize_colors() {
    let colors = ['']

    for (let i = 0; i < 2; i++) {
        colors[i] = CONSTS.random_color()
    }

    return colors
}

function pill(colors) {
    VARS.has_pill_fallen = false
    
    for (let i = 0; i < 2; i++) {
        if (VARS.bottle_arr[1][3 + i] != '0.0.0.0') {
            VARS.is_game_over = true
            return
        }
        VARS.bottle_arr[1][3 + i] = VARS.current_pill + '.1.' + (4 - 2 * i) + '.' + colors[i]
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

            if (FUNCS.pill.get_rotation(VARS.bottle_arr[y][x]) === -3) {
                switch (FUNCS.pill.get_color(VARS.bottle_arr[y][x])) {
                case 'bl':
                    cell.style.backgroundImage = 'url(assets/gfx/bl_o.png)'
                    break
        
                case 'br':
                    cell.style.backgroundImage = 'url(assets/gfx/br_o.png)'
                    break
        
                case 'yl':
                    cell.style.backgroundImage = 'url(assets/gfx/yl_o.png)'
                    break
                        
                default:
                    break
                }
            } else if (FUNCS.pill.get_rotation(VARS.bottle_arr[y][x]) === -4) {
                switch (FUNCS.pill.get_color(VARS.bottle_arr[y][x])) {
                case 'bl':
                    cell.style.backgroundImage = 'url(assets/gfx/bl_x.png)'
                    break
    
                case 'br':
                    cell.style.backgroundImage = 'url(assets/gfx/br_x.png)'
                    break
    
                case 'yl':
                    cell.style.backgroundImage = 'url(assets/gfx/yl_x.png)'
                    break
                    
                default:
                    break
                }
            } else if (FUNCS.pill.get_no(VARS.bottle_arr[y][x]) === -1) {
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

function game_won() {
    let img = document.createElement('IMG')
    img.src = 'assets/gfx/sc.png'
    img.id = 'game-over'
    document.body.appendChild(img)
}

function throwable(colors) {
    let img1 = document.createElement('IMG')
    let img2 = document.createElement('IMG')
    let img3 = document.getElementById('hand')
    
    img3.style.left = '496px'
    img3.style.top = '64px'
    img3.src = 'assets/gfx/hands/up.png'

    img1.src = 'assets/gfx/' + colors[0] + '_left.png'
    img1.id = 'anim-pill-1'
    img1.style.top = '48px'
    img1.style.left = '480px'

    img2.src = 'assets/gfx/' + colors[1] + '_right.png'
    img2.id = 'anim-pill-2'
    img2.style.top = '48px'
    img2.style.left = '496px'

    document.getElementById('bottle').appendChild(img1)
    document.getElementById('bottle').appendChild(img2)
}

async function animate_pill() {
    for (let i = 0; i < 2; i++) {
        if (VARS.bottle_arr[1][3 + i] != '0.0.0.0') {
            VARS.is_game_over = true
            return
        }
    }
    
    let img1 = document.getElementById('anim-pill-1')
    let img2 = document.getElementById('anim-pill-2')
    let img3 = document.getElementById('hand')

    await FUNCS.timer.sleep(CONSTS.TIME / 50)
    img2.style.left = parseInt(img2.style.left) - 16 + 'px'
    img2.style.top = parseInt(img2.style.top) - 16 + 'px'
    img1.src = img1.src.replace('left', 'down')
    img2.src = img2.src.replace('right', 'up')

    await FUNCS.timer.sleep(CONSTS.TIME / 50)
    img1.style.top = parseInt(img1.style.top) - 16 + 'px'
    img2.style.left = parseInt(img2.style.left) - 16 + 'px'
    img1.src = img1.src.replace('down', 'right')
    img2.src = img2.src.replace('up', 'left')
    
    await FUNCS.timer.sleep(CONSTS.TIME / 50)
    img1.style.top = parseInt(img1.style.top) - 16 + 'px'
    img1.style.left = parseInt(img1.style.left) - 16 + 'px'
    img1.src = img1.src.replace('right', 'up')
    img2.src = img2.src.replace('left', 'down')
    
    await FUNCS.timer.sleep(CONSTS.TIME / 50)
    img1.style.left = parseInt(img1.style.left) - 16 + 'px'
    img2.style.top = parseInt(img2.style.top) - 16 + 'px'
    img1.src = img1.src.replace('up', 'left')
    img2.src = img2.src.replace('down', 'right')
    
    img3.style.left = '480px'
    img3.style.top = '80px'
    img3.src = 'assets/gfx/hands/mid.png'
    
    for (let i = 0; i < 3; i++) {
        await FUNCS.timer.sleep(CONSTS.TIME / 50)
        img2.style.left = parseInt(img2.style.left) - 16 + 'px'
        img2.style.top = parseInt(img2.style.top) - 16 + 'px'
        img1.src = img1.src.replace('left', 'down')
        img2.src = img2.src.replace('right', 'up')

        await FUNCS.timer.sleep(CONSTS.TIME / 50)
        img2.style.left = parseInt(img2.style.left) - 16 + 'px'
        img2.style.top = parseInt(img2.style.top) + 16 + 'px'
        img1.src = img1.src.replace('down', 'right')
        img2.src = img2.src.replace('up', 'left')

        await FUNCS.timer.sleep(CONSTS.TIME / 50)
        img1.style.left = parseInt(img1.style.left) - 16 + 'px'
        img1.style.top = parseInt(img1.style.top) - 16 + 'px'
        img1.src = img1.src.replace('right', 'up')
        img2.src = img2.src.replace('left', 'down')

        if (i === 0) {
            img3.style.left = '496px'
            img3.style.top = '96px'
            img3.src = 'assets/gfx/hands/down.png'
        }

        await FUNCS.timer.sleep(CONSTS.TIME / 50)
        img1.style.left = parseInt(img1.style.left) - 16 + 'px'
        img1.style.top = parseInt(img1.style.top) + 16 + 'px'
        img1.src = img1.src.replace('up', 'left')
        img2.src = img2.src.replace('down', 'right')
    }

    await FUNCS.timer.sleep(CONSTS.TIME / 50)
    img2.style.left = parseInt(img2.style.left) - 16 + 'px'
    img2.style.top = parseInt(img2.style.top) - 16 + 'px'
    img1.src = img1.src.replace('left', 'down')
    img2.src = img2.src.replace('right', 'up')

    await FUNCS.timer.sleep(CONSTS.TIME / 50)
    img1.style.top = parseInt(img1.style.top) + 16 + 'px'
    img2.style.left = parseInt(img2.style.left) - 16 + 'px'
    img2.style.top = parseInt(img2.style.top) + 32 + 'px'
    img1.src = img1.src.replace('down', 'right')
    img2.src = img2.src.replace('up', 'left')

    await FUNCS.timer.sleep(CONSTS.TIME / 50)
    img1.style.left = parseInt(img1.style.left) - 16 + 'px'
    img1.style.top = parseInt(img1.style.top) - 16 + 'px'
    img1.src = img1.src.replace('right', 'up')
    img2.src = img2.src.replace('left', 'down')

    await FUNCS.timer.sleep(CONSTS.TIME / 50)
    img1.style.left = parseInt(img1.style.left) - 16 + 'px'
    img1.style.top = parseInt(img1.style.top) + 16 + 'px'
    img1.src = img1.src.replace('up', 'left')
    img2.src = img2.src.replace('down', 'right')

    for (let i = 0; i < 3; i++) {
        await FUNCS.timer.sleep(CONSTS.TIME / 50)
        img1.style.top = parseInt(img1.style.top) + 16 + 'px'
        img2.style.top = parseInt(img2.style.top) + 16 + 'px'
    }

    await FUNCS.timer.sleep(CONSTS.TIME / 50)

    img1.outerHTML = ''
    img2.outerHTML = ''

    return GEN_HTML.randomize_colors()
}

async function loupe() {
    let img1 = document.createElement('IMG')
    let img2 = document.createElement('IMG')
    let img3 = document.createElement('IMG')
    let loupe = document.getElementById('loupe')

    let i = 2, deg = 0

    img1.className = 'loupe'
    img1.id = 'loupe1'
    img2.className = 'loupe'
    img2.id = 'loupe2'
    img3.className = 'loupe'
    img3.id = 'loupe3'

    img1.src = 'assets/gfx/loupe/bl/1.png'
    img2.src = 'assets/gfx/loupe/br/1.png'
    img3.src = 'assets/gfx/loupe/yl/1.png'
    
    loupe.appendChild(img1)
    loupe.appendChild(img2)
    loupe.appendChild(img3)

    while (!VARS.is_game_over && !VARS.was_game_won) {
        await FUNCS.timer.sleep(CONSTS.TIME / 2)
        if (VARS.is_game_over || VARS.was_game_won) break

        if (i === 4) {
            deg >= 360 ? deg = 0 : deg += 30
            loupe.style.transform = `rotate(${-deg}deg)`
            try {
                img1.src = 'assets/gfx/loupe/bl/' + 2 + '.png'
                img1.style.transform = `rotate(${deg}deg)`
            } catch { null }
            try {
                img2.src = 'assets/gfx/loupe/br/' + 2 + '.png'
                img2.style.transform = `rotate(${deg}deg)`
            } catch { null }
            try {
                img3.src = 'assets/gfx/loupe/yl/' + 2 + '.png'
                img3.style.transform = `rotate(${deg}deg)`
            } catch { null }
            i = 0
        } else {
            try { img1.src = 'assets/gfx/loupe/bl/' + i + '.png' } catch { null }
            try { img2.src = 'assets/gfx/loupe/br/' + i + '.png' } catch { null }
            try { img3.src = 'assets/gfx/loupe/yl/' + i + '.png' } catch { null }
        }

        i++
    } 

    i = 2

    do {
        await FUNCS.timer.sleep(CONSTS.TIME / 2)

        if (i === 6) i = 2
        try { img1.src = 'assets/gfx/loupe/bl/' + i + '.png' } catch { null }
        try { img2.src = 'assets/gfx/loupe/br/' + i + '.png' } catch { null }
        try { img3.src = 'assets/gfx/loupe/yl/' + i + '.png' } catch { null }
        i += 2
    } while (VARS.is_game_over)
}

function score_counter() {

    // y = 8 * 16
    // x = 9 * 16
}

function high_counter() {

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
        game_won: game_won,
        animate_pill: animate_pill,
        randomize_colors: randomize_colors,
        throwable: throwable,
        loupe: loupe,
        score_counter: score_counter,
        high_counter: high_counter
    }
}( (this) ))
