import { useEffect, useMemo, useState } from 'react';
import { Users, Shield, UserPlus, Settings, Activity, Trash2, Edit3, X } from 'lucide-react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../lib/api';

const defaultFormState = {
  fullName: '',
  email: '',
  password: '',
  role: 'TECHNICIAN',
  status: 'active',
};

const permissions = [
  { module: 'Dashboard', admin: true, technician: true, viewer: true },
  { module: 'Energy Management', admin: true, technician: true, viewer: true },
  { module: 'Soil Analysis', admin: true, technician: true, viewer: true },
  { module: 'Pump Control', admin: true, technician: true, viewer: false },
  { module: 'User Management', admin: true, technician: false, viewer: false },
  { module: 'System Settings', admin: true, technician: false, viewer: false },
];

export default function UserAccessControl() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [formState, setFormState] = useState({ ...defaultFormState });

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err?.error || err?.message || 'Unable to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((user) => user.status === 'active').length,
      admins: users.filter((user) => user.role === 'ADMIN').length,
    }),
    [users],
  );

  const openNewUserForm = () => {
    setEditingUser(null);
    setFormState({ ...defaultFormState });
    setIsFormOpen(true);
  };

  const openEditUserForm = (user: any) => {
    setEditingUser(user);
    setFormState({
      fullName: user.fullName,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
    setFormState({ ...defaultFormState });
    setError(null);
  };

  const handleSaveUser = async () => {
    if (!formState.fullName.trim() || (!editingUser && !formState.email.trim())) {
      setError('Name and email are required.');
      return;
    }

    setError(null);
    try {
      if (editingUser) {
        const payload: any = {
          fullName: formState.fullName,
          role: formState.role,
          status: formState.status,
        };
        if (formState.password.trim()) payload.password = formState.password;
        const updated = await updateUser(editingUser.id, payload);
        setUsers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      } else {
        const payload = {
          fullName: formState.fullName,
          email: formState.email,
          password: formState.password,
          role: formState.role,
          status: formState.status,
        };
        const created = await createUser(payload);
        setUsers((prev) => [created, ...prev]);
      }
      closeForm();
    } catch (err: any) {
      setError(err?.error || err?.message || 'Unable to save user');
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmed = window.confirm('Delete this user? This action cannot be undone.');
    if (!confirmed) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err: any) {
      setError(err?.error || err?.message || 'Unable to delete user');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">User Access Control</h1>
          <p className="text-[#94a3b8]">Manage users, roles, and account status from one admin panel.</p>
        </div>
        <button
          onClick={openNewUserForm}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4CAF50] to-[#22C55E] text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/5 rounded-2xl p-6 border border-[#4CAF50]/30">
          <Users className="w-8 h-8 text-[#4CAF50] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>

        <div className="bg-gradient-to-br from-[#06B6D4]/20 to-[#06B6D4]/5 rounded-2xl p-6 border border-[#06B6D4]/30">
          <Activity className="w-8 h-8 text-[#06B6D4] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Active Now</h3>
          <p className="text-3xl font-bold text-white">{stats.active}</p>
        </div>

        <div className="bg-gradient-to-br from-[#FFC107]/20 to-[#FFC107]/5 rounded-2xl p-6 border border-[#FFC107]/30">
          <Shield className="w-8 h-8 text-[#FFC107] mb-3" />
          <h3 className="text-[#94a3b8] text-sm mb-1">Admins</h3>
          <p className="text-3xl font-bold text-white">{stats.admins}</p>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div>
      ) : null}

      {isFormOpen ? (
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">{editingUser ? 'Edit User' : 'Create New User'}</h3>
              <p className="text-[#94a3b8] text-sm">
                {editingUser
                  ? 'Update the selected user account and access level.'
                  : 'Add a new user account with a role and status.'}
              </p>
            </div>
            <button
              type="button"
              onClick={closeForm}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-[#94a3b8] hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <label className="block text-sm text-[#94a3b8]">
              Full Name
              <input
                value={formState.fullName}
                onChange={(event) => setFormState({ ...formState, fullName: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-[#4CAF50]"
                placeholder="Jane Doe"
              />
            </label>

            <label className="block text-sm text-[#94a3b8]">
              Email
              <input
                value={formState.email}
                onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-[#4CAF50]"
                placeholder="jane@smartcrops.com"
                type="email"
                disabled={Boolean(editingUser)}
              />
            </label>

            <label className="block text-sm text-[#94a3b8]">
              Password
              <input
                value={formState.password}
                onChange={(event) => setFormState({ ...formState, password: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-[#4CAF50]"
                placeholder={editingUser ? 'Leave blank to keep current password' : 'Enter a new password'}
                type="password"
              />
            </label>

            <label className="block text-sm text-[#94a3b8]">
              Role
              <select
                value={formState.role}
                onChange={(event) => setFormState({ ...formState, role: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-[#4CAF50]"
              >
                <option value="ADMIN">Admin</option>
                <option value="TECHNICIAN">Technician</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </label>

            <label className="block text-sm text-[#94a3b8]">
              Status
              <select
                value={formState.status}
                onChange={(event) => setFormState({ ...formState, status: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-[#4CAF50]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={closeForm}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-[#94a3b8] hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveUser}
              className="rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#22C55E] px-5 py-3 text-white hover:shadow-lg hover:shadow-green-500/30"
            >
              {editingUser ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </div>
      ) : null}

      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">User List</h3>
        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#94a3b8]">Loading users...</div>
        ) : (
          <div className="space-y-3">
            {users.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#94a3b8]">No users found.</div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#22C55E] rounded-full flex items-center justify-center text-white font-bold">
                        {user.fullName
                          .split(' ')
                          .map((segment: string) => segment[0])
                          .join('')}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{user.fullName}</h4>
                        <p className="text-[#94a3b8] text-sm">{user.email}</p>
                        <p className="text-[#94a3b8] text-xs mt-1">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'ADMIN'
                          ? 'bg-[#FFC107]/20 text-[#FFC107]'
                          : user.role === 'TECHNICIAN'
                          ? 'bg-[#06B6D4]/20 text-[#06B6D4]'
                          : 'bg-[#94a3b8]/20 text-[#94a3b8]'
                      }`}>
                        {user.role}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active' ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 'bg-[#94a3b8]/20 text-[#94a3b8]'
                      }`}>
                        {user.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => openEditUserForm(user)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[#94a3b8] hover:bg-white/10"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-red-200 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
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
