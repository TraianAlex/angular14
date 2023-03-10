import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as alertify from 'alertifyjs';

import { MaterialModule } from 'src/app/material.module';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginUserSub!: Subscription;

  constructor(private userService: UserService, private route: Router) {}

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
      this.loginUserSub = this.userService.proceedLogin(logindata).subscribe((user) => {
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
