import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as alertify from 'alertifyjs';

import { UserService } from '../services/user.service';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAnchor, MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatAnchor,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private route = inject(Router);

  private loginUserSub!: Subscription;

  ngOnInit(): void {
    localStorage.clear();
  }

  prodceedLogin(logindata: NgForm) {
    if (logindata.valid) {
      // this.userService.proceedLogin(logindata.value).subscribe((item) => {
      //   this.respdata = item;
      //   if (this.respdata !== null) {
      //     localStorage.setItem('token', this.respdata.jwtToken);
      //     this.route.navigate(['/']);
      //   } else {
      //     alert('Login Failed');
      //   }
      // });
      const { password } = logindata.form.value;
      this.loginUserSub = this.userService
        .proceedLogin(logindata)
        .subscribe((user) => {
          if (user.length && user[0].password === password) {
            localStorage.setItem('role', user[0].role);
            this.route.navigate(['/']);
          } else {
            alertify.error('Login Failed');
          }
        });
    }
  }

  redirectRegister() {
    this.route.navigate(['access/register']);
  }

  ngOnDestroy(): void {
    this.loginUserSub?.unsubscribe();
  }
}
