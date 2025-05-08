import { CryptoAsset } from '../types/crypto';

// Generate random chart data for the last 7 days
const generateChartData = (basePrice: number, volatility: number): number[] => {
  const data: number[] = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    // Add some random fluctuation
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice += change;
    data.push(Math.max(0.01, currentPrice)); // Ensure price doesn't go below 0.01
  }
  
  return data;
};

export const initialCryptoData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 65423.27,
    change1h: 0.23,
    change24h: -1.45,
    change7d: 2.78,
    marketCap: 1289762541232,
    volume24h: 28761543210,
    circulatingSupply: 19700000,
    maxSupply: 21000000,
    chartData: generateChartData(65000, 0.01),
    logo: '/logos/bitcoin-btc-logo.png',
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3564.89,
    change1h: -0.12,
    change24h: 1.23,
    change7d: -0.87,
    marketCap: 428974512365,
    volume24h: 15874563210,
    circulatingSupply: 120456789,
    maxSupply: null,
    chartData: generateChartData(3500, 0.015),
    logo: '/logos/ethereum-eth-logo.png',
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    price: 1.0,
    change1h: 0.01,
    change24h: -0.02,
    change7d: 0.0,
    marketCap: 96451237890,
    volume24h: 58741236540,
    circulatingSupply: 96000000000,
    maxSupply: null,
    chartData: generateChartData(1.0, 0.0005),
    logo: '/logos/tether-usdt-logo.png',
  },
  {
    id: 'bnb',
    rank: 4,
    name: 'BNB',
    symbol: 'BNB',
    price: 589.32,
    change1h: 0.56,
    change24h: 2.34,
    change7d: 5.67,
    marketCap: 87451236540,
    volume24h: 2784512365,
    circulatingSupply: 148254123,
    maxSupply: 200000000,
    chartData: generateChartData(580, 0.02),
    logo: '/logos/bnb-bnb-logo.png',
  },
  {
    id: 'xrp',
    rank: 5,
    name: 'XRP',
    symbol: 'XRP',
    price: 0.62,
    change1h: -0.34,
    change24h: -1.67,
    change7d: -3.45,
    marketCap: 34851237890,
    volume24h: 1587452158,
    circulatingSupply: 56231478952,
    maxSupply: 100000000000,
    chartData: generateChartData(0.62, 0.03),
    logo: '/logos/xrp-xrp-logo.png',
  }
];