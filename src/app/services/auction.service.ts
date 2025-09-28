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

  searchAuctions(userid: number, keyword: string, page:number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/${userid}?keyword=${keyword}&page=${page}&size=${size}`);
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

  getPriceRange(): Observable<{ min: number, max: number }> {
    return this.http.get<{ min: number, max: number }>(`${this.apiUrl}/price-range`);
  }

  getMinActivePrice(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/minPrice`);
  }

  getMaxActivePrice(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/maxPrice`);
  }

  getAuctionsFilteredOrderedByWeight(userid: number, category: string, location: string, city: string, country: string, 
    minPrice: number, maxPrice: number, activeOnly: boolean, page: number, size: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/filtered/${userid}/${category}/${location}/${city}/${country}/${minPrice}/${maxPrice}` + 
                          `?activeOnly=${activeOnly}&page=${page}&size=${size}`);
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
