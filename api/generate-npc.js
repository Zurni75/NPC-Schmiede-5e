export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Nur POST ist erlaubt.' });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY fehlt in Vercel.' });

  try {
    const { keywords, level, role, gender, recent = [] } = req.body || {};
    if (!keywords) return res.status(400).json({ error: 'Stichworte fehlen.' });

    const recentText = (Array.isArray(recent) ? recent.slice(0, 12) : []).map((x, i) =>
      `${i + 1}. Name: ${x?.name || '-'} | Eigenart: ${x?.quirk || '-'} | Geheimnis: ${x?.secret || '-'} | Sprechweise: ${x?.speech || '-'}`
    ).join('\n');

    const schema = {
      type: 'object', additionalProperties: false,
      properties: {
        name: { type: 'string' }, race: { type: 'string' }, profession: { type: 'string' }, age: { type: 'integer', minimum: 1, maximum: 1000 }, gender: { type: 'string' },
        appearance: { type: 'string' }, clothing: { type: 'string' }, personality: { type: 'string' }, motivation: { type: 'string' }, quirk: { type: 'string' },
        ideal: { type: 'string' }, bond: { type: 'string' }, flaw: { type: 'string' }, secret: { type: 'string' }, speech: { type: 'string' },
        skills: { type: 'array', minItems: 4, maxItems: 4, items: { type: 'string', enum: ['Athletik','Akrobatik','Fingerfertigkeit','Heimlichkeit','Arkane Kunde','Geschichte','Nachforschungen','Naturkunde','Religion','Tierführung','Menschenkenntnis','Heilkunde','Wahrnehmung','Überleben','Täuschung','Einschüchtern','Auftreten','Überreden','Handwerk'] } }
      },
      required: ['name','race','profession','age','gender','appearance','clothing','personality','motivation','quirk','ideal','bond','flaw','secret','speech','skills']
    };

    const instructions = `Du erzeugst abwechslungsreiche Fantasy-NSC für einen deutschsprachigen Tabletop-Spielleiter. Schreibe natürliches, konkretes Deutsch, nicht generisch und nicht pathetisch. Jeder NSC soll sofort spielbar wirken. Respektiere die Stichworte des Nutzers streng. Erfinde keine geschützten Eigennamen aus bekannten Fantasy-Welten. Vermeide Wiederholungen und nahe Umformulierungen der zuletzt erzeugten Eigenarten, Geheimnisse und Sprechweisen. Geheimnisse sollen spielrelevant, aber nicht automatisch weltbewegend sein. Sprechweise soll am Tisch darstellbar sein. Erscheinung und Kleidung sollen bildtauglich konkret sein. Wähle genau vier passende Skills aus der vorgegebenen Liste.`;

    const input = `Stichworte: ${keywords}\nLevel: ${level}\nNPC-Typ: ${role}\nGeschlecht: ${gender}\n\nZuletzt erzeugte Elemente, die NICHT wiederholt oder nur umformuliert werden sollen:\n${recentText || 'Keine.'}`;

    const apiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-5.6-luna',
        instructions,
        input,
        reasoning: { effort: 'none' },
        text: { verbosity: 'low', format: { type: 'json_schema', name: 'npc_profile', strict: true, schema } },
        max_output_tokens: 1400,
        store: false
      })
    });

    const data = await apiResponse.json();
    if (!apiResponse.ok) return res.status(apiResponse.status).json({ error: data?.error?.message || 'OpenAI-Textgenerierung fehlgeschlagen.' });

    const text = (data.output || []).flatMap(item => item.content || []).find(part => part.type === 'output_text')?.text;
    if (!text) return res.status(502).json({ error: 'OpenAI hat keinen Charaktertext zurückgegeben.' });
    return res.status(200).json(JSON.parse(text));
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Unbekannter Serverfehler.' });
  }
}
