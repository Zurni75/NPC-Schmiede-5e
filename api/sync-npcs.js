const INDEX_KEY = 'npc-schmiede:index:v1';
const NPC_PREFIX = 'npc-schmiede:npc:v1:';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function configured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN && process.env.NPC_SYNC_SECRET);
}

function authorized(req) {
  const supplied = String(req.headers['x-npc-sync-secret'] || '');
  return supplied && supplied === String(process.env.NPC_SYNC_SECRET || '');
}

async function redis(command) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  });
  const data = await r.json();
  if (!r.ok || data.error) throw new Error(data.error || `Redis HTTP ${r.status}`);
  return data.result;
}

async function multi(commands) {
  const r = await fetch(`${process.env.UPSTASH_REDIS_REST_URL.replace(/\/$/, '')}/multi-exec`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commands)
  });
  const data = await r.json();
  if (!r.ok || data.error) throw new Error(data.error || `Redis HTTP ${r.status}`);
  const bad = Array.isArray(data) && data.find(x => x && x.error);
  if (bad) throw new Error(bad.error);
  return data;
}

async function getIndex() {
  const raw = await redis(['GET', INDEX_KEY]);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  if (!configured()) {
    return send(res, 503, { error: 'Cloud-Speicher ist noch nicht eingerichtet.' });
  }
  if (!authorized(req)) {
    return send(res, 401, { error: 'Falsches Synchronisierungs-Passwort.' });
  }

  try {
    if (req.method === 'GET') {
      const id = req.query?.id;
      if (id) {
        const raw = await redis(['GET', `${NPC_PREFIX}${id}`]);
        if (!raw) return send(res, 404, { error: 'NSC nicht gefunden.' });
        return send(res, 200, JSON.parse(raw));
      }
      const list = await getIndex();
      return send(res, 200, { npcs: list.sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0)) });
    }

    if (req.method === 'POST') {
      const npc = req.body?.npc;
      if (!npc || npc.id === undefined || npc.id === null) return send(res, 400, { error: 'Ungültiger NSC.' });
      const id = String(npc.id);
      const updatedAt = Date.now();
      const oldRaw = await redis(['GET', `${NPC_PREFIX}${id}`]);
      let oldRecord = {}; try { oldRecord = oldRaw ? JSON.parse(oldRaw) : {}; } catch {}
      const portraitDriveFileId = req.body?.portraitDriveFileId || oldRecord.portraitDriveFileId || null;
      const legacyPortrait = req.body?.clearLegacyPortrait ? null : (oldRecord.portrait || null);
      const record = { npc, portraitDriveFileId, portrait: legacyPortrait, updatedAt };
      const index = await getIndex();
      const meta = {
        id: npc.id,
        name: npc.name || 'Unbenannter NSC',
        meta: npc.meta || '',
        usedWhere: npc.usedWhere || '',
        updatedAt,
        hasPortrait: Boolean(portraitDriveFileId || legacyPortrait),
        portraitDriveFileId: portraitDriveFileId || null
      };
      const pos = index.findIndex(x => String(x.id) === id);
      if (pos >= 0) index[pos] = meta; else index.unshift(meta);
      await multi([
        ['SET', `${NPC_PREFIX}${id}`, JSON.stringify(record)],
        ['SET', INDEX_KEY, JSON.stringify(index)]
      ]);
      return send(res, 200, { ok: true, meta });
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id;
      if (!id) return send(res, 400, { error: 'NSC-ID fehlt.' });
      const index = await getIndex();
      const next = index.filter(x => String(x.id) !== String(id));
      await multi([
        ['DEL', `${NPC_PREFIX}${id}`],
        ['SET', INDEX_KEY, JSON.stringify(next)]
      ]);
      return send(res, 200, { ok: true });
    }

    return send(res, 405, { error: 'Methode nicht erlaubt.' });
  } catch (err) {
    console.error('NPC sync error', err);
    return send(res, 500, { error: 'Cloud-Speicherfehler: ' + (err?.message || 'Unbekannter Fehler') });
  }
}
