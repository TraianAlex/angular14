import { Component } from '@angular/core';
import { NgStyle, NgClass, UpperCasePipe, PercentPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    NgStyle,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    UpperCasePipe,
    PercentPipe,
  ],
})
export class HomeComponent {
  headername = 'Angular 14 ';

  salary = 10;

  isdiabled = false;

  colorname = 'green';
  font = '40px';

  classname = 'headclass';
  stylevalue = { color: 'green', 'font-size': '30px' };

  colors = ['green', 'red', 'yellow', 'black', 'white'];

  functionclick(name: string) {
    alert(name);
  }
}
