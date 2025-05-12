import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports: [RouterLink],
})
export class NavigationComponent {
  readonly isAdmin = input<boolean>();
  readonly isMenuVisible = input<boolean>(false);
}
