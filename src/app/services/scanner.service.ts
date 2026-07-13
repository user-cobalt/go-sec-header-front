// src/app/services/scanner.service.ts
// src/app/services/scanner.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScanResult } from '../models/scan-result.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class ScannerService {
  clearHistory(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/history`);
  }
  private apiUrl = environment.apiUrl;
  
  private get headers(): HttpHeaders {
    return new HttpHeaders({ 'X-API-KEY': environment.apiKey})
  }

  constructor(private http: HttpClient) {}


  getScanResult(target: string): Observable<ScanResult> {
    return this.http.get<ScanResult>(`${this.apiUrl}/scan?target=${encodeURIComponent(target)}`, {
      headers: this.headers
    });
  }
  getHistory(): Observable<ScanResult[]> {
    return this.http.get<ScanResult[]>(
      `${this.apiUrl}/history`,
      {headers: this.headers}
    )
  }

}