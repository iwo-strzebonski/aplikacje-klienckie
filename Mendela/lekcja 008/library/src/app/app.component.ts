import { Component } from '@angular/core'

import data from '../assets/magazines.json'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'library'
    linksArray: {src: string, klik: string}[] = []

    constructor() {
        for (const i in data.czasopisma.zmienne) {
            if (data.czasopisma.zmienne[i].src) this.linksArray.push(data.czasopisma.zmienne[i])
        }

        console.log(this.linksArray)
    }

    createLink(src: string) {
        return `http://www.atarionline.pl/biblioteka/czasopisma/img/${src}`
    }
}
