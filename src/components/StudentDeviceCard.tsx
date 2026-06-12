import { useState, useEffect } from 'react';
import { Battery, Wifi, Circle, Eye, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface StudentDeviceCardProps {
  student: {
    id: string;
    name: string;
    device: string;
    focusScore: number;
    status: 'focused' | 'moderate' | 'low';
    battery: number;
    signalStrength: number;
    electrodeContact: 'connected' | 'partial' | 'disconnected';
  };
  onStatistikClick: (studentName: string, device: string) => void;
}

function generateSparklineData(baseScore: number) {
  return Array.from({ length: 12 }, (_, i) => ({
    value: Math.max(20, Math.min(100, baseScore + (Math.random() * 30 - 15))),
  }));
}

export default function StudentDeviceCard({ student, onStatistikClick }: StudentDeviceCardProps) {
  const [sparkData, setSparkData] = useState(generateSparklineData(student.focusScore));

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkData(generateSparklineData(student.focusScore));
    }, 3000);
    return () => clearInterval(interval);
  }, [student.focusScore]);

  const getStatusConfig = (status: 'focused' | 'moderate' | 'low') => {
    const configs = {
      focused: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        label: 'Focused',
        color: '#10B981',
      },
      moderate: {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        label: 'Moderate',
        color: '#F59E0B',
      },
      low: {
        bg: 'bg-rose-100',
        text: 'text-rose-700',
        label: 'Low Focused',
        color: '#F43F5E',
      },
    };
    return configs[status];
  };

  const getBatteryColor = (level: number) => {
    if (level >= 70) return 'text-emerald-500';
    if (level >= 30) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getSignalBars = (strength: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-1 rounded-sm transition-all ${
          i < strength ? 'bg-emerald-500' : 'bg-gray-200'
        }`}
        style={{ height: `${(i + 1) * 2 + 2}px` }}
      />
    ));
  };

  const statusConfig = getStatusConfig(student.status);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
      {/* Header: Name and Status Badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{student.name}</p>
            <p className="text-xs text-gray-400">{student.device}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
          {statusConfig.label}
        </span>
      </div>

      {/* Focus Score with Trend */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl font-bold text-gray-800">{student.focusScore}%</span>
        <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <TrendingUp className="w-3 h-3" />
          +{Math.floor(Math.random() * 10 + 1)}%
        </span>
      </div>

      {/* Sparkline Chart */}
      <div className="h-12 mb-4 bg-gray-50 rounded-lg p-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={statusConfig.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hardware Indicators */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
        <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <Battery className={`w-4 h-4 ${getBatteryColor(student.battery)} mb-1`} />
          <span className="text-xs font-semibold text-gray-700">{student.battery}%</span>
        </div>

        <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <div className="flex items-end gap-0.5 h-4 mb-1">
            {getSignalBars(student.signalStrength)}
          </div>
          <span className="text-xs text-gray-400">Wi-Fi</span>
        </div>

        <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <Circle
            className={`w-4 h-4 ${
              student.electrodeContact === 'connected' ? 'text-emerald-500' :
              student.electrodeContact === 'partial' ? 'text-amber-500' : 'text-rose-500'
            } fill-current mb-1`}
          />
          <span className="text-xs text-gray-400">Sensor</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onStatistikClick(student.name, student.device)}
        className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
      >
        <Eye className="w-4 h-4" />
        Statistik Harian
      </button>
    </div>
  );
}
