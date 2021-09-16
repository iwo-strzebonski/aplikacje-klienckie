class Globals {
    constructor() {}

    static width : number
    static height : number
    static blockadesCount : number
    static pressed : number = 0

    static randomBetween(min : number, max : number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

class HTMLFactory {
    private w : number
    private h : number
    private f : number
    private b : number
    
    constructor(width:  number, height : number, blockadesCount : number) {
        this.w = width
        this.h = height
        this.f = width * height - 2
        this.b = blockadesCount
    }

    static tdPressed(e: Event) : void {
        let td : HTMLTableCellElement = <HTMLTableCellElement>e.target
        let tr : HTMLTableRowElement = <HTMLTableRowElement>td.parentElement
        // console.log(td.cellIndex)
        // console.log(tr.rowIndex)
        td.innerText = (++Globals.pressed) === 1 ? 'S' : 'M'
        if (Globals.pressed === 2) {
            console.log(document.getElementsByTagName('td'))
            for (let i in document.getElementsByTagName('td')) {
                (<Element>document.getElementsByTagName('td')[i])
                .removeEventListener('click', HTMLFactory.tdPressed)
            }
        }
    }

    private elementTD() : HTMLTableCellElement {
        let td: HTMLTableCellElement = document.createElement('td')

        td.addEventListener('click', HTMLFactory.tdPressed)

        if (Globals.randomBetween(0, this.f) < this.b) {
            td.innerText = 'X'
            this.b--
        }

        this.f--

        return td
    }

    private elementTR() : HTMLTableRowElement{
        let tr : HTMLTableRowElement = document.createElement('tr')

        for (let x : number = 0; x < this.w; x++) {
            tr.appendChild(this.elementTD())
        }

        return tr
    }

    private elementTable() : HTMLTableElement {
        let table : HTMLTableElement = document.createElement('table')

        for (let y : number = 0; y < this.h; y++) {
            table.append(this.elementTR())
        }

        return table
    }

    render() : void {
        document.body.appendChild(this.elementTable())
    }
}

Globals.width = 4
Globals.height = 4
Globals.blockadesCount = 3

const htmlFactory : HTMLFactory = new HTMLFactory(Globals.width, Globals.height, Globals.blockadesCount)

htmlFactory.render()
