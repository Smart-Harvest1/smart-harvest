import { Download, TrendingUp, Calendar, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const monthlyEnergy = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
  const production = 800 + index * 90 + Math.sin(index / 1.2) * 30;
  const consumption = 620 + index * 40 + Math.cos(index / 1.4) * 25;
  return { month, production: Math.round(production), consumption: Math.round(consumption) };
});

const waterUsage = ['W1', 'W2', 'W3', 'W4'].map((week, index) => ({
  week,
  usage: Math.round(2500 + index * 150 + Math.sin(index / 1.1) * 120),
}));

const cropPerformance = [
  { name: 'Tomatoes', value: 35, color: '#4CAF50' },
  { name: 'Lettuce', value: 25, color: '#06B6D4' },
  { name: 'Peppers', value: 20, color: '#FFC107' },
  { name: 'Carrots', value: 15, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#94a3b8' },
];

const soilHealth = ['W1', 'W2', 'W3', 'W4'].map((date, index) => ({
  date,
  score: 82 + index * 3 + Math.min(index * 2, 6),
}));

const totalProduction = monthlyEnergy.reduce((sum, item) => sum + item.production, 0);
const totalConsumption = monthlyEnergy.reduce((sum, item) => sum + item.consumption, 0);
const efficiencyScore = totalConsumption ? Math.min(100, Math.round((totalProduction / totalConsumption) * 100)) : 0;
const lastMonth = monthlyEnergy[monthlyEnergy.length - 1];
const previousMonth = monthlyEnergy[monthlyEnergy.length - 2] ?? monthlyEnergy[0];
const energySaved = previousMonth.production ? Math.round(((lastMonth.production - previousMonth.production) / previousMonth.production) * 100) : 0;
const averageWater = waterUsage.reduce((sum, item) => sum + item.usage, 0) / waterUsage.length;
const waterSaved = Math.max(0, Math.round((1 - (waterUsage[waterUsage.length - 1].usage / Math.max(averageWater, 1))) * 100));
const energyEfficiency = totalProduction + totalConsumption ? Math.min(100, Math.round((totalProduction / (totalProduction + totalConsumption)) * 100)) : 0;
const waterEfficiency = Math.min(100, Math.round(100 - (waterUsage[waterUsage.length - 1].usage / Math.max(averageWater, 1)) * 100));
const cropYield = Math.round(cropPerformance.reduce((sum, item) => sum + item.value, 0) / cropPerformance.length);

export default function AnalyticsReports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Analytics & Reports</h1>
          <p className="text-[#94a3b8]">Comprehensive farm performance insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4CAF50] to-[#22C55E] text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all">
          <Download className="w-4 h-4" />
          Export All Reports
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/5 rounded-2xl p-6 border border-[#4CAF50]/30">
          <TrendingUp className="w-8 h-8 text-[#4CAF50] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Efficiency Score</h3>
          <p className="text-3xl font-bold text-white">{efficiencyScore}%</p>
          <p className="text-sm text-[#4CAF50] mt-1">{energySaved > 0 ? `+${energySaved}% vs prior` : 'Stable'}</p>
        </div>

        <div className="bg-gradient-to-br from-[#FFC107]/20 to-[#FFC107]/5 rounded-2xl p-6 border border-[#FFC107]/30">
          <BarChart3 className="w-8 h-8 text-[#FFC107] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Energy Saved</h3>
          <p className="text-3xl font-bold text-white">{energySaved >= 0 ? `+${energySaved}%` : `${energySaved}%`}</p>
          <p className="text-sm text-[#4CAF50] mt-1">Based on last two months</p>
        </div>

        <div className="bg-gradient-to-br from-[#06B6D4]/20 to-[#06B6D4]/5 rounded-2xl p-6 border border-[#06B6D4]/30">
          <PieChartIcon className="w-8 h-8 text-[#06B6D4] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Water Saved</h3>
          <p className="text-3xl font-bold text-white">{waterSaved}%</p>
          <p className="text-sm text-[#4CAF50] mt-1">vs monthly average</p>
        </div>

        <div className="bg-gradient-to-br from-[#EF4444]/20 to-[#EF4444]/5 rounded-2xl p-6 border border-[#EF4444]/30">
          <Calendar className="w-8 h-8 text-[#EF4444] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Uptime</h3>
          <p className="text-3xl font-bold text-white">99.8%</p>
          <p className="text-sm text-[#4CAF50] mt-1">30 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Energy Efficiency (6 Months)</h3>
            <button className="text-sm text-[#4CAF50] hover:text-[#22C55E] transition-colors">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyEnergy}>
              <defs>
                <linearGradient id="productionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="consumptionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFC107" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFC107" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="production" stroke="#4CAF50" fill="url(#productionGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="consumption" stroke="#FFC107" fill="url(#consumptionGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Crop Distribution</h3>
            <button className="text-sm text-[#4CAF50] hover:text-[#22C55E] transition-colors">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cropPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {cropPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Water Usage Trend</h3>
            <button className="text-sm text-[#4CAF50] hover:text-[#22C55E] transition-colors">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={waterUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="usage" fill="#06B6D4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Soil Health Score</h3>
            <button className="text-sm text-[#4CAF50] hover:text-[#22C55E] transition-colors">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={soilHealth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="score" stroke="#4CAF50" strokeWidth={3} dot={{ fill: '#4CAF50', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Performance KPIs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-[#94a3b8] text-sm mb-1">Solar Efficiency</p>
            <p className="text-2xl font-bold text-white mb-2">{energyEfficiency}%</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#4CAF50] to-[#22C55E] h-2 rounded-full" style={{ width: `${energyEfficiency}%` }}></div>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-[#94a3b8] text-sm mb-1">Water Efficiency</p>
            <p className="text-2xl font-bold text-white mb-2">{waterEfficiency}%</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] h-2 rounded-full" style={{ width: `${waterEfficiency}%` }}></div>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-[#94a3b8] text-sm mb-1">Crop Yield</p>
            <p className="text-2xl font-bold text-white mb-2">{cropYield}%</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#FFC107] to-[#FF9800] h-2 rounded-full" style={{ width: `${cropYield}%` }}></div>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-[#94a3b8] text-sm mb-1">System Uptime</p>
            <p className="text-2xl font-bold text-white mb-2">99.8%</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#4CAF50] to-[#22C55E] h-2 rounded-full" style={{ width: '99%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
