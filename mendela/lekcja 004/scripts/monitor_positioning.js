var crt_list = document.getElementsByClassName('noisy')
var monitor_list = document.getElementsByClassName('monitor')
var button = document.getElementById('randomise')
var width = window.innerWidth

monitor_list[0].style.left = (width / 2 - 468) + 'px'
monitor_list[1].style.left = (width / 2 + 50) + 'px'
button.style.left = (width / 2 - 45) + 'px'

function color() {
    for (i = 0; i < crt_list.length; i++) {
        crt_list[i].style.backgroundColor = crt_list[i].style.backgroundColor == 'rgb(5, 45, 20)' ? 'rgb(6, 53, 24)' : 'rgb(5, 45, 20)'
    }
}

window.setInterval(color, 10)