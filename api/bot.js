export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Parse body aman
  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const userMsg = body?.query?.message || "tidak ada pesan";

  try {
    // panggil AI API
    const aiResp = await fetch("https://aichat.sabae.cc/api/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "kamu auto reply AI yang santai" },
          { role: "user", content: userMsg }
        ]
      })
    });

    const aiData = await aiResp.text();

    res.status(200).json({
      replies: [{ message: aiData }]
    });

  } catch (e) {
    res.status(500).json({ replies: [{ message: "Error: " + e.message }] });
  }
}
