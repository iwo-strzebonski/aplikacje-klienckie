var frame1 = document.getElementById('player')
var button = document.getElementById('randomise')
var bool = false

for (j = 1; j < 11; j++) {
	for (i = 1; i < 11; i++) {
		div = document.createElement('DIV')
		div.style.top = 32 * (j - 1) + 'px'
		div.style.left = 32 * (i - 1) + 'px'
		div.className = 'scanlines cell'
		frame1.appendChild(div)
	}
}

button.addEventListener("click", () => {
	if (!bool) {
		generate_ships()

		for (j = 1; j < 11; j++) {
			for (i = 1; i < 11; i++) {
				div = frame1.children[10 * (j - 1) + i - 1]
				div.style.backgroundColor = cell_list[j][i] === 1 ? 'rgba(0, 255, 65, 0.5)' : 'transparent'
				div.style.borderColor = cell_list[j][i] === 1 ? 'transparent' : 'rgba(0, 255, 65, 0.5)'
			}
		}

		bool = true
	}
})
