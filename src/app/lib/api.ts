export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export async function post(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export function setToken(token: string) {
  try { localStorage.setItem('sh_token', token); } catch {}
}

export function getToken() {
  try { return localStorage.getItem('sh_token'); } catch { return null; }
}

export function clearToken() {
  try { localStorage.removeItem('sh_token'); } catch {}
}

export async function fetchWithAuth(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const headers = { ...(opts.headers as Record<string,string> || {}), 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export async function fetchStats() {
  return fetchWithAuth('/api/stats');
}

export async function fetchTelemetry() {
  return fetchWithAuth('/api/telemetry');
}

export async function fetchUsers() {
  return fetchWithAuth('/api/users');
}

export async function createUser(user: { fullName: string; email: string; password: string; role: string; status: string }) {
  return fetchWithAuth('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

export async function updateUser(id: number, data: { fullName?: string; password?: string; role?: string; status?: string }) {
  return fetchWithAuth(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: number) {
  return fetchWithAuth(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
