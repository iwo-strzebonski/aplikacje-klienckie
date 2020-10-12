var img = document.getElementById('img')
img.style.width = "300px"
img.style.height = "300px"
var w = img.width
var h = img.height

var i = 1
var resize

function scaling() {
    if (i == 1) {
        resize = false
    }
    if (i < 0.01) {
        resize = true
    }
    if (!resize) {
        i -= 0.01
        img.style.width = w * i + "px"
        img.style.height = h * i + "px"
    }
    if (resize) {
        i += 0.01
        img.style.width = w * i + "px"
        img.style.height = h * i + "px"
    }
}
window.setInterval(scaling, 10)