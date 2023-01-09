import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { map, Observable } from 'rxjs';

import { UserModel } from '../Model/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  ProceedLogin(inputdata: any): Observable<UserModel[]> {
    const { username } = inputdata.form.value;
    return this.http
      .get<UserModel[]>('http://localhost:8080/users')
      .pipe(map((users) => users.filter((user) => user.name === username)));
  }

  IsLoogedIn() {
    this.GetRole();
    return localStorage.getItem('role') !== null;
  }

  GetToken() {
    return localStorage.getItem('token') != null
      ? localStorage.getItem('token')
      : '';
  }

  Registeration(inputdata: any) {
    return this.http.post('http://localhost:8080/users', inputdata);
  }

  GetRole() {
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
