import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = 'http://localhost"8080/auctions';

  constructor(private http: HttpClient) {};

  getAllAuctions(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchAuctions(keyword: string, page:number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?keyword:${keyword}&page=${page}&size=${size}`);
  }

  getAuctionsByCategory(category: string, page:number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/category?category:${category}&page=${page}&size=${size}`);
  }

  getAuctionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
