import { Link, useLocation } from 'react-router-dom';
import { Home, Package, BarChart3, User } from 'lucide-react';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Package className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">동네빌려</span>
          </Link>

          <nav className="flex gap-6">
            <Link
              to="/"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home size={20} />
              <span className="font-medium">홈</span>
            </Link>
            <Link
              to="/my-rentals"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/my-rentals')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package size={20} />
              <span className="font-medium">내 대여</span>
            </Link>
            <Link
              to="/kpi"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/kpi') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={20} />
              <span className="font-medium">KPI</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/profile')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User size={20} />
              <span className="font-medium">마이페이지</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
