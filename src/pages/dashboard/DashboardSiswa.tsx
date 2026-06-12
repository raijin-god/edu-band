import { useState } from 'react';
import { User, Target, Award, TrendingUp, Clock, Zap, RotateCcw } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import GaugeChart from '../../components/GaugeChart';
import { CustomLineChart } from '../../components/charts/LineChart';
import { mockStudentStats, mockDailyPerformance, mockMapelData, getMapelStatusConfig } from '../../data/mockData';

export default function DashboardSiswa() {
  const [timeFilter, setTimeFilter] = useState<'harian' | 'mingguan'>('harian');
  const stats = mockStudentStats;

  const performanceData = mockDailyPerformance.map(d => ({
    name: d.hour,
    Fokus: d.focus,
    Distraksi: d.distraksi,
  }));

  const hexagonStats = [
    {
      title: 'Rasio F/D',
      value: stats.rasioFD,
      unit: '%',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      desc: 'Rasio waktu Fokus vs Distraksi',
    },
    {
      title: 'Ketahanan Beta',
      value: stats.ketahananBeta,
      unit: 'min',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      desc: 'Durasi konsentrasi tinggi',
    },
    {
      title: 'Pemulihan Alpha',
      value: stats.pemulihanAlpha,
      unit: '%',
      icon: RotateCcw,
      color: 'from-emerald-500 to-teal-500',
      desc: 'Kecepatan kembali fokus',
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="siswa" />

      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Siswa</h1>
            <p className="text-gray-500">Statistik performa pembelajaranmu</p>
          </div>

          {/* Profile Hero */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">Siswa Demo</h2>
                <p className="text-white/80">Kelas 10A - SMAN 1 Jakarta</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded-full">
                    <Award className="w-4 h-4" />
                    Level 12
                  </span>
                  <span className="text-sm text-white/80">
                    {stats.totalPoints.toLocaleString()} Total Poin
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Learning Score Gauge */}
            <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Learning Score</h3>
              <div className="flex justify-center">
                <GaugeChart
                  value={stats.learningScore}
                  classAverage={stats.classAverage}
                  label="Skor Anda"
                  size={220}
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{stats.learningScore}</p>
                  <p className="text-xs text-gray-500">Skor Anda</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-600">{stats.classAverage}</p>
                  <p className="text-xs text-gray-500">Rata-rata Kelas</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {hexagonStats.map((stat) => (
                <div
                  key={stat.title}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.value}<span className="text-lg text-gray-400">{stat.unit}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{stat.desc}</p>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all`}
                          style={{ width: `${Math.min(100, stat.value)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Level {Math.floor(stat.value / 20)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 shadow-lg col-span-1 md:col-span-3 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Total Poin Fokus Terakumulasi</p>
                    <p className="text-4xl font-bold">{stats.totalPoints.toLocaleString()}</p>
                    <p className="text-white/70 text-sm mt-1">
                      <span className="text-emerald-300">+15%</span> dari minggu lalu
                    </p>
                  </div>
                  <TrendingUp className="w-16 h-16 text-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Performa Kognitif Harian</h3>
                <p className="text-sm text-gray-500">Timeline fokus vs distraksi sepanjang hari</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setTimeFilter('harian')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === 'harian'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Harian
                </button>
                <button
                  onClick={() => setTimeFilter('mingguan')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === 'mingguan'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mingguan
                </button>
              </div>
            </div>
            <div className="h-80">
              <CustomLineChart
                data={performanceData}
                dataKeys={[
                  { key: 'Fokus', color: '#3B82F6', name: 'Fokus' },
                  { key: 'Distraksi', color: '#EC4899', name: 'Distraksi' },
                ]}
                title=""
                type="area"
              />
            </div>
          </div>

          {/* Performa Per Mata Pelajaran */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Performa Per Mata Pelajaran</h3>
                <p className="text-sm text-gray-500">Lihat fokusmu di setiap pelajaran</p>
              </div>
            </div>
            <div className="space-y-4">
              {mockMapelData.map((mapel, index) => {
                const config = getMapelStatusConfig(mapel.status);
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-40 text-sm font-medium text-gray-700">{mapel.name}</div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all flex items-center justify-end pr-2"
                          style={{
                            width: `${mapel.focusScore}%`,
                            backgroundColor: config.color,
                          }}
                        >
                          {mapel.focusScore > 20 && (
                            <span className="text-xs font-bold text-white">{mapel.focusScore}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Tip:</span> Fokus tertinggi kamu ada di <span className="font-semibold">Matematika</span> dan <span className="font-semibold">IPA</span>! Terus pertahankan dan tingkatkan performa di pelajaran lainnya.
              </p>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Lencana Pencapaian</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Fokus 30 Menit', icon: Target, unlocked: true, color: 'from-blue-500 to-cyan-500' },
                { name: 'Tanpa Distraksi', icon: Zap, unlocked: true, color: 'from-purple-500 to-pink-500' },
                { name: 'Quick Recovery', icon: RotateCcw, unlocked: true, color: 'from-emerald-500 to-teal-500' },
                { name: 'Marathon Focus', icon: Clock, unlocked: false, color: 'from-amber-500 to-orange-500' },
                { name: 'Streak King', icon: Award, unlocked: false, color: 'from-red-500 to-pink-500' },
                { name: 'Perfect Score', icon: Target, unlocked: false, color: 'from-indigo-500 to-purple-500' },
              ].map((badge) => (
                <div
                  key={badge.name}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    badge.unlocked
                      ? 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
                      : 'border-gray-100 bg-gray-50 opacity-50'
                  }`}
                >
                  {!badge.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 rounded-2xl">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-lg">?</span>
                      </div>
                    </div>
                  )}
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center mb-3 ${!badge.unlocked && 'blur-sm'}`}>
                    <badge.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className={`text-sm font-medium text-center ${badge.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                    {badge.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
