import { Component, DoCheck, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from './services/user.service';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavigationComponent, RouterOutlet],
})
export class AppComponent implements DoCheck {
  private route = inject(Router);
  private service = inject(UserService);

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
