export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[]; // For 7d chart
  logo: string; // URL to the logo
}

export interface CryptoState {
  assets: CryptoAsset[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}