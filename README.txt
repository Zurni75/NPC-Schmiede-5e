NPC-Schmiede v0.47

Neu in v0.47:
- Regelsystem-Auswahl: 5e, D20, D10, D6.
- Freies Feld „Setting / Welt / Epoche“ statt fester Setting-Liste.
- KI passt Namen, Berufe, Kleidung, Ausrüstung und Hintergrund an das eingegebene Setting an.
- Portrait-Prompt berücksichtigt Setting/Epoche ausdrücklich und vermeidet Fantasy-Standardkleidung außerhalb von Fantasy-Settings.
- 5e bleibt mit den bisherigen sechs Attributen und lokalen Berechnungen erhalten.
- D20 verwendet ein neutrales W20-Regelprofil.
- D10 und D6 verwenden neutrale Würfelpool-Profile; sie sind ausdrücklich keine Nachbauten eines bestimmten kommerziellen Regelwerks.
- Alte gespeicherte NSC ohne System-/Setting-Feld werden automatisch als 5e + Fantasy-Mittelalter geladen.
- Cloud-Sync via Upstash und Portrait-Sync via Google Drive bleiben unverändert.

Benötigte Vercel Environment Variables (unverändert):
- OPENAI_API_KEY
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- NPC_SYNC_SECRET
- GOOGLE_CLIENT_ID

Stabiler Rücksetzpunkt vor dieser Änderung: v0.46.1-stable.
