import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    imports: [RouterLink],
})
export class NavigationComponent implements OnInit {
  @Input() isAdmin: boolean | undefined;
  @Input() isMenuVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
