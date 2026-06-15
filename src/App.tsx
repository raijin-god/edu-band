import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardGuru from './pages/dashboard/DashboardGuru';
import KelasLive from './pages/dashboard/KelasLive';
import Leaderboard from './pages/dashboard/Leaderboard';
import ExportData from './pages/dashboard/ExportData';
import DashboardSiswa from './pages/dashboard/DashboardSiswa';
import StatistikMurid from './pages/dashboard/StatistikMurid';
import RiwayatSesi from './pages/dashboard/RiwayatSesi';
import DashboardWali from './pages/dashboard/DashboardWali';
import TrenBelajar from './pages/dashboard/TrenBelajar';
import PusatLaporan from './pages/dashboard/PusatLaporan';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg animate-pulse" />
        <p className="text-gray-400 text-sm">Memuat...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <LoadingScreen />;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={`/dashboard/${user?.role}`} replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/dashboard/guru"
        element={
          <ProtectedRoute allowedRoles={['guru']}>
            <DashboardGuru />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/guru/live"
        element={
          <ProtectedRoute allowedRoles={['guru']}>
            <KelasLive />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/guru/leaderboard"
        element={
          <ProtectedRoute allowedRoles={['guru']}>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/guru/export"
        element={
          <ProtectedRoute allowedRoles={['guru']}>
            <ExportData />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/siswa"
        element={
          <ProtectedRoute allowedRoles={['siswa']}>
            <DashboardSiswa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/siswa/stats"
        element={
          <ProtectedRoute allowedRoles={['siswa']}>
            <StatistikMurid />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/siswa/history"
        element={
          <ProtectedRoute allowedRoles={['siswa']}>
            <RiwayatSesi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/wali"
        element={
          <ProtectedRoute allowedRoles={['wali']}>
            <DashboardWali />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/wali/trends"
        element={
          <ProtectedRoute allowedRoles={['wali']}>
            <TrenBelajar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/wali/reports"
        element={
          <ProtectedRoute allowedRoles={['wali']}>
            <PusatLaporan />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
