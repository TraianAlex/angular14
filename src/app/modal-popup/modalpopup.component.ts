import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import * as alertify from 'alertifyjs';

import { Roles } from '../model/UserModel';
import { UserMasterService } from '../services/user-master.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatButton,
    MatDialogClose,
    UpperCasePipe,
  ],
})
export class ModalpopupComponent implements OnInit, OnDestroy {
  private service = inject(UserMasterService);
  data = inject<{
    id: number;
  }>(MAT_DIALOG_DATA);
  private ref = inject<MatDialogRef<ModalpopupComponent>>(MatDialogRef);

  roles!: Roles[];
  updateform = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(true),
  });
  private saveUserSub!: Subscription;
  private getRolesSub!: Subscription;
  private getUserSub!: Subscription;

  ngOnInit(): void {
    this.getAllRoles();
    this.getUser(this.data.id);
  }

  saveUser() {
    if (this.updateform.valid) {
      this.saveUserSub = this.service
        .updateUser(this.updateform.getRawValue())
        .subscribe((user) => {
          if (user) {
            alertify.success('Updated successfully.');
            this.ref.close();
          } else {
            alertify.error('Failed try again');
          }
        });
    }
  }

  getAllRoles() {
    this.getRolesSub = this.service.getAllRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  getUser(id: number) {
    this.getUserSub = this.service.getUserbyId(id).subscribe((user) => {
      if (user !== null) {
        this.updateform.setValue({
          id: user.id,
          role: user.role,
          isActive: user.isActive,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.saveUserSub?.unsubscribe();
    this.getRolesSub?.unsubscribe();
    this.getUserSub?.unsubscribe();
  }
}
