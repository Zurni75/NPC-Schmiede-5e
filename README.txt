NPC-Schmiede v0.46

Neu in v0.46:
- NPC-Daten bleiben in Upstash synchronisiert.
- Portraits werden nicht mehr neu in Upstash gespeichert, sondern in Deinem Google Drive.
- PC und Tablet können dadurch dieselben Portraits laden.
- Alte v0.45-Portraits bleiben zunächst erhalten und gehen beim Update nicht verloren.
- Sobald ein alter NSC mit Portrait bei verbundenem Google Drive gespeichert wird, wird das Portrait nach Drive migriert und die alte Redis-Bildkopie entfernt.
- Google Drive wird nur bei Bedarf verbunden; die App verwendet den eingeschränkten Scope drive.file.

Benötigte Vercel Environment Variables:
- OPENAI_API_KEY
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- NPC_SYNC_SECRET
- GOOGLE_CLIENT_ID   <-- NEU in v0.46

GOOGLE_CLIENT_ID ist die OAuth-Client-ID aus Google Auth Platform > Clients > NPC-Schmiede.
Sie ist keine geheime Client-Secret-Zeichenfolge. Der Google Clientschlüssel wird NICHT benötigt.

Google Cloud:
- Google Drive API aktiviert
- OAuth-Webclient für https://npc-schmiede-5e.vercel.app
- Scope https://www.googleapis.com/auth/drive.file
- eigener Google-Account als Testnutzer, solange die App im Testmodus ist
