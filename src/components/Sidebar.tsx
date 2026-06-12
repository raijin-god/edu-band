import { NavLink, useLocation } from 'react-router-dom';
import { Brain, Home, Radio, Trophy, Download, User, BarChart2, Clock, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const roleMenus: Record<UserRole, MenuItem[]> = {
  guru: [
    { icon: Home, label: 'Beranda Utama', path: '/dashboard/guru' },
    { icon: Radio, label: 'Kelas Live', path: '/dashboard/guru/live' },
    { icon: Trophy, label: 'Papan Peringkat', path: '/dashboard/guru/leaderboard' },
    { icon: Download, label: 'Ekspor Data', path: '/dashboard/guru/export' },
  ],
  siswa: [
    { icon: User, label: 'Profil Belajar', path: '/dashboard/siswa' },
    { icon: BarChart2, label: 'Statistik Murid', path: '/dashboard/siswa/stats' },
    { icon: Clock, label: 'Riwayat Sesi', path: '/dashboard/siswa/history' },
  ],
  wali: [
    { icon: Shield, label: 'Perkembangan Anak', path: '/dashboard/wali' },
    { icon: BarChart2, label: 'Tren Belajar', path: '/dashboard/wali/trends' },
    { icon: Clock, label: 'Pusat Laporan', path: '/dashboard/wali/reports' },
  ],
};

const roleColors: Record<UserRole, { gradient: string; text: string; bg: string }> = {
  guru: {
    gradient: 'bg-gradient-to-r from-purple-600 to-blue-600',
    text: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  siswa: {
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  wali: {
    gradient: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    text: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
};

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const menus = roleMenus[role];
  const colors = roleColors[role];

  return (
    <aside className="w-64 h-screen bg-white flex flex-col text-gray-800 border-r border-gray-200 shadow-sm fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${colors.gradient} flex items-center justify-center shadow-lg`}>
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800">EduBand</h1>
            <p className="text-xs text-gray-500">
              {role === 'guru' ? 'Dashboard Guru' : role === 'siswa' ? 'Dashboard Siswa' : 'Dashboard Wali'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menus.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? `${colors.gradient} text-white shadow-lg`
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-3">
          <div className={`w-10 h-10 rounded-full ${colors.gradient} flex items-center justify-center text-white font-bold`}>
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500">
              {role === 'guru' ? 'Guru' : role === 'siswa' ? 'Siswa' : 'Wali Murid'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-gray-600 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
