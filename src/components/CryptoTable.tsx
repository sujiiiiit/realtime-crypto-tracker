import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { selectSortedAssets } from '../redux/selectors';
import CryptoRow from './CryptoRow';
import { MockWebSocket } from '../utils/mockWebSocket';
import { ArrowUpDown } from 'lucide-react';

const CryptoTable: React.FC = () => {
  const assets = useAppSelector(selectSortedAssets);
  const dispatch = useAppDispatch();
  const [updatingAssets, setUpdatingAssets] = useState<Set<string>>(new Set());
  const mockWsRef = useRef<MockWebSocket | null>(null);

  // Initialize and clean up the mock WebSocket
  useEffect(() => {
    if (assets.length) {
      mockWsRef.current = new MockWebSocket(dispatch, assets);
      mockWsRef.current.connect();
    }
    
    return () => {
      if (mockWsRef.current) {
        mockWsRef.current.disconnect();
      }
    };
  }, [dispatch, assets.length]);

  // Track which assets have updated to show animations
  useEffect(() => {
    const handlePriceUpdates = () => {
      // Set each asset as updating
      const updatedSet = new Set(assets.map(asset => asset.id));
      setUpdatingAssets(updatedSet);
      
      // Clear the updating status after animation completes
      setTimeout(() => {
        setUpdatingAssets(new Set());
      }, 1000);
    };

    // Create a simple store subscription
    const unsubscribe = store.subscribe(handlePriceUpdates);
    
    return () => unsubscribe();
  }, [assets]);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              #
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center justify-center">
                1h % <ArrowUpDown size={12} className="ml-1" />
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center justify-center">
                24h % <ArrowUpDown size={12} className="ml-1" />
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center justify-center">
                7d % <ArrowUpDown size={12} className="ml-1" />
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Market Cap
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Volume (24h)
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Circulating Supply
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Max Supply
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Last 7 Days
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {assets.map(asset => (
            <CryptoRow
              key={asset.id}
              asset={asset}
              isUpdating={updatingAssets.has(asset.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;

// For the store subscription
import { store } from '../redux/store';