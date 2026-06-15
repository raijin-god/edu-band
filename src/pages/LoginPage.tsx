import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, User, Lock, Key, Eye, EyeOff, GraduationCap, Users, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<'credentials' | 'token'>('credentials');
  const [selectedRole, setSelectedRole] = useState<UserRole>('guru');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, loginWithToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    let success = false;
    if (authMode === 'credentials') {
      success = await login(username, password, selectedRole);
      if (success) {
        navigate(`/dashboard/${selectedRole}`);
      }
    } else {
      success = await loginWithToken(token);
      if (success) {
        navigate('/dashboard/wali');
      }
    }

    if (!success) {
      setError(authMode === 'credentials' ? 'Username atau password salah' : 'Token tidak valid');
    }
    setIsLoading(false);
  };

  const roleOptions = [
    { value: 'guru' as UserRole, label: 'Guru', icon: GraduationCap, desc: 'Dashboard evaluasi kelas' },
    { value: 'siswa' as UserRole, label: 'Siswa', icon: User, desc: 'Dashboard gamifikasi' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-xl shadow-purple-500/20 mb-4">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">EduBand</h1>
          <p className="text-gray-500">Platform Analitik Pembelajaran Berbasis EEG</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
          {/* Auth Mode Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setAuthMode('credentials')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                authMode === 'credentials'
                  ? 'bg-white text-gray-800 shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Username/Password
              </div>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('token')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                authMode === 'token'
                  ? 'bg-white text-gray-800 shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Key className="w-4 h-4" />
                Token Akses
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {authMode === 'credentials' ? (
              <>
                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Masuk Sebagai</label>
                  <div className="grid grid-cols-2 gap-3">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedRole(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedRole === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <option.icon className={`w-6 h-6 mx-auto mb-2 ${selectedRole === option.value ? 'text-blue-500' : 'text-gray-400'}`} />
                        <div className={`text-sm font-medium ${selectedRole === option.value ? 'text-blue-700' : 'text-gray-600'}`}>{option.label}</div>
                        <div className="text-xs text-gray-400">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Masukkan username"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Token Gate for Wali Murid */}
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
                    <Shield className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h3 className="text-gray-800 font-medium mb-2">Akses Wali Murid</h3>
                  <p className="text-gray-500 text-sm">
                    Masukkan token akses yang diberikan oleh sekolah
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Token Akses</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                      placeholder="00000"
                      maxLength={5}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-500">
                <p className="font-medium text-gray-700 mb-1">Kredensial Demo:</p>
                <p>Guru/Siswa: <code className="text-blue-600 bg-blue-50 px-1 rounded">eduband</code> / <code className="text-blue-600 bg-blue-50 px-1 rounded">eduband</code></p>
                <p className="mt-1">Wali Murid: Token <code className="text-indigo-600 bg-indigo-50 px-1 rounded">00000</code></p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          EduBand Platform Analitik Belajar v1.0
        </p>
      </div>
    </div>
  );
}
