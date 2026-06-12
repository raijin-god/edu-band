import { Battery, Wifi, Circle } from 'lucide-react';
import { DeviceStatus } from '../types';

interface DeviceCardProps {
  device: DeviceStatus;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  const getBatteryColor = (level: number) => {
    if (level >= 70) return 'text-emerald-500';
    if (level >= 30) return 'text-amber-500';
    return 'text-red-500';
  };

  const getSignalBars = (strength: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-1 rounded-sm transition-all ${
          i < strength ? 'bg-emerald-500' : 'bg-gray-200'
        }`}
        style={{ height: `${(i + 1) * 3 + 3}px` }}
      />
    ));
  };

  const contactStatus = {
    connected: { color: 'bg-emerald-500', label: 'Terkoneksi' },
    partial: { color: 'bg-amber-500', label: 'Sebagian' },
    disconnected: { color: 'bg-red-500', label: 'Tidak Terhubung' },
  };

  const status = contactStatus[device.electrodeContact];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-100 group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{device.name}</h4>
          <p className="text-sm text-gray-500">{device.studentName}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            device.electrodeContact === 'connected'
              ? 'bg-emerald-100 text-emerald-700'
              : device.electrodeContact === 'partial'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
          }`}
        >
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Battery */}
        <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <Battery className={`w-5 h-5 ${getBatteryColor(device.battery)} mb-1`} />
          <span className="text-sm font-semibold text-gray-700">{device.battery}%</span>
          <span className="text-xs text-gray-400">Baterai</span>
        </div>

        {/* Signal */}
        <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <div className="flex items-end gap-0.5 h-5 mb-1">{getSignalBars(device.signalStrength)}</div>
          <span className="text-xs text-gray-400">Wi-Fi</span>
        </div>

        {/* Electrode Contact */}
        <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <Circle
            className={`w-5 h-5 ${status.color} fill-current mb-1`}
          />
          <span className="text-xs text-gray-400">Kontak</span>
        </div>
      </div>
    </div>
  );
}
