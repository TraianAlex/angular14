import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Buffer } from 'buffer';
import { map, Observable } from 'rxjs';

import {
  AppConfig,
  APP_SERVICE_CONFIG,
} from './../services/app-config.service';
import { UserModel } from '../model/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {}

  proceedLogin(inputdata: NgForm): Observable<UserModel[]> {
    const { username } = inputdata.form.value;
    return this.http
      .get<UserModel[]>(`${this.config.api}/users`)
      .pipe(map((users) => users.filter((user) => user.name === username)));
  }

  isLoogedIn(): boolean {
    this.getRole();
    return localStorage.getItem('role') !== null;
  }

  // getToken(): string | null {
  //   return localStorage.getItem('token') !== null
  //     ? localStorage.getItem('token')
  //     : '';
  // }

  registration(inputdata: Omit<UserModel, 'id'>): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.config.api}/users`, inputdata);
  }

  getRole(): string | null {
    // var token = localStorage.getItem('token');
    // if (token !== null) {
    //   var extractdata = JSON.parse(
    //     Buffer.from(token.split('.')[1], 'base64').toString()
    //   );
    //   return extractdata.role;
    // } else {
    //   return '';
    // }
    let role = localStorage.getItem('role');
    return role !== '' ? role : '';
  }
}
