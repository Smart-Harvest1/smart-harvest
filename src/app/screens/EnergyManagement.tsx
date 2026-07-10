import { Sun, Battery, Zap, TrendingUp, ArrowDown, ArrowUp } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const hours = ['00', '04', '08', '12', '16', '20'];

const hourlyData = hours.map((hour, index) => {
  const production = Math.max(0, 5 - Math.abs(index - 3) * 1.1);
  const consumption = 1 + Math.sin(index / 1.5) * 0.4 + index * 0.25;
  return { hour, production: Number(production.toFixed(1)), consumption: Number(consumption.toFixed(1)) };
});

const weeklyData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({
  day,
  energy: Math.round(32 + index * 1.8 + Math.cos(index / 1.4) * 2),
}));

const distributionBase = [
  { name: 'Pump System', value: 45, color: '#06B6D4' },
  { name: 'Monitoring', value: 25, color: '#4CAF50' },
  { name: 'Facility', value: 20, color: '#FFC107' },
  { name: 'Other', value: 10, color: '#94a3b8' },
];
const distributionTotal = distributionBase.reduce((sum, item) => sum + item.value, 0);
const distributionData = distributionBase.map((item) => ({
  ...item,
  percent: Math.round((item.value / distributionTotal) * 100),
}));

const totalProduction = hourlyData.reduce((sum, item) => sum + item.production, 0);
const totalConsumption = hourlyData.reduce((sum, item) => sum + item.consumption, 0);
const avgConsumption = hourlyData.length ? totalConsumption / hourlyData.length : 0;
const peakProduction = hourlyData.length ? Math.max(...hourlyData.map((item) => item.production)) : 0;
const netBalance = Number((totalProduction - totalConsumption).toFixed(1));
const costSaved = Number((netBalance * 0.55).toFixed(2));
const productionChange = hourlyData.length > 1 ? Math.round(((hourlyData[hourlyData.length - 1].production - hourlyData[0].production) / Math.max(hourlyData[0].production, 1)) * 100) : 0;

export default function EnergyManagement() {
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Energy Management</h1>
        <p className="text-[#94a3b8]">Solar power and battery monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#FFC107]/20 to-[#FFC107]/5 rounded-2xl p-6 border border-[#FFC107]/30">
          <div className="flex items-center justify-between mb-4">
            <Sun className="w-10 h-10 text-[#FFC107]" />
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <ArrowUp className="w-4 h-4" />
              <span>+8%</span>
            </div>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-2">Solar Output</h3>
          <p className="text-4xl font-bold text-white mb-1">4.2 kW</p>
          <p className="text-sm text-[#94a3b8]">Peak: 4.8 kW</p>
        </div>

        <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/5 rounded-2xl p-6 border border-[#4CAF50]/30">
          <div className="flex items-center justify-between mb-4">
            <Battery className="w-10 h-10 text-[#4CAF50]" />
            <span className="text-sm px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Charging</span>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-2">Battery Status</h3>
          <p className="text-4xl font-bold text-white mb-1">85%</p>
          <div className="w-full bg-white/10 rounded-full h-2.5 mt-2">
            <div className="bg-gradient-to-r from-[#4CAF50] to-[#22C55E] h-2.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#06B6D4]/20 to-[#06B6D4]/5 rounded-2xl p-6 border border-[#06B6D4]/30">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-10 h-10 text-[#06B6D4]" />
            <div className="flex items-center gap-1 text-red-400 text-sm">
              <ArrowDown className="w-4 h-4" />
              <span>-3%</span>
            </div>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-2">Power Consumption</h3>
          <p className="text-4xl font-bold text-white mb-1">2.1 kW</p>
          <p className="text-sm text-[#94a3b8]">Avg: 2.3 kW</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Production vs Consumption (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="production" stroke="#4CAF50" fill="url(#productionGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="consumption" stroke="#EF4444" fill="url(#consumptionGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Energy Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-[#94a3b8]">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Weekly Energy Production</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="energy" fill="#4CAF50" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-4">System Efficiency</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#94a3b8]">Solar Panels</span>
                <span className="text-white font-semibold">94%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#4CAF50] to-[#22C55E] h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#94a3b8]">Battery Health</span>
                <span className="text-white font-semibold">88%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#FFC107] to-[#FF9800] h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#94a3b8]">Inverter</span>
                <span className="text-white font-semibold">96%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-4">Today's Summary</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Total Generated</span>
              <span className="text-white font-semibold">36.5 kWh</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Total Consumed</span>
              <span className="text-white font-semibold">28.2 kWh</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Net Balance</span>
              <span className="text-green-400 font-semibold">+8.3 kWh</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Cost Saved</span>
              <span className="text-white font-semibold">$4.20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
