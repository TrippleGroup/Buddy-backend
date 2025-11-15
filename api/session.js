// api/session.js

export default async function handler(req, res) {
  try {
    const sessionResponse = await fetch("https://api.heygen.com/v1/realtime/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.HEYGEN_KEY
      }
    });

    const data = await sessionResponse.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not create HeyGen session" });
  }
}
