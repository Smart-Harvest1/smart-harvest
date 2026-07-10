import { Sun, Battery, Zap, Droplets, ThermometerSun, CloudRain, AlertTriangle, TrendingUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { fetchStats, fetchTelemetry } from '../lib/api';

const fallbackEnergyData: Array<{ time: string; solar: number; battery: number }> = ['00', '04', '08', '12', '16', '20'].map((time, index) => {
  const solar = Math.max(0, 5 - Math.abs(index - 3) * 1.2);
  const battery = Math.max(20, 70 + (index - 3) * 4);
  return { time, solar: Number(solar.toFixed(1)), battery: Number(battery.toFixed(0)) };
});

const fallbackSoilData: Array<{ day: string; moisture: number }> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
  const moisture = 60 + Math.sin(index / 2) * 6 + index * 2;
  return { day, moisture: Number(Math.round(moisture)) };
});

const parseTelemetryValue = (value: any, fallback = 0) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : fallback;
  }
  return fallback;
};

export default function MainDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [telemetry, setTelemetry] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchStats(), fetchTelemetry().catch(() => [] as any)])
      .then(([s, t]) => {
        if (!mounted) return;
        setStats(s);
        setTelemetry(t);
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const latestByKey = telemetry.reduce((acc: any, item: any) => {
    const key = item.key || 'unknown';
    if (!acc[key] || new Date(item.createdAt) > new Date(acc[key].createdAt)) {
      acc[key] = item;
    }
    return acc;
  }, {} as Record<string, any>);

  const rawSolar = latestByKey.solar?.value ?? latestByKey.solar?.value ?? null;
  const rawBattery = latestByKey.battery?.value ?? null;
  const rawMoisture = latestByKey.moisture?.value ?? latestByKey.soil?.value ?? null;
  const batteryFallback = stats?.batteryLevel ?? (typeof rawBattery === 'number' ? rawBattery : Number(rawBattery) || 85);
  const soilMoistureFallback = stats?.soilMoisture ?? (typeof rawMoisture === 'number' ? rawMoisture : Number(rawMoisture) || 72);
  const alertsCount = stats?.alertsCount ?? (stats ? stats.alertsCount : 2);

  const temperatureValue = latestByKey.temperature?.value ?? latestByKey.temp?.value ?? 28;
  const humidityValue = latestByKey.humidity?.value ?? latestByKey.moisture?.value ?? 65;
  const pumpStatus = latestByKey.pump_status?.value ?? latestByKey.pumpStatus?.value ?? 'Active';
  const temperatureText = typeof temperatureValue === 'number' ? `${temperatureValue}°C` : String(temperatureValue);
  const humidityText = typeof humidityValue === 'number' ? `${humidityValue}%` : String(humidityValue);

  let energyData = fallbackEnergyData;
  let soilData = fallbackSoilData;
  if (telemetry && telemetry.length) {
    const byKey = telemetry.reduce((acc: any, t: any) => {
      const k = t.key || 'unknown';
      let v = t.value;
      try { if (typeof v === 'string') v = JSON.parse(v); } catch {}
      acc[k] = acc[k] || [];
      acc[k].push({ value: v, createdAt: t.createdAt });
      return acc;
    }, {} as Record<string, any[]>);

    const sortByDate = (items: any[]) => items.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const solarSeries = sortByDate(byKey.solar || []);
    const batterySeries = sortByDate(byKey.battery || []);

    if (solarSeries.length || batterySeries.length) {
      const times = new Set<string>();
      solarSeries.forEach((s: any) => times.add(new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
      batterySeries.forEach((s: any) => times.add(new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
      energyData = Array.from(times).sort().map((time) => {
        const s = solarSeries.find((x: any) => new Date(x.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) === time);
        const b = batterySeries.find((x: any) => new Date(x.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) === time);
        const solarValue = s ? parseTelemetryValue(s.value, 0) : 0;
        const batteryValue = b ? parseTelemetryValue(b.value, batteryFallback) : batteryFallback;
        return {
          time,
          solar: Number(solarValue.toFixed ? solarValue.toFixed(1) : solarValue) as number,
          battery: Number(batteryValue.toFixed ? batteryValue.toFixed(0) : batteryValue) as number,
        };
      });
    }

    const moistureSeries = sortByDate(byKey.moisture || byKey.soil || []);
    if (moistureSeries.length) {
      soilData = moistureSeries.map((m: any) => ({
        day: new Date(m.createdAt).toLocaleDateString([], { weekday: 'short' }),
        moisture: parseTelemetryValue(m.value, soilMoistureFallback),
      }));
    }
  }

  const totalSolar = energyData.reduce((sum, point) => sum + (typeof point.solar === 'number' ? point.solar : 0), 0);
  const totalBattery = energyData.reduce((sum, point) => sum + (typeof point.battery === 'number' ? point.battery : 0), 0);
  const avgSolar = energyData.length ? totalSolar / energyData.length : 0;
  const avgBattery = energyData.length ? totalBattery / energyData.length : batteryFallback;
  const peakSolar = energyData.length ? Math.max(...energyData.map((point) => point.solar)) : 0;
  const solarPower = stats?.solarPower ?? (latestByKey.solar ? `${parseTelemetryValue(latestByKey.solar.value, avgSolar).toFixed(1)} kW` : `${avgSolar.toFixed(1)} kW`);
  const batteryLevelValue = stats?.batteryLevel ?? Math.round(avgBattery);
  const soilMoistureValue = stats?.soilMoisture ?? Math.round(soilData.length ? soilData.reduce((sum, point) => sum + point.moisture, 0) / soilData.length : soilMoistureFallback);
  const batteryLevel = batteryLevelValue;
  const soilMoisture = soilMoistureValue;

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
          <p className="text-3xl font-bold text-white mb-1">{solarPower}</p>
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
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">{batteryLevel}%</span>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-1">Battery Level</h3>
          <p className="text-3xl font-bold text-white mb-1">{batteryLevel}%</p>
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
          <p className="text-3xl font-bold text-white mb-1">{soilMoisture}%</p>
          <p className="text-sm text-[#94a3b8]">Optimal range</p>
        </div>

        <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[#EF4444]/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
            </div>
            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">{alertsCount} Active</span>
          </div>
          <h3 className="text-[#94a3b8] text-sm mb-1">Alerts</h3>
          <p className="text-3xl font-bold text-white mb-1">{alertsCount}</p>
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
            <span className="text-2xl font-bold text-white">{temperatureText}</span>
          </div>
          <h4 className="text-[#94a3b8] text-sm">Temperature</h4>
          <p className="text-xs text-[#4CAF50] mt-1">Optimal</p>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <CloudRain className="w-8 h-8 text-[#06B6D4]" />
            <span className="text-2xl font-bold text-white">{humidityText}</span>
          </div>
          <h4 className="text-[#94a3b8] text-sm">Humidity</h4>
          <p className="text-xs text-[#4CAF50] mt-1">Normal</p>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Droplets className="w-8 h-8 text-[#4CAF50]" />
            <span className="text-2xl font-bold text-white">{pumpStatus}</span>
          </div>
          <h4 className="text-[#94a3b8] text-sm">Pump Status</h4>
          <p className="text-xs text-[#4CAF50] mt-1">Running</p>
        </div>
      </div>
    </div>
  );
}
