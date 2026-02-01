export async function handleBot(token, update) {
  const API = `https://api.telegram.org/bot${token}`;

  async function send(chatId, text, keyboard) {
    await fetch(`${API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        reply_markup: keyboard
      })
    });
  }

  const text = update.message?.text;

  if (text === "/menu" || text === ".menu") {
    return send(update.message.chat.id, "Menu", {
      inline_keyboard: [
        [{ text: "Menu Grup", callback_data: "grup" }],
        [{ text: "Menu Belajar", callback_data: "belajar" }],
        [{ text: "Menu Game", callback_data: "game" }]
      ]
    });
  }

  if (update.callback_query) {
    const id = update.callback_query.message.chat.id;
    const d = update.callback_query.data;
    if (d === "grup") return send(id, "Menu Grup");
    if (d === "belajar") return send(id, "Menu Belajar");
    if (d === "game") return send(id, "Menu Game");
  }
}
