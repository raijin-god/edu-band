import { useState, useEffect } from 'react';
import { Shield, Sparkles, Heart, TrendingUp, Sun, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { CustomLineChart } from '../../components/charts/LineChart';
import { mockAIConclusion, mockDailyPerformance, mockMonthlyTrend, mockMapelData, getMapelStatusConfig } from '../../data/mockData';

export default function DashboardWali() {
  const [animateIn, setAnimateIn] = useState(false);
  const aiConclusion = mockAIConclusion;

  const dailyData = mockDailyPerformance.map(d => ({
    name: d.hour,
    Fokus: d.focus,
  }));

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="wali" />

      <main className="flex-1 overflow-auto pt-14 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`mb-8 transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-2xl font-bold text-gray-800">Perkembangan Anak</h1>
            <p className="text-gray-500">Ringkasan performa pembelajaran Budi</p>
          </div>

          {/* AI Conclusion Card */}
          <div className={`bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-3xl p-5 md:p-8 mb-6 md:mb-8 border border-indigo-200 transition-all duration-700 delay-150 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-lg font-semibold text-gray-800">Kesimpulan AI</h2>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                    Diperbarui Hari Ini
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {aiConclusion.text}
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 font-medium">Rekomendasi:</p>
                  {aiConclusion.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detail Fokus Mata Pelajaran */}
          <div className={`bg-white rounded-3xl p-6 border border-gray-200 shadow-lg mb-8 transition-all duration-700 delay-200 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Detail Fokus Mata Pelajaran</h3>
                <p className="text-sm text-gray-500">Rata-rata fokus anak di setiap pelajaran</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMapelData.map((mapel, index) => {
                const config = getMapelStatusConfig(mapel.status);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{mapel.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${mapel.focusScore}%`,
                              backgroundColor: config.color,
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{mapel.focusScore}%</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-800">
                <AlertCircle className="w-4 h-4 inline-block mr-1" />
                <strong>Catatan:</strong> Anak Anda paling fokus pada <strong>Matematika</strong> dan <strong>IPA</strong>, namun perlu perhatian lebih pada <strong>Bahasa Inggris</strong> di jam siang.
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Daily Status */}
            <div className={`lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-200 shadow-lg transition-all duration-700 delay-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Kondisi Hari Ini</h3>
                  <p className="text-sm text-gray-500">Fluktuasi fokus sepanjang hari</p>
                </div>
                <div className="flex items-center gap-2 text-indigo-500">
                  <Sun className="w-4 h-4" />
                  <span className="text-sm font-medium">Sangat Baik</span>
                </div>
              </div>
              <div className="h-64">
                <CustomLineChart
                  data={dailyData}
                  dataKeys={[{ key: 'Fokus', color: '#6366F1', name: 'Fokus' }]}
                  title=""
                  type="area"
                />
              </div>
            </div>

            {/* Status Cards */}
            <div className="space-y-4">
              <div className={`bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-200 transition-all duration-700 delay-400 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm text-gray-500">Status Kesehatan</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mb-1">Optimal</p>
                <p className="text-sm text-gray-500">Tidak ada indikasi kelelahan berlebih</p>
              </div>

              <div className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-200 transition-all duration-700 delay-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-500">Trend Mingguan</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mb-1">+12%</p>
                <p className="text-sm text-gray-500">Peningkatan dari minggu lalu</p>
              </div>

              <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 transition-all duration-700 delay-600 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-gray-500">Waktu Optimal</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mb-1">08:00 - 11:00</p>
                <p className="text-sm text-gray-500">Jam produktif tertinggi</p>
              </div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className={`bg-white rounded-3xl p-6 border border-gray-200 shadow-lg transition-all duration-700 delay-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Tren Belajar Bulanan</h3>
                <p className="text-sm text-gray-500">Perbandingan dengan nilai raport</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-gray-500">Fokus</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-gray-500">Nilai</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <CustomLineChart
                data={mockMonthlyTrend.map(d => ({ name: d.month, Fokus: d.focus, Nilai: d.nilai }))}
                dataKeys={[
                  { key: 'Fokus', color: '#3B82F6', name: 'Tingkat Fokus' },
                  { key: 'Nilai', color: '#8B5CF6', name: 'Nilai Raport' },
                ]}
                title=""
                type="line"
              />
            </div>
          </div>

          {/* Footer Note */}
          <div className={`mt-8 text-center text-sm text-gray-400 transition-all duration-700 delay-800 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
            <Shield className="w-4 h-4 inline-block mr-2" />
            Data ditampilkan dari perangkat EduBand yang terdaftar
          </div>
        </div>
      </main>
    </div>
  );
}
