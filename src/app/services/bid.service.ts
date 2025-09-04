import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private apiUrl = 'http:localhost:8080/bids';

  constructor(private http: HttpClient) {}

  getBidsByAuctionId(auctionid: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auction/${auctionid}?page=${page}&size=${size}`);
  }

  placeBid(auctionid: number, bidderid: number, amount: number): Observable<any> {
    const bid = {
      auction: { auctionid: auctionid },
      bidder: { userid: bidderid },
      amount: amount,
      bidTime: new Date()
    }
    return this.http.post<any>(`${this.apiUrl}/place`, bid);
  }
}
