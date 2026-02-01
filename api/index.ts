import { handleBot } from "../bot.js";
import { auth } from "../api.js";

export default async function handler(req, res) {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ ok: false, msg: "token required" });
  }

  if (!auth(req)) {
    return res.json({ ok: true, msg: "logout" });
  }

  // webhook telegram
  if (req.method === "POST") {
    await handleBot(token, req.body);
    return res.json({ ok: true });
  }

  // test connect
  res.json({ ok: true, msg: "API connected" });
}
