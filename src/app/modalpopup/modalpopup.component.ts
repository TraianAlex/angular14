import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';

import { UserMasterService } from '../service/user-master.service';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css'],
})
export class ModalpopupComponent implements OnInit {
  constructor(
    private service: UserMasterService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private ref: MatDialogRef<ModalpopupComponent>
  ) {}

  ngOnInit(): void {
    this.getAllRole();
    this.getExistdata(this.data.id);
  }

  roleData!: any;
  editData!: any;

  updateform = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(true),
  });

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

  getAllRole() {
    this.service.getAllRoles().subscribe((item) => {
      this.roleData = item;
    });
  }

  getExistdata(id: number) {
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
