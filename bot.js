export async function handleBot(token, update) {
  const API = `https://api.telegram.org/bot${token}`;

  async function send(chatId, text, keyboard) {
    await fetch(`${API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        reply_markup: keyboard,
        parse_mode: "Markdown"
      })
    });
  }

  async function getMember(chatId, userId) {
    const r = await fetch(`${API}/getChatMember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, user_id: userId })
    });
    return r.json();
  }

  async function isAdmin(chatId, userId) {
    const m = await getMember(chatId, userId);
    return ["administrator", "creator"].includes(m?.result?.status);
  }

  async function kick(chatId, userId) {
    return fetch(`${API}/banChatMember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, user_id: userId })
    });
  }

  const text = update.message?.text;
  const chatIdMsg = update.message?.chat?.id;

  /* =====================
     COMMAND MENU
  ====================== */
  if (text === "/menu" || text === ".menu") {
    return send(chatIdMsg, "*📌 MENU UTAMA*", {
      inline_keyboard: [
        [{ text: "👥 Menu Grup", callback_data: "menu_grup" }],
        [{ text: "📚 Menu Belajar", callback_data: "menu_belajar" }],
        [{ text: "🎮 Menu Game", callback_data: "menu_game" }],
        [{ text: "ℹ️ Info Bot", callback_data: "menu_info" }]
      ]
    });
  }

  /* =====================
     COMMAND KICK
  ====================== */
  if (text?.startsWith(".kick") || text?.startsWith("/kick")) {
    const fromId = update.message.from.id;

    if (!(await isAdmin(chatIdMsg, fromId)))
      return send(chatIdMsg, "❌ Lu bukan admin.");

    const botId = (await fetch(`${API}/getMe`).then(r => r.json())).result.id;
    if (!(await isAdmin(chatIdMsg, botId)))
      return send(chatIdMsg, "❌ Bot belum admin.");

    let targetId = null;

    // reply
    if (update.message.reply_to_message) {
      targetId = update.message.reply_to_message.from.id;
    }

    // mention @user
    if (!targetId && update.message.entities) {
      const ent = update.message.entities.find(e => e.type === "mention");
      if (ent) {
        const username = text.slice(ent.offset + 1, ent.offset + ent.length);
        const r = await fetch(`${API}/getChatMember`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatIdMsg, user_id: `@${username}` })
        }).then(r => r.json());
        targetId = r?.result?.user?.id;
      }
    }

    if (!targetId)
      return send(chatIdMsg, "❌ Reply pesan atau `.kick @user`");

    await kick(chatIdMsg, targetId);
    return send(chatIdMsg, "✅ User berhasil di-kick.");
  }

  /* =====================
     CALLBACK MENU
  ====================== */
  if (!update.callback_query) return;

  const chatId = update.callback_query.message.chat.id;
  const d = update.callback_query.data;

  if (d === "menu_grup") {
    return send(chatId, "*👥 MENU GRUP*", {
      inline_keyboard: [
        [{ text: "📣 Tag All", callback_data: "grup_tagall" }],
        [{ text: "⚠️ Warn", callback_data: "grup_warn" }],
        [{ text: "❌ Kick", callback_data: "grup_kick" }],
        [{ text: "📌 Rules", callback_data: "grup_rules" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "grup_tagall")
    return send(chatId, "📣 *TAG ALL*\n(Admin only)");

  if (d === "grup_warn")
    return send(chatId, "⚠️ *WARN*\n`.warn @user alasan`");

  if (d === "grup_kick")
    return send(chatId, "❌ *KICK*\nReply pesan atau `.kick @user`");

  if (d === "grup_rules")
    return send(chatId, "📌 *RULES*\nNo spam\nNo toxic");

  if (d === "menu_belajar")
    return send(chatId, "*📚 MENU BELAJAR*", {
      inline_keyboard: [
        [{ text: "🌌 Kosmos", callback_data: "belajar_kosmos" }],
        [{ text: "🧠 Filsafat", callback_data: "belajar_filsafat" }],
        [{ text: "⚛️ Fisika", callback_data: "belajar_fisika" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });

  if (d === "menu_game")
    return send(chatId, "*🎮 MENU GAME*", {
      inline_keyboard: [
        [{ text: "🎲 Random", callback_data: "game_random" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });

  if (d === "game_random")
    return send(chatId, "🎲 Angka: " + Math.floor(Math.random() * 100));

  if (d === "menu_info")
    return send(chatId, "ℹ️ Bot aktif 24/7 via webhook.");

  if (d === "back_main")
    return send(chatId, "*📌 MENU UTAMA*", {
      inline_keyboard: [
        [{ text: "👥 Menu Grup", callback_data: "menu_grup" }],
        [{ text: "📚 Menu Belajar", callback_data: "menu_belajar" }],
        [{ text: "🎮 Menu Game", callback_data: "menu_game" }],
        [{ text: "ℹ️ Info Bot", callback_data: "menu_info" }]
      ]
    });
}
