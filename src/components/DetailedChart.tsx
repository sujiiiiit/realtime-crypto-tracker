import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useAppSelector } from '../redux/store';
import { selectSortedAssets } from '../redux/selectors';
import { formatCurrency, formatLargeNumber, formatPercentage } from '../utils/formatters';
import { TrendingUp, TrendingDown, DollarSign, Coins, BarChart3, CircleDollarSign, LineChart, BarChart, CandlestickChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'line' | 'bar' | 'area';

const DetailedChart: React.FC = () => {
  const assets = useAppSelector(selectSortedAssets);
  const [selectedCrypto, setSelectedCrypto] = useState(assets[0]?.id);
  const [chartType, setChartType] = useState<ChartType>('line');
  
  const selectedAsset = assets.find(asset => asset.id === selectedCrypto);
  
  const getChartData = (type: ChartType) => ({
    labels: Array.from({ length: 24 }, (_, i) => `${23 - i}h ago`).reverse(),
    datasets: [
      {
        label: selectedAsset?.name || '',
        data: selectedAsset?.chartData || [],
        borderColor: selectedAsset?.change24h && selectedAsset.change24h >= 0 ? '#10b981' : '#ef4444',
        backgroundColor: type === 'area' 
          ? selectedAsset?.change24h && selectedAsset.change24h >= 0 
            ? 'rgba(16, 185, 129, 0.1)' 
            : 'rgba(239, 68, 68, 0.1)'
          : type === 'bar'
          ? selectedAsset?.chartData.map(value => 
              value > (selectedAsset?.chartData[0] || 0) 
                ? 'rgba(16, 185, 129, 0.6)'
                : 'rgba(239, 68, 68, 0.6)'
            )
          : 'transparent',
        fill: type === 'area',
        tension: 0.4,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Price: ${formatCurrency(context.raw)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => formatCurrency(value),
        },
      },
    },
  };

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon,
    tooltip
  }: { 
    title: string; 
    value: string; 
    icon: React.ElementType;
    tooltip: string;
  }) => (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg relative group">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      </div>
      <p className="text-xl font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
      <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );

  const ChartTypeButton = ({ 
    type, 
    icon: Icon, 
    label 
  }: { 
    type: ChartType; 
    icon: React.ElementType; 
    label: string;
  }) => (
    <button
      onClick={() => setChartType(type)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        chartType === type 
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Detailed Price Chart
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a cryptocurrency and chart type to view detailed price history
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="block w-full sm:w-auto px-4 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedAsset && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Current Price"
              value={formatCurrency(selectedAsset.price)}
              icon={DollarSign}
              tooltip="The current trading price of the asset"
            />
            <MetricCard
              title="Market Cap"
              value={`$${formatLargeNumber(selectedAsset.marketCap)}`}
              icon={CircleDollarSign}
              tooltip="Total value of all coins in circulation (Price × Supply)"
            />
            <MetricCard
              title="24h Volume"
              value={`$${formatLargeNumber(selectedAsset.volume24h)}`}
              icon={BarChart3}
              tooltip="Total trading volume in the last 24 hours"
            />
            <MetricCard
              title="Circulating Supply"
              value={`${formatLargeNumber(selectedAsset.circulatingSupply)} ${selectedAsset.symbol}`}
              icon={Coins}
              tooltip="Number of coins currently in circulation"
            />
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">1h Change:</span>
                <span className={`font-medium ${
                  selectedAsset.change1h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {selectedAsset.change1h >= 0 ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                  {formatPercentage(selectedAsset.change1h)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">24h Change:</span>
                <span className={`font-medium ${
                  selectedAsset.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {selectedAsset.change24h >= 0 ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                  {formatPercentage(selectedAsset.change24h)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">7d Change:</span>
                <span className={`font-medium ${
                  selectedAsset.change7d >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {selectedAsset.change7d >= 0 ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                  {formatPercentage(selectedAsset.change7d)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <ChartTypeButton type="line" icon={LineChart} label="Line" />
            <ChartTypeButton type="bar" icon={BarChart} label="Bar" />
            <ChartTypeButton type="area" icon={LineChart} label="Area" />
          </div>
          
          <div className="h-[400px]">
            {chartType === 'bar' ? (
              <Bar data={getChartData('bar')} options={options} />
            ) : (
              <Line data={getChartData(chartType)} options={options} />
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-2">
              <strong>Understanding the Chart:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Switch between different chart types to view the data in different ways:
                <ul className="list-circle pl-5 mt-1">
                  <li><strong>Line:</strong> Shows continuous price movement</li>
                  <li><strong>Bar:</strong> Emphasizes price changes between periods</li>
                  <li><strong>Area:</strong> Highlights the price range and volume</li>
                </ul>
              </li>
              <li>Colors indicate price movement: green for positive, red for negative</li>
              <li>Hover over any point to see the exact price at that time</li>
              <li>The time scale shows the last 24 hours of trading</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedChart;