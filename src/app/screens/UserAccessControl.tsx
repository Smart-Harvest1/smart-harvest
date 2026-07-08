import { Users, Shield, UserPlus, Settings, Activity } from 'lucide-react';

const users = [
  { id: 1, name: 'John Doe', email: 'john@smartcrops.com', role: 'Admin', status: 'active', lastActive: '2 min ago' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@smartcrops.com', role: 'Technician', status: 'active', lastActive: '5 min ago' },
  { id: 3, name: 'Mike Johnson', email: 'mike@smartcrops.com', role: 'Viewer', status: 'active', lastActive: '1 hour ago' },
  { id: 4, name: 'Emily Brown', email: 'emily@smartcrops.com', role: 'Technician', status: 'inactive', lastActive: '2 days ago' },
];

const permissions = [
  { module: 'Dashboard', admin: true, technician: true, viewer: true },
  { module: 'Energy Management', admin: true, technician: true, viewer: true },
  { module: 'Soil Analysis', admin: true, technician: true, viewer: true },
  { module: 'Pump Control', admin: true, technician: true, viewer: false },
  { module: 'User Management', admin: true, technician: false, viewer: false },
  { module: 'System Settings', admin: true, technician: false, viewer: false },
];

export default function UserAccessControl() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">User Access Control</h1>
          <p className="text-[#94a3b8]">Manage users and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4CAF50] to-[#22C55E] text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/5 rounded-2xl p-6 border border-[#4CAF50]/30">
          <Users className="w-8 h-8 text-[#4CAF50] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-white">4</p>
        </div>

        <div className="bg-gradient-to-br from-[#06B6D4]/20 to-[#06B6D4]/5 rounded-2xl p-6 border border-[#06B6D4]/30">
          <Activity className="w-8 h-8 text-[#06B6D4] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Active Now</h3>
          <p className="text-3xl font-bold text-white">3</p>
        </div>

        <div className="bg-gradient-to-br from-[#FFC107]/20 to-[#FFC107]/5 rounded-2xl p-6 border border-[#FFC107]/30">
          <Shield className="w-8 h-8 text-[#FFC107] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Admins</h3>
          <p className="text-3xl font-bold text-white">1</p>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">User List</h3>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#22C55E] rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{user.name}</h4>
                    <p className="text-[#94a3b8] text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'Admin'
                        ? 'bg-[#FFC107]/20 text-[#FFC107]'
                        : user.role === 'Technician'
                        ? 'bg-[#06B6D4]/20 text-[#06B6D4]'
                        : 'bg-[#94a3b8]/20 text-[#94a3b8]'
                    }`}>
                      {user.role}
                    </span>
                    <p className="text-xs text-[#94a3b8] mt-1">Last active: {user.lastActive}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${
                      user.status === 'active' ? 'bg-[#4CAF50]' : 'bg-[#94a3b8]'
                    }`}></span>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-[#94a3b8]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Role Permissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-[#94a3b8] font-semibold py-3 px-4">Module</th>
                <th className="text-center text-[#94a3b8] font-semibold py-3 px-4">Admin</th>
                <th className="text-center text-[#94a3b8] font-semibold py-3 px-4">Technician</th>
                <th className="text-center text-[#94a3b8] font-semibold py-3 px-4">Viewer</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="text-white py-3 px-4">{perm.module}</td>
                  <td className="text-center py-3 px-4">
                    <span className={`inline-block w-6 h-6 rounded-full ${perm.admin ? 'bg-[#4CAF50]' : 'bg-white/10'}`}>
                      {perm.admin && <span className="text-white text-xs">✓</span>}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`inline-block w-6 h-6 rounded-full ${perm.technician ? 'bg-[#4CAF50]' : 'bg-white/10'}`}>
                      {perm.technician && <span className="text-white text-xs">✓</span>}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`inline-block w-6 h-6 rounded-full ${perm.viewer ? 'bg-[#4CAF50]' : 'bg-white/10'}`}>
                      {perm.viewer && <span className="text-white text-xs">✓</span>}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
