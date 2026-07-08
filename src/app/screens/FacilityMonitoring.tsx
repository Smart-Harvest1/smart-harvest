import { Building2, ThermometerSun, Droplets, Wind, Camera, Lock, Wifi } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const tempData = [
  { time: '00:00', temp: 22, humidity: 58 },
  { time: '04:00', temp: 20, humidity: 62 },
  { time: '08:00', temp: 24, humidity: 55 },
  { time: '12:00', temp: 28, humidity: 50 },
  { time: '16:00', temp: 26, humidity: 53 },
  { time: '20:00', temp: 23, humidity: 57 },
];

export default function FacilityMonitoring() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Facility Monitoring</h1>
        <p className="text-[#94a3b8]">Environmental and security monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#FFC107]/20 to-[#FFC107]/5 rounded-2xl p-6 border border-[#FFC107]/30">
          <ThermometerSun className="w-8 h-8 text-[#FFC107] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Temperature</h3>
          <p className="text-3xl font-bold text-white">24°C</p>
          <p className="text-sm text-[#4CAF50] mt-1">Normal</p>
        </div>

        <div className="bg-gradient-to-br from-[#06B6D4]/20 to-[#06B6D4]/5 rounded-2xl p-6 border border-[#06B6D4]/30">
          <Droplets className="w-8 h-8 text-[#06B6D4] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Humidity</h3>
          <p className="text-3xl font-bold text-white">55%</p>
          <p className="text-sm text-[#4CAF50] mt-1">Optimal</p>
        </div>

        <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/5 rounded-2xl p-6 border border-[#4CAF50]/30">
          <Wind className="w-8 h-8 text-[#4CAF50] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Air Quality</h3>
          <p className="text-3xl font-bold text-white">Good</p>
          <p className="text-sm text-[#4CAF50] mt-1">PM2.5: 12 μg/m³</p>
        </div>

        <div className="bg-gradient-to-br from-[#EF4444]/20 to-[#EF4444]/5 rounded-2xl p-6 border border-[#EF4444]/30">
          <Lock className="w-8 h-8 text-[#EF4444] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Security</h3>
          <p className="text-3xl font-bold text-white">Armed</p>
          <p className="text-sm text-[#4CAF50] mt-1">All sensors active</p>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">24-Hour Environmental Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={tempData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis yAxisId="left" stroke="#94a3b8" />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#FFC107" strokeWidth={3} dot={{ fill: '#FFC107', r: 5 }} />
            <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#06B6D4" strokeWidth={3} dot={{ fill: '#06B6D4', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-[#4CAF50]" />
            <h3 className="text-xl font-bold text-white">Control Room</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Temperature</span>
              <span className="text-white font-semibold">22°C</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Humidity</span>
              <span className="text-white font-semibold">52%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">AC Status</span>
              <span className="text-green-400 font-semibold">Running</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Lighting</span>
              <span className="text-green-400 font-semibold">On</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-[#06B6D4]" />
            <h3 className="text-xl font-bold text-white">Storage Room</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Temperature</span>
              <span className="text-white font-semibold">18°C</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Humidity</span>
              <span className="text-white font-semibold">45%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Cooling</span>
              <span className="text-green-400 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Access</span>
              <span className="text-red-400 font-semibold">Locked</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-6 h-6 text-[#FFC107]" />
            <h3 className="text-xl font-bold text-white">Security Cameras</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-xl p-4 border border-[#4CAF50]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Main Entrance</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Online</span>
              </div>
              <p className="text-sm text-[#94a3b8]">Last motion: 5 min ago</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-[#4CAF50]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Field Area</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Online</span>
              </div>
              <p className="text-sm text-[#94a3b8]">Last motion: 2 min ago</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Storage</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Online</span>
              </div>
              <p className="text-sm text-[#94a3b8]">No motion detected</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Wifi className="w-6 h-6 text-[#06B6D4]" />
            <h3 className="text-xl font-bold text-white">Connected Devices</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Soil Sensors</p>
                <p className="text-xs text-[#94a3b8]">5 devices</p>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Weather Station</p>
                <p className="text-xs text-[#94a3b8]">1 device</p>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Cameras</p>
                <p className="text-xs text-[#94a3b8]">3 devices</p>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Controllers</p>
                <p className="text-xs text-[#94a3b8]">2 devices</p>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
