import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor() {}

  readonly correctPasswd = 'is'

  title = 'sprawdzian'
  passwd = ''
  validPasswd = false
}
