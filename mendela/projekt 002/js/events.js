var slider = document.getElementsByTagName('ul')[0]
var slider_left = document.getElementById('slider_left')
var slider_right = document.getElementById('slider_right')
var gamemodes = document.getElementsByClassName('gamemodes')
var cells = document.getElementsByClassName('cell')
var game = document.getElementById('game')
start_time = 0
gamemode = 0

slider_left.onclick = async () => {
    await move.left()
}

slider_right.onclick = async () => {
    await move.right()
}

for (var n = 0; n < gamemodes.length; n++) {
    switch (n) {
        case 0:
            gamemodes[0].onclick = () => {
                generate_html.image_cells(0)
                cell_array.clickable_cells()
                gamemode = 0
                start_time = Date.now()
                start_array = cell_array.generate()
                current_array = cell_array.generate()
                async_bool = false
                setTimeout(() => {
                    async_bool = true
                    timer.display_time()
                }, 1)
                move.generate()
            }
            break
    
        case 1:
            gamemodes[1].onclick = () => {
                generate_html.image_cells(1)
                cell_array.clickable_cells()
                gamemode = 1
                start_time = Date.now()
                start_array = cell_array.generate()
                current_array = cell_array.generate()
                async_bool = false
                setTimeout(() => {
                    async_bool = true
                    timer.display_time()
                }, 1)
                move.generate()
            }
            break
    
        case 2:
            gamemodes[2].onclick = () => {
                generate_html.image_cells(2)
                cell_array.clickable_cells()
                gamemode = 2
                start_time = Date.now()
                start_array = cell_array.generate()
                current_array = cell_array.generate()
                async_bool = false
                setTimeout(() => {
                    async_bool = true
                    timer.display_time()
                }, 1)
                move.generate()
            }
            break
    
        case 3:
            gamemodes[3].onclick = () => {
                generate_html.image_cells(3)
                cell_array.clickable_cells()
                gamemode = 3
                start_time = Date.now()
                start_array = cell_array.generate()
                current_array = cell_array.generate()
                async_bool = false
                setTimeout(() => {
                    async_bool = true
                    timer.display_time()
                }, 1)
                move.generate()
            }
            break
    }
}