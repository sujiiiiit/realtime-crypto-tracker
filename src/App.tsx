import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import CryptoTable from './components/CryptoTable';
import DetailedChart from './components/DetailedChart';

function App() {
  // Update page title on component mount
  useEffect(() => {
    document.title = 'Real-Time Crypto Price Tracker';
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Today's Cryptocurrency Prices
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The global crypto market cap is $2.51T, a 1.2% increase over the last day.
              All prices update in real-time.
            </p>
          </div>
          
          <DetailedChart />
          <CryptoTable />
          
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Data updates automatically every few seconds. Price data is simulated for demonstration purposes.
            </p>
          </div>
        </main>
        
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              © 2025 Real-Time Crypto Price Tracker. All data is simulated and for demo purposes only.
            </p>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;