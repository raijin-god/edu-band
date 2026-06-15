import { X, TrendingUp, AlertCircle, Clock, Calendar } from 'lucide-react';
import { mockMapelData, getMapelStatusConfig, mockAnalysisInsight } from '../data/mockData';

interface StatistikHarianModalProps {
  studentName: string;
  device: string;
  onClose: () => void;
}

export default function StatistikHarianModal({ studentName, device, onClose }: StatistikHarianModalProps) {
  const avgFocus = Math.round(
    mockMapelData.reduce((acc, m) => acc + m.focusScore, 0) / mockMapelData.length
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                {studentName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">{studentName}</h2>
                <p className="text-white/80 text-sm">{device}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 text-blue-500 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">Rata-rata Fokus</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{avgFocus}%</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 text-purple-500 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Total Sesi</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium">Hari Aktif</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">18</p>
            </div>
          </div>

          {/* Table Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Skor Fokus Per Mata Pelajaran</h3>
            <span className="text-xs text-gray-500">Kurikulum Merdeka</span>
          </div>

          {/* Mapel Table */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Mata Pelajaran</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Skor Fokus</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Sesi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockMapelData.map((mapel, index) => {
                  const config = getMapelStatusConfig(mapel.status);
                  return (
                    <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-800">{mapel.name}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${mapel.focusScore}%`,
                                backgroundColor: config.color,
                              }}
                            />
                          </div>
                          <span className="font-semibold text-gray-700">{mapel.focusScore}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600 text-sm">
                        {mapel.sessionCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Actionable Insight */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Analisis & Rekomendasi</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {mockAnalysisInsight}
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
