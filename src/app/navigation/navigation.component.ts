import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() isadmin: boolean| undefined;
  @Input() isMenuVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
