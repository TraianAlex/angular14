import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import * as alertify from 'alertifyjs';

import { Roles } from '../model/UserModel';
import { UserMasterService } from '../services/user-master.service';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css'],
  standalone: false,
})
export class ModalpopupComponent implements OnInit, OnDestroy {
  roles!: Roles[];
  updateform = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(true),
  });
  private saveUserSub!: Subscription;
  private getRolesSub!: Subscription;
  private getUserSub!: Subscription;

  constructor(
    private service: UserMasterService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private ref: MatDialogRef<ModalpopupComponent>,
  ) {}

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
