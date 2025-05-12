import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-contact',
    template: `
    <h2>contact</h2>
    <a routerLink="add">Add Contact</a>
    <br />
    <a routerLink="edit/201">Edit Contact</a>

    <div>
      <router-outlet></router-outlet>
    </div>
  `,
    styleUrls: ['./contact.component.css'],
    imports: [RouterLink, RouterOutlet],
})
export class ContactComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
