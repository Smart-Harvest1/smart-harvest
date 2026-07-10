import { useEffect, useState } from 'react';
import { fetchTelemetry, fetchWithAuth } from '../lib/api';

export default function TelemetryAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [sourceInput, setSourceInput] = useState('manual');
  const [knownKeys, setKnownKeys] = useState<string[]>([]);
  const [knownSources, setKnownSources] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchTelemetry();
      setItems(data);
      const keys = Array.from(new Set(data.map((it: any) => it.key))).filter(Boolean);
      const sources = Array.from(new Set(data.map((it: any) => it.source || 'manual'))).filter(Boolean);
      setKnownKeys(keys);
      setKnownSources(sources);
      if (!keyInput && keys.length) setKeyInput(keys[0]);
      if (!sourceInput && sources.length) setSourceInput(sources[0]);
    } catch (e: any) {
      setError(e?.message || 'Failed to load telemetry');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const body = { key: keyInput.trim(), value: parseValue(valueInput), source: sourceInput || 'manual' };
      await fetchWithAuth('/api/telemetry', { method: 'POST', body: JSON.stringify(body) });
      setKeyInput(''); setValueInput(''); setSourceInput('manual');
      await load();
    } catch (err: any) {
      setError(err?.message || JSON.stringify(err));
    }
  }

  function parseValue(v: string) {
    const t = v.trim();
    if (!t) return '';
    try { return JSON.parse(t); } catch { return t; }
  }

  async function handleDelete(id: number) {
    setError(null);
    try {
      await fetchWithAuth(`/api/telemetry/${id}`, { method: 'DELETE' });
      await load();
    } catch (err: any) {
      setError(err?.message || JSON.stringify(err));
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Telemetry Admin</h1>
          <p className="text-sm text-[#94a3b8]">Create and manage telemetry test entries</p>
        </div>
      </div>

      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          list="telemetry-keys"
          value={keyInput}
          onChange={e => setKeyInput(e.target.value)}
          placeholder={knownKeys.length ? `key (${knownKeys.join(', ')})` : 'key from DB'}
          className="p-3 rounded bg-[#0f1724] border border-white/10"
        />
        <datalist id="telemetry-keys">
          {knownKeys.map((key) => <option key={key} value={key} />)}
        </datalist>

        <input
          value={valueInput}
          onChange={e => setValueInput(e.target.value)}
          placeholder='value (raw or JSON, e.g. 42 or {"v":42})'
          className="p-3 rounded bg-[#0f1724] border border-white/10"
        />

        <input
          list="telemetry-sources"
          value={sourceInput}
          onChange={e => setSourceInput(e.target.value)}
          placeholder={knownSources.length ? `source (${knownSources.join(', ')})` : 'source from DB'}
          className="p-3 rounded bg-[#0f1724] border border-white/10"
        />
        <datalist id="telemetry-sources">
          {knownSources.map((source) => <option key={source} value={source} />)}
        </datalist>

        <div className="flex items-center">
          <button className="px-4 py-2 bg-green-600 rounded text-white" type="submit">Create</button>
        </div>
      </form>

      {error && <div className="text-red-400">{error}</div>}

      <div className="bg-[#0b1220] rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Telemetry</h2>
        {loading ? <div>Loading...</div> : (
          <div className="space-y-2">
            {items.length === 0 && <div className="text-sm text-[#94a3b8]">No telemetry yet</div>}
            {items.map(it => (
              <div key={it.id} className="flex items-center justify-between p-2 bg-[#08101a] rounded">
                <div>
                  <div className="text-sm text-[#94a3b8]">{it.key} • {new Date(it.createdAt).toLocaleString()}</div>
                  <div className="text-white">{typeof it.value === 'object' ? JSON.stringify(it.value) : String(it.value)}</div>
                </div>
                <div>
                  <button className="text-sm text-red-400" onClick={()=>handleDelete(it.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
