var frame2 = document.getElementById('bot')

generate_ships()

for (j = 1; j < 11; j++) {
	for (i = 1; i < 11; i++) {
		div = document.createElement('DIV')
		div.style.top = 32 * (j - 1) + 'px'
		div.style.left = 32 * (i - 1) + 'px'
		div.style.backgroundColor = cell_list[j][i] === 1 ? 'rgba(0, 255, 65, 0.5)' : 'transparent'
		div.style.borderColor = cell_list[j][i] === 1 ? 'transparent' : 'rgba(0, 255, 65, 0.5)'
		div.className = 'scanlines cell'
		frame2.appendChild(div)
	}
}