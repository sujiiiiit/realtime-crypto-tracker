import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CryptoAsset } from '../types/crypto';

// Base selector to get the assets array
export const selectCryptoAssets = (state: RootState) => state.crypto.assets;

// Get a specific asset by ID
export const selectAssetById = (id: string) => 
  createSelector(
    [selectCryptoAssets],
    (assets): CryptoAsset | undefined => 
      assets.find(asset => asset.id === id)
  );

// Get all assets sorted by rank
export const selectSortedAssets = createSelector(
  [selectCryptoAssets],
  (assets): CryptoAsset[] => 
    [...assets].sort((a, b) => a.rank - b.rank)
);

// Get assets with 24h change > 0 (gainers)
export const selectGainers = createSelector(
  [selectCryptoAssets],
  (assets): CryptoAsset[] => 
    assets.filter(asset => asset.change24h > 0)
          .sort((a, b) => b.change24h - a.change24h)
);

// Get assets with 24h change < 0 (losers)
export const selectLosers = createSelector(
  [selectCryptoAssets],
  (assets): CryptoAsset[] => 
    assets.filter(asset => asset.change24h < 0)
          .sort((a, b) => a.change24h - b.change24h)
);