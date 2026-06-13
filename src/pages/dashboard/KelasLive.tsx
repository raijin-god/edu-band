import { useState, useEffect } from 'react';
import { Radio, Play, Pause, Users, Clock, Wifi, Battery, Circle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { CustomLineChart } from '../../components/charts/LineChart';
import { mockDevices, mockDailyPerformance } from '../../data/mockData';

export default function KelasLive() {
  const [isSession, setIsSession] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [liveData, setLiveData] = useState(mockDailyPerformance.slice(0, 5));
  const devices = mockDevices.filter(d => d.electrodeContact === 'connected');

  useEffect(() => {
    if (!isSession) return;

    const timeInterval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    const dataInterval = setInterval(() => {
      setLiveData(prev => {
        const newData = [...prev];
        const lastIdx = prev.length;
        if (lastIdx < mockDailyPerformance.length) {
          newData.push(mockDailyPerformance[lastIdx]);
        } else {
          newData.shift();
          const avgFocus = 60 + Math.random() * 25;
          const avgDistraksi = 15 + Math.random() * 15;
          newData.push({
            hour: '16:00',
            focus: Math.round(avgFocus),
            distraksi: Math.round(avgDistraksi)
          });
        }
        return newData;
      });
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
  }, [isSession]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const avgFocus = liveData.length > 0
    ? Math.round(liveData.reduce((acc, d) => acc + d.focus, 0) / liveData.length)
    : 0;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="guru" />

      <main className="flex-1 overflow-auto pt-14 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Kelas Live</h1>
                <p className="text-gray-500">Pemantauan real-time fokus siswa</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isSession ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                <span className={`w-2 h-2 rounded-full ${isSession ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                {isSession ? 'Sesi Aktif' : 'Sesi Berhenti'}
              </div>
              <button
                onClick={() => setIsSession(!isSession)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isSession
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {isSession ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isSession ? 'Akhiri Sesi' : 'Mulai Sesi'}
              </button>
            </div>
          </div>

          {/* Session Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-sm text-gray-500">Durasi Sesi</p>
              <p className="text-3xl font-bold text-gray-800">{formatTime(sessionTime)}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-sm text-gray-500">Siswa Aktif</p>
              <p className="text-3xl font-bold text-gray-800">{devices.length}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Wifi className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-sm text-gray-500">Rata-rata Fokus</p>
              <p className="text-3xl font-bold text-gray-800">{avgFocus}%</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Battery className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-sm text-gray-500">Perangkat Rendah Baterai</p>
              <p className="text-3xl font-bold text-gray-800">
                {devices.filter(d => d.battery < 30).length}
              </p>
            </div>
          </div>

          {/* Real-time Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Kurva Fokus Kelas Real-time</h3>
                <p className="text-sm text-gray-500">Pemantauan fokus per interval waktu</p>
              </div>
              <div className={`flex items-center gap-2 ${isSession ? 'text-emerald-600' : 'text-gray-400'}`}>
                <span className={`w-3 h-3 rounded-full ${isSession ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-sm font-medium">{isSession ? 'Streaming' : 'Dijeda'}</span>
              </div>
            </div>
            <div className="h-80">
              <CustomLineChart
                data={liveData.map(d => ({ name: d.hour, Fokus: d.focus, Distraksi: d.distraksi }))}
                dataKeys={[
                  { key: 'Fokus', color: '#3B82F6', name: 'Fokus' },
                  { key: 'Distraksi', color: '#EC4899', name: 'Distraksi' },
                ]}
                title=""
                type="area"
              />
            </div>
          </div>

          {/* Active Students Grid */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Siswa Aktif</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      {device.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{device.studentName}</p>
                      <p className="text-sm text-gray-500">{device.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                      <span className="text-xs text-emerald-600 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Fokus</p>
                      <p className="font-bold text-blue-600">{65 + Math.round(Math.random() * 25)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Baterai</p>
                      <p className="font-bold text-gray-700">{device.battery}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Sinyal</p>
                      <p className="font-bold text-gray-700">{device.signalStrength}/5</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
