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


v0.48.9:
- Theme-Hintergründe auf 3840×2160 hochskaliert und leicht nachgeschärft.
- Layout und Funktionen unverändert gegenüber v0.48.7.


v0.48.9:
- Alle sechs Theme-Hintergründe liegen als 7680×4320 (8K) vor.
- Gespeicherte-NSC-Settingreiter zeigen jetzt kleine passende Hintergrundmotive.
- Layout und Funktionen ansonsten unverändert gegenüber v0.48.8.


v0.49.0:
- Theme-Hintergründe werden nicht mehr mit CSS `cover` beschnitten.
- Das komplette erzeugte 8K-Bild wird über den gesamten sichtbaren Monitor gelegt (100vw × 100vh).
- Dadurch ist immer das vollständige Motiv sichtbar; die Setting-Reiter mit Mini-Hintergründen bleiben erhalten.
- Sonstige Funktionen und Layout unverändert gegenüber v0.48.9.


v0.49.1:
- Fantasy-Hintergrund durch das vollständige neu erzeugte Motiv ersetzt.
- Neue Themes: Horror und Wilder Westen.
- Hintergrund proportional per cover statt verzerrt dargestellt.
- Bebilderte Setting-Schnellauswahl ergänzt.


v0.49.2:
- Die versehentlich oberhalb der App eingeblendete Setting-Schnellauswahl vollständig entfernt.
- Die kleinen bebilderten Reiter innerhalb von 'Gespeicherte NSC' bleiben erhalten.


v0.49.3:
- Fantasy-Mittelalter-Hintergrund korrigiert: schwarze Ränder aus der Bilddatei entfernt.
- Das Fantasy-Motiv füllt nun die komplette 16:9-Hintergrundfläche.
- Keine Schnellauswahl oben; gespeicherte NSC-Reiter bleiben unverändert.


v0.49.4:
- D10 als fest definiertes universelles NSC-Schmiede-Poolsystem überarbeitet.
- Attribute 1–5; Fertigkeiten 0–5; Probe = Attribut + Fertigkeit in W10.
- 8–9 = 1 Erfolg, 10 = 2 Erfolge.
- Initiative ist jetzt ein Zahlenwert statt eines fälschlichen W10-Pools.
- Beruf/Archetyp beeinflusst passende Kernattribute.
- Bestehende 5e- und OpenD6-Logik unverändert.


v0.49.5:
- Gespeicherte D10-NSC werden beim Öffnen automatisch auf D10-v2 neu berechnet.
- Alte Initiative-Werte wie 4W10 verschwinden.
- Nach Änderungen speichern wird der neue Stand dauerhaft gesichert.


v0.49.6:
- D10 auf 9 Attribute umgestellt: 3 körperlich, 3 sozial, 3 geistig.
- Abwehr als W10-Pool, Initiative als Zahl.
- Alte D10-NSC robuster erkannt und neu berechnet.
- Kampfbereich kompakt und sauber formatiert.


v0.49.7:
- D10-Attribute vollständig ausgeschrieben.
- Attributwerte werden als Würfelpools angezeigt: z.B. 3D10, 4D10, 5D10.
- Keine Abkürzungen STÄ/GES/WID/CHA/EIN/HAL/WAH/INT/WIL mehr.
- Speicherung/Anzeige für mehrteilige Attributnamen angepasst.


v0.49.8:
- Unterstützte Regelsysteme auf 5e und OpenD6 beschränkt.
- D10 aus der Auswahl entfernt.
- Setting/Welt/Epoche bleibt frei und unabhängig vom Regelsystem.
- Alte gespeicherte D10-NSC werden beim Öffnen auf OpenD6-Regelwerte migriert.
- Narrative Inhalte, Themes und übrige App-Struktur bleiben erhalten.


v0.50.0:
- Sichtbare Bezeichnung des D6-Regelsystems überall auf OpenD6 vereinheitlicht.
- Interner Schlüssel d6 bleibt aus Kompatibilitätsgründen bestehen.
- Alte gespeicherte D6-NSC werden sichtbar als OpenD6 dargestellt.
- World-of-Darkness-Theme entfernt.
- Horror-Theme bleibt erhalten.
- Western-Theme bleibt als eigenes Theme erhalten.
- Regelsystem-Auswahl bleibt auf 5e und OpenD6 beschränkt.


v0.50.1:
- In Gespeicherte NSC erscheint links neben jedem Namen eine runde Portrait-Miniatur.
- Die Miniatur nutzt einen engen, nach oben versetzten Ausschnitt, damit vor allem das Gesicht sichtbar ist.
- Ohne vorhandenes Portrait wird dezent der Anfangsbuchstabe des Namens angezeigt.
- Portrait-Miniaturen werden nachgeladen und gecacht, damit die Liste schnell aufgebaut wird.


v0.50.2:
- OpenD6-Attribute vollständig ausgeschrieben.
- Beruf/Rolle gewichten OpenD6-Werte und Fertigkeiten; körperliche Rollen wie Schläger erhalten deutlich passende Stärke-, Widerstands- und Nahkampfwerte.
- Alte OpenD6-NSC werden beim Öffnen mit der neuen Rollenlogik neu berechnet.
- OpenD6 wird sichtbar konsequent als OpenD6 bezeichnet.
- Portrait-Miniaturen greifen bei Cloud-NSC die vollständige Cloud-Aufzeichnung ab, um die Google-Drive-Datei-ID zuverlässig zu finden.
- Thumbnail-Laden verändert keine Portrait-Zuordnung und keinen Drive-Status.
- Beim Öffnen wird bei fehlgeschlagenem Drive-Laden zusätzlich das lokale Portrait versucht.
