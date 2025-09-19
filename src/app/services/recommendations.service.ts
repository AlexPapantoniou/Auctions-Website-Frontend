import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private apiUrl = "/auctions/recommendations";

  constructor(private http: HttpClient) {}

  logInteraction(userid: number, auctionid: number, type: string, weight: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/interactions`, null, {
      params: { userid, auctionid, type, weight }
    });
  }

  getUserInteractions(userid: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/interactions/user/${userid}`);
  }

  getAuctionInteractions(auctionid: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/interactions/auction/${auctionid}`);
  }

  saveUserFactors(userid: number, factors: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/factors/user/${userid}`, factors, {
      headers: { 'Content-Type': 'application.jason' }
    });
  }

  getUserFactors(userid: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/factors/user/${userid}`);
  }

  saveAuctionFactors(auctionid: number, factors: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/factors/auction/${auctionid}`, factors, {
      headers: { 'Content-Type': 'application.jason' }
    });
  }

  getAuctionFactors(auctionid: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/factors/auction/${auctionid}`);
  }
}
