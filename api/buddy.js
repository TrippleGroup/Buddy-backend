// api/buddy.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { userMessage } = req.body;
    if (!userMessage) {
      return res.status(400).json({ error: "Missing userMessage" });
    }

    // 1. Send user’s message to OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: process.env.BUDDY_SYSTEM_PROMPT },
          { role: "user", content: userMessage }
        ]
      })
    });

    const aiResult = await openaiResponse.json();
    const aiText = aiResult.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    // 2. Send AI text to HeyGen for avatar output
    const heygenResponse = await fetch("https://api.heygen.com/v1/realtime/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.HEYGEN_KEY
      },
      body: JSON.stringify({
        text: aiText,
        avatar_id: process.env.AVATAR_ID
      })
    });

    const heygenData = await heygenResponse.json();

    // 3. Return message + avatar stream URL to frontend
    return res.status(200).json({
      responseText: aiText,
      avatar: heygenData
    });

  } catch (err) {
    console.error("Buddy API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
