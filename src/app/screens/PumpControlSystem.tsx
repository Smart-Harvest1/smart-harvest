import { useState } from 'react';
import { Droplets, Power, Clock, Calendar, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const usageData = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 4.2 },
  { day: 'Wed', hours: 3.8 },
  { day: 'Thu', hours: 4.5 },
  { day: 'Fri', hours: 4.0 },
  { day: 'Sat', hours: 3.2 },
  { day: 'Sun', hours: 3.9 },
];

export default function PumpControlSystem() {
  const [pumpOn, setPumpOn] = useState(true);
  const [autoMode, setAutoMode] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Pump Control System</h1>
        <p className="text-[#94a3b8]">Smart irrigation management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#06B6D4]/20 to-[#06B6D4]/5 rounded-2xl p-8 border border-[#06B6D4]/30">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full mb-6 shadow-2xl shadow-cyan-500/50 relative">
              <Droplets className="w-16 h-16 text-white" />
              {pumpOn && (
                <div className="absolute inset-0 rounded-full bg-[#06B6D4] animate-ping opacity-75"></div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Pump Status</h2>
            <p className={`text-4xl font-bold mb-6 ${pumpOn ? 'text-[#4CAF50]' : 'text-[#94a3b8]'}`}>
              {pumpOn ? 'ACTIVE' : 'STANDBY'}
            </p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setPumpOn(!pumpOn)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  pumpOn
                    ? 'bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white shadow-lg shadow-red-500/30'
                    : 'bg-gradient-to-r from-[#4CAF50] to-[#22C55E] text-white shadow-lg shadow-green-500/30'
                }`}
              >
                {pumpOn ? 'Turn OFF' : 'Turn ON'}
              </button>
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="text-[#94a3b8]">Automatic Mode</span>
              <button
                onClick={() => setAutoMode(!autoMode)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  autoMode ? 'bg-[#4CAF50]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    autoMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-[#4CAF50]" />
              <h3 className="font-bold text-white">Live Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8] text-sm">Flow Rate</span>
                <span className="text-white font-semibold">42 L/min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8] text-sm">Pressure</span>
                <span className="text-white font-semibold">3.2 bar</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8] text-sm">Power Draw</span>
                <span className="text-white font-semibold">1.2 kW</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-[#FFC107]" />
              <h3 className="font-bold text-white">Runtime</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-3xl font-bold text-white">3h 42m</p>
                <p className="text-[#94a3b8] text-sm">Today</p>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-xl font-semibold text-white">28.5h</p>
                <p className="text-[#94a3b8] text-sm">This Week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#06B6D4]" />
          Weekly Usage Pattern
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="hours" fill="#06B6D4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-[#4CAF50]" />
            <h3 className="text-xl font-bold text-white">Scheduled Irrigation</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-xl p-4 border border-[#4CAF50]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Morning Session</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#94a3b8]">
                <span>06:00 AM - 08:00 AM</span>
                <span>•</span>
                <span>Daily</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Evening Session</span>
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">Scheduled</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#94a3b8]">
                <span>06:00 PM - 07:30 PM</span>
                <span>•</span>
                <span>Daily</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Power className="w-6 h-6 text-[#06B6D4]" />
            <h3 className="text-xl font-bold text-white">Automation Rules</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Moisture Trigger</span>
                <span className="text-[#4CAF50] font-semibold">ON</span>
              </div>
              <p className="text-sm text-[#94a3b8]">Activate when moisture &lt; 65%</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Rain Detection</span>
                <span className="text-[#4CAF50] font-semibold">ON</span>
              </div>
              <p className="text-sm text-[#94a3b8]">Skip irrigation during rain</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Solar Priority</span>
                <span className="text-[#4CAF50] font-semibold">ON</span>
              </div>
              <p className="text-sm text-[#94a3b8]">Use solar energy when available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
