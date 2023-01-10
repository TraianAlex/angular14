import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  reactiveform = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
  });

  constructor(private router: Router, private service: UserService) {}

  ngOnInit(): void {}

  redirectLogin() {
    this.router.navigate(['login']);
  }

  saveUser() {
    if (this.reactiveform.valid) {
      this.service
        .registration({
          ...this.reactiveform.value,
          role: 'user',
          isActive: false,
        })
        .subscribe((item) => {
          if (item) {
            alertify.success(
              'Registerted successfully please contact admin for activation'
            );
            this.redirectLogin();
          } else {
            alertify.error('Failed try again');
          }
        });
    }
  }
}
