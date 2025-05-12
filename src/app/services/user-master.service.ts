import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Roles, UserModel } from '../model/UserModel';
import { AppConfig, APP_SERVICE_CONFIG } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class UserMasterService {
  private http = inject(HttpClient);
  private config: AppConfig = inject(APP_SERVICE_CONFIG);

  usersApi = `${this.config.api}/users`;

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersApi);
  }

  getUserbyId(id: number) {
    return this.http.get<UserModel>(`${this.usersApi}/${id}`);
  }

  removeUser(id: number) {
    return this.http.delete(`${this.usersApi}/${id}`);
  }

  updateUser(inputdata: {
    id: string | null;
    role: string | null;
    isActive: boolean | null;
  }) {
    return this.http.patch(`${this.usersApi}/${inputdata.id}`, inputdata);
  }

  getAllRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.config.api}/roles`);
  }
}
