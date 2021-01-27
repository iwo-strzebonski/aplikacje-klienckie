'use strict'

const generate_html = {
    bottle: () => {
        let bottle = document.createElement('DIV')
        bottle.id = 'bottle'
        document.body.appendChild(bottle)
    },
    cells: () => {
        for (let j = 0; j < 16; j++) {
            for (let i = 0; i < 8; i++) {
                let cell = document.createElement('DIV')
                cell.style.top = 32 * j + 'px'
                cell.style.left = 32 * i + 'px'
                cell.className = 'cell'
                document.getElementById('bottle').appendChild(cell)
            }
        }
    },
    test_pill: () => {
        let cell = document.createElement('DIV')
        cell.style.top = 3 * 32 + 'px'
        cell.style.left = 3 * 32 + 'px'
        cell.className = 'cell'
        cell.id = 'test'
        document.getElementById('bottle').appendChild(cell)
    }
}

generate_html.bottle()
generate_html.cells()
generate_html.test_pill()

console.log(VARS.bottle_list[0][3])