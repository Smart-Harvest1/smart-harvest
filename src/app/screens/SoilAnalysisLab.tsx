import { Beaker, TrendingUp, Download, Droplets, Leaf } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const soilMetrics = [
  { metric: 'pH', value: 6.8, optimal: '6.5-7.0', status: 'optimal' },
  { metric: 'Nitrogen', value: 45, optimal: '40-60 ppm', status: 'optimal' },
  { metric: 'Phosphorus', value: 32, optimal: '30-50 ppm', status: 'optimal' },
  { metric: 'Potassium', value: 180, optimal: '150-200 ppm', status: 'optimal' },
  { metric: 'Moisture', value: 72, optimal: '60-80%', status: 'optimal' },
];

const radarData = [
  { nutrient: 'N', value: 75, fullMark: 100 },
  { nutrient: 'P', value: 64, fullMark: 100 },
  { nutrient: 'K', value: 90, fullMark: 100 },
  { nutrient: 'pH', value: 85, fullMark: 100 },
  { nutrient: 'Moisture', value: 90, fullMark: 100 },
];

const trendData = [
  { week: 'W1', ph: 6.5, moisture: 68 },
  { week: 'W2', ph: 6.6, moisture: 70 },
  { week: 'W3', ph: 6.7, moisture: 72 },
  { week: 'W4', ph: 6.8, moisture: 72 },
];

export default function SoilAnalysisLab() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Soil Analysis Lab</h1>
          <p className="text-[#94a3b8]">Real-time soil health monitoring</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#4CAF50] text-white rounded-xl hover:bg-[#22C55E] transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/5 rounded-2xl p-6 border border-[#4CAF50]/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#4CAF50]/30 rounded-xl">
            <Leaf className="w-8 h-8 text-[#4CAF50]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Overall Soil Health Score</h3>
            <p className="text-5xl font-bold text-[#4CAF50] mb-2">92/100</p>
            <p className="text-[#94a3b8]">Excellent condition for crop growth</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
              Optimal
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Nutrient Balance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="nutrient" stroke="#94a3b8" />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar name="Soil" dataKey="value" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Soil Metrics</h3>
          <div className="space-y-4">
            {soilMetrics.map((item) => (
              <div key={item.metric} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{item.metric}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'optimal' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.status === 'optimal' ? 'Optimal' : 'Warning'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#94a3b8]">Current: <span className="text-white font-semibold">{item.value}</span></span>
                  <span className="text-[#94a3b8]">Range: {item.optimal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Soil Trend Analysis (4 Weeks)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="ph" stroke="#4CAF50" strokeWidth={3} dot={{ fill: '#4CAF50', r: 5 }} />
            <Line type="monotone" dataKey="moisture" stroke="#06B6D4" strokeWidth={3} dot={{ fill: '#06B6D4', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Beaker className="w-6 h-6 text-[#06B6D4]" />
            <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Optimal for Tomatoes</h4>
                  <p className="text-sm text-[#94a3b8]">Current soil conditions are perfect for tomato cultivation</p>
                </div>
              </div>
            </div>
            <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Droplets className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Maintain Moisture</h4>
                  <p className="text-sm text-[#94a3b8]">Keep current irrigation schedule for best results</p>
                </div>
              </div>
            </div>
            <div className="bg-[#FFC107]/10 border border-[#FFC107]/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Leaf className="w-5 h-5 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Fertilizer Suggestion</h4>
                  <p className="text-sm text-[#94a3b8]">Consider organic compost in 2 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Crop Suitability</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Tomatoes</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-white/10 rounded-full h-2">
                  <div className="bg-[#4CAF50] h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="text-[#4CAF50] font-semibold text-sm">95%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Lettuce</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-white/10 rounded-full h-2">
                  <div className="bg-[#4CAF50] h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-[#4CAF50] font-semibold text-sm">92%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Peppers</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-white/10 rounded-full h-2">
                  <div className="bg-[#FFC107] h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <span className="text-[#FFC107] font-semibold text-sm">88%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Carrots</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-white/10 rounded-full h-2">
                  <div className="bg-[#FFC107] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-[#FFC107] font-semibold text-sm">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
