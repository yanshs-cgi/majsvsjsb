
import { type Express } from "express";

// In-memory storage for group members (for tagall)
const groupMembers = new Map<number, Set<number>>();

// Simple cache for game states or other data
const gameStates = new Map<number, any>();

export async function handleBot(token: string, update: any) {
  const API = `https://api.telegram.org/bot${token}`;

  // Helper function to send messages
  async function send(chatId: number | string, text: string, options: any = {}) {
    try {
      const body: any = {
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        ...options
      };
      
      const res = await fetch(`${API}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      return await res.json();
    } catch (e) {
      console.error("Send Error:", e);
    }
  }

  // Helper to reply
  async function reply(text: string, options: any = {}) {
    if (!update.message) return;
    return send(update.message.chat.id, text, {
      reply_to_message_id: update.message.message_id,
      ...options
    });
  }

  // Helper to get chat member
  async function getMember(chatId: number | string, userId: number | string) {
    try {
      const res = await fetch(`${API}/getChatMember`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, user_id: userId })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  // Helper to check admin status
  async function isAdmin(chatId: number | string, userId: number | string) {
    const m = await getMember(chatId, userId);
    return m && m.result && ["administrator", "creator"].includes(m.result.status);
  }

  // Helper for kick
  async function kickUser(chatId: number | string, userId: number | string) {
    try {
      const res = await fetch(`${API}/banChatMember`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, user_id: userId })
      });
      return await res.json();
    } catch (e) {
      return { ok: false };
    }
  }

  // Helper for promote
  async function promoteUser(chatId: number | string, userId: number | string) {
    try {
        const res = await fetch(`${API}/promoteChatMember`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                user_id: userId,
                can_manage_chat: true,
                can_delete_messages: true,
                can_invite_users: true,
                can_restrict_members: true,
                can_pin_messages: true,
                can_promote_members: false
            })
        });
        return await res.json();
    } catch (e) {
        return { ok: false };
    }
  }

  // Helper to get profile photo
  async function getUserProfilePhotos(userId: number | string) {
      try {
          const res = await fetch(`${API}/getUserProfilePhotos`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user_id: userId, limit: 1 })
          });
          return await res.json();
      } catch (e) {
          return { ok: false };
      }
  }

  async function getFile(fileId: string) {
      try {
          const res = await fetch(`${API}/getFile`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ file_id: fileId })
          });
          return await res.json();
      } catch (e) {
          return { ok: false };
      }
  }

  async function sendPhoto(chatId: number | string, photoUrl: string, caption: string = "") {
      try {
          await fetch(`${API}/sendPhoto`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  chat_id: chatId,
                  photo: photoUrl,
                  caption: caption,
                  parse_mode: "Markdown"
              })
          });
      } catch (e) {
          console.error("SendPhoto Error:", e);
      }
  }


  // --- Logic Processing ---
  
  const message = update.message;
  const callbackQuery = update.callback_query;

  // Handle Callback Queries (Menu Clicks)
  if (callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    
    // Answer callback to stop loading animation
    fetch(`${API}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: callbackQuery.id })
    });

    if (data === "menu_grup") {
      return send(chatId, "*👥 MENU GRUP*", {
        inline_keyboard: [
          [{ text: "📣 Tag All", callback_data: "grup_tagall" }, { text: "🔗 Share Link", callback_data: "grup_sharelink" }],
          [{ text: "⚠️ Warn", callback_data: "grup_warn" }, { text: "❌ Kick", callback_data: "grup_kick" }],
          [{ text: "👑 Promote", callback_data: "grup_promote" }, { text: "🖼️ Get PP", callback_data: "grup_getpp" }],
          [{ text: "📌 Rules", callback_data: "grup_rules" }, { text: "⬅️ Kembali", callback_data: "back_main" }]
        ]
      });
    }
    
    if (data === "menu_tools") {
        return send(chatId, "*🛠️ MENU TOOLS*", {
            inline_keyboard: [
                [{ text: "🔐 Encode Base64", callback_data: "tool_enc" }, { text: "🔓 Decode Base64", callback_data: "tool_dec" }],
                [{ text: "⬅️ Kembali", callback_data: "back_main" }]
            ]
        });
    }

    if (data === "menu_belajar") {
      return send(chatId, "*📚 MENU BELAJAR*", {
        inline_keyboard: [
          [{ text: "🌌 Kosmos", callback_data: "belajar_kosmos" }, { text: "🧠 Filsafat", callback_data: "belajar_filsafat" }],
          [{ text: "⚛️ Fisika", callback_data: "belajar_fisika" }, { text: "⬅️ Kembali", callback_data: "back_main" }]
        ]
      });
    }

    if (data === "menu_game") {
      return send(chatId, "*🎮 MENU GAME*", {
        inline_keyboard: [
          [{ text: "🎲 Random Angka", callback_data: "game_random" }, { text: "🪙 Lempar Koin", callback_data: "game_coin" }],
          [{ text: "💬 Quotes", callback_data: "game_quotes" }, { text: "⬅️ Kembali", callback_data: "back_main" }]
        ]
      });
    }
    
    // Sub-menu responses
    if (data === "grup_tagall") return send(chatId, "📣 *TAG ALL*\nGunakan command: `.tagall` atau `/tagall`");
    if (data === "grup_sharelink") return send(chatId, "🔗 *SHARE LINK*\nGunakan command: `.sharelink` (Auto share ke semua grup - Simulasi)");
    if (data === "grup_warn") return send(chatId, "⚠️ *WARN*\nReply user atau ketik: `.warn @user [alasan]`");
    if (data === "grup_kick") return send(chatId, "❌ *KICK*\nReply user atau ketik: `.kick @user`");
    if (data === "grup_promote") return send(chatId, "👑 *PROMOTE*\nReply user atau ketik: `.promote @user`");
    if (data === "grup_getpp") return send(chatId, "🖼️ *GET PP*\nReply user atau ketik: `.getpp @user`");
    if (data === "grup_rules") return send(chatId, "📌 *RULES*\n1. No Spam\n2. No Sara\n3. Respect Admins");
    
    if (data === "tool_enc") return send(chatId, "🔐 *ENCODE*\nKetik: `.enc [text]`");
    if (data === "tool_dec") return send(chatId, "🔓 *DECODE*\nKetik: `.dec [base64_string]`");
    
    if (data === "game_random") return send(chatId, `🎲 Angka kamu: *${Math.floor(Math.random() * 100)}*`);
    if (data === "game_coin") return send(chatId, `🪙 Koin: *${Math.random() > 0.5 ? "HEADS" : "TAILS"}*`);
    
    if (data === "game_quotes") {
        // Fetch quote from API
        try {
            const q = await fetch("https://api.quotable.io/random").then(r => r.json());
            if (q && q.content) {
                return send(chatId, `💡 *QUOTE*\n\n_"${q.content}"_\n\n— *${q.author}*`);
            } else {
                return send(chatId, "Gagal mengambil quotes.");
            }
        } catch (e) {
            return send(chatId, "Gagal mengambil quotes (API Error).");
        }
    }

    if (data === "menu_info") return send(chatId, "ℹ️ *INFO BOT*\nBot ini dibuat menggunakan TypeScript di Replit.\nAktif 24/7.");

    if (data === "back_main") {
      return send(chatId, "*📌 MENU UTAMA*", {
        inline_keyboard: [
          [{ text: "👥 Menu Grup", callback_data: "menu_grup" }, { text: "🛠️ Menu Tools", callback_data: "menu_tools" }],
          [{ text: "📚 Menu Belajar", callback_data: "menu_belajar" }, { text: "🎮 Menu Game", callback_data: "menu_game" }],
          [{ text: "ℹ️ Info Bot", callback_data: "menu_info" }]
        ]
      });
    }

    return;
  }

  // Handle Messages
  if (!message) return;

  const text = message.text || message.caption || "";
  const chatId = message.chat.id;
  const fromId = message.from?.id;
  const fromName = message.from?.first_name || "User";

  // Record user activity for tagall
  if (fromId) {
      if (!groupMembers.has(chatId)) {
          groupMembers.set(chatId, new Set());
      }
      groupMembers.get(chatId)?.add(fromId);
  }

  // COMMANDS
  if (text === "/menu" || text === ".menu") {
    return send(chatId, `👋 Halo *${fromName}*! Selamat datang di Bot.\nSilakan pilih menu di bawah:`, {
      inline_keyboard: [
        [{ text: "👥 Menu Grup", callback_data: "menu_grup" }, { text: "🛠️ Menu Tools", callback_data: "menu_tools" }],
        [{ text: "📚 Menu Belajar", callback_data: "menu_belajar" }, { text: "🎮 Menu Game", callback_data: "menu_game" }],
        [{ text: "ℹ️ Info Bot", callback_data: "menu_info" }]
      ]
    });
  }

  // --- GROUP COMMANDS ---

  // KICK
  if (text.startsWith(".kick") || text.startsWith("/kick")) {
      if (!(await isAdmin(chatId, fromId))) return reply("❌ Kamu bukan admin!");
      
      const botInfo = await fetch(`${API}/getMe`).then(r => r.json());
      if (!(await isAdmin(chatId, botInfo.result.id))) return reply("❌ Bot harus jadi admin dulu!");

      let targetId;
      if (message.reply_to_message) {
          targetId = message.reply_to_message.from.id;
      } else if (message.entities) {
          // Try to get from mention
          const mention = message.entities.find((e: any) => e.type === "text_mention");
          const mentionUsername = message.entities.find((e: any) => e.type === "mention");
          
          if (mention) {
              targetId = mention.user.id;
          } else if (mentionUsername) {
             // Resolve username to ID (requires interaction or extra API call usually not available to bots for non-contacts)
             // For this bot, we'll try basic resolution if possible or warn
             return reply("❌ Mohon reply pesan user yang ingin di-kick (Resolve username via API terbatas).");
          }
      }

      if (!targetId) return reply("❌ Reply pesan user atau tag user yang valid.");

      const res = await kickUser(chatId, targetId);
      if (res && res.ok) {
          return reply(`✅ Berhasil kick user ${targetId}.`);
      } else {
          return reply(`❌ Gagal kick user. Pastikan pangkat bot lebih tinggi.`);
      }
  }

  // PROMOTE
  if (text.startsWith(".promote") || text.startsWith("/promote")) {
      if (!(await isAdmin(chatId, fromId))) return reply("❌ Kamu bukan admin!");
      
      let targetId;
      if (message.reply_to_message) {
          targetId = message.reply_to_message.from.id;
      }

      if (!targetId) return reply("❌ Reply pesan user yang ingin dipromote.");
      
      const res = await promoteUser(chatId, targetId);
      if (res && res.ok) {
          return reply(`✅ Berhasil promote user. Sekarang dia admin!`);
      } else {
          return reply(`❌ Gagal promote. Pastikan bot adalah admin dan punya hak promote.`);
      }
  }

  // TAG ALL
  if (text.startsWith(".tagall") || text.startsWith("/tagall")) {
      if (!(await isAdmin(chatId, fromId))) return reply("❌ Command ini khusus Admin!");
      
      const members = groupMembers.get(chatId);
      if (!members || members.size === 0) {
          return reply("⚠️ Belum ada data member aktif yang tersimpan (bot baru nyala/restart).");
      }

      let msg = "📣 *TAG ALL*\n\n";
      let count = 0;
      // Note: We can only tag users we know. Real 'tagall' requires persistent DB or seeing users.
      // We will mention them by ID which creates a link.
      for (const uid of members) {
          // We don't have their names stored, so we use a generic link or fetch? 
          // Fetching every user is slow. We'll just put a generic mention.
          msg += `[Member](tg://user?id=${uid}) `;
          count++;
      }
      
      return send(chatId, msg + `\n\nTotal: ${count} users active.`);
  }

  // GET PP
  if (text.startsWith(".getpp") || text.startsWith("/getpp")) {
      let targetId = fromId;
      if (message.reply_to_message) {
          targetId = message.reply_to_message.from.id;
      }
      
      const photos = await getUserProfilePhotos(targetId);
      if (photos && photos.result && photos.result.total_count > 0) {
          const fileId = photos.result.photos[0][photos.result.photos[0].length - 1].file_id; // Get largest
          const file = await getFile(fileId);
          if (file && file.result) {
              const url = `https://api.telegram.org/file/bot${token}/${file.result.file_path}`;
              return sendPhoto(chatId, url, `🖼️ Profile Picture`);
          }
      } else {
          return reply("❌ User tidak punya foto profil atau privasi disembunyikan.");
      }
  }

  // SHARE LINK (Simulasi)
  if (text.startsWith(".sharelink") || text.startsWith("/sharelink")) {
      // Since bots cannot auto-post to other groups they are not in, or "all groups visited" easily without a DB.
      // We will simulate it by checking our memory.
      if (!(await isAdmin(chatId, fromId))) return reply("❌ Admin only.");

      const chats = Array.from(groupMembers.keys());
      const link = text.split(" ").slice(1).join(" ");
      if (!link) return reply("❌ Masukkan link/pesan! Contoh: `.sharelink https://google.com`");

      let sentCount = 0;
      for (const cid of chats) {
          if (cid !== chatId) { // Don't send to current chat again? Or do?
             await send(cid, `📢 *BROADCAST MESSAGE*\n\n${link}\n\n_From: Admin_`);
             sentCount++;
          }
      }
      return reply(`✅ Berhasil share ke ${sentCount} grup lain yang bot kenal.`);
  }

  // --- TOOLS ---

  // ENCODE
  if (text.startsWith(".enc")) {
      const content = text.split(" ").slice(1).join(" ");
      if (!content) return reply("❌ Masukkan teks! Contoh: `.enc Halo`");
      const encoded = Buffer.from(content).toString('base64');
      return reply(`🔐 *Result:*\n\`${encoded}\``);
  }

  // DECODE
  if (text.startsWith(".dec")) {
      const content = text.split(" ").slice(1).join(" ");
      if (!content) return reply("❌ Masukkan base64! Contoh: `.dec SGFsbw==`");
      try {
          const decoded = Buffer.from(content, 'base64').toString('utf-8');
          return reply(`🔓 *Result:*\n\`${decoded}\``);
      } catch (e) {
          return reply("❌ Gagal decode. String invalid.");
      }
  }

  // --- GAMES & FUN ---
  
  // Example: Echo for debugging (optional)
  // if (text.startsWith(".echo")) {
  //    return send(chatId, text.replace(".echo", ""));
  // }
}

export async function startPolling(token: string) {
    let offset = 0;
    console.log("Starting polling for Bot...");
    const API = `https://api.telegram.org/bot${token}`;
    
    // Clear webhook first to allow polling
    try {
        await fetch(`${API}/deleteWebhook`);
        console.log("Webhook deleted, switching to long-polling.");
    } catch(e) {
        console.error("Failed to delete webhook:", e);
    }

    const loop = async () => {
        try {
            const res = await fetch(`${API}/getUpdates?offset=${offset}&timeout=30`);
            const data: any = await res.json();
            
            if (data.ok && data.result) {
                for (const update of data.result) {
                    await handleBot(token, update);
                    offset = update.update_id + 1;
                }
            }
        } catch (e) {
            console.error("Polling Error:", e);
            await new Promise(r => setTimeout(r, 5000));
        }
        setImmediate(loop);
    };
    
    loop();
}
