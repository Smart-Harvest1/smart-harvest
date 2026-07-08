import { useState } from 'react';
import { Wifi, Bluetooth, Signal, Smartphone, Globe, Bell, Moon, Languages } from 'lucide-react';

export default function ConnectivitySettings() {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Connectivity & Settings</h1>
        <p className="text-[#94a3b8]">Network and application preferences</p>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-[#4CAF50]" />
          Wi-Fi Connection
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <h4 className="text-white font-semibold">Wi-Fi</h4>
              <p className="text-sm text-[#94a3b8]">{wifiEnabled ? 'Connected to SmartFarm_5G' : 'Disabled'}</p>
            </div>
            <button
              onClick={() => setWifiEnabled(!wifiEnabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                wifiEnabled ? 'bg-[#4CAF50]' : 'bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  wifiEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {wifiEnabled && (
            <>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-[#94a3b8]">IP Address</span>
                <span className="text-white font-semibold">192.168.1.45</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-[#94a3b8]">Signal Strength</span>
                <span className="text-[#4CAF50] font-semibold">Excellent</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-[#94a3b8]">Speed</span>
                <span className="text-white font-semibold">300 Mbps</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-[#06B6D4]" />
          Bluetooth
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <h4 className="text-white font-semibold">Bluetooth</h4>
              <p className="text-sm text-[#94a3b8]">{bluetoothEnabled ? '2 devices connected' : 'Disabled'}</p>
            </div>
            <button
              onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                bluetoothEnabled ? 'bg-[#06B6D4]' : 'bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  bluetoothEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {bluetoothEnabled && (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#06B6D4]" />
                  <div>
                    <p className="text-white font-semibold">Soil Sensor #1</p>
                    <p className="text-xs text-[#94a3b8]">Battery: 85%</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#06B6D4]" />
                  <div>
                    <p className="text-white font-semibold">Moisture Sensor #2</p>
                    <p className="text-xs text-[#94a3b8]">Battery: 92%</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Connected</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Signal className="w-5 h-5 text-[#FFC107]" />
          GSM Connection
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-[#94a3b8]">Network</span>
            <span className="text-white font-semibold">4G LTE</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-[#94a3b8]">Carrier</span>
            <span className="text-white font-semibold">Smart Network</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-[#94a3b8]">Signal</span>
            <span className="text-[#4CAF50] font-semibold">Strong</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-[#94a3b8]">Data Usage</span>
            <span className="text-white font-semibold">2.3 GB / 10 GB</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#FFC107]" />
                <span className="text-white">Notifications</span>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-[#4CAF50]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#06B6D4]" />
                <span className="text-white">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-[#4CAF50]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-[#4CAF50]" />
                <span className="text-white">Language</span>
              </div>
              <select className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                <option className="bg-[#1E293B]">English</option>
                <option className="bg-[#1E293B]">Spanish</option>
                <option className="bg-[#1E293B]">French</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#06B6D4]" />
            Cloud Sync
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Status</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Synced</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Last Sync</span>
              <span className="text-white font-semibold">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-[#94a3b8]">Storage Used</span>
              <span className="text-white font-semibold">4.2 GB / 10 GB</span>
            </div>
            <button className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Sync Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
