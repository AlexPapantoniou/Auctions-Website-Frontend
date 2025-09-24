import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '/auctions/admin';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  acceptUser(userid: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userid}/accept`, {});
  }

  deleteUser(userid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userid}/delete`);
  }
  
}
