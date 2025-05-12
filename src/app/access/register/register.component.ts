import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatAnchor } from '@angular/material/button';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [
        MatCard,
        MatCardTitle,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        MatAnchor,
    ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private service = inject(UserService);

  reactiveform = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email]),
    ),
  });
  private saveUserSub!: Subscription;

  ngOnInit(): void {}

  redirectLogin() {
    this.router.navigate(['login']);
  }

  saveUser() {
    if (this.reactiveform.valid) {
      this.saveUserSub = this.service
        .registration({
          ...this.reactiveform.value,
          role: 'user',
          isActive: false,
        })
        .subscribe((item) => {
          if (item) {
            alertify.success(
              'Registerted successfully please contact admin for activation',
            );
            this.redirectLogin();
          } else {
            alertify.error('Failed try again');
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.saveUserSub?.unsubscribe();
  }
}
