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

  // ===== FIXED: Helper untuk extract target user dari reply atau mention =====
  async function getTargetUser(message, chatId) {
    // Prioritas 1: Reply to message
    if (message.reply_to_message && message.reply_to_message.from) {
      return message.reply_to_message.from.id;
    }
    
    // Prioritas 2: Text mention (user tanpa username)
    if (message.entities) {
      const textMention = message.entities.find(e => e.type === "text_mention");
      if (textMention && textMention.user) {
        return textMention.user.id;
      }
      
      // Prioritas 3: @username mention
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

  // Safety check
  if (!update.message && !update.callback_query) return;

  const text = update.message?.text || update.message?.caption;
  const chatIdMsg = update.message?.chat?.id;

  // Simpan member untuk tagall
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
    return send(chatIdMsg, "*📌 MENU UTAMA - 100+ FITUR*", {
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
     REMINI (FIXED - Returns image directly)
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
      // API returns image directly, so pass URL to sendPhoto
      const apiUrl = `https://api.ryzumi.vip/api/ai/remini?url=${encodeURIComponent(imageUrl)}`;
      return sendPhoto(chatIdMsg, apiUrl, "✨ HD by Remini");
    } catch (e) {
      return send(chatIdMsg, `❌ Error: ${e.message || "Gagal proses gambar."}`);
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
    const t = ["Apa hal paling memalukan?", "Siapa crush kamu?", "Rahasia terbesarmu?", "Pernah bohong ke siapa?", "Ketakutan terbesarmu?", "Hal gila yang pernah dilakukan?"];
    return send(chatIdMsg, `🤔 *TRUTH:*\n${t[Math.floor(Math.random() * t.length)]}`);
  }
  if (text === ".dare") {
    const d = ["Kirim 'I love you' ke chat terakhir!", "Post story 'Aku jomblo siapa mau?'", "Voice note nyanyi!", "Ganti PP jadi kocak 1 jam", "Telpon random bilang kangen"];
    return send(chatIdMsg, `😈 *DARE:*\n${d[Math.floor(Math.random() * d.length)]}`);
  }
  if (text === ".tebakangka") return send(chatIdMsg, `🔢 Tebak 1-100!\n\n_Jawaban: ||${Math.floor(Math.random() * 100) + 1}||_`);
  if (text === ".tictactoe" || text === ".ttt") return send(chatIdMsg, "⬜⬜⬜\n⬜⬜⬜\n⬜⬜⬜\n\n_Fitur TicTacToe coming soon!_");

  /* =====================
     FUN COMMANDS
  ====================== */
  if (text === ".quote" || text === ".quotes") {
    const q = ["Hidup itu seperti bersepeda. - Einstein", "Jangan menunggu kesempatan, ciptakan. - Shaw", "Sukses adalah guru yang buruk. - Gates", "Jadilah perubahan yang ingin kamu lihat. - Gandhi", "Jangan takut gagal, takutlah tidak mencoba. - MJ"];
    return send(chatIdMsg, `💬 *Quote:*\n\n_"${q[Math.floor(Math.random() * q.length)]}"_`);
  }
  if (text === ".fakta" || text === ".fact") {
    const f = ["Jantung berdetak 100.000x/hari.", "Lumba-lumba tidur mata terbuka.", "Madu tidak pernah busuk.", "Gurita punya 3 jantung.", "Otak 73% air."];
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
    const p = ["Pergi ke pasar beli semangka,\nJangan lupa beli duren,\nKalau kamu memang suka,\nJangan malu bilang cinta.", "Buah mangga buah duku,\nDimakan enak rasanya,\nWalaupun kamu jauh dariku,\nKamu tetap di hatiku."];
    return send(chatIdMsg, `📜 *Pantun:*\n\n${p[Math.floor(Math.random() * p.length)]}`);
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
     DOWNLOAD (Placeholder)
  ====================== */
  if (text?.startsWith(".tiktok ") || text?.startsWith(".tt ")) return send(chatIdMsg, "🔄 Fitur TikTok coming soon...");
  if (text?.startsWith(".ig ") || text?.startsWith(".instagram ")) return send(chatIdMsg, "🔄 Fitur Instagram coming soon...");
  if (text?.startsWith(".yt ") || text?.startsWith(".youtube ")) return send(chatIdMsg, "🔄 Fitur YouTube coming soon...");

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
        [{ text: "⚠️ Kick/Ban", callback_data: "grup_kick" }],
        [{ text: "🔇 Mute/Unmute", callback_data: "grup_mute" }],
        [{ text: "👮 Promote/Demote", callback_data: "grup_promote" }],
        [{ text: "📢 Broadcast", callback_data: "grup_broadcast" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "back_main") {
    return send(chatId, "*📌 MENU UTAMA - 100+ FITUR*", {
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
