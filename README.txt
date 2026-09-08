NPC-Schmiede v0.47.2

Neu in v0.47.2:
- Formatierungsfix für Ideal / Bindung / Makel, auch bei gespeicherten NSC.
- Alte Speicherstände werden beim Laden wieder in drei saubere Zeilenblöcke zerlegt.

Basis aus v0.47.1:
- Regelsystem-Auswahl vereinfacht auf 5e, D6 und D10; generisches D20 wurde entfernt.
- Freies Feld „Setting / Welt / Epoche“ bleibt erhalten.
- 5e behält die bisherigen sechs Attribute und lokalen Berechnungen.
- D6 ist nun ein OpenD6-basiertes Regelprofil mit sechs Grundattributen, Würfel+Pip-Werten (z. B. 3D+1), passenden Fertigkeiten und Wundstufen.
- D10 ist ein eigenes universelles NPC-Schmiede-Würfelpoolprofil mit sechs Attributen (1–5), Fertigkeiten (0–5), Attribut + Fertigkeit als W10-Pool und Erfolgen ab 7.
- Bei D6 und D10 heißt Level in der Oberfläche „Erfahrungsstufe“; 1–20 dient dort nur zur Kompetenz-Einordnung.
- Alte D20-NSC werden beim Öffnen auf 5e zurückgeführt.
- Cloud-Sync via Upstash und Portrait-Sync via Google Drive bleiben unverändert.

Benötigte Vercel Environment Variables (unverändert):
- OPENAI_API_KEY
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- NPC_SYNC_SECRET
- GOOGLE_CLIENT_ID

Stabiler Rücksetzpunkt vor dieser Änderung: v0.46.1-stable.

Hinweis für eine spätere kommerzielle Veröffentlichung: Das D6-Modul ist OpenD6-basiert. Lizenz-, Attribution- und Markenhinweise vor Veröffentlichung final prüfen und mitliefern.
