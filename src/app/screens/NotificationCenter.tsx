import { Bell, BatteryWarning, Droplets, AlertTriangle, ThermometerSun, WifiOff, CheckCircle2, X } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'warning',
    icon: BatteryWarning,
    title: 'Low Battery Alert',
    message: 'Battery level dropped to 25%. Consider charging soon.',
    time: '5 min ago',
    read: false,
    color: '#FFC107',
  },
  {
    id: 2,
    type: 'error',
    icon: Droplets,
    title: 'Low Soil Moisture',
    message: 'Field B moisture level at 45%. Irrigation recommended.',
    time: '15 min ago',
    read: false,
    color: '#EF4444',
  },
  {
    id: 3,
    type: 'success',
    icon: CheckCircle2,
    title: 'Pump Activated',
    message: 'Automatic irrigation started in Field A.',
    time: '1 hour ago',
    read: true,
    color: '#4CAF50',
  },
  {
    id: 4,
    type: 'warning',
    icon: ThermometerSun,
    title: 'High Temperature',
    message: 'Storage room temperature at 32°C. Check cooling system.',
    time: '2 hours ago',
    read: true,
    color: '#FFC107',
  },
  {
    id: 5,
    type: 'error',
    icon: WifiOff,
    title: 'Sensor Disconnected',
    message: 'Soil sensor #3 lost connection. Check device.',
    time: '3 hours ago',
    read: true,
    color: '#EF4444',
  },
  {
    id: 6,
    type: 'info',
    icon: AlertTriangle,
    title: 'Maintenance Due',
    message: 'Pump system maintenance scheduled for tomorrow.',
    time: '5 hours ago',
    read: true,
    color: '#06B6D4',
  },
];

export default function NotificationCenter() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Notification Center</h1>
          <p className="text-[#94a3b8]">{unreadCount} unread notifications</p>
        </div>
        <button className="px-4 py-2 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors border border-white/10">
          Mark All as Read
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/5 rounded-2xl p-6 border border-[#4CAF50]/30">
          <CheckCircle2 className="w-8 h-8 text-[#4CAF50] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Success</h3>
          <p className="text-3xl font-bold text-white">3</p>
        </div>

        <div className="bg-gradient-to-br from-[#FFC107]/20 to-[#FFC107]/5 rounded-2xl p-6 border border-[#FFC107]/30">
          <AlertTriangle className="w-8 h-8 text-[#FFC107] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Warnings</h3>
          <p className="text-3xl font-bold text-white">2</p>
        </div>

        <div className="bg-gradient-to-br from-[#EF4444]/20 to-[#EF4444]/5 rounded-2xl p-6 border border-[#EF4444]/30">
          <AlertTriangle className="w-8 h-8 text-[#EF4444] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Critical</h3>
          <p className="text-3xl font-bold text-white">2</p>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-[#4CAF50]" />
          <h3 className="text-xl font-bold text-white">Recent Alerts</h3>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`rounded-xl p-4 transition-all hover:scale-[1.01] ${
                  notification.read ? 'bg-white/5' : 'bg-white/10 border border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${notification.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: notification.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-white font-semibold">{notification.title}</h4>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[#4CAF50] rounded-full flex-shrink-0 mt-1.5"></span>
                      )}
                    </div>
                    <p className="text-[#94a3b8] text-sm mb-2">{notification.message}</p>
                    <p className="text-[#64748b] text-xs">{notification.time}</p>
                  </div>

                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0">
                    <X className="w-4 h-4 text-[#94a3b8]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Notification Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-white">System Alerts</span>
            <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#4CAF50]">
              <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-white">Sensor Warnings</span>
            <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#4CAF50]">
              <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-white">Energy Updates</span>
            <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#4CAF50]">
              <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7" />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-white">Maintenance Reminders</span>
            <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-white/20">
              <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
