import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { TrendingUp, Award, Target, Clock, Calendar } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { mockDailyPerformance, mockStudentStats } from '../../data/mockData';

const radarData = [
  { subject: 'Fokus', A: 85, fullMark: 100 },
  { subject: 'Ketahanan', A: 72, fullMark: 100 },
  { subject: 'Pemulihan', A: 88, fullMark: 100 },
  { subject: 'Konsistensi', A: 78, fullMark: 100 },
  { subject: 'Adaptasi', A: 70, fullMark: 100 },
];

const weeklyData = mockDailyPerformance.map(d => ({
  name: d.hour,
  Fokus: d.focus,
}));

export default function StatistikMurid() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="siswa" />

      <main className="flex-1 overflow-auto pt-14 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Statistik Murid</h1>
            <p className="text-gray-500">Analisis mendalam performa kognitif</p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Rata-rata Fokus', value: '78%', trend: '+5%', color: 'blue' },
              { label: 'Sesi Selesai', value: '24', trend: '+3', color: 'green' },
              { label: 'Jam Belajar', value: '48 jam', trend: '+8 jam', color: 'purple' },
              { label: 'Peningkatan', value: '15%', trend: 'bulan ini', color: 'orange' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <span className={`text-sm ${
                    stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'green' ? 'text-green-500' :
                    stat.color === 'purple' ? 'text-purple-500' : 'text-orange-500'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Radar Chart */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profil Kognitif</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <Radar
                      name="Skor Anda"
                      dataKey="A"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Fokus Harian</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={{ stroke: '#E5E7EB' }} />
                    <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Bar dataKey="Fokus" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Perbandingan dengan Rata-rata Kelas</h3>
            <div className="space-y-4">
              {[
                { label: 'Learning Score', you: 85, class: 72 },
                { label: 'Rasio F/D', you: 78, class: 68 },
                { label: 'Ketahanan Beta', you: 65, class: 60 },
                { label: 'Pemulihan Alpha', you: 82, class: 75 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-gray-600">{item.label}</div>
                  <div className="flex-1">
                    <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                        style={{ width: `${item.you}%` }}
                      />
                      <div
                        className="absolute top-1 left-0 h-6 bg-gray-400 rounded-full opacity-50"
                        style={{ width: `${item.class}%`, top: '4px', height: '24px' }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right flex items-center justify-end gap-2">
                    <span className="font-bold text-blue-600">{item.you}</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-400 text-sm">{item.class}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-500" />
                <span className="text-gray-600">Skor Anda</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-400 opacity-50" />
                <span className="text-gray-600">Rata-rata Kelas</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
