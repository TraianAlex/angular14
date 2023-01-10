import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from '../Model/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserMasterService {
  constructor(private http: HttpClient) {}

  apiurl = 'http://localhost:8080/users';

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiurl);
  }

  getUserbyId(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }

  removeUser(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  updateUser(inputdata: any) {
    return this.http.patch(`${this.apiurl}/inputdata.id`, inputdata);
  }

  getAllRoles() {
    return this.http.get('http://localhost:8080/roles');
  }
}
