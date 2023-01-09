import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Model/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserMasterService {
  constructor(private http: HttpClient) {}
  // apiurl = 'https://localhost:44308/api/UserMaster';
  apiurl = 'http://localhost:8080/users';

  GetAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiurl);
  }

  GetUserbyId(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }

  RemoveUser(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  UpdateUser(inputdata: any) {
    console.log('inputdata', inputdata);
    // return this.http.post(this.apiurl + '/ActivateUser', inputdata);
    return this.http.patch(this.apiurl + '/' + inputdata.id, inputdata);
  }

  GetAllRoles() {
    // return this.http.get('https://localhost:44308/User/GetAllRole');
    return this.http.get('http://localhost:8080/roles');
  }
}
