import React, { memo } from 'react';
import { CryptoAsset } from '../types/crypto';
import ChartThumbnail from './ChartThumbnail';
import ChangeDisplay from './ChangeDisplay';
import { formatCurrency, formatLargeNumber } from '../utils/formatters';

interface CryptoRowProps {
  asset: CryptoAsset;
  isUpdating: boolean;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ asset, isUpdating }) => {
  const {
    rank,
    name,
    symbol,
    price,
    change1h,
    change24h,
    change7d,
    marketCap,
    volume24h,
    circulatingSupply,
    maxSupply,
    chartData,
    logo,
  } = asset;

  // For price updates, add a flash animation
  const priceUpdateClass = isUpdating ? (
    price > 0 
      ? 'bg-green-50 dark:bg-green-900/20 animate-flash-green' 
      : 'bg-red-50 dark:bg-red-900/20 animate-flash-red'
  ) : '';

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{rank}</td>
      
      <td className="px-4 py-4">
        <div className="flex items-center">
          <img src={logo} alt={`${name} logo`} className="w-6 h-6 mr-2" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{symbol}</div>
          </div>
        </div>
      </td>
      
      <td className={`px-4 py-4 font-medium text-right ${priceUpdateClass}`}>
        {formatCurrency(price)}
      </td>
      
      <td className="px-4 py-4 text-center">
        <ChangeDisplay value={change1h} />
      </td>
      
      <td className="px-4 py-4 text-center">
        <ChangeDisplay value={change24h} />
      </td>
      
      <td className="px-4 py-4 text-center">
        <ChangeDisplay value={change7d} />
      </td>
      
      <td className="px-4 py-4 text-right">
        ${formatLargeNumber(marketCap)}
      </td>
      
      <td className="px-4 py-4 text-right">
        ${formatLargeNumber(volume24h)}
      </td>
      
      <td className="px-4 py-4 text-right">
        {formatLargeNumber(circulatingSupply)} {symbol}
      </td>
      
      <td className="px-4 py-4 text-right">
        {maxSupply ? formatLargeNumber(maxSupply) : '∞'} {symbol}
      </td>
      
      <td className="px-4 py-4">
        <ChartThumbnail data={chartData} change7d={change7d} />
      </td>
    </tr>
  );
};

// Memoize the component to optimize rendering performance
export default memo(CryptoRow);