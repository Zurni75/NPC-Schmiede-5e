NSC-Schmiede v0.48.2

Vollständiger Design-Umbau auf Basis von v0.48 / v0.47.4.
- Feste Seitenleiste auf Desktop, kompakte Navigation auf Mobilgeräten
- Atmosphärischer Schmiede-Header
- Kompakte Generator-Leiste im Pergamentstil
- Großes Portrait links, Name/Werte prominent rechts
- Charakterinformationen als echte Pergament-Karten
- Eigene Aktionsleiste am unteren Rand des Charakterbogens
- Bestehende Generierungs-, Speicher-, Sync-, Waffen- und Regelmodul-Logik unverändert
- Responsive Darstellung für Desktop, Tablet und Smartphone

NSC-Schmiede v0.48

Optische Überarbeitung auf Basis von v0.47.4.
- Atmosphärischer Kopfbereich mit eigener Grafik
- Gold/dunkles Charakterbogen-Design
- Portrait stärker hervorgehoben
- Karten, Buttons, Werte und Formulare visuell überarbeitet
- Responsive Darstellung für Tablet/Smartphone
- Keine Änderung an Generierungs-, Speicher-, Sync- oder Waffenlogik

NSC-Schmiede v0.47.4

Neu in v0.47.4:
- Kontextabhängige Waffenwahl bei 5e: Setting, Volk/Körpergröße, Beruf und NPC-Rolle werden berücksichtigt.
- Gnome/Halblinge erhalten keine unplausibel großen Waffen; Speere nur bei passender Rolle.
- Zivilisten können unbewaffnet sein; eine Zweitwaffe ist nicht mehr zwingend.
- Portrait-Prompt erhält die tatsächlich gewählte Bewaffnung, damit Bild und Werte zusammenpassen.

Vorheriger Formatfix aus v0.47.2 bleibt enthalten:

- Formatierungsfix für Ideal / Bindung / Makel, auch bei gespeicherten NSC.
- Alte Speicherstände werden beim Laden wieder in drei saubere Zeilenblöcke zerlegt.

Basis aus v0.47.1:
- Regelsystem-Auswahl vereinfacht auf 5e, D6 und D10; generisches D20 wurde entfernt.
- Freies Feld „Setting / Welt / Epoche“ bleibt erhalten.
- 5e behält die bisherigen sechs Attribute und lokalen Berechnungen.
- D6 ist nun ein OpenD6-basiertes Regelprofil mit sechs Grundattributen, Würfel+Pip-Werten (z. B. 3D+1), passenden Fertigkeiten und Wundstufen.
- D10 ist ein eigenes universelles NSC-Schmiede-Würfelpoolprofil mit sechs Attributen (1–5), Fertigkeiten (0–5), Attribut + Fertigkeit als W10-Pool und Erfolgen ab 7.
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


Fix v0.47.4:
- „Neu generieren“ funktioniert jetzt auch bei geöffneten gespeicherten NSC.
- Ursprüngliche Generierungsparameter werden mitgespeichert und beim Öffnen wiederhergestellt.
- Bei älteren NSC ohne gespeicherte Stichworte werden Volk + Beruf aus den Metadaten als sinnvolle Fallback-Stichworte verwendet.


Neu in v0.48.2: Gespeicherte NSC werden automatisch nach Setting/Welt/Epoche in Reitern gruppiert. Reiter entstehen nur aus tatsächlich vorhandenen NSC und verschwinden automatisch, sobald nach einer Korrektur kein NSC mehr diesem Setting zugeordnet ist.
