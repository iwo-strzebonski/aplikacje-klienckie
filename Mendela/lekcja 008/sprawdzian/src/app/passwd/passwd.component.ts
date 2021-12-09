import { Component, OnInit } from '@angular/core'
import data from '../../assets/data.json'

@Component({
  selector: 'app-passwd',
  templateUrl: './passwd.component.html',
  styleUrls: ['./passwd.component.css']
})
export class PasswdComponent implements OnInit {
  readonly data = JSON.stringify(data)
  dataArr: string[] = []
  selected: string = ''

  constructor() {
    for (const i in data) {
      this.dataArr.push(data[i])
    }
  }

  ngOnInit(): void {
  }

  handleClick(data: string) {
    this.selected = data
  }

  checkStyle(data: string) {
    if (data === this.selected) {
      return 'background-color: red'
    } else {
      return ''
    }
  }
}
