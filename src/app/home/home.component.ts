import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  headername = 'Angular 14 ';

  salary = 10;

  isdiabled = false;

  colorname = 'green';
  font = '40px';

  classname = 'headclass';
  stylevalue = { color: 'green', 'font-size': '30px' };

  colors = ['green', 'red', 'yellow', 'black', 'white'];

  constructor() {}

  ngOnInit(): void {}

  functionclick(name: string) {
    alert(name);
  }
}
