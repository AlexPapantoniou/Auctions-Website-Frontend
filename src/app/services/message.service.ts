import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = "/auctions/messages";

  constructor(private http: HttpClient) {}

  getMessagesByAuction(auctionid: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${auctionid}`);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/send`, message);
  }

  deleteMessage(messageid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${messageid}`);
  }
}
