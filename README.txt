NPC-Schmiede v0.45

Neu in v0.45:
- Private Cloud-Synchronisierung der gespeicherten NSC zwischen Tablet und PC.
- Portraits werden ebenfalls synchronisiert (für die Cloud platzsparend komprimiert).
- Bestehende lokale NSC können beim ersten Verbinden in die Cloud übernommen werden.
- Cloud ist die gemeinsame Sammlung; lokale Daten bleiben zusätzlich als Sicherung erhalten.
- Löschen wirkt auf allen verbundenen Geräten.
- Die Verbindung ist mit einem persönlichen Synchronisierungs-Passwort geschützt.

Benötigte Vercel Environment Variables:
- OPENAI_API_KEY (bereits vorhanden)
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- NPC_SYNC_SECRET

UPSTASH_REDIS_REST_URL und UPSTASH_REDIS_REST_TOKEN stammen aus einer Upstash Redis Datenbank.
NPC_SYNC_SECRET ist ein selbst gewähltes privates Passwort. Es darf NICHT in GitHub eingetragen werden.

Wichtig:
- Redis-Zugangsdaten bleiben ausschließlich serverseitig in Vercel.
- Der Browser kennt nur das persönliche Synchronisierungs-Passwort.
- Die OpenAI-Generierung bleibt unverändert: Text nur bei "NPC generieren", Bild nur bei "Portrait generieren".
