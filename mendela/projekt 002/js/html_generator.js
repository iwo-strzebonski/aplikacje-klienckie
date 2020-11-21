empty_cell = null

generate_html = {
    image_cells: (n) => {
        while (game.firstChild) {
            game.removeChild(game.firstChild)
        }
        for (var j = 0; j < n + 3; j++) {
            for (var i = 0; i < n + 3; i++) {
                var dims = 720 / (n + 3)

                cell = document.createElement('DIV')
                cell.className = 'cell'
                cell.id = j.toString() + i.toString()

                if (cell.id == ((n + 2).toString() + (n + 2).toString())) {
                    cell.style.background = 'transparent'
                    empty_cell = cell.id
                } else {
                    cell.style.backgroundImage = `url(${calc_slider.get_img()})`
                    cell.style.backgroundPositionX = -(i * dims) + 'px'
                    cell.style.backgroundPositionY = -(j * dims) + 'px'
                }
                cell.style.width = dims + 'px'
                cell.style.height = dims + 'px'
                cell.style.top = j * dims + 'px'
                cell.style.left = i * dims + 'px'

                game.appendChild(cell)
            }
        }
    },
    div: (t) => {
        switch (t) {
            case 0:
                div = document.createElement('DIV')
                div.className = 'line'
                document.body.appendChild(div)
                break
        
            default:
                game = document.createElement('DIV')
                game.id = 'game'
                div.appendChild(game)
                break
        }
    },
    slider: () => {
        slider = document.createElement('DIV')
        slider.id = 'slider'
        div.appendChild(slider)

        ul = document.createElement('UL')
        document.getElementById('slider').appendChild(ul)
        
        for (var i = 0; i < 4; i++) {
            li = document.createElement('LI')
            img = document.createElement('IMG')
            switch (i) {
                case 0:
                case 3:
                    img.src = './gfx/miles-edgeworth.png'
                    break
            
                case 1:
                    img.src = './gfx/franziska-von-karma.png'
                    break
        
                case 2:
                    img.src = './gfx/godot.png'
                    break
            }
            li.appendChild(img)
            ul.appendChild(li)
        }
    },
    slider_button: (s) => {
        btn = document.createElement('BUTTON')
        btn.id = `slider_${s == 0 ? 'left' : 'right'}`
        btn.innerText = `${s == 0 ? '<' : '>'}`
        div.appendChild(btn)
    },
    timer: () => {
        span = document.createElement('SPAN')
        div.append(span)
    },
    gamemodes: () => {
        for (var i = 0; i < 4; i++) {
            btn = document.createElement('BUTTON')
            btn.className = 'gamemodes'
            switch (i) {
                case 0:
                    btn.innerText = '3x3'
                    break
            
                case 1:
                    btn.innerText = '4x4'
                    break
            
                case 2:
                    btn.innerText = '5x5'
                    break
            
                case 3:
                    btn.innerText = '6x6'
                    break
            }
            div.appendChild(btn)
        }
    }
}

generate_html.div(0)
generate_html.slider_button(0)
generate_html.slider()
generate_html.slider_button(1)
generate_html.div(0)
generate_html.gamemodes()
generate_html.div(0)
generate_html.timer()
generate_html.div(0)
generate_html.div(1)