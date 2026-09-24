export type FundingType = 'equity' | 'loan' | 'grant';

export interface Deal {
  id: number;
  company: string;
  founder: string;
  sector: string;
  pitch: string;
  type: FundingType;
  amount: number;
  equity_pct: number | null;
  created_at: string;
}

export interface DealCreate {
  company: string;
  founder: string;
  sector: string;
  pitch: string;
  type: FundingType;
  amount: number;
  equity_pct?: number;
}
