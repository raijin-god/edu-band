interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label: string };
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  icon?: React.ReactNode;
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    text: 'text-blue-600',
    light: 'bg-blue-50',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    text: 'text-purple-600',
    light: 'bg-purple-50',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    text: 'text-emerald-600',
    light: 'bg-emerald-50',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    text: 'text-orange-600',
    light: 'bg-orange-50',
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-500 to-pink-600',
    text: 'text-pink-600',
    light: 'bg-pink-50',
  },
};

export default function StatCard({ title, value, subtitle, trend, color = 'blue', icon }: StatCardProps) {
  const classes = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${classes.text}`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  trend.value >= 0
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-xl ${classes.light} ${classes.text} flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
