import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/Material-Module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    localStorage.clear();
  }
  respdata: any;

  ProdceedLogin(logindata: any) {
    if (logindata.valid) {
      // this.userService.ProceedLogin(logindata.value).subscribe((item) => {
      //   this.respdata = item;
      //   if (this.respdata !== null) {
      //     localStorage.setItem('token', this.respdata.jwtToken);
      //     this.route.navigate(['/']);
      //   } else {
      //     alert('Login Failed');
      //   }
      // });
      const { password } = logindata.form.value;
      this.userService.ProceedLogin(logindata).subscribe((user) => {
        if (user.length && user[0].password === password) {
          localStorage.setItem('role', user[0].role);
          this.route.navigate(['/']);
        } else {
          alertify.error('Login Failed');
        }
      });
    }
  }

  RedirectRegister() {
    this.route.navigate(['access/register']);
  }
}
