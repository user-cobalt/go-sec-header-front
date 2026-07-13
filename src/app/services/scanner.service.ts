// src/app/services/scanner.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Removed HttpHeaders
import { Observable } from 'rxjs';
import { ScanResult } from '../models/scan-result.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  private apiUrl = environment.apiUrl; // Resolves to '/api'

  constructor(private http: HttpClient) {}

  getScanResult(target: string): Observable<ScanResult> {
    
    return this.http.get<ScanResult>(`${this.apiUrl}/scan?target=${encodeURIComponent(target)}`);
  }

  getHistory(): Observable<ScanResult[]> {
    return this.http.get<ScanResult[]>(`${this.apiUrl}/history`);
  }

  clearHistory(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/history`);
  }
}