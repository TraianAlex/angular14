import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserMasterService } from '../Service/user-master.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css'],
})
export class ModalpopupComponent implements OnInit {
  constructor(
    private service: UserMasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalpopupComponent>
  ) {}

  ngOnInit(): void {
    this.getAllRole();
    this.GetExistdata(this.data.id);
  }

  roledata: any;
  editdata: any;

  updateform = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(true),
  });

  SaveUser() {
    if (this.updateform.valid) {
      this.service
        .UpdateUser(this.updateform.getRawValue())
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
      this.roledata = item;
    });
  }

  GetExistdata(id: any) {
    this.service.GetUserbyId(id).subscribe((item) => {
      this.editdata = item;
      if (this.editdata !== null) {
        this.updateform.setValue({
          id: this.editdata.id,
          role: this.editdata.role,
          isActive: this.editdata.isActive,
        });
      }
    });
  }
}
