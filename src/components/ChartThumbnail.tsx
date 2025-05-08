import React, { useMemo } from 'react';

interface ChartThumbnailProps {
  data: number[];
  change7d: number;
  width?: number;
  height?: number;
}

const ChartThumbnail: React.FC<ChartThumbnailProps> = ({ 
  data, 
  change7d,
  width = 120, 
  height = 40 
}) => {
  const chartColor = change7d >= 0 ? '#10b981' : '#ef4444';
  
  const points = useMemo(() => {
    if (!data.length) return '';
    
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1; // Avoid division by zero
    
    // Calculate normalized points
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      // Invert the y-coordinate (SVG 0,0 is top left)
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    }).join(' ');
  }, [data, width, height]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={chartColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChartThumbnail;