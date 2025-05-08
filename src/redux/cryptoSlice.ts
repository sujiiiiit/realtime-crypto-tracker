import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, CryptoAsset } from '../types/crypto';
import { initialCryptoData } from '../data/mockCryptoData';

const initialState: CryptoState = {
  assets: initialCryptoData,
  status: 'succeeded',
  error: null,
};

export interface PriceUpdate {
  id: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  volume24h: number;
  chartData: number[];
}

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    // Update a crypto asset price and related metrics
    updateCryptoPrice: (state, action: PayloadAction<PriceUpdate>) => {
      const { id, ...updates } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      
      if (assetIndex !== -1) {
        state.assets[assetIndex] = {
          ...state.assets[assetIndex],
          ...updates,
        };
      }
    },
  },
});

export const { updateCryptoPrice } = cryptoSlice.actions;

export default cryptoSlice.reducer;