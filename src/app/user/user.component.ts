import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';

import { UserModel } from '../model/UserModel';
import { UserMasterService } from '../services/user-master.service';
import { ModalpopupComponent } from '../modal-popup/modalpopup.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userDetail: any;
  dataSource: any;

  constructor(private service: UserMasterService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe((item) => {
      this.userDetail = item;
      this.dataSource = new MatTableDataSource<UserModel>(this.userDetail);
      this.dataSource.paginator = this.paginator;
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'isActive',
    'role',
    'Action',
  ];

  functionUpdate(id: number) {
    let popup = this.dialog.open(ModalpopupComponent, {
      width: '400px',
      // height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id,
      },
    });
    popup.afterClosed().subscribe((item) => {
      this.getAllUsers();
    });
  }

  functionDelete(id: number) {
    alertify.confirm(
      'Remove User',
      'Do you want remove this user?',
      () => {
        this.service.removeUser(id).subscribe((item) => {
          this.getAllUsers();
          alertify.success('Removed Successfully');
        });
      },
      function () {}
    );
  }
}
