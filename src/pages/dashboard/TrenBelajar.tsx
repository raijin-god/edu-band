import { TrendingUp, Calendar, Download, BarChart2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { CustomLineChart } from '../../components/charts/LineChart';
import { mockMonthlyTrend } from '../../data/mockData';

export default function TrenBelajar() {
  const trendData = mockMonthlyTrend.map(d => ({
    name: d.month,
    Fokus: d.focus,
    Nilai: d.nilai,
  }));

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="wali" />

      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Tren Belajar</h1>
              <p className="text-gray-500">Analisis perkembangan bulanan anak</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Unduh Laporan
            </button>
          </div>

          {/* Main Chart */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Perkembangan Kognitif</h3>
                <p className="text-sm text-gray-500">Korelasi tingkat fokus dengan nilai raport</p>
              </div>
            </div>
            <div className="h-80">
              <CustomLineChart
                data={trendData}
                dataKeys={[
                  { key: 'Fokus', color: '#3B82F6', name: 'Tingkat Fokus (%)' },
                  { key: 'Nilai', color: '#8B5CF6', name: 'Nilai Raport' },
                ]}
                title=""
                type="area"
              />
            </div>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <span className="text-sm text-gray-500">Tren Keseluruhan</span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2">Meningkat</p>
              <p className="text-sm text-gray-500">Fokus meningkat 20% semester ini</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-500">Bulan Terbaik</span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2">Juni</p>
              <p className="text-sm text-gray-500">Skor fokus tertinggi 85%</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-500">Korelasi Nilai</span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2">92%</p>
              <p className="text-sm text-gray-500">Korelasi fokus dengan nilai raport</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
