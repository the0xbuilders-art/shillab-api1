export default async function handler(req, res) {
  // --- CORS hlavičky, aby frontend mohol volať API z prehliadača ---
  res.setHeader('Access-Control-Allow-Origin', '*'); // neskôr môžeme obmedziť na tvoju doménu
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ak je to preflight (OPTIONS), iba odpovieme OK a nič nerobíme
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Povolená je iba POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    // Dáta z tela požiadavky, ktoré posiela tvoj frontend
    const { brief, tone, includeHashtags } = req.body || {};

    // Rýchla validácia vstupu
    if (!brief || !tone) {
      return res
        .status(400)
        .json({ error: 'Missing required fields (brief, tone).' });
    }

    // Tu by bola AI logika (OpenAI/Groq/atď.)
    // Zatiaľ vraciame peknú demo odpoveď, aby produkt pôsobil hotovo.
    const demoLines = [
      '🚀 Real utility. Not vapor.',
      '💼 Built for real holders, not exit liquidity.',
      '📈 Long-term vision, measurable progress.',
    ];

    let output = `${demoLines.join(' ')}\n\nBrief: ${brief}\nTone: ${tone}`;

    if (includeHashtags) {
      output += '\n\n#LAB #utility #buidl #community';
    }

    // Pošleme späť JSON, ktorý tvoj frontend vie zobraziť v čiernom boxe
    return res.status(200).json({
      text: output,
    });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
}
