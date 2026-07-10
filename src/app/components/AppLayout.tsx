import { Outlet, useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Zap, Beaker, Droplets, Building2, Users, Settings, Bell, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clearToken } from '../lib/api';

const navigation = [
  { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { name: 'Energy', path: '/app/energy', icon: Zap },
  { name: 'Soil Lab', path: '/app/soil', icon: Beaker },
  { name: 'Pump', path: '/app/pump', icon: Droplets },
  { name: 'Facility', path: '/app/facility', icon: Building2 },
  { name: 'Users', path: '/app/users', icon: Users },
  { name: 'Analytics', path: '/app/analytics', icon: BarChart3 },
  { name: 'Notifications', path: '/app/notifications', icon: Bell },
  { name: 'Settings', path: '/app/settings', icon: Settings },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1E293B] border-r border-white/10 transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Smart Crops</h2>
            <p className="text-xs text-[#94a3b8] mt-1">IoT Agriculture</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive
                      ? 'bg-gradient-to-r from-[#4CAF50] to-[#22C55E] text-white shadow-lg shadow-green-500/30'
                      : 'text-[#94a3b8] hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => {
                clearToken();
                navigate('/login');
              }}
              className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#1E293B] border-b border-white/10 px-6 py-4 flex items-center justify-between lg:hidden">
          <h1 className="text-xl font-bold text-white">Smart Crops</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Desktop header with logout */}
        <header className="hidden lg:flex items-center justify-between px-6 py-4 bg-[#0b1220] border-b border-white/5">
          <div>
            <h1 className="text-lg font-bold text-white">Smart Crops</h1>
            <p className="text-xs text-[#94a3b8]">IoT Agriculture</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                clearToken();
                navigate('/login');
              }}
              className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
