import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  constructor(private route: Router, private service: UserService) {}
  isMenuVisible = true;
  isAdmin = false;

  ngDoCheck(): void {
    const currentroute = this.route.url;
    if (currentroute === '/login' || currentroute === '/access/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }

    if (this.service.getRole() === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
