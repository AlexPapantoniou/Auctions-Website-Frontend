import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'auctions/items';

  constructor(private http: HttpClient) {};

  getItemsByOwner(ownerid: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/owner/${ownerid}`);
  }
}
