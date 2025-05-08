import React from 'react';
import { Coins } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Coins className="h-10 w-10 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Real-Time Crypto Price Tracker</h1>
              <p className="text-blue-100 text-sm">Live updates every few seconds</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;