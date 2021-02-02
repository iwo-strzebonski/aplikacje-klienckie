'use strict'

const generate_html = {
    bottle: () => {
        let container = document.createElement('DIV')
        container.id = 'bottle'
        let bottle = document.createElement('TABLE')
        container.appendChild(bottle)
        document.body.appendChild(container)
    },
    cells: () => {
        for (let j = 0; j < 16; j++) {
            let row = document.createElement('TR')
            for (let i = 0; i < 8; i++) {
                let cell = document.createElement('TH')
                cell.className = 'cell'
                row.appendChild(cell)
            }
            document.getElementsByTagName('table')[0].appendChild(row)
        }
    },
    test_pill: () => {
        let cell = document.createElement('DIV')
        cell.style.top = 0 * 32 + 'px'
        cell.style.left = 3 * 32 + 'px'
        cell.innerText = '0\nr'
        cell.className = 'test'
        document.getElementById('bottle').appendChild(cell)
        
        cell = document.createElement('DIV')
        cell.style.top = 0 * 32 + 'px'
        cell.style.left = 4 * 32 + 'px'
        cell.innerText = '0\nr'
        cell.className = 'test'
        document.getElementById('bottle').appendChild(cell)
    }
}

generate_html.bottle()
generate_html.cells()
generate_html.test_pill()

Array.from(document.getElementsByClassName('test')).forEach(cell => {
    console.log(cell.innerHTML)
})