NPC-Schmiede v0.41

Neu:
- Kreative NPC-Texte werden über /api/generate-npc mit GPT-5.6 Luna erzeugt.
- Eigenart, Geheimnis und Sprechweise werden gegen die letzten 12 lokal erzeugten NPCs auf Wiederholungen geprüft.
- Regelwerte, Angriffe und Schaden werden weiterhin lokal berechnet.
- Portraitgenerierung bleibt separat und erfolgt nur per Klick.
- Kein automatischer API-Aufruf beim Laden der Seite.

Vercel:
OPENAI_API_KEY muss als Environment Variable gesetzt sein.


v0.43: Gespeicherte NSC auf eigener Ansicht, Bearbeiten/Aktualisieren, Portrait-Zuordnung via IndexedDB korrigiert.
