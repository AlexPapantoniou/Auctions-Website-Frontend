import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Auction } from '../model/auction.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = '/auctions';

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

  getAuctionsBySeller(sellerId: number, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/seller/${sellerId}/auctions?page=${page}&size=${size}`);
  }

  getAllLocations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/locations`);
  }

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cities`);
  }

  getAllCountries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/countries`);
  }

  getAuctionsByLocation(location: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/location/${encodeURIComponent(location)}?page=${page}&size=${size}`);
  }

  getAuctionsByCity(city: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/city/${encodeURIComponent(city)}?page=${page}&size=${size}`);
  }

  getAuctionsByCountry(country: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/country/${encodeURIComponent(country)}?page=${page}&size=${size}`);
  }

  getAuctionsOrdered(userId: number, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ordered/${userId}?page=${page}&size=${size}`);
  }

  addAuction(auction: Auction): Observable<Auction> {
    return this.http.post<Auction>(`${this.apiUrl}/addauction`, auction);
  }

  buyNow(auctionid: number, bidderid: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${auctionid}/buy/${bidderid}`, {});
  }

  updateAuction(auctionid: number, auction: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${auctionid}`, auction);
  }

  deleteAuction(auctionid: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${auctionid}`);
  }
}
