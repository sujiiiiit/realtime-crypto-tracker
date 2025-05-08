import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { formatPercentage } from '../utils/formatters';

interface ChangeDisplayProps {
  value: number;
  animated?: boolean;
}

const ChangeDisplay: React.FC<ChangeDisplayProps> = ({ value, animated = true }) => {
  const isPositive = value > 0;
  const isZero = value === 0;
  
  const textColorClass = isPositive 
    ? 'text-green-500' 
    : isZero 
      ? 'text-gray-500' 
      : 'text-red-500';
  
  const bgColorClass = isPositive 
    ? 'bg-green-50 dark:bg-green-900/20' 
    : isZero 
      ? 'bg-gray-50 dark:bg-gray-800' 
      : 'bg-red-50 dark:bg-red-900/20';
  
  const AnimatedArrow = animated ? (
    <span className={`inline-block transition-transform ${isPositive ? 'animate-bounce-up' : 'animate-bounce-down'}`}>
      {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
    </span>
  ) : (
    isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />
  );

  return (
    <div className={`inline-flex items-center rounded-md px-2 py-1 ${textColorClass} ${bgColorClass} font-medium text-xs sm:text-sm transition-colors duration-300`}>
      {!isZero && AnimatedArrow}
      <span>{formatPercentage(value)}</span>
    </div>
  );
};

export default ChangeDisplay;