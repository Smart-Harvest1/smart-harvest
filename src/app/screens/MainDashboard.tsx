import { Sun, Battery, Zap, Droplets, ThermometerSun, CloudRain, AlertTriangle, TrendingUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const energyData = [
  { time: '00:00', solar: 0, battery: 85 },
  { time: '06:00', solar: 20, battery: 75 },
  { time: '12:00', solar: 95, battery: 90 },
  { time: '18:00', solar: 45, battery: 88 },
  { time: '23:00', solar: 0, battery: 82 },
];

const soilData = [
  { day: 'Mon', moisture: 65 },
  { day: 'Tue', moisture: 70 },
  { day: 'Wed', moisture: 62 },
  { day: 'Thu', moisture: 68 },
  { day: 'Fri', moisture: 72 },
  { day: 'Sat', moisture: 75 },
  { day: 'Sun', moisture: 70 },
];

export default function MainDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-[#94a3b8]">Real-time farm monitoring</p>
        </div>
        <div className="text-right">
          <p className="text-[#94a3b8] text-sm">Last updated</p>
          <p className="text-white font-semibold">Just now</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[#FFC107]/20 rounded-xl">
              <Sun className="w-6 h-6 text-[#FFC107]" />
            </div>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Live</span>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-1">Solar Power</h3>
          <p className="text-3xl font-bold text-white mb-1">4.2 kW</p>
          <div className="flex items-center gap-1 text-green-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12% today</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[#4CAF50]/20 rounded-xl">
              <Battery className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">85%</span>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-1">Battery Level</h3>
          <p className="text-3xl font-bold text-white mb-1">85%</p>
          <div className="w-full bg-white/10 rounded-full h-2 mt-2">
            <div className="bg-gradient-to-r from-[#4CAF50] to-[#22C55E] h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[#06B6D4]/20 rounded-xl">
              <Droplets className="w-6 h-6 text-[#06B6D4]" />
            </div>
            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">Active</span>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-1">Soil Moisture</h3>
          <p className="text-3xl font-bold text-white mb-1">72%</p>
          <p className="text-sm text-[#94a3b8]">Optimal range</p>
        </div>

        <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[#EF4444]/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
            </div>
            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">2 Active</span>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-1">Alerts</h3>
          <p className="text-3xl font-bold text-white mb-1">2</p>
          <p className="text-sm text-[#94a3b8]">Requires attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#FFC107]" />
            Energy Production
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={energyData}>
              <defs>
                <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFC107" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFC107" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="solar" stroke="#FFC107" fill="url(#solarGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-[#06B6D4]" />
            Soil Moisture Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={soilData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="moisture" stroke="#06B6D4" strokeWidth={3} dot={{ fill: '#06B6D4', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <ThermometerSun className="w-8 h-8 text-[#FFC107]" />
            <span className="text-2xl font-bold text-white">28°C</span>
          </div>
          <h4 className="text-[#94a3b8] text-sm">Temperature</h4>
          <p className="text-xs text-[#4CAF50] mt-1">Optimal</p>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <CloudRain className="w-8 h-8 text-[#06B6D4]" />
            <span className="text-2xl font-bold text-white">65%</span>
          </div>
          <h4 className="text-[#94a3b8] text-sm">Humidity</h4>
          <p className="text-xs text-[#4CAF50] mt-1">Normal</p>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Droplets className="w-8 h-8 text-[#4CAF50]" />
            <span className="text-2xl font-bold text-white">Active</span>
          </div>
          <h4 className="text-[#94a3b8] text-sm">Pump Status</h4>
          <p className="text-xs text-[#4CAF50] mt-1">Running</p>
        </div>
      </div>
    </div>
  );
}
