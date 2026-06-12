import { DeviceStatus, WeeklyFocusData, StudentStats, DailyPerformance, MonthlyTrend, AIConclusion, FocusSession } from '../types';

export const mockDevices: DeviceStatus[] = [
  { id: '1', name: 'EduBand-01', studentName: 'Ahmad Rizky', battery: 92, signalStrength: 4, electrodeContact: 'connected' },
  { id: '2', name: 'EduBand-02', studentName: 'Siti Nurhaliza', battery: 78, signalStrength: 3, electrodeContact: 'connected' },
  { id: '3', name: 'EduBand-03', studentName: 'Budi Santoso', battery: 45, signalStrength: 4, electrodeContact: 'partial' },
  { id: '4', name: 'EduBand-04', studentName: 'Dewi Lestari', battery: 88, signalStrength: 5, electrodeContact: 'connected' },
  { id: '5', name: 'EduBand-05', studentName: 'Fajar Nugroho', battery: 15, signalStrength: 2, electrodeContact: 'disconnected' },
  { id: '6', name: 'EduBand-06', studentName: 'Gita Permata', battery: 67, signalStrength: 4, electrodeContact: 'connected' },
];

export const mockWeeklyFocusData: WeeklyFocusData[] = [
  { week: 'Minggu 1', ceramah: 58, praktik: 82, diskusi: 71 },
  { week: 'Minggu 2', ceramah: 54, praktik: 85, diskusi: 73 },
  { week: 'Minggu 3', ceramah: 61, praktik: 88, diskusi: 76 },
  { week: 'Minggu 4', ceramah: 57, praktik: 91, diskusi: 79 },
];

export const mockStudentStats: StudentStats = {
  learningScore: 85,
  classAverage: 72,
  rasioFD: 78,
  ketahananBeta: 65,
  pemulihanAlpha: 82,
  totalPoints: 12450,
};

export const mockDailyPerformance: DailyPerformance[] = [
  { hour: '07:00', focus: 45, distraksi: 20 },
  { hour: '08:00', focus: 78, distraksi: 12 },
  { hour: '09:00', focus: 85, distraksi: 8 },
  { hour: '10:00', focus: 72, distraksi: 18 },
  { hour: '11:00', focus: 65, distraksi: 25 },
  { hour: '12:00', focus: 30, distraksi: 55 },
  { hour: '13:00', focus: 55, distraksi: 35 },
  { hour: '14:00', focus: 68, distraksi: 22 },
  { hour: '15:00', focus: 62, distraksi: 28 },
];

export const mockMonthlyTrend: MonthlyTrend[] = [
  { month: 'Jan', focus: 65, nilai: 70 },
  { month: 'Feb', focus: 68, nilai: 72 },
  { month: 'Mar', focus: 72, nilai: 75 },
  { month: 'Apr', focus: 70, nilai: 74 },
  { month: 'Mei', focus: 78, nilai: 80 },
  { month: 'Jun', focus: 85, nilai: 85 },
];

export const mockAIConclusion: AIConclusion = {
  text: 'Bulan ini performa anak Anda sangat baik di sesi pagi, namun sering kelelahan di atas jam 13.00. Penurunan ini berkorelasi dengan kurang tidur. Kami mendeteksi pola konsistensi fokus yang meningkat 15% dibanding bulan sebelumnya.',
  recommendations: [
    'Pantau jam tidur di rumah untuk memastikan istirahat cukup',
    'Anjurkan jeda singkat setiap 45 menit untuk menjaga fokus',
    'Aktivitas kreatif di sore hari dapat meningkatkan engagement',
  ],
};

export const mockFocusProgress: { time: string; focus: number }[] = [
  { time: '0', focus: 45 },
  { time: '5', focus: 52 },
  { time: '10', focus: 68 },
  { time: '15', focus: 75 },
  { time: '20', focus: 82 },
  { time: '25', focus: 78 },
  { time: '30', focus: 85 },
  { time: '35', focus: 80 },
  { time: '40', focus: 72 },
  { time: '45', focus: 68 },
  { time: '50', focus: 75 },
  { time: '55', focus: 82 },
  { time: '60', focus: 78 },
];

export const mockLeaderboard = [
  { rank: 1, name: 'Dewi Lestari', points: 15820, avatar: 'DL' },
  { rank: 2, name: 'Ahmad Rizky', points: 14250, avatar: 'AR' },
  { rank: 3, name: 'Siti Nurhaliza', points: 13800, avatar: 'SN' },
  { rank: 4, name: 'Budi Santoso', points: 12100, avatar: 'BS' },
  { rank: 5, name: 'Fajar Nugroho', points: 11500, avatar: 'FN' },
];

export const mockSessionHistory: FocusSession[] = [
  { id: '1', date: '2024-01-15', startTime: '07:00', endTime: '12:00', focusScore: 82, avgFocus: 75, distraksi: 18, ketahananBeta: 65, pemulihanAlpha: 80 },
  { id: '2', date: '2024-01-14', startTime: '07:00', endTime: '12:00', focusScore: 78, avgFocus: 71, distraksi: 22, ketahananBeta: 58, pemulihanAlpha: 75 },
  { id: '3', date: '2024-01-13', startTime: '07:00', endTime: '12:00', focusScore: 85, avgFocus: 79, distraksi: 15, ketahananBeta: 72, pemulihanAlpha: 85 },
  { id: '4', date: '2024-01-12', startTime: '07:00', endTime: '12:00', focusScore: 75, avgFocus: 68, distraksi: 25, ketahananBeta: 55, pemulihanAlpha: 70 },
  { id: '5', date: '2024-01-11', startTime: '07:00', endTime: '12:00', focusScore: 80, avgFocus: 73, distraksi: 20, ketahananBeta: 62, pemulihanAlpha: 78 },
];

// Mata Pelajaran (Subject) Focus Data
export interface MapelFocus {
  name: string;
  focusScore: number;
  status: 'focused' | 'moderate' | 'low';
  sessionCount: number;
}

export const mockMapelData: MapelFocus[] = [
  { name: 'Matematika', focusScore: 92, status: 'focused', sessionCount: 24 },
  { name: 'IPA (Ilmu Pengetahuan Alam)', focusScore: 88, status: 'focused', sessionCount: 22 },
  { name: 'IPS (Ilmu Pengetahuan Sosial)', focusScore: 65, status: 'moderate', sessionCount: 18 },
  { name: 'Bahasa Indonesia', focusScore: 78, status: 'focused', sessionCount: 20 },
  { name: 'Bahasa Inggris', focusScore: 45, status: 'low', sessionCount: 16 },
  { name: 'Pendidikan Pancasila', focusScore: 72, status: 'moderate', sessionCount: 14 },
];

export const getMapelStatusConfig = (status: 'focused' | 'moderate' | 'low') => {
  const configs = {
    focused: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Optimal', color: '#10B981' },
    moderate: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Sedang', color: '#F59E0B' },
    low: { bg: 'bg-rose-100', text: 'text-rose-700', label: 'Perlu Perhatian', color: '#F43F5E' },
  };
  return configs[status];
};

export const mockAnalysisInsight = "Analisis: Siswa menunjukkan fokus optimal pada mapel eksakta (Matematika, IPA) dengan konsistensi tinggi selama jam pembelajaran. Namun, tingkat distraksi cukup signifikan pada mapel literasi/sosial di jam siang (IPS, Bahasa Inggris). Disarankan untuk mengalokasikan metode belajar yang lebih interaktif pada mapel tersebut untuk meningkatkan engagement.";
