import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/auctions/users';

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUserById(userid: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userid}`);
  }

  login(username: string, password: string): Observable<User> {
    const body = { username: username, password: password };
    return this.http.post<User>(`${this.apiUrl}/login`, body);
  }
}