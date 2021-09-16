class Globals {
    constructor() { }
    static randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
Globals.pressed = 0;
class HTMLFactory {
    constructor(width, height, blockadesCount) {
        this.w = width;
        this.h = height;
        this.f = width * height - 2;
        this.b = blockadesCount;
    }
    static tdPressed(e) {
        let td = e.target;
        let tr = td.parentElement;
        // console.log(td.cellIndex)
        // console.log(tr.rowIndex)
        td.innerText = (++Globals.pressed) === 1 ? 'S' : 'M';
        if (Globals.pressed === 2) {
            console.log(document.getElementsByTagName('td'));
            for (let i in document.getElementsByTagName('td')) {
                document.getElementsByTagName('td')[i]
                    .removeEventListener('click', HTMLFactory.tdPressed);
            }
        }
    }
    elementTD() {
        let td = document.createElement('td');
        td.addEventListener('click', HTMLFactory.tdPressed);
        if (Globals.randomBetween(0, this.f) < this.b) {
            td.innerText = 'X';
            this.b--;
        }
        this.f--;
        return td;
    }
    elementTR() {
        let tr = document.createElement('tr');
        for (let x = 0; x < this.w; x++) {
            tr.appendChild(this.elementTD());
        }
        return tr;
    }
    elementTable() {
        let table = document.createElement('table');
        for (let y = 0; y < this.h; y++) {
            table.append(this.elementTR());
        }
        return table;
    }
    render() {
        document.body.appendChild(this.elementTable());
    }
}
Globals.width = 4;
Globals.height = 4;
Globals.blockadesCount = 3;
const htmlFactory = new HTMLFactory(Globals.width, Globals.height, Globals.blockadesCount);
htmlFactory.render();
