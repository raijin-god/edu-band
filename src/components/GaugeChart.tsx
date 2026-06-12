import { useMemo } from 'react';

interface GaugeChartProps {
  value: number;
  maxValue?: number;
  classAverage?: number;
  label?: string;
  size?: number;
}

export default function GaugeChart({ value, maxValue = 100, classAverage = 70, label = 'Learning Score', size = 200 }: GaugeChartProps) {
  const percentage = (value / maxValue) * 100;
  const averagePercentage = (classAverage / maxValue) * 100;

  const { strokeDasharray, strokeDashoffset, averageDashoffset } = useMemo(() => {
    const radius = (size - 20) / 2;
    const circumference = radius * Math.PI; // Half circle
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const averageDashoffset = circumference - (averagePercentage / 100) * circumference;

    return { strokeDasharray, strokeDashoffset, averageDashoffset, radius };
  }, [percentage, averagePercentage, size]);

  const radius = (size - 20) / 2;
  const centerX = size / 2;
  const centerY = size / 2 + 10;

  const getColor = (val: number) => {
    if (val >= 80) return '#3B82F6';
    if (val >= 60) return '#10B981';
    if (val >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size * 0.6 }}>
        <svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size * 0.6}`}>
          {/* Background arc (gray) */}
          <path
            d={`M 10 ${centerY} A ${radius} ${radius} 0 0 1 ${size - 10} ${centerY}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Class average arc */}
          <path
            d={`M 10 ${centerY} A ${radius} ${radius} 0 0 1 ${size - 10} ${centerY}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={averageDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />

          {/* Value arc (blue) */}
          <path
            d={`M 10 ${centerY} A ${radius} ${radius} 0 0 1 ${size - 10} ${centerY}`}
            fill="none"
            stroke={getColor(value)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />

          {/* Gradient glow effect */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Center value */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -20%)',
          }}
        >
          <span className="text-4xl font-bold text-gray-800">{value}</span>
          <span className="text-sm text-gray-500 mt-1">{label}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <span className="text-sm text-gray-500">Rata-rata Kelas ({classAverage})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor(value) }} />
          <span className="text-sm text-gray-500">Skor Anda</span>
        </div>
      </div>
    </div>
  );
}
