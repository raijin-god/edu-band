import { useState, useEffect } from 'react';
import { TrendingUp, Target, Users, Award, Download, RefreshCw } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';
import StudentDeviceCard from '../../components/StudentDeviceCard';
import StatistikHarianModal from '../../components/StatistikHarianModal';
import { CustomBarChart } from '../../components/charts/BarChart';
import { CustomLineChart } from '../../components/charts/LineChart';
import { mockDevices, mockWeeklyFocusData, mockFocusProgress } from '../../data/mockData';

interface StudentDevice {
  id: string;
  name: string;
  device: string;
  focusScore: number;
  status: 'focused' | 'moderate' | 'low';
  battery: number;
  signalStrength: number;
  electrodeContact: 'connected' | 'partial' | 'disconnected';
}

const mockStudentsDevices: StudentDevice[] = [
  { id: '1', name: 'Ahmad Rizky', device: 'EduBand-01', focusScore: 92, status: 'focused', battery: 92, signalStrength: 4, electrodeContact: 'connected' },
  { id: '2', name: 'Siti Nurhaliza', device: 'EduBand-02', focusScore: 78, status: 'focused', battery: 78, signalStrength: 3, electrodeContact: 'connected' },
  { id: '3', name: 'Budi Santoso', device: 'EduBand-03', focusScore: 45, status: 'moderate', battery: 45, signalStrength: 4, electrodeContact: 'partial' },
  { id: '4', name: 'Dewi Lestari', device: 'EduBand-04', focusScore: 88, status: 'focused', battery: 88, signalStrength: 5, electrodeContact: 'connected' },
  { id: '5', name: 'Fajar Nugroho', device: 'EduBand-05', focusScore: 25, status: 'low', battery: 15, signalStrength: 2, electrodeContact: 'disconnected' },
  { id: '6', name: 'Gita Permata', device: 'EduBand-06', focusScore: 67, status: 'moderate', battery: 67, signalStrength: 4, electrodeContact: 'connected' },
  { id: '7', name: 'Hendra Wijaya', device: 'EduBand-07', focusScore: 82, status: 'focused', battery: 75, signalStrength: 4, electrodeContact: 'connected' },
  { id: '8', name: 'Indah Puspita', device: 'EduBand-08', focusScore: 35, status: 'low', battery: 82, signalStrength: 3, electrodeContact: 'connected' },
];

export default function DashboardGuru() {
  const [devices] = useState(mockDevices);
  const [liveData, setLiveData] = useState(mockFocusProgress);
  const [isLive, setIsLive] = useState(false);
  const [studentsDevices] = useState(mockStudentsDevices);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ name: string; device: string } | null>(null);

  const handleStatistikClick = (name: string, device: string) => {
    setSelectedStudent({ name, device });
    setModalOpen(true);
  };

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLiveData((prev) => {
        const newData = [...prev.slice(1)];
        const lastFocus = prev[prev.length - 1].focus;
        const newFocus = Math.max(30, Math.min(95, lastFocus + (Math.random() * 20 - 10)));
        newData.push({ time: String(parseInt(prev[prev.length - 1].time) + 5), focus: Math.round(newFocus) });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const connectedCount = devices.filter((d) => d.electrodeContact === 'connected').length;
  const totalBattery = devices.reduce((acc, d) => acc + d.battery, 0) / devices.length;

  const barChartData = mockWeeklyFocusData.map((d) => ({
    name: d.week,
    Ceramah: d.ceramah,
    Praktik: d.praktik,
    Diskusi: d.diskusi,
  }));

  const focusedStudents = studentsDevices.filter(s => s.status === 'focused').length;
  const moderateStudents = studentsDevices.filter(s => s.status === 'moderate').length;
  const lowStudents = studentsDevices.filter(s => s.status === 'low').length;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="guru" />

      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Guru</h1>
            <p className="text-gray-500">Pusat kendali pemantauan kelas dan pelacakan reward</p>
          </div>

          {/* Hero Card - Target Reward */}
          <div className="mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-6 h-6" />
                  <h2 className="text-xl font-medium opacity-90">Target Reward Bulan Ini</h2>
                </div>
                <div className="flex items-end gap-4">
                  <span className="text-5xl font-bold">12.450</span>
                  <div className="flex items-center gap-2 pb-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      +15%
                    </span>
                    <span className="text-white/70 text-sm">dari bulan lalu</span>
                  </div>
                </div>
                <p className="text-white/70 mt-2">Poin Fokus Alat Terakumulasi</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center text-white">
                  <p className="text-3xl font-bold">23%</p>
                  <p className="text-white/70 text-sm">Peningkatan Hasil Belajar</p>
                </div>
                <div className="w-px h-16 bg-white/20" />
                <div className="text-center text-white">
                  <p className="text-3xl font-bold">{devices.length}</p>
                  <p className="text-white/70 text-sm">Perangkat Aktif</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Siswa Focused"
              value={focusedStudents}
              subtitle={`dari ${studentsDevices.length} siswa`}
              color="green"
              icon={<Users className="w-6 h-6" />}
            />
            <StatCard
              title="Siswa Moderate"
              value={moderateStudents}
              subtitle="Perlu perhatian"
              color="orange"
              icon={<RefreshCw className="w-6 h-6" />}
            />
            <StatCard
              title="Siswa Low Focused"
              value={lowStudents}
              subtitle="Perlu intervensi"
              color="pink"
            />
            <StatCard
              title="Rata-rata Fokus"
              value="76%"
              trend={{ value: 8, label: 'minggu ini' }}
              color="blue"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CustomBarChart
              data={barChartData}
              dataKeys={[
                { key: 'Ceramah', color: '#F59E0B', name: 'Metode Ceramah' },
                { key: 'Praktik', color: '#3B82F6', name: 'Metode Praktik' },
                { key: 'Diskusi', color: '#8B5CF6', name: 'Metode Diskusi' },
              ]}
              title="Evaluasi Efektivitas Metode Ajar"
              subtitle="Persentase fokus kelas rata-rata per minggu berdasarkan metode"
            />

            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Fokus Kelas Real-time</h3>
                  <p className="text-sm text-gray-500">Grafik fokus kelas yang bergerak per menit</p>
                </div>
                <button
                  onClick={() => setIsLive(!isLive)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isLive
                      ? 'bg-rose-500 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                  {isLive ? 'Live' : 'Mulai Live'}
                </button>
              </div>
              <div className="h-64">
                <CustomLineChart
                  data={liveData.map((d) => ({ name: `${d.time}m`, Fokus: d.focus }))}
                  dataKeys={[{ key: 'Fokus', color: '#3B82F6', name: 'Skor Fokus' }]}
                  title=""
                  type="area"
                />
              </div>
            </div>
            </div>

          {/* Student Device Cards Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Pemantauan Murid Live</h2>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <RefreshCw className="w-4 h-4" />
                Perbarui Status
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {studentsDevices.map((student) => (
                <StudentDeviceCard key={student.id} student={student} onStatistikClick={handleStatistikClick} />
              ))}
            </div>
          </div>

          {/* Statistik Harian Modal */}
          {modalOpen && selectedStudent && (
            <StatistikHarianModal
              studentName={selectedStudent.name}
              device={selectedStudent.device}
              onClose={() => setModalOpen(false)}
            />
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors group">
                <Target className="w-8 h-8 text-purple-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Atur Target</span>
              </button>
              <button className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group">
                <Award className="w-8 h-8 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Berikan Reward</span>
              </button>
              <button className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors group">
                <Download className="w-8 h-8 text-emerald-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Ekspor Laporan</span>
              </button>
              <button className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors group">
                <Users className="w-8 h-8 text-orange-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">Kelola Kelas</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
