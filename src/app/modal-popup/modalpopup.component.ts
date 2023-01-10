import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';

import { Roles, UserModel } from '../model/UserModel';
import { UserMasterService } from '../services/user-master.service';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css'],
})
export class ModalpopupComponent implements OnInit {
  roleData!: Roles[];
  editData!: UserModel;
  updateform = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(true),
  });

  constructor(
    private service: UserMasterService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private ref: MatDialogRef<ModalpopupComponent>
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.getUser(this.data.id);
  }

  saveUser() {
    if (this.updateform.valid) {
      this.service
        .updateUser(this.updateform.getRawValue())
        .subscribe((item) => {
          if (item) {
            alertify.success('Updated successfully.');
            this.ref.close();
          } else {
            alertify.error('Failed try again');
          }
        });
    }
  }

  getAllRoles() {
    this.service.getAllRoles().subscribe((item) => {
      this.roleData = item;
    });
  }

  getUser(id: number) {
    this.service.getUserbyId(id).subscribe((item) => {
      this.editData = item;
      if (this.editData !== null) {
        this.updateform.setValue({
          id: this.editData.id,
          role: this.editData.role,
          isActive: this.editData.isActive,
        });
      }
    });
  }
}
