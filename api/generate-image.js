export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST ist erlaubt.' });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY fehlt in Vercel.' });
  }

  try {
    const { name, meta, appearance, clothing, personality } = req.body || {};
    const prompt = `Professional fantasy RPG character portrait for a tabletop game master.\n\nCharacter: ${name || 'Unnamed NPC'}\nBasic information: ${meta || ''}\nAppearance: ${appearance || ''}\nClothing: ${clothing || ''}\nPersonality impression: ${personality || ''}\n\nShow one single character, approximately knees-up or full-body if composition allows. Clothing must closely match the description. Neutral fantasy background appropriate to the character. No text, labels, UI, stat block, or watermark. Do not add extra weapons unless the description or role suggests them. High-quality fantasy character art suitable to show players at a tabletop RPG session.`;

    const apiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-image-2',
        prompt,
        size: '1024x1536',
        quality: 'medium'
      })
    });

    const data = await apiResponse.json();
    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: data?.error?.message || 'OpenAI-Bildgenerierung fehlgeschlagen.' });
    }

    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return res.status(502).json({ error: 'OpenAI hat kein Bild zurückgegeben.' });
    return res.status(200).json({ image: `data:image/png;base64,${b64}` });
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Unbekannter Serverfehler.' });
  }
}
