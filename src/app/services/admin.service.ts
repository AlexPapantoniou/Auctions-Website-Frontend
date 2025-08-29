import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  userid: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  address: string;
  phonenumber: string;
  afm: string;
  accepted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/auctions/admin';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  acceptUser(userid: number): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/accept/${userid}`, {});
  }

  deleteUser(userid: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${userid}`);
  }
}
