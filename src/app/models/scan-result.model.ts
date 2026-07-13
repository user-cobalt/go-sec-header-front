export interface HeaderDetail {
  name: string;
  status: 'FOUND' | 'WEAK' | 'MISSING'
  tip?: string;   
  description: string
}

export interface ScanResult {
  url: string;
  score: number;
  isSecure: boolean;
  headerDetails: HeaderDetail[]; 
  scannedAt: string
}

