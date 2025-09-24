import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private apiUrl = '/auctions/export';

  constructor(private http: HttpClient) {}

  exportXml(): Observable<any> {
    return this.http.get(`${this.apiUrl}/xml`, { responseType: 'text' });
  }

  exportJSON(): Observable<any> {
    return this.http.get(`${this.apiUrl}/json`, { responseType: 'blob' });
  }
}
