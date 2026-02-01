const groupMembers = {};
const visitedGroups = {};

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

  async function sendPhoto(chatId, photo, caption) {
    await fetch(`${API}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, photo, caption, parse_mode: "Markdown" })
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

  async function unban(chatId, userId) {
    return fetch(`${API}/unbanChatMember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, user_id: userId, only_if_banned: true })
    });
  }

  async function mute(chatId, userId, until) {
    return fetch(`${API}/restrictChatMember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, user_id: userId, permissions: { can_send_messages: false }, until_date: until })
    });
  }

  async function unmute(chatId, userId) {
    return fetch(`${API}/restrictChatMember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, user_id: userId, permissions: { can_send_messages: true, can_send_media_messages: true, can_send_polls: true, can_send_other_messages: true, can_add_web_page_previews: true } })
    });
  }

  async function promote(chatId, userId) {
    return fetch(`${API}/promoteChatMember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, user_id: userId, can_change_info: true, can_delete_messages: true, can_invite_users: true, can_restrict_members: true, can_pin_messages: true, can_promote_members: false })
    });
  }

  async function demote(chatId, userId) {
    return fetch(`${API}/promoteChatMember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, user_id: userId, can_change_info: false, can_delete_messages: false, can_invite_users: false, can_restrict_members: false, can_pin_messages: false, can_promote_members: false })
    });
  }

  async function getFile(fileId) {
    const r = await fetch(`${API}/getFile?file_id=${fileId}`);
    return r.json();
  }

  async function getUserPhotos(userId) {
    const r = await fetch(`${API}/getUserProfilePhotos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, limit: 1 })
    });
    return r.json();
  }

  async function deleteMessage(chatId, messageId) {
    return fetch(`${API}/deleteMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, message_id: messageId })
    });
  }

  async function pinMessage(chatId, messageId) {
    return fetch(`${API}/pinChatMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, message_id: messageId })
    });
  }

  async function unpinMessage(chatId, messageId) {
    return fetch(`${API}/unpinChatMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, message_id: messageId })
    });
  }

  async function getTargetUser(message, chatId) {
    if (message.reply_to_message && message.reply_to_message.from) {
      return message.reply_to_message.from.id;
    }
    
    if (message.entities) {
      const textMention = message.entities.find(e => e.type === "text_mention");
      if (textMention && textMention.user) {
        return textMention.user.id;
      }
      
      const mention = message.entities.find(e => e.type === "mention");
      if (mention) {
        const text = message.text || message.caption || "";
        const username = text.slice(mention.offset + 1, mention.offset + mention.length);
        try {
          const members = groupMembers[chatId];
          if (members) {
            for (const uid in members) {
              if (members[uid].username?.toLowerCase() === username.toLowerCase()) {
                return parseInt(uid);
              }
            }
          }
        } catch (e) {
          console.error("Error finding user by username:", e);
        }
      }
    }
    
    return null;
  }

  if (!update.message && !update.callback_query) return;

  const text = update.message?.text || update.message?.caption;
  const chatIdMsg = update.message?.chat?.id;

  if (update.message?.from?.id && (update.message?.chat?.type === "group" || update.message?.chat?.type === "supergroup")) {
    if (!groupMembers[chatIdMsg]) groupMembers[chatIdMsg] = {};
    groupMembers[chatIdMsg][update.message.from.id] = { 
      username: update.message.from.username, 
      firstName: update.message.from.first_name 
    };
    visitedGroups[chatIdMsg] = { title: update.message.chat.title };
  }

  /* =====================
     COMMAND MENU
  ====================== */
  if (text === "/menu" || text === ".menu" || text === "/start" || text === ".help") {
    return send(chatIdMsg, "*📌 MENU UTAMA - 100+ FITUR*\n\n_Pilih menu di bawah ini:_", {
      inline_keyboard: [
        [{ text: "👥 Menu Grup", callback_data: "menu_grup" }],
        [{ text: "🛠️ Menu Tools", callback_data: "menu_tools" }],
        [{ text: "🤖 Menu AI", callback_data: "menu_ai" }],
        [{ text: "🎮 Menu Game", callback_data: "menu_game" }],
        [{ text: "🔮 Menu Fun", callback_data: "menu_fun" }],
        [{ text: "📥 Menu Download", callback_data: "menu_download" }],
        [{ text: "ℹ️ Info Bot", callback_data: "menu_info" }]
      ]
    });
  }

  /* =====================
     COMMAND KICK (FIXED)
  ====================== */
  if (text?.startsWith(".kick") || text?.startsWith("/kick")) {
    const fromId = update.message.from.id;

    if (!(await isAdmin(chatIdMsg, fromId)))
      return send(chatIdMsg, "❌ Lu bukan admin.");

    const botInfo = await fetch(`${API}/getMe`).then(r => r.json());
    const botId = botInfo?.result?.id;
    if (!(await isAdmin(chatIdMsg, botId)))
      return send(chatIdMsg, "❌ Bot belum admin.");

    const targetId = await getTargetUser(update.message, chatIdMsg);

    if (!targetId)
      return send(chatIdMsg, "❌ Reply pesan user atau `.kick @user`.");

    if (await isAdmin(chatIdMsg, targetId))
      return send(chatIdMsg, "❌ Ga bisa kick admin.");

    await kick(chatIdMsg, targetId);
    return send(chatIdMsg, "✅ User berhasil di-kick.");
  }

  /* =====================
     COMMAND TAGALL
  ====================== */
  if (text === ".tagall" || text === "/tagall") {
    const fromId = update.message.from.id;
    if (!(await isAdmin(chatIdMsg, fromId)))
      return send(chatIdMsg, "❌ Lu bukan admin.");

    const members = groupMembers[chatIdMsg];
    if (!members || Object.keys(members).length === 0)
      return send(chatIdMsg, "⚠️ Belum ada data. Suruh member chat dulu.");

    let msg = "📣 *TAG ALL*\n\n";
    for (const uid in members) {
      const m = members[uid];
      if (m.username) msg += `@${m.username} `;
      else msg += `[${m.firstName || "User"}](tg://user?id=${uid}) `;
    }
    return send(chatIdMsg, msg);
  }

  /* =====================
     GRUP COMMANDS (FIXED)
  ====================== */
  if (text?.startsWith(".ban") || text?.startsWith("/ban")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user atau tag @username.");
    if (await isAdmin(chatIdMsg, targetId)) return send(chatIdMsg, "❌ Ga bisa ban admin.");
    await kick(chatIdMsg, targetId);
    return send(chatIdMsg, "✅ Banned.");
  }

  if (text?.startsWith(".unban")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user atau tag @username.");
    await unban(chatIdMsg, targetId);
    return send(chatIdMsg, "✅ Unbanned.");
  }

  if (text?.startsWith(".mute")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user atau tag @username.");
    if (await isAdmin(chatIdMsg, targetId)) return send(chatIdMsg, "❌ Ga bisa mute admin.");
    await mute(chatIdMsg, targetId, Math.floor(Date.now() / 1000) + 3600);
    return send(chatIdMsg, "🔇 Muted 1 jam.");
  }

  if (text?.startsWith(".unmute")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user atau tag @username.");
    await unmute(chatIdMsg, targetId);
    return send(chatIdMsg, "🔊 Unmuted.");
  }

  if (text?.startsWith(".promote")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user atau tag @username.");
    await promote(chatIdMsg, targetId);
    return send(chatIdMsg, "👮 Promoted.");
  }

  if (text?.startsWith(".demote")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user atau tag @username.");
    await demote(chatIdMsg, targetId);
    return send(chatIdMsg, "📉 Demoted.");
  }

  /* =====================
     NEW: PIN/UNPIN/DELETE MESSAGE
  ====================== */
  if (text?.startsWith(".pin")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    if (!update.message.reply_to_message) return send(chatIdMsg, "❌ Reply pesan yang mau di-pin.");
    await pinMessage(chatIdMsg, update.message.reply_to_message.message_id);
    return send(chatIdMsg, "📌 Pesan berhasil di-pin.");
  }

  if (text?.startsWith(".unpin")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    if (!update.message.reply_to_message) return send(chatIdMsg, "❌ Reply pesan yang mau di-unpin.");
    await unpinMessage(chatIdMsg, update.message.reply_to_message.message_id);
    return send(chatIdMsg, "📌 Pesan berhasil di-unpin.");
  }

  if (text?.startsWith(".del") || text?.startsWith(".delete")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    if (!update.message.reply_to_message) return send(chatIdMsg, "❌ Reply pesan yang mau dihapus.");
    await deleteMessage(chatIdMsg, update.message.reply_to_message.message_id);
    await deleteMessage(chatIdMsg, update.message.message_id);
    return;
  }

  /* =====================
     NEW: WARN SYSTEM
  ====================== */
  const warns = {};
  if (text?.startsWith(".warn")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user atau tag @username.");
    if (await isAdmin(chatIdMsg, targetId)) return send(chatIdMsg, "❌ Ga bisa warn admin.");
    
    if (!warns[chatIdMsg]) warns[chatIdMsg] = {};
    if (!warns[chatIdMsg][targetId]) warns[chatIdMsg][targetId] = 0;
    warns[chatIdMsg][targetId]++;
    
    const warnCount = warns[chatIdMsg][targetId];
    if (warnCount >= 3) {
      await kick(chatIdMsg, targetId);
      return send(chatIdMsg, `⚠️ User sudah 3x warn, auto-kick!`);
    }
    return send(chatIdMsg, `⚠️ Warned! (${warnCount}/3)`);
  }

  /* =====================
     SHARELINK/BROADCAST (FIXED)
  ====================== */
  if (text?.startsWith(".sharelink") || text?.startsWith(".broadcast")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const msg = text.replace(/^\.(sharelink|broadcast)\s*/, "");
    if (!msg) return send(chatIdMsg, "❌ `.sharelink <pesan>`");
    
    const groups = Object.keys(visitedGroups);
    
    if (groups.length === 0) {
      return send(chatIdMsg, "⚠️ Belum ada grup tersimpan. Bot perlu aktif di grup-grup lain dulu.");
    }
    
    let count = 0;
    let failed = 0;
    for (const gid of groups) {
      if (gid === String(chatIdMsg)) continue;
      try { 
        await send(gid, `📢 *BROADCAST*\n\n${msg}`); 
        count++; 
      } catch (e) {
        failed++;
      }
    }
    return send(chatIdMsg, `✅ Terkirim ke ${count} grup.${failed > 0 ? `\n❌ Gagal: ${failed} grup.` : ""}\n\n_Total grup tersimpan: ${groups.length}_`);
  }

  /* =====================
     TOOLS COMMANDS
  ====================== */
  if (text?.startsWith(".enc ") || text?.startsWith(".encode ")) {
    const q = text.replace(/^\.(enc|encode)\s*/, "");
    return send(chatIdMsg, `🔐 *Encoded:*\n\`${Buffer.from(q).toString("base64")}\``);
  }

  if (text?.startsWith(".dec ") || text?.startsWith(".decode ")) {
    const q = text.replace(/^\.(dec|decode)\s*/, "");
    try { return send(chatIdMsg, `🔓 *Decoded:*\n\`${Buffer.from(q, "base64").toString("utf-8")}\``); }
    catch { return send(chatIdMsg, "❌ Gagal decode."); }
  }

  if (text === ".getpp" || text === ".pp" || text?.startsWith(".getpp") || text?.startsWith(".pp")) {
    let tid = update.message.from.id;
    if (update.message.reply_to_message) tid = update.message.reply_to_message.from.id;
    const photos = await getUserPhotos(tid);
    if (!photos.result?.photos?.length) return send(chatIdMsg, "❌ Tidak ada foto profil.");
    const fid = photos.result.photos[0][photos.result.photos[0].length - 1].file_id;
    const file = await getFile(fid);
    const url = `https://api.telegram.org/file/bot${token}/${file.result.file_path}`;
    return sendPhoto(chatIdMsg, url, "🖼️ Foto profil");
  }

  if (text?.startsWith(".calc ") || text?.startsWith(".hitung ")) {
    const q = text.replace(/^\.(calc|hitung)\s*/, "");
    try { return send(chatIdMsg, `🔢 *Hasil:* ${eval(q.replace(/[^0-9+\-*/().%]/g, ""))}`); }
    catch { return send(chatIdMsg, "❌ Error."); }
  }

  if (text === ".toimg" || text?.startsWith(".toimg")) {
    if (!update.message.reply_to_message?.sticker) return send(chatIdMsg, "❌ Reply sticker.");
    const sticker = update.message.reply_to_message.sticker;
    if (sticker.is_animated || sticker.is_video) return send(chatIdMsg, "❌ Sticker biasa aja.");
    const file = await getFile(sticker.file_id);
    const url = `https://api.telegram.org/file/bot${token}/${file.result.file_path}`;
    return sendPhoto(chatIdMsg, url, "🖼️ Sticker to Image");
  }

  /* =====================
     NEW: TRANSLATE
  ====================== */
  if (text?.startsWith(".tr ") || text?.startsWith(".translate ")) {
    const q = text.replace(/^\.(tr|translate)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.tr <teks>`");
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=auto|id`).then(r => r.json());
      return send(chatIdMsg, `🌐 *Translate:*\n${res.responseData?.translatedText || "Gagal translate"}`);
    } catch {
      return send(chatIdMsg, "❌ Gagal translate.");
    }
  }

  /* =====================
     NEW: CUACA/WEATHER
  ====================== */
  if (text?.startsWith(".cuaca ") || text?.startsWith(".weather ")) {
    const city = text.replace(/^\.(cuaca|weather)\s*/, "");
    if (!city) return send(chatIdMsg, "❌ `.cuaca <kota>`");
    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`).then(r => r.json());
      const current = res.current_condition[0];
      return send(chatIdMsg, `🌤️ *Cuaca ${city}*\n\n🌡️ Suhu: ${current.temp_C}°C\n💧 Kelembaban: ${current.humidity}%\n💨 Angin: ${current.windspeedKmph} km/h\n☁️ Kondisi: ${current.weatherDesc[0].value}`);
    } catch {
      return send(chatIdMsg, "❌ Gagal ambil data cuaca.");
    }
  }

  /* =====================
     AI COMMANDS (FIXED)
  ====================== */
  if (text?.startsWith(".ai ") || text?.startsWith(".gemini ")) {
    const q = text.replace(/^\.(ai|gemini)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.ai <pertanyaan>`");
    await send(chatIdMsg, "🔄 Mikir...");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const res = await fetch(`https://api.ryzumi.vip/api/ai/gemini?text=${encodeURIComponent(q)}`, {
        signal: controller.signal
      }).then(r => r.json());
      
      clearTimeout(timeoutId);
      
      if (res.success && res.result) {
        return send(chatIdMsg, `🤖 *Gemini AI*\n\n${res.result}`);
      } else if (res.result) {
        return send(chatIdMsg, `🤖 *Gemini AI*\n\n${res.result}`);
      } else {
        return send(chatIdMsg, `❌ API error: ${res.message || res.error || "Unknown error"}`);
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        return send(chatIdMsg, "❌ Timeout - API terlalu lama merespons.");
      }
      return send(chatIdMsg, `❌ Error: ${e.message || "Gagal konek ke API."}`);
    }
  }

  /* =====================
     NEW: GPT AI
  ====================== */
  if (text?.startsWith(".gpt ") || text?.startsWith(".chatgpt ")) {
    const q = text.replace(/^\.(gpt|chatgpt)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.gpt <pertanyaan>`");
    await send(chatIdMsg, "🔄 Mikir...");
    try {
      const res = await fetch(`https://api.ryzumi.vip/api/ai/gpt?text=${encodeURIComponent(q)}`).then(r => r.json());
      if (res.result) {
        return send(chatIdMsg, `🤖 *ChatGPT*\n\n${res.result}`);
      }
      return send(chatIdMsg, "❌ Gagal mendapat respons.");
    } catch {
      return send(chatIdMsg, "❌ Error koneksi ke API.");
    }
  }

  /* =====================
     REMINI (FIXED)
  ====================== */
  if (text?.startsWith(".remini") || text?.startsWith(".hd")) {
    let imageUrl = "";
    
    if (update.message.reply_to_message?.photo) {
      const photos = update.message.reply_to_message.photo;
      const fid = photos[photos.length - 1].file_id;
      const file = await getFile(fid);
      if (file.result?.file_path) {
        imageUrl = `https://api.telegram.org/file/bot${token}/${file.result.file_path}`;
      }
    } else {
      const q = text.replace(/^\.(remini|hd)\s*/, "");
      if (q && q.startsWith("http")) imageUrl = q;
    }
    
    if (!imageUrl) return send(chatIdMsg, "❌ Reply foto atau `.remini <link>`");
    
    await send(chatIdMsg, "🔄 Memproses HD...");
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      
      const res = await fetch(`https://api.ryzumi.vip/api/ai/remini?url=${encodeURIComponent(imageUrl)}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        return send(chatIdMsg, `❌ API Error: ${res.status}`);
      }
      
      const contentType = res.headers.get("content-type");
      
      if (contentType?.includes("application/json")) {
        const json = await res.json();
        if (json.result || json.url || json.data) {
          const resultUrl = json.result || json.url || json.data;
          return sendPhoto(chatIdMsg, resultUrl, "✨ HD by Remini");
        }
        return send(chatIdMsg, `❌ API Response: ${JSON.stringify(json)}`);
      } else if (contentType?.includes("image")) {
        return sendPhoto(chatIdMsg, `https://api.ryzumi.vip/api/ai/remini?url=${encodeURIComponent(imageUrl)}`, "✨ HD by Remini");
      } else {
        const text = await res.text();
        if (text.startsWith("http")) {
          return sendPhoto(chatIdMsg, text.trim(), "✨ HD by Remini");
        }
        return send(chatIdMsg, `❌ Response tidak valid: ${text.substring(0, 100)}`);
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        return send(chatIdMsg, "❌ Timeout - Proses terlalu lama.");
      }
      return send(chatIdMsg, `❌ Error: ${e.message}`);
    }
  }

  /* =====================
     GAME COMMANDS
  ====================== */
  if (text === ".dadu" || text === ".dice") return send(chatIdMsg, `🎲 Dadu: *${Math.floor(Math.random() * 6) + 1}*`);
  if (text === ".koin" || text === ".flip") return send(chatIdMsg, Math.random() > 0.5 ? "🪙 *KEPALA*" : "🪙 *EKOR*");
  if (text === ".kerang" || text === ".kerangajaib") {
    const a = ["Ya", "Tidak", "Mungkin", "Coba lagi", "Pasti!", "Tidak mungkin", "Bisa jadi", "Tentu saja"];
    return send(chatIdMsg, `🐚 *Kerang Ajaib:* ${a[Math.floor(Math.random() * a.length)]}`);
  }
  if (text === ".slot") {
    const s = ["🍎", "🍊", "🍋", "🍇", "🍒", "💎", "7️⃣"];
    const r1 = s[Math.floor(Math.random() * s.length)], r2 = s[Math.floor(Math.random() * s.length)], r3 = s[Math.floor(Math.random() * s.length)];
    return send(chatIdMsg, `🎰 [ ${r1} | ${r2} | ${r3} ]\n\n${r1 === r2 && r2 === r3 ? "🎉 *JACKPOT!*" : "😢 Coba lagi!"}`);
  }
  if (text === ".suit" || text === ".rps") {
    const c = ["🪨 Batu", "✂️ Gunting", "📄 Kertas"];
    return send(chatIdMsg, `Bot pilih: *${c[Math.floor(Math.random() * 3)]}*`);
  }
  if (text?.startsWith(".random") || text?.startsWith(".angka")) {
    const parts = text.split(" ");
    const min = parseInt(parts[1]) || 1, max = parseInt(parts[2]) || 100;
    return send(chatIdMsg, `🎲 Random (${min}-${max}): *${Math.floor(Math.random() * (max - min + 1)) + min}*`);
  }
  if (text === ".truth") {
    const t = ["Apa hal paling memalukan?", "Siapa crush kamu?", "Rahasia terbesarmu?", "Pernah bohong ke siapa?", "Ketakutan terbesarmu?", "Hal gila yang pernah dilakukan?", "Pernah suka sama teman sendiri?", "Apa yang kamu sembunyikan dari orang tua?"];
    return send(chatIdMsg, `🤔 *TRUTH:*\n${t[Math.floor(Math.random() * t.length)]}`);
  }
  if (text === ".dare") {
    const d = ["Kirim 'I love you' ke chat terakhir!", "Post story 'Aku jomblo siapa mau?'", "Voice note nyanyi!", "Ganti PP jadi kocak 1 jam", "Telpon random bilang kangen", "Screenshot chat terakhir!", "Kirim emoji 💕 ke 5 orang"];
    return send(chatIdMsg, `😈 *DARE:*\n${d[Math.floor(Math.random() * d.length)]}`);
  }
  if (text === ".tebakangka") return send(chatIdMsg, `🔢 Tebak 1-100!\n\n_Jawaban: ||${Math.floor(Math.random() * 100) + 1}||_`);
  if (text === ".tictactoe" || text === ".ttt") return send(chatIdMsg, "⬜⬜⬜\n⬜⬜⬜\n⬜⬜⬜\n\n_Fitur TicTacToe coming soon!_");
  
  /* =====================
     NEW: TEBAK KATA
  ====================== */
  if (text === ".tebakkata") {
    const words = ["JAVASCRIPT", "TELEGRAM", "INDONESIA", "KOMPUTER", "HANDPHONE", "INTERNET", "APLIKASI"];
    const word = words[Math.floor(Math.random() * words.length)];
    const hint = word[0] + "_".repeat(word.length - 2) + word[word.length - 1];
    return send(chatIdMsg, `🎯 *TEBAK KATA*\n\nHint: \`${hint}\`\n\n_Jawaban: ||${word}||_`);
  }

  /* =====================
     NEW: MATH QUIZ
  ====================== */
  if (text === ".math" || text === ".matematika") {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    const ops = ["+", "-", "*"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const answer = eval(`${a} ${op} ${b}`);
    return send(chatIdMsg, `🧮 *MATH QUIZ*\n\nBerapa ${a} ${op} ${b} = ?\n\n_Jawaban: ||${answer}||_`);
  }

  /* =====================
     FUN COMMANDS
  ====================== */
  if (text === ".quote" || text === ".quotes") {
    const q = ["Hidup itu seperti bersepeda. - Einstein", "Jangan menunggu kesempatan, ciptakan. - Shaw", "Sukses adalah guru yang buruk. - Gates", "Jadilah perubahan yang ingin kamu lihat. - Gandhi", "Jangan takut gagal, takutlah tidak mencoba. - MJ", "Kesuksesan adalah hasil dari persiapan. - Seneca", "Waktu adalah aset paling berharga. - Carnegie"];
    return send(chatIdMsg, `💬 *Quote:*\n\n_"${q[Math.floor(Math.random() * q.length)]}"_`);
  }
  if (text === ".fakta" || text === ".fact") {
    const f = ["Jantung berdetak 100.000x/hari.", "Lumba-lumba tidur mata terbuka.", "Madu tidak pernah busuk.", "Gurita punya 3 jantung.", "Otak 73% air.", "Kucing tidur 70% hidupnya.", "Pisang mengandung radiasi.", "Lidah adalah otot terkuat."];
    return send(chatIdMsg, `📖 *Fakta:*\n${f[Math.floor(Math.random() * f.length)]}`);
  }
  if (text?.startsWith(".rate ")) {
    const q = text.replace(".rate ", "");
    return send(chatIdMsg, `⭐ *Rating ${q}:* ${Math.floor(Math.random() * 101)}/100`);
  }
  if (text === ".ship") return send(chatIdMsg, `💕 *Love Meter:* ${Math.floor(Math.random() * 101)}%`);
  if (text === ".ganteng" || text === ".cantik") {
    const t = update.message.reply_to_message?.from?.first_name || update.message.from.first_name;
    return send(chatIdMsg, `✨ *${text === ".ganteng" ? "Ganteng" : "Cantik"} Meter*\n${t}: ${Math.floor(Math.random() * 101)}%`);
  }
  if (text?.startsWith(".zodiak ")) {
    const z = { aries: "♈ Pemberani", taurus: "♉ Setia", gemini: "♊ Cerdas", cancer: "♋ Perhatian", leo: "♌ Percaya diri", virgo: "♍ Analitis", libra: "♎ Diplomatis", scorpio: "♏ Passionate", sagitarius: "♐ Optimis", capricorn: "♑ Ambisius", aquarius: "♒ Progresif", pisces: "♓ Intuitif" };
    const q = text.replace(".zodiak ", "").toLowerCase();
    return send(chatIdMsg, z[q] || "❌ Zodiak tidak ditemukan.");
  }
  if (text === ".pantun") {
    const p = ["Pergi ke pasar beli semangka,\nJangan lupa beli duren,\nKalau kamu memang suka,\nJangan malu bilang cinta.", "Buah mangga buah duku,\nDimakan enak rasanya,\nWalaupun kamu jauh dariku,\nKamu tetap di hatiku.", "Jalan-jalan ke Surabaya,\nJangan lupa beli oleh-oleh,\nWalaupun hidup penuh lara,\nTetap semangat jangan menyerah."];
    return send(chatIdMsg, `📜 *Pantun:*\n\n${p[Math.floor(Math.random() * p.length)]}`);
  }

  /* =====================
     NEW: MEME
  ====================== */
  if (text === ".meme") {
    try {
      const res = await fetch("https://meme-api.com/gimme").then(r => r.json());
      if (res.url) {
        return sendPhoto(chatIdMsg, res.url, `😂 ${res.title || "Random Meme"}`);
      }
      return send(chatIdMsg, "❌ Gagal ambil meme.");
    } catch {
      return send(chatIdMsg, "❌ Error koneksi.");
    }
  }

  /* =====================
     NEW: STICKER TEXT
  ====================== */
  if (text?.startsWith(".stext ")) {
    const q = text.replace(".stext ", "");
    if (!q) return send(chatIdMsg, "❌ `.stext <teks>`");
    return send(chatIdMsg, `✨ *${q}* ✨\n\n_Fitur sticker text coming soon!_`);
  }

  /* =====================
     INFO COMMANDS
  ====================== */
  if (text === ".info" || text === ".me") {
    const t = update.message.reply_to_message?.from || update.message.from;
    return send(chatIdMsg, `👤 *Info User*\n\n📛 Nama: ${t.first_name} ${t.last_name || ""}\n📝 Username: @${t.username || "-"}\n🆔 ID: \`${t.id}\``);
  }
  if (text === ".ping") return send(chatIdMsg, "🏓 Pong!");
  if (text === ".runtime" || text === ".uptime") {
    const u = process.uptime();
    return send(chatIdMsg, `⏱️ *Uptime:* ${Math.floor(u / 3600)}j ${Math.floor((u % 3600) / 60)}m ${Math.floor(u % 60)}s`);
  }
  
  /* =====================
     NEW: GROUP INFO
  ====================== */
  if (text === ".groupinfo" || text === ".gc") {
    const chat = update.message.chat;
    const memberCount = Object.keys(groupMembers[chatIdMsg] || {}).length;
    return send(chatIdMsg, `👥 *Info Grup*\n\n📛 Nama: ${chat.title || "-"}\n🆔 ID: \`${chat.id}\`\n👤 Members (aktif): ${memberCount}\n📝 Type: ${chat.type}`);
  }

  /* =====================
     DOWNLOAD (Placeholder)
  ====================== */
  if (text?.startsWith(".tiktok ") || text?.startsWith(".tt ")) return send(chatIdMsg, "🔄 Fitur TikTok coming soon...");
  if (text?.startsWith(".ig ") || text?.startsWith(".instagram ")) return send(chatIdMsg, "🔄 Fitur Instagram coming soon...");
  if (text?.startsWith(".yt ") || text?.startsWith(".youtube ")) return send(chatIdMsg, "🔄 Fitur YouTube coming soon...");
  if (text?.startsWith(".spotify ")) return send(chatIdMsg, "🔄 Fitur Spotify coming soon...");
  if (text?.startsWith(".pinterest ")) return send(chatIdMsg, "🔄 Fitur Pinterest coming soon...");

  /* =====================
     CALLBACK MENU (FIXED - SEMUA MENU)
  ====================== */
  if (!update.callback_query) return;

  const chatId = update.callback_query.message.chat.id;
  const msgId = update.callback_query.message.message_id;
  const d = update.callback_query.data;

  // Answer callback to remove loading
  await fetch(`${API}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: update.callback_query.id })
  });

  if (d === "menu_grup") {
    return send(chatId, "*👥 MENU GRUP*\n\n_Kelola grup dengan mudah:_", {
      inline_keyboard: [
        [{ text: "📣 Tag All", callback_data: "help_tagall" }, { text: "⚠️ Kick/Ban", callback_data: "help_kick" }],
        [{ text: "🔇 Mute/Unmute", callback_data: "help_mute" }, { text: "👮 Promote/Demote", callback_data: "help_promote" }],
        [{ text: "📌 Pin/Unpin", callback_data: "help_pin" }, { text: "🗑️ Delete", callback_data: "help_delete" }],
        [{ text: "⚠️ Warn", callback_data: "help_warn" }, { text: "📢 Broadcast", callback_data: "help_broadcast" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_tools") {
    return send(chatId, "*🛠️ MENU TOOLS*\n\n_Tools berguna:_", {
      inline_keyboard: [
        [{ text: "🔐 Encode/Decode", callback_data: "help_encode" }],
        [{ text: "🖼️ Get PP", callback_data: "help_getpp" }],
        [{ text: "🧮 Calculator", callback_data: "help_calc" }],
        [{ text: "🎨 Sticker to Image", callback_data: "help_toimg" }],
        [{ text: "🌐 Translate", callback_data: "help_translate" }],
        [{ text: "🌤️ Cuaca", callback_data: "help_cuaca" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_ai") {
    return send(chatId, "*🤖 MENU AI*\n\n_AI Powered Features:_", {
      inline_keyboard: [
        [{ text: "🤖 Gemini AI", callback_data: "help_gemini" }],
        [{ text: "💬 ChatGPT", callback_data: "help_gpt" }],
        [{ text: "✨ Remini HD", callback_data: "help_remini" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_game") {
    return send(chatId, "*🎮 MENU GAME*\n\n_Games seru:_", {
      inline_keyboard: [
        [{ text: "🎲 Dadu", callback_data: "help_dadu" }, { text: "🪙 Flip Coin", callback_data: "help_flip" }],
        [{ text: "🐚 Kerang Ajaib", callback_data: "help_kerang" }, { text: "🎰 Slot", callback_data: "help_slot" }],
        [{ text: "✊ Suit", callback_data: "help_suit" }, { text: "🔢 Random", callback_data: "help_random" }],
        [{ text: "🤔 Truth", callback_data: "help_truth" }, { text: "😈 Dare", callback_data: "help_dare" }],
        [{ text: "🎯 Tebak Kata", callback_data: "help_tebakkata" }, { text: "🧮 Math Quiz", callback_data: "help_math" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_fun") {
    return send(chatId, "*🔮 MENU FUN*\n\n_Fitur hiburan:_", {
      inline_keyboard: [
        [{ text: "💬 Quote", callback_data: "help_quote" }, { text: "📖 Fakta", callback_data: "help_fakta" }],
        [{ text: "⭐ Rate", callback_data: "help_rate" }, { text: "💕 Ship", callback_data: "help_ship" }],
        [{ text: "✨ Ganteng/Cantik", callback_data: "help_ganteng" }, { text: "♈ Zodiak", callback_data: "help_zodiak" }],
        [{ text: "📜 Pantun", callback_data: "help_pantun" }, { text: "😂 Meme", callback_data: "help_meme" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_download") {
    return send(chatId, "*📥 MENU DOWNLOAD*\n\n_Download media:_", {
      inline_keyboard: [
        [{ text: "🎵 TikTok", callback_data: "help_tiktok" }],
        [{ text: "📸 Instagram", callback_data: "help_ig" }],
        [{ text: "🎬 YouTube", callback_data: "help_yt" }],
        [{ text: "🎧 Spotify", callback_data: "help_spotify" }],
        [{ text: "📌 Pinterest", callback_data: "help_pinterest" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_info") {
    return send(chatId, "*ℹ️ INFO BOT*\n\n🤖 *Telegram Bot Multi-Fitur*\n\n📦 Version: 2.0\n👨‍💻 Features: 100+\n⚡ Status: Online\n\n_Commands:_\n`.info` - Info user\n`.ping` - Check bot\n`.runtime` - Uptime\n`.groupinfo` - Info grup", {
      inline_keyboard: [
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  // HELP CALLBACKS
  if (d === "help_tagall") return send(chatId, "*📣 TAG ALL*\n\nCommand: `.tagall`\n\nTag semua member yang pernah chat di grup.\n\n⚠️ Hanya admin.");
  if (d === "help_kick") return send(chatId, "*⚠️ KICK/BAN*\n\nCommand:\n`.kick` - Kick user\n`.ban` - Ban user\n`.unban` - Unban user\n\n_Reply pesan atau tag @user_");
  if (d === "help_mute") return send(chatId, "*🔇 MUTE/UNMUTE*\n\nCommand:\n`.mute` - Mute 1 jam\n`.unmute` - Unmute user\n\n_Reply pesan user_");
  if (d === "help_promote") return send(chatId, "*👮 PROMOTE/DEMOTE*\n\nCommand:\n`.promote` - Jadikan admin\n`.demote` - Hapus admin\n\n_Reply pesan user_");
  if (d === "help_pin") return send(chatId, "*📌 PIN/UNPIN*\n\nCommand:\n`.pin` - Pin pesan\n`.unpin` - Unpin pesan\n\n_Reply pesan yang mau di-pin_");
  if (d === "help_delete") return send(chatId, "*🗑️ DELETE*\n\nCommand: `.del` atau `.delete`\n\nHapus pesan.\n\n_Reply pesan yang mau dihapus_");
  if (d === "help_warn") return send(chatId, "*⚠️ WARN*\n\nCommand: `.warn`\n\nWarn user (3x = auto kick)\n\n_Reply pesan user_");
  if (d === "help_broadcast") return send(chatId, "*📢 BROADCAST*\n\nCommand: `.broadcast <pesan>`\n\nKirim pesan ke semua grup.\n\n⚠️ Hanya admin.");
  if (d === "help_encode") return send(chatId, "*🔐 ENCODE/DECODE*\n\nCommand:\n`.enc <teks>` - Encode Base64\n`.dec <teks>` - Decode Base64");
  if (d === "help_getpp") return send(chatId, "*🖼️ GET PP*\n\nCommand: `.getpp` atau `.pp`\n\nAmbil foto profil.\n\n_Reply pesan user atau tanpa reply untuk PP sendiri_");
  if (d === "help_calc") return send(chatId, "*🧮 CALCULATOR*\n\nCommand: `.calc <expr>`\n\nContoh: `.calc 10+5*2`");
  if (d === "help_toimg") return send(chatId, "*🎨 STICKER TO IMAGE*\n\nCommand: `.toimg`\n\n_Reply sticker biasa (non-animated)_");
  if (d === "help_translate") return send(chatId, "*🌐 TRANSLATE*\n\nCommand: `.tr <teks>`\n\nTranslate ke Bahasa Indonesia.");
  if (d === "help_cuaca") return send(chatId, "*🌤️ CUACA*\n\nCommand: `.cuaca <kota>`\n\nCek cuaca kota tertentu.");
  if (d === "help_gemini") return send(chatId, "*🤖 GEMINI AI*\n\nCommand: `.ai <pertanyaan>`\n\nTanya apa saja ke Gemini AI.");
  if (d === "help_gpt") return send(chatId, "*💬 CHATGPT*\n\nCommand: `.gpt <pertanyaan>`\n\nTanya apa saja ke ChatGPT.");
  if (d === "help_remini") return send(chatId, "*✨ REMINI HD*\n\nCommand: `.remini` atau `.hd`\n\nUpgrade foto jadi HD.\n\n_Reply foto atau kirim link_");
  if (d === "help_dadu") return send(chatId, "*🎲 DADU*\n\nCommand: `.dadu` atau `.dice`\n\nLempar dadu 1-6.");
  if (d === "help_flip") return send(chatId, "*🪙 FLIP COIN*\n\nCommand: `.koin` atau `.flip`\n\nLempar koin (kepala/ekor).");
  if (d === "help_kerang") return send(chatId, "*🐚 KERANG AJAIB*\n\nCommand: `.kerang`\n\nTanya kerang ajaib!");
  if (d === "help_slot") return send(chatId, "*🎰 SLOT*\n\nCommand: `.slot`\n\nMain slot machine!");
  if (d === "help_suit") return send(chatId, "*✊ SUIT*\n\nCommand: `.suit` atau `.rps`\n\nMain batu gunting kertas.");
  if (d === "help_random") return send(chatId, "*🔢 RANDOM*\n\nCommand: `.random <min> <max>`\n\nAngka random antara min-max.");
  if (d === "help_truth") return send(chatId, "*🤔 TRUTH*\n\nCommand: `.truth`\n\nDapat pertanyaan truth!");
  if (d === "help_dare") return send(chatId, "*😈 DARE*\n\nCommand: `.dare`\n\nDapat tantangan dare!");
  if (d === "help_tebakkata") return send(chatId, "*🎯 TEBAK KATA*\n\nCommand: `.tebakkata`\n\nGame tebak kata dengan hint.");
  if (d === "help_math") return send(chatId, "*🧮 MATH QUIZ*\n\nCommand: `.math`\n\nQuiz matematika.");
  if (d === "help_quote") return send(chatId, "*💬 QUOTE*\n\nCommand: `.quote`\n\nDapat quote motivasi.");
  if (d === "help_fakta") return send(chatId, "*📖 FAKTA*\n\nCommand: `.fakta`\n\nDapat fakta unik.");
  if (d === "help_rate") return send(chatId, "*⭐ RATE*\n\nCommand: `.rate <sesuatu>`\n\nRating 0-100.");
  if (d === "help_ship") return send(chatId, "*💕 SHIP*\n\nCommand: `.ship`\n\nLove meter 0-100%.");
  if (d === "help_ganteng") return send(chatId, "*✨ GANTENG/CANTIK*\n\nCommand: `.ganteng` atau `.cantik`\n\nMeter 0-100%.\n\n_Reply pesan user_");
  if (d === "help_zodiak") return send(chatId, "*♈ ZODIAK*\n\nCommand: `.zodiak <zodiak>`\n\nInfo zodiak.");
  if (d === "help_pantun") return send(chatId, "*📜 PANTUN*\n\nCommand: `.pantun`\n\nDapat pantun random.");
  if (d === "help_meme") return send(chatId, "*😂 MEME*\n\nCommand: `.meme`\n\nDapat meme random.");
  if (d === "help_tiktok") return send(chatId, "*🎵 TIKTOK*\n\nCommand: `.tiktok <url>`\n\nDownload video TikTok.\n\n⚠️ Coming soon!");
  if (d === "help_ig") return send(chatId, "*📸 INSTAGRAM*\n\nCommand: `.ig <url>`\n\nDownload media IG.\n\n⚠️ Coming soon!");
  if (d === "help_yt") return send(chatId, "*🎬 YOUTUBE*\n\nCommand: `.yt <url>`\n\nDownload YouTube.\n\n⚠️ Coming soon!");
  if (d === "help_spotify") return send(chatId, "*🎧 SPOTIFY*\n\nCommand: `.spotify <url>`\n\nDownload Spotify.\n\n⚠️ Coming soon!");
  if (d === "help_pinterest") return send(chatId, "*📌 PINTEREST*\n\nCommand: `.pinterest <url>`\n\nDownload Pinterest.\n\n⚠️ Coming soon!");

  if (d === "back_main") {
    return send(chatId, "*📌 MENU UTAMA - 100+ FITUR*\n\n_Pilih menu di bawah ini:_", {
      inline_keyboard: [
        [{ text: "👥 Menu Grup", callback_data: "menu_grup" }],
        [{ text: "🛠️ Menu Tools", callback_data: "menu_tools" }],
        [{ text: "🤖 Menu AI", callback_data: "menu_ai" }],
        [{ text: "🎮 Menu Game", callback_data: "menu_game" }],
        [{ text: "🔮 Menu Fun", callback_data: "menu_fun" }],
        [{ text: "📥 Menu Download", callback_data: "menu_download" }],
        [{ text: "ℹ️ Info Bot", callback_data: "menu_info" }]
      ]
    });
  }
}
