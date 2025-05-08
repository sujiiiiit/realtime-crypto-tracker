import { CryptoAsset } from '../types/crypto';
import { updateCryptoPrice } from '../redux/cryptoSlice';
import { AppDispatch } from '../redux/store';

/**
 * Mock WebSocket class to simulate real-time price updates
 */
export class MockWebSocket {
  private interval: number | null = null;
  private dispatch: AppDispatch;
  private assets: CryptoAsset[];
  
  constructor(dispatch: AppDispatch, assets: CryptoAsset[]) {
    this.dispatch = dispatch;
    this.assets = assets;
  }

  /**
   * Start the mock WebSocket to simulate price updates
   */
  connect(): void {
    if (this.interval !== null) return;
    
    this.interval = window.setInterval(() => {
      // Pick a random asset to update
      const assetIndex = Math.floor(Math.random() * this.assets.length);
      const asset = { ...this.assets[assetIndex] };
      
      // Generate random price change (between -2% and +2%)
      const priceChangePercent = (Math.random() * 4 - 2) / 100;
      const newPrice = asset.price * (1 + priceChangePercent);
      
      // Update other metrics based on price change
      const updates = {
        id: asset.id,
        price: newPrice,
        change1h: asset.change1h + (Math.random() * 0.4 - 0.2),
        change24h: asset.change24h + (Math.random() * 0.6 - 0.3),
        change7d: asset.change7d + (Math.random() * 0.8 - 0.4),
        volume24h: asset.volume24h * (1 + (Math.random() * 0.01 - 0.005)),
        // Add a new point to chart data and remove the oldest one
        chartData: [...asset.chartData.slice(1), newPrice],
      };
      
      this.dispatch(updateCryptoPrice(updates));
    }, 1500); // Update every 1.5 seconds
  }

  /**
   * Stop the mock WebSocket updates
   */
  disconnect(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}