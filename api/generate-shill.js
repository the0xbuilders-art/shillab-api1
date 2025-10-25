// api/generate-shill.js

module.exports = async function handler(req, res) {
  // Povolíme len POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed. Use POST." });
    return;
  }

  try {
    // Prečítaj telo requestu
    let body = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", resolve);
    });

    const { brief, tone, includeHashtags } = JSON.parse(body || "{}");

    if (!brief) {
      res.status(400).json({ error: "Missing 'brief' in request body." });
      return;
    }

    // Toto je prompt pre AI
    const prompt = `
You are an assistant that writes crypto / token shill posts for social media.

Brief / context from user:
"${brief}"

Requested tone / style:
"${tone || "clean hype / bullish but not cringe"}"

Output rules:
- Write 1 short but high-energy post ready to publish (Twitter/X style).
- Be understandable. Feel human, not generic AI.
- If user said includeHashtags=true, add 3-6 relevant crypto/coin/CT hashtags at the end.
- Mention the project token/ticker if it makes sense.
- DO NOT add disclaimers like "not financial advice" unless it really fits the vibe.
    `;

    // Sem pôjde volanie na AI model.
    // Zatiaľ vrátime fake text, aby to fungovalo bez kľúča.
    const fakeText = `🚀 ${brief}\n\nWe’re building real utility. ${tone || ""} ${includeHashtags ? "#crypto #alpha #builders" : ""}`;

    // Odošleme odpoveď klientovi
    res.status(200).json({ text: fakeText.trim() });
  } catch (err) {
    console.error("ERROR in /api/generate-shill:", err);
    res.status(500).json({
      error: "Server error in generate-shill",
      details: err.message,
    });
  }
};
