import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import * as alertify from 'alertifyjs';

import { UserModel } from '../model/UserModel';
import { UserMasterService } from '../services/user-master.service';
import { ModalpopupComponent } from '../modal-popup/modalpopup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<UserModel>;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'isActive',
    'role',
    'Action',
  ];
  private getUsersSub!: Subscription;
  private removeUserSub!: Subscription;

  constructor(private service: UserMasterService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.getUsersSub = this.service.getAllUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource<UserModel>(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  updateUser(id: number) {
    let popup = this.dialog.open(ModalpopupComponent, {
      width: '400px',
      // height:'400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id,
      },
    });

    popup.afterClosed().subscribe(() => {
      this.getAllUsers();
    });
  }

  deleteUser(id: number) {
    alertify.confirm(
      'Remove User',
      'Do you want remove this user?',
      () => {
        this.removeUserSub = this.service.removeUser(id).subscribe(() => {
          this.getAllUsers();
          alertify.success('Removed Successfully');
        });
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.getUsersSub?.unsubscribe();
    this.removeUserSub?.unsubscribe();
  }
}
