import { Component, OnInit } from '@angular/core';
import { ScannerService } from './services/scanner.service';
import { ScanResult } from './models/scan-result.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  targetUrl = '';
  results: ScanResult | null = null;
  loading = false;
  historyLoading = false;
  error: string | null = null;
  showHistory = false;
  history: ScanResult[] = [];

  constructor(private scannerService: ScannerService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyLoading = true;
    this.scannerService.getHistory().subscribe({
      next: (data) => { this.history = data; this.historyLoading = false; },
      error: () => { this.historyLoading = false; }
    });
  }

  runScan(): void {
    const target = this.targetUrl.trim();
    if (!target || this.loading) return;
    this.loading = true;
    this.error = null;
    this.results = null;
    this.scannerService.getScanResult(target).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;

    const newHistoryItem: ScanResult = {
      url: this.targetUrl,
      isSecure: this.results.isSecure,
      score: this.results.score,
      headerDetails: this.results.headerDetails,
      scannedAt: this.results.scannedAt
    }
        this.history.unshift(newHistoryItem)

        this.loadHistory();
      },
      error: (err) => {
        this.error = err.status === 429
          ? 'Too many requests — please wait a moment before scanning again.'
          : 'Scan failed. Check the URL and try again.';
        this.loading = false;
      }
    });
  }

  clearHistory(): void {
    this.scannerService.clearHistory().subscribe({
      next: () => { this.history = []; this.showHistory = false; },
      error: () => { this.error = 'Failed to clear history.'; }
    });
  }

  loadFromHistory(item: ScanResult): void {
    this.results = item;
    this.targetUrl = item.url;
    this.showHistory = false;
    this.error = null;
  }

  toggleHistory(): void { this.showHistory = !this.showHistory; }

  getLetterGrade(score: number): string {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 40) return 'D';
    return 'F';
  }

  getSecurityMessage(score: number): string {
    if (score >= 90) return 'Excellent — follows industry best practices.';
    if (score >= 75) return 'Good, but a few headers could be tightened up.';
    if (score >= 60) return 'Weak configuration — several headers need attention.';
    if (score >= 40) return 'Vulnerable to common web attacks. Fix missing headers.';
    return 'Critical — almost no protocol-level protection in place.';
  }

  getGradeColor(score: number): string {
    if (score >= 75) return '#00b894';
    if (score >= 60) return '#d97706';
    return '#d63031';
  }

  getFoundCount(): number {
    return this.results?.headerDetails.filter(h => h.status === 'FOUND').length ?? 0;
  }

  getMissingCount(): number {
    return this.results?.headerDetails.filter(h => h.status !== 'FOUND').length ?? 0;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }
}