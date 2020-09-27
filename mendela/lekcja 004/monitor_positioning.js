var crt_list = document.getElementsByClassName('noisy')
var monitor_list = document.getElementsByClassName('monitor')
var width = screen.width
// monitor_list[0].style.left = 50 * 418 / width + '%'
monitor_list[0].style.left = '5%'
monitor_list[0].style.top = '8%'
monitor_list[1].style.left = '50%'
monitor_list[1].style.top = '8%'

function color() {
    for (i = 0; i < crt_list.length; i++) {
        crt_list[i].style.backgroundColor = crt_list[i].style.backgroundColor == 'rgb(5, 45, 20)' ? 'rgb(6, 53, 24)' : 'rgb(5, 45, 20)'
    }
}

window.setInterval(color, 10)