import { useState } from 'react';
import { Download, FileText, Calendar, CheckCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { mockWeeklyFocusData, mockDevices, mockLeaderboard } from '../../data/mockData';

export default function ExportData() {
  const [selectedType, setSelectedType] = useState<'focus' | 'device' | 'leaderboard'>('focus');
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 1500);
  };

  const exportTypes = [
    { id: 'focus', label: 'Data Fokus Kelas', icon: FileText, desc: 'Laporan fokus siswa per sesi' },
    { id: 'device', label: 'Status Perangkat', icon: FileText, desc: 'Data status dan log perangkat IoT' },
    { id: 'leaderboard', label: 'Papan Peringkat', icon: FileText, desc: 'Data akumulasi poin reward' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="guru" />

      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Ekspor Data</h1>
            <p className="text-gray-500">Unduh laporan dan data analitik kelas</p>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Pilih Jenis Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id as 'focus' | 'device' | 'leaderboard')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mb-2 ${selectedType === type.id ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="font-medium text-gray-800">{type.label}</p>
                  <p className="text-sm text-gray-500">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-800">Rentang Waktu</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Tanggal Mulai</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">Tanggal Akhir</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Pratinjau Data</h3>
              <span className="text-sm text-gray-500">
                {selectedType === 'focus' && `${mockWeeklyFocusData.length} entri`}
                {selectedType === 'device' && `${mockDevices.length} perangkat`}
                {selectedType === 'leaderboard' && `${mockLeaderboard.length} siswa`}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    {selectedType === 'focus' && (
                      <>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Minggu</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Ceramah</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Praktik</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Diskusi</th>
                      </>
                    )}
                    {selectedType === 'device' && (
                      <>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Nama</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Siswa</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Baterai</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Status</th>
                      </>
                    )}
                    {selectedType === 'leaderboard' && (
                      <>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Peringkat</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Nama</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-medium">Poin</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {selectedType === 'focus' && mockWeeklyFocusData.map((d) => (
                    <tr key={d.week} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-800">{d.week}</td>
                      <td className="px-4 py-3 text-gray-600">{d.ceramah}%</td>
                      <td className="px-4 py-3 text-gray-600">{d.praktik}%</td>
                      <td className="px-4 py-3 text-gray-600">{d.diskusi}%</td>
                    </tr>
                  ))}
                  {selectedType === 'device' && mockDevices.slice(0, 4).map((d) => (
                    <tr key={d.id} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-800">{d.name}</td>
                      <td className="px-4 py-3 text-gray-600">{d.studentName}</td>
                      <td className="px-4 py-3 text-gray-600">{d.battery}%</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          d.electrodeContact === 'connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {d.electrodeContact === 'connected' ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {selectedType === 'leaderboard' && mockLeaderboard.map((d) => (
                    <tr key={d.rank} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-800">#{d.rank}</td>
                      <td className="px-4 py-3 text-gray-600">{d.name}</td>
                      <td className="px-4 py-3 text-gray-600">{d.points.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              exportComplete
                ? 'bg-emerald-500 text-white'
                : isExporting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {exportComplete ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Ekspor Berhasil
              </>
            ) : isExporting ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
                Mengekspor...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Ekspor ke CSV
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
