import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Auction } from '../model/auction.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = 'http://localhost:8080/auctions';

  constructor(private http: HttpClient) {};

  getAllAuctions(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchAuctions(keyword: string, page:number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?keyword=${keyword}&page=${page}&size=${size}`);
  }

  getAuctionsByCategory(category: string, page:number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/category?category=${encodeURIComponent(category)}&page=${page}&size=${size}`);
  }

  getAuctionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addAuction(auction: Auction): Observable<Auction> {
    return this.http.post<Auction>(`${this.apiUrl}/addauction`, auction);
  }
}
