import { useState } from 'react';
import { Clock, TrendingUp, Award, Calendar, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { mockSessionHistory } from '../../data/mockData';

export default function RiwayatSesi() {
  const [filter, setFilter] = useState<'mingguan' | 'bulanan' | 'semester'>('mingguan');

  const sessions = mockSessionHistory;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="siswa" />

      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Riwayat Sesi</h1>
              <p className="text-gray-500">Catatan sesi pembelajaranmu</p>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'mingguan' | 'bulanan' | 'semester')}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mingguan">Mingguan</option>
              <option value="bulanan">Bulanan</option>
              <option value="semester">Semester</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <Clock className="w-8 h-8 mb-3 opacity-80" />
              <p className="text-3xl font-bold">48 jam</p>
              <p className="text-white/80">Total Waktu Belajar</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <Award className="w-8 h-8 mb-3 opacity-80" />
              <p className="text-3xl font-bold">24</p>
              <p className="text-white/80">Sesi Diselesaikan</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
              <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
              <p className="text-3xl font-bold">78%</p>
              <p className="text-white/80">Rata-rata Fokus</p>
            </div>
          </div>

          {/* Session List */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800">Daftar Sesi</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    <span className="text-lg font-bold">{session.focusScore}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-800">{session.date}</span>
                      <span className="text-gray-500">{session.startTime} - {session.endTime}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Rata-rata: <span className="font-medium text-gray-700">{session.avgFocus}%</span></span>
                      <span>Distraksi: <span className="font-medium text-gray-700">{session.distraksi}%</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Ketahanan Beta</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${session.ketahananBeta}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Pemulihan Alpha</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${session.pemulihanAlpha}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
