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
    for (let j = 0; j < 16; j++) {
        let row = document.createElement('TR')
        for (let i = 0; i < 8; i++) {
            let cell = document.createElement('TH')
            cell.className = 'cell'
            row.appendChild(cell)
        }
        document.getElementsByTagName('table')[0].appendChild(row)
    }
}

function pill() {
    VARS.current_pill++
    let cell
    
    for (let i = 0; i < 2; i++) {
        cell = document.createElement('DIV')
        cell.style.top = 6 * 16 + 'px'
        cell.style.left = (20 + i) * 16 + 'px'
        cell.innerText = VARS.current_pill + '\n1'
        cell.className = 'pill'

        switch (CONSTS.random_between(0, 2)) {
        case 0:
            // eslint-disable-next-line quotes
            cell.style.backgroundImage = `url(assets/gfx/bl_${i === 0 ? 'left' : 'right'}.png)`
            break
        case 1:
            // eslint-disable-next-line quotes
            cell.style.backgroundImage = `url(assets/gfx/br_${i === 0 ? 'left' : 'right'}.png)`
            break
        case 2:
            // eslint-disable-next-line quotes
            cell.style.backgroundImage = `url(assets/gfx/yl_${i === 0 ? 'left' : 'right'}.png)`
            break
        default:
            break
        }

        document.getElementById('bottle').appendChild(cell)
    }
}

function virus() {
    let virus

    let x = CONSTS.random_between(0, 7)
    let y = CONSTS.random_between(0, 10)

    let all_x = []
    let all_y = []

    for (let i = 0; i < VARS.vir_count; i++) {
        while (all_x.includes(x) && all_y.includes(y)) {
            x = CONSTS.random_between(0, 7)
            y = CONSTS.random_between(0, 10)
        }
        all_x.push(x)
        all_y.push(y)
    }

    for (let i = 0; i < all_x.length; i++) {
        virus = document.createElement('DIV')
        virus.style.top = 336 - all_y[i] * 16 + 'px'
        virus.style.left = (all_x[i] + 17) * 16 + 'px'
        virus.className = 'virus'
        
        switch (CONSTS.random_between(0, 2)) {
        case 0:
            virus.style.backgroundImage = 'url(assets/gfx/covid_blue.png)'
            break
        case 1:
            virus.style.backgroundImage = 'url(assets/gfx/covid_brown.png)'
            break
        case 2:
            virus.style.backgroundImage = 'url(assets/gfx/covid_yellow.png)'
            break
        default:
            break
        }
    
        document.getElementById('bottle').appendChild(virus)
    }
}

(function(globals) {
    globals.GEN_HTML = {
        bottle: bottle,
        cells: cells,
        virus: virus,
        pill: pill
    }
}( (this) ))
