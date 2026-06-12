import { FileText, Download, Calendar, CheckCircle, Clock } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

export default function PusatLaporan() {
  const reports = [
    { id: 1, title: 'Laporan Bulanan Januari', date: '2024-01-31', status: 'ready' },
    { id: 2, title: 'Laporan Bulanan Februari', date: '2024-02-28', status: 'ready' },
    { id: 3, title: 'Laporan Bulanan Maret', date: '2024-03-31', status: 'ready' },
    { id: 4, title: 'Laporan Mingguan Terakhir', date: '2024-03-15', status: 'ready' },
    { id: 5, title: 'Laporan Bulanan April', date: '2024-04-30', status: 'pending' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="wali" />

      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Pusat Laporan</h1>
            <p className="text-gray-500">Unduh laporan perkembangan anak</p>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5" />
              <div>
                <p className="text-gray-800 font-medium mb-1">Laporan Tersedia</p>
                <p className="text-sm text-gray-500">
                  Laporan dibuat secara otomatis setiap minggu dan bulan. Anda akan menerima notifikasi saat laporan baru tersedia.
                </p>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Daftar Laporan</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-lg ${
                    report.status === 'ready'
                      ? 'bg-indigo-100'
                      : 'bg-gray-100'
                  } flex items-center justify-center`}>
                    <FileText className={`w-6 h-6 ${
                      report.status === 'ready' ? 'text-indigo-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{report.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{report.date}</span>
                      {report.status === 'pending' && (
                        <span className="flex items-center gap-1 text-amber-500">
                          <Clock className="w-3.5 h-3.5" />
                          Sedang diproses
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    disabled={report.status !== 'ready'}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      report.status === 'ready'
                        ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    {report.status === 'ready' ? 'Unduh' : 'Tunggu'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
