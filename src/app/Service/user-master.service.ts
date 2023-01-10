import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from '../model/UserModel';
import { AppConfig, APP_SERVICE_CONFIG } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class UserMasterService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {}

  usersApi = `${this.config.api}/users`;

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersApi);
  }

  getUserbyId(id: any) {
    return this.http.get(`${this.usersApi}/id`);
  }

  removeUser(id: any) {
    return this.http.delete(`${this.usersApi}/id`);
  }

  updateUser(inputdata: any) {
    return this.http.patch(`${this.usersApi}/inputdata.id`, inputdata);
  }

  getAllRoles() {
    return this.http.get(`${this.config.api}/roles`);
  }
}
