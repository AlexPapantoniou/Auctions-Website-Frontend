import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost/auctions/items';

  constructor(private http: HttpClient) {};

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/additem`, item);
  }
}
