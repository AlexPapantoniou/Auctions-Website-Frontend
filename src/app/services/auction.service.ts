import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Auction } from '../model/auction.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = '/auctions/auctions';

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

  getItemsByLocation(location: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/location/${location}?page=${page}&size=${size}`);
  }

  getItemsByCity(city: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/city/${city}?page=${page}&size=${size}`);
  }

  getItemsByCountry(country: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/country/${country}?page=${page}&size=${size}`);
  }

  addAuction(auction: Auction): Observable<Auction> {
    return this.http.post<Auction>(`${this.apiUrl}/addauction`, auction);
  }

  updateAuction(auctionid: number, auction: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${auctionid}`, auction);
  }

  deleteAuction(auctionid: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${auctionid}`);
  }
}
