import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { mockLeaderboard } from '../../data/mockData';

export default function Leaderboard() {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return {
      bg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500',
      text: 'text-white',
      icon: Trophy,
    };
    if (rank === 2) return {
      bg: 'bg-gradient-to-r from-slate-300 to-slate-400',
      text: 'text-white',
      icon: Medal,
    };
    if (rank === 3) return {
      bg: 'bg-gradient-to-r from-amber-600 to-amber-700',
      text: 'text-white',
      icon: Award,
    };
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      icon: null,
    };
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="guru" />

      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Papan Peringkat Reward</h1>
            <p className="text-gray-500">Kompetisi fokus dan pencapaian siswa</p>
          </div>

          {/* Top 3 Podium */}
          <div className="flex items-end justify-center gap-4 mb-8">
            {/* Second Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {mockLeaderboard[1].avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold shadow-lg text-sm">
                  2
                </div>
              </div>
              <p className="font-semibold text-gray-800 mt-3">{mockLeaderboard[1].name}</p>
              <p className="text-sm text-gray-500">{mockLeaderboard[1].points.toLocaleString()} poin</p>
              <div className="h-24 w-32 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-lg mt-4 flex items-center justify-center">
                <Medal className="w-6 h-6 text-slate-500" />
              </div>
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center -mt-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-amber-500/50 ring-4 ring-amber-300/50">
                  {mockLeaderboard[0].avatar}
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              <p className="font-bold text-gray-800 text-lg mt-3">{mockLeaderboard[0].name}</p>
              <p className="text-amber-600 font-semibold">{mockLeaderboard[0].points.toLocaleString()} poin</p>
              <div className="h-32 w-32 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-lg mt-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {mockLeaderboard[2].avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold shadow-lg text-sm">
                  3
                </div>
              </div>
              <p className="font-semibold text-gray-800 mt-3">{mockLeaderboard[2].name}</p>
              <p className="text-sm text-gray-500">{mockLeaderboard[2].points.toLocaleString()} poin</p>
              <div className="h-20 w-32 bg-gradient-to-t from-amber-100 to-orange-50 rounded-t-lg mt-4 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800">Peringkat Lengkap</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {mockLeaderboard.map((entry) => {
                const style = getRankStyle(entry.rank);
                const Icon = style.icon;
                return (
                  <div
                    key={entry.rank}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`flex items-center justify-center ${entry.rank <= 3 ? 'w-12 h-12' : 'w-10 h-10'} rounded-xl ${style.bg} ${style.text} font-bold shadow-lg`}
                    >
                      {Icon ? <Icon className={entry.rank === 1 ? 'w-5 h-5' : 'w-4 h-4'} /> : entry.rank}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {entry.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{entry.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{entry.points.toLocaleString()} poin fokus</span>
                        {entry.rank === 1 && (
                          <span className="flex items-center gap-1 text-emerald-600">
                            <TrendingUp className="w-3 h-3" />
                            Naik 2 peringkat
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-32">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          style={{ width: `${(entry.points / mockLeaderboard[0].points) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
