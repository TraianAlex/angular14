import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';

import { UserModel } from '../model/UserModel';
import { UserMasterService } from '../service/user-master.service';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';

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
  constructor(private service: UserMasterService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userDetail: any;
  dataSource: any;

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

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
