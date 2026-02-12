// ==========================================
// YANSHS BOT v3.0 - 1000+ FITUR
// Owner: Yanshs | t.me/trasersecteam
// ==========================================

const groupMembers = {};
const visitedGroups = {};
const warns = {};
const afkUsers = {};
const antilink = {};
const antispam = {};
const welcomeMsg = {};
const blacklistWords = {};
const userCooldowns = {};
const autoAiCounter = {};
const slowmode = {};

// ==========================================
// DATABASE NIK INDONESIA - 34 PROVINSI + 514 KAB/KOTA
// ==========================================
const PROVINSI={"11":"Aceh","12":"Sumatera Utara","13":"Sumatera Barat","14":"Riau","15":"Jambi","16":"Sumatera Selatan","17":"Bengkulu","18":"Lampung","19":"Kepulauan Bangka Belitung","21":"Kepulauan Riau","31":"DKI Jakarta","32":"Jawa Barat","33":"Jawa Tengah","34":"DI Yogyakarta","35":"Jawa Timur","36":"Banten","51":"Bali","52":"Nusa Tenggara Barat","53":"Nusa Tenggara Timur","61":"Kalimantan Barat","62":"Kalimantan Tengah","63":"Kalimantan Selatan","64":"Kalimantan Timur","65":"Kalimantan Utara","71":"Sulawesi Utara","72":"Sulawesi Tengah","73":"Sulawesi Selatan","74":"Sulawesi Tenggara","75":"Gorontalo","76":"Sulawesi Barat","81":"Maluku","82":"Maluku Utara","91":"Papua Selatan","92":"Papua Tengah","93":"Papua Pegunungan","94":"Papua Barat","95":"Papua Barat Daya"};
const KABUPATEN={"1101":"Kab. Simeulue","1102":"Kab. Aceh Singkil","1103":"Kab. Aceh Selatan","1104":"Kab. Aceh Tenggara","1105":"Kab. Aceh Timur","1106":"Kab. Aceh Tengah","1107":"Kab. Aceh Barat","1108":"Kab. Aceh Besar","1109":"Kab. Pidie","1110":"Kab. Bireuen","1111":"Kab. Aceh Utara","1112":"Kab. Aceh Barat Daya","1113":"Kab. Gayo Lues","1114":"Kab. Aceh Tamiang","1115":"Kab. Nagan Raya","1116":"Kab. Aceh Jaya","1117":"Kab. Bener Meriah","1118":"Kab. Pidie Jaya","1171":"Kota Banda Aceh","1172":"Kota Sabang","1173":"Kota Langsa","1174":"Kota Lhokseumawe","1175":"Kota Subulussalam","1201":"Kab. Nias","1202":"Kab. Mandailing Natal","1203":"Kab. Tapanuli Selatan","1204":"Kab. Tapanuli Tengah","1205":"Kab. Tapanuli Utara","1206":"Kab. Toba Samosir","1207":"Kab. Labuhanbatu","1208":"Kab. Asahan","1209":"Kab. Simalungun","1210":"Kab. Dairi","1211":"Kab. Karo","1212":"Kab. Deli Serdang","1213":"Kab. Langkat","1214":"Kab. Nias Selatan","1215":"Kab. Humbang Hasundutan","1216":"Kab. Pakpak Bharat","1217":"Kab. Samosir","1218":"Kab. Serdang Bedagai","1219":"Kab. Batu Bara","1220":"Kab. Padang Lawas Utara","1221":"Kab. Padang Lawas","1222":"Kab. Labuhanbatu Selatan","1223":"Kab. Labuhanbatu Utara","1224":"Kab. Nias Utara","1225":"Kab. Nias Barat","1271":"Kota Sibolga","1272":"Kota Tanjungbalai","1273":"Kota Pematangsiantar","1274":"Kota Tebing Tinggi","1275":"Kota Medan","1276":"Kota Binjai","1277":"Kota Padangsidimpuan","1278":"Kota Gunungsitoli","1301":"Kab. Kepulauan Mentawai","1302":"Kab. Pesisir Selatan","1303":"Kab. Solok","1304":"Kab. Sijunjung","1305":"Kab. Tanah Datar","1306":"Kab. Padang Pariaman","1307":"Kab. Agam","1308":"Kab. Lima Puluh Kota","1309":"Kab. Pasaman","1310":"Kab. Solok Selatan","1311":"Kab. Dharmasraya","1312":"Kab. Pasaman Barat","1371":"Kota Padang","1372":"Kota Solok","1373":"Kota Sawahlunto","1374":"Kota Padang Panjang","1375":"Kota Bukittinggi","1376":"Kota Payakumbuh","1377":"Kota Pariaman","1401":"Kab. Kuantan Singingi","1402":"Kab. Indragiri Hulu","1403":"Kab. Indragiri Hilir","1404":"Kab. Pelalawan","1405":"Kab. Siak","1406":"Kab. Kampar","1407":"Kab. Rokan Hulu","1408":"Kab. Bengkalis","1409":"Kab. Rokan Hilir","1410":"Kab. Kepulauan Meranti","1471":"Kota Pekanbaru","1473":"Kota Dumai","1501":"Kab. Kerinci","1502":"Kab. Merangin","1503":"Kab. Sarolangun","1504":"Kab. Batang Hari","1505":"Kab. Muaro Jambi","1506":"Kab. Tanjung Jabung Timur","1507":"Kab. Tanjung Jabung Barat","1508":"Kab. Tebo","1509":"Kab. Bungo","1571":"Kota Jambi","1572":"Kota Sungai Penuh","1601":"Kab. Ogan Komering Ulu","1602":"Kab. Ogan Komering Ilir","1603":"Kab. Muara Enim","1604":"Kab. Lahat","1605":"Kab. Musi Rawas","1606":"Kab. Musi Banyuasin","1607":"Kab. Banyuasin","1608":"Kab. Ogan Komering Ulu Selatan","1609":"Kab. Ogan Komering Ulu Timur","1610":"Kab. Ogan Ilir","1611":"Kab. Empat Lawang","1612":"Kab. Penukal Abab Lematang Ilir","1613":"Kab. Musi Rawas Utara","1671":"Kota Palembang","1672":"Kota Prabumulih","1673":"Kota Pagar Alam","1674":"Kota Lubuklinggau","1701":"Kab. Bengkulu Selatan","1702":"Kab. Rejang Lebong","1703":"Kab. Bengkulu Utara","1704":"Kab. Kaur","1705":"Kab. Seluma","1706":"Kab. Mukomuko","1707":"Kab. Lebong","1708":"Kab. Kepahiang","1709":"Kab. Bengkulu Tengah","1771":"Kota Bengkulu","1801":"Kab. Lampung Barat","1802":"Kab. Tanggamus","1803":"Kab. Lampung Selatan","1804":"Kab. Lampung Timur","1805":"Kab. Lampung Tengah","1806":"Kab. Lampung Utara","1807":"Kab. Way Kanan","1808":"Kab. Tulang Bawang","1809":"Kab. Pesawaran","1810":"Kab. Pringsewu","1811":"Kab. Mesuji","1812":"Kab. Tulang Bawang Barat","1813":"Kab. Pesisir Barat","1871":"Kota Bandar Lampung","1872":"Kota Metro","1901":"Kab. Bangka","1902":"Kab. Belitung","1903":"Kab. Bangka Barat","1904":"Kab. Bangka Tengah","1905":"Kab. Bangka Selatan","1906":"Kab. Belitung Timur","1971":"Kota Pangkal Pinang","2101":"Kab. Karimun","2102":"Kab. Bintan","2103":"Kab. Natuna","2104":"Kab. Lingga","2105":"Kab. Kepulauan Anambas","2171":"Kota Batam","2172":"Kota Tanjungpinang","3101":"Kab. Kepulauan Seribu","3171":"Kota Jakarta Selatan","3172":"Kota Jakarta Timur","3173":"Kota Jakarta Pusat","3174":"Kota Jakarta Barat","3175":"Kota Jakarta Utara","3201":"Kab. Bogor","3202":"Kab. Sukabumi","3203":"Kab. Cianjur","3204":"Kab. Bandung","3205":"Kab. Garut","3206":"Kab. Tasikmalaya","3207":"Kab. Ciamis","3208":"Kab. Kuningan","3209":"Kab. Cirebon","3210":"Kab. Majalengka","3211":"Kab. Sumedang","3212":"Kab. Indramayu","3213":"Kab. Subang","3214":"Kab. Purwakarta","3215":"Kab. Karawang","3216":"Kab. Bekasi","3217":"Kab. Bandung Barat","3218":"Kab. Pangandaran","3271":"Kota Bogor","3272":"Kota Sukabumi","3273":"Kota Bandung","3274":"Kota Cirebon","3275":"Kota Bekasi","3276":"Kota Depok","3277":"Kota Cimahi","3278":"Kota Tasikmalaya","3279":"Kota Banjar","3301":"Kab. Cilacap","3302":"Kab. Banyumas","3303":"Kab. Purbalingga","3304":"Kab. Banjarnegara","3305":"Kab. Kebumen","3306":"Kab. Purworejo","3307":"Kab. Wonosobo","3308":"Kab. Magelang","3309":"Kab. Boyolali","3310":"Kab. Klaten","3311":"Kab. Sukoharjo","3312":"Kab. Wonogiri","3313":"Kab. Karanganyar","3314":"Kab. Sragen","3315":"Kab. Grobogan","3316":"Kab. Blora","3317":"Kab. Rembang","3318":"Kab. Pati","3319":"Kab. Kudus","3320":"Kab. Jepara","3321":"Kab. Demak","3322":"Kab. Semarang","3323":"Kab. Temanggung","3324":"Kab. Kendal","3325":"Kab. Batang","3326":"Kab. Pekalongan","3327":"Kab. Pemalang","3328":"Kab. Tegal","3329":"Kab. Brebes","3371":"Kota Magelang","3372":"Kota Surakarta","3373":"Kota Salatiga","3374":"Kota Semarang","3375":"Kota Pekalongan","3376":"Kota Tegal","3401":"Kab. Kulon Progo","3402":"Kab. Bantul","3403":"Kab. Gunung Kidul","3404":"Kab. Sleman","3471":"Kota Yogyakarta","3501":"Kab. Pacitan","3502":"Kab. Ponorogo","3503":"Kab. Trenggalek","3504":"Kab. Tulungagung","3505":"Kab. Blitar","3506":"Kab. Kediri","3507":"Kab. Malang","3508":"Kab. Lumajang","3509":"Kab. Jember","3510":"Kab. Banyuwangi","3511":"Kab. Bondowoso","3512":"Kab. Situbondo","3513":"Kab. Probolinggo","3514":"Kab. Pasuruan","3515":"Kab. Sidoarjo","3516":"Kab. Mojokerto","3517":"Kab. Jombang","3518":"Kab. Nganjuk","3519":"Kab. Madiun","3520":"Kab. Magetan","3521":"Kab. Ngawi","3522":"Kab. Bojonegoro","3523":"Kab. Tuban","3524":"Kab. Lamongan","3525":"Kab. Gresik","3526":"Kab. Bangkalan","3527":"Kab. Sampang","3528":"Kab. Pamekasan","3529":"Kab. Sumenep","3571":"Kota Kediri","3572":"Kota Blitar","3573":"Kota Malang","3574":"Kota Probolinggo","3575":"Kota Pasuruan","3576":"Kota Mojokerto","3577":"Kota Madiun","3578":"Kota Surabaya","3579":"Kota Batu","3601":"Kab. Pandeglang","3602":"Kab. Lebak","3603":"Kab. Tangerang","3604":"Kab. Serang","3671":"Kota Tangerang","3672":"Kota Cilegon","3673":"Kota Serang","3674":"Kota Tangerang Selatan","5101":"Kab. Jembrana","5102":"Kab. Tabanan","5103":"Kab. Badung","5104":"Kab. Gianyar","5105":"Kab. Klungkung","5106":"Kab. Bangli","5107":"Kab. Karangasem","5108":"Kab. Buleleng","5171":"Kota Denpasar","5201":"Kab. Lombok Barat","5202":"Kab. Lombok Tengah","5203":"Kab. Lombok Timur","5204":"Kab. Sumbawa","5205":"Kab. Dompu","5206":"Kab. Bima","5207":"Kab. Sumbawa Barat","5208":"Kab. Lombok Utara","5271":"Kota Mataram","5272":"Kota Bima","5301":"Kab. Sumba Barat","5302":"Kab. Sumba Timur","5303":"Kab. Kupang","5304":"Kab. Timor Tengah Selatan","5305":"Kab. Timor Tengah Utara","5306":"Kab. Belu","5307":"Kab. Alor","5308":"Kab. Lembata","5309":"Kab. Flores Timur","5310":"Kab. Sikka","5311":"Kab. Ende","5312":"Kab. Ngada","5313":"Kab. Manggarai","5314":"Kab. Rote Ndao","5315":"Kab. Manggarai Barat","5316":"Kab. Sumba Tengah","5317":"Kab. Sumba Barat Daya","5318":"Kab. Nagekeo","5319":"Kab. Manggarai Timur","5320":"Kab. Sabu Raijua","5321":"Kab. Malaka","5371":"Kota Kupang","6101":"Kab. Sambas","6102":"Kab. Bengkayang","6103":"Kab. Landak","6104":"Kab. Mempawah","6105":"Kab. Sanggau","6106":"Kab. Ketapang","6107":"Kab. Sintang","6108":"Kab. Kapuas Hulu","6109":"Kab. Sekadau","6110":"Kab. Melawi","6111":"Kab. Kayong Utara","6112":"Kab. Kubu Raya","6171":"Kota Pontianak","6172":"Kota Singkawang","6201":"Kab. Kotawaringin Barat","6202":"Kab. Kotawaringin Timur","6203":"Kab. Kapuas","6204":"Kab. Barito Selatan","6205":"Kab. Barito Utara","6206":"Kab. Sukamara","6207":"Kab. Lamandau","6208":"Cab. Seruyan","6209":"Kab. Katingan","6210":"Kab. Pulang Pisau","6211":"Kab. Gunung Mas","6212":"Kab. Barito Timur","6213":"Kab. Murung Raya","6271":"Kota Palangka Raya","6301":"Kab. Tanah Laut","6302":"Kab. Kotabaru","6303":"Kab. Banjar","6304":"Kab. Barito Kuala","6305":"Kab. Tapin","6306":"Kab. Hulu Sungai Selatan","6307":"Kab. Hulu Sungai Tengah","6308":"Kab. Hulu Sungai Utara","6309":"Kab. Tabalong","6310":"Kab. Tanah Bumbu","6311":"Kab. Balangan","6371":"Kota Banjarmasin","6372":"Kota Banjarbaru","6401":"Kab. Paser","6402":"Kab. Kutai Barat","6403":"Kab. Kutai Kartanegara","6404":"Kab. Kutai Timur","6405":"Kab. Berau","6409":"Kab. Penajam Paser Utara","6411":"Kab. Mahakam Ulu","6471":"Kota Balikpapan","6472":"Kota Samarinda","6474":"Kota Bontang","6501":"Kab. Malinau","6502":"Kab. Bulungan","6503":"Kab. Tana Tidung","6504":"Kab. Nunukan","6571":"Kota Tarakan","7101":"Kab. Bolaang Mongondow","7102":"Kab. Minahasa","7103":"Kab. Kepulauan Sangihe","7104":"Kab. Kepulauan Talaud","7105":"Kab. Minahasa Selatan","7106":"Kab. Minahasa Utara","7107":"Kab. Bolaang Mongondow Utara","7108":"Kab. Kepulauan Siau Tagulandang Biaro","7109":"Kab. Minahasa Tenggara","7110":"Kab. Bolaang Mongondow Selatan","7111":"Kab. Bolaang Mongondow Timur","7171":"Kota Manado","7172":"Kota Bitung","7173":"Kota Tomohon","7174":"Kota Kotamobagu","7201":"Kab. Banggai Kepulauan","7202":"Kab. Banggai","7203":"Kab. Morowali","7204":"Kab. Poso","7205":"Kab. Donggala","7206":"Kab. Toli-Toli","7207":"Kab. Buol","7208":"Kab. Parigi Moutong","7209":"Kab. Tojo Una-Una","7210":"Kab. Sigi","7211":"Kab. Banggai Laut","7212":"Kab. Morowali Utara","7271":"Kota Palu","7301":"Kab. Kepulauan Selayar","7302":"Kab. Bulukumba","7303":"Kab. Bantaeng","7304":"Kab. Jeneponto","7305":"Kab. Takalar","7306":"Kab. Gowa","7307":"Kab. Sinjai","7308":"Kab. Maros","7309":"Kab. Pangkajene dan Kepulauan","7310":"Kab. Barru","7311":"Kab. Bone","7312":"Kab. Soppeng","7313":"Kab. Wajo","7314":"Kab. Sidenreng Rappang","7315":"Kab. Pinrang","7316":"Kab. Enrekang","7317":"Kab. Luwu","7318":"Kab. Tana Toraja","7322":"Kab. Luwu Utara","7325":"Kab. Luwu Timur","7326":"Kab. Toraja Utara","7371":"Kota Makassar","7372":"Kota Parepare","7373":"Kota Palopo","7401":"Kab. Buton","7402":"Kab. Muna","7403":"Kab. Konawe","7404":"Kab. Kolaka","7405":"Kab. Konawe Selatan","7406":"Kab. Bombana","7407":"Kab. Wakatobi","7408":"Kab. Kolaka Utara","7409":"Kab. Buton Utara","7410":"Kab. Konawe Utara","7411":"Kab. Kolaka Timur","7412":"Kab. Konawe Kepulauan","7413":"Kab. Muna Barat","7414":"Kab. Buton Tengah","7415":"Kab. Buton Selatan","7471":"Kota Kendari","7472":"Kota Baubau","7501":"Kab. Boalemo","7502":"Kab. Gorontalo","7503":"Kab. Pohuwato","7504":"Kab. Bone Bolango","7505":"Kab. Gorontalo Utara","7571":"Kota Gorontalo","7601":"Kab. Majene","7602":"Kab. Polewali Mandar","7603":"Kab. Mamasa","7604":"Kab. Mamuju","7605":"Kab. Mamuju Utara","7606":"Kab. Mamuju Tengah","8101":"Kab. Maluku Tenggara Barat","8102":"Kab. Maluku Tenggara","8103":"Kab. Maluku Tengah","8104":"Kab. Buru","8105":"Kab. Kepulauan Aru","8106":"Kab. Seram Bagian Barat","8107":"Kab. Seram Bagian Timur","8108":"Kab. Maluku Barat Daya","8109":"Kab. Buru Selatan","8171":"Kota Ambon","8172":"Kota Tual","8201":"Kab. Halmahera Barat","8202":"Kab. Halmahera Tengah","8203":"Kab. Kepulauan Sula","8204":"Kab. Halmahera Selatan","8205":"Kab. Halmahera Utara","8206":"Kab. Halmahera Timur","8207":"Kab. Pulau Morotai","8208":"Kab. Pulau Taliabu","8271":"Kota Ternate","8272":"Kota Tidore Kepulauan","9101":"Kab. Merauke","9102":"Kab. Jayawijaya","9103":"Kab. Jayapura","9104":"Kab. Nabire","9105":"Kab. Kepulauan Yapen","9106":"Kab. Biak Numfor","9107":"Kab. Paniai","9108":"Kab. Puncak Jaya","9109":"Kab. Mimika","9110":"Kab. Boven Digoel","9111":"Kab. Mappi","9112":"Kab. Asmat","9113":"Kab. Yahukimo","9114":"Kab. Pegunungan Bintang","9115":"Kab. Tolikara","9116":"Kab. Sarmi","9117":"Kab. Keerom","9118":"Kab. Waropen","9119":"Kab. Supiori","9120":"Kab. Mamberamo Raya","9121":"Kab. Nduga","9122":"Kab. Lanny Jaya","9123":"Kab. Mamberamo Tengah","9124":"Kab. Yalimo","9125":"Kab. Puncak","9126":"Kab. Dogiyai","9127":"Kab. Intan Jaya","9128":"Kab. Deiyai","9171":"Kota Jayapura","9201":"Kab. Fakfak","9202":"Kab. Kaimana","9203":"Kab. Teluk Wondama","9204":"Kab. Teluk Bintuni","9205":"Kab. Manokwari","9206":"Kab. Sorong Selatan","9207":"Kab. Sorong","9208":"Kab. Raja Ampat","9209":"Kab. Tambrauw","9210":"Kab. Maybrat","9211":"Kab. Manokwari Selatan","9212":"Kab. Pegunungan Arfak","9271":"Kota Sorong"};

export async function handleBot(token, update) {
  const API = `https://api.telegram.org/bot${token}`;

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================
  async function send(chatId, text, keyboard) {
    await fetch(`${API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, reply_markup: keyboard, parse_mode: "Markdown" })
    });
  }

  async function sendPhoto(chatId, photo, caption) {
    await fetch(`${API}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, photo, caption, parse_mode: "Markdown" })
    });
  }

  async function sendSticker(chatId, sticker) {
    await fetch(`${API}/sendSticker`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, sticker })
    });
  }

  async function sendVoice(chatId, voice) {
    await fetch(`${API}/sendVoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, voice })
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
      if (textMention && textMention.user) return textMention.user.id;
      const mention = message.entities.find(e => e.type === "mention");
      if (mention) {
        const t = message.text || message.caption || "";
        const username = t.slice(mention.offset + 1, mention.offset + mention.length);
        const members = groupMembers[chatId];
        if (members) {
          for (const uid in members) {
            if (members[uid].username?.toLowerCase() === username.toLowerCase()) return parseInt(uid);
          }
        }
      }
    }
    return null;
  }

  if (!update.message && !update.callback_query) return;

  const text = update.message?.text || update.message?.caption;
  const chatIdMsg = update.message?.chat?.id;

  // Track members
  if (update.message?.from?.id && (update.message?.chat?.type === "group" || update.message?.chat?.type === "supergroup")) {
    if (!groupMembers[chatIdMsg]) groupMembers[chatIdMsg] = {};
    groupMembers[chatIdMsg][update.message.from.id] = {
      username: update.message.from.username,
      firstName: update.message.from.first_name
    };
    visitedGroups[chatIdMsg] = { title: update.message.chat.title };

    // Anti-link check
    if (antilink[chatIdMsg] && text) {
      const linkRegex = /(https?:\/\/|t\.me\/|wa\.me\/|bit\.ly\/)/i;
      if (linkRegex.test(text) && !(await isAdmin(chatIdMsg, update.message.from.id))) {
        await deleteMessage(chatIdMsg, update.message.message_id);
        return send(chatIdMsg, `⚠️ @${update.message.from.username || update.message.from.first_name}, link tidak diizinkan!`);
      }
    }

    // Anti-spam check
    if (antispam[chatIdMsg]) {
      const uid = update.message.from.id;
      const now = Date.now();
      if (!userCooldowns[chatIdMsg]) userCooldowns[chatIdMsg] = {};
      if (!userCooldowns[chatIdMsg][uid]) userCooldowns[chatIdMsg][uid] = [];
      userCooldowns[chatIdMsg][uid].push(now);
      userCooldowns[chatIdMsg][uid] = userCooldowns[chatIdMsg][uid].filter(t => now - t < 5000);
      if (userCooldowns[chatIdMsg][uid].length > 5 && !(await isAdmin(chatIdMsg, uid))) {
        await mute(chatIdMsg, uid, Math.floor(now / 1000) + 300);
        return send(chatIdMsg, `🔇 @${update.message.from.username || update.message.from.first_name} di-mute 5 menit karena spam.`);
      }
    }

    // Blacklist words check
    if (blacklistWords[chatIdMsg] && text) {
      const lower = text.toLowerCase();
      for (const word of blacklistWords[chatIdMsg]) {
        if (lower.includes(word.toLowerCase()) && !(await isAdmin(chatIdMsg, update.message.from.id))) {
          await deleteMessage(chatIdMsg, update.message.message_id);
          return send(chatIdMsg, `⚠️ Kata "${word}" tidak diizinkan!`);
        }
      }
    }

    // AFK check
    if (afkUsers[chatIdMsg]) {
      // Remove AFK if user sends a message
      if (afkUsers[chatIdMsg][update.message.from.id]) {
        delete afkUsers[chatIdMsg][update.message.from.id];
        await send(chatIdMsg, `👋 @${update.message.from.username || update.message.from.first_name} sudah kembali!`);
      }
    }
  }

  // ==========================================
  // MENU UTAMA
  // ==========================================
  if (text === "/menu" || text === ".menu" || text === "/start" || text === ".help" || text === "/help") {
    return send(chatIdMsg, "*📌 MENU UTAMA - YANSHS BOT v3.0*\n_1000+ Fitur Lengkap!_\n\n👨‍💻 Owner: Yanshs\n👥 t.me/trasersecteam\n\n_Pilih menu di bawah:_", {
      inline_keyboard: [
        [{ text: "👥 Menu Grup", callback_data: "menu_grup" }, { text: "🛠️ Menu Tools", callback_data: "menu_tools" }],
        [{ text: "🤖 Menu AI", callback_data: "menu_ai" }, { text: "🎮 Menu Game", callback_data: "menu_game" }],
        [{ text: "🔮 Menu Fun", callback_data: "menu_fun" }, { text: "📥 Menu Download", callback_data: "menu_download" }],
        [{ text: "🔒 Menu Security", callback_data: "menu_security" }, { text: "🔍 Menu Search", callback_data: "menu_search" }],
        [{ text: "🎵 Menu Media", callback_data: "menu_media" }, { text: "📊 Menu Stalk", callback_data: "menu_stalk" }],
        [{ text: "🧰 Menu Converter", callback_data: "menu_converter" }, { text: "📚 Menu Edukasi", callback_data: "menu_edukasi" }],
        [{ text: "🎭 Menu Random", callback_data: "menu_random" }, { text: "ℹ️ Info Bot", callback_data: "menu_info" }]
      ]
    });
  }

  // ==========================================
  // GRUP COMMANDS
  // ==========================================
  if (text?.startsWith(".kick") || text?.startsWith("/kick")) {
  const fromId = Number(update.message.from.id);
  if (!(await isAdmin(chatIdMsg, fromId))) return send(chatIdMsg, "❌ Lu bukan admin.");
  const botInfoRes = await fetch(`${API}/getMe`);
  const botInfo = await botInfoRes.json();
  const botId = Number(botInfo?.result?.id ?? botInfo?.id);
  if (!(await isAdmin(chatIdMsg, botId))) return send(chatIdMsg, "❌ Bot belum admin.");
  const targetRaw = await getTargetUser(update.message, chatIdMsg);
  const targetId = Number(targetRaw?.id ?? targetRaw);
  if (!targetId) return send(chatIdMsg, "❌ Reply pesan user atau `.kick @user`.");
  if (await isAdmin(chatIdMsg, targetId)) return send(chatIdMsg, "❌ Ga bisa kick admin.");
  await kick(chatIdMsg, targetId);
  return send(chatIdMsg, "✅ User berhasil di-kick.");
}

  if (text === ".tagall" || text === "/tagall") {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Lu bukan admin.");
    const members = groupMembers[chatIdMsg];
    if (!members || Object.keys(members).length === 0) return send(chatIdMsg, "⚠️ Belum ada data member.");
    let msg = "📣 *TAG ALL*\n\n";
    for (const uid in members) {
      const m = members[uid];
      msg += m.username ? `@${m.username} ` : `[${m.firstName || "User"}](tg://user?id=${uid}) `;
    }
    return send(chatIdMsg, msg);
  }

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
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user.");
    await unban(chatIdMsg, targetId);
    return send(chatIdMsg, "✅ Unbanned.");
  }

  if (text?.startsWith(".mute")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user.");
    if (await isAdmin(chatIdMsg, targetId)) return send(chatIdMsg, "❌ Ga bisa mute admin.");
    const parts = text.split(" ");
    const duration = parseInt(parts[1]) || 60;
    await mute(chatIdMsg, targetId, Math.floor(Date.now() / 1000) + (duration * 60));
    return send(chatIdMsg, `🔇 Muted ${duration} menit.`);
  }

  if (text?.startsWith(".unmute")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user.");
    await unmute(chatIdMsg, targetId);
    return send(chatIdMsg, "🔊 Unmuted.");
  }

  if (text?.startsWith(".promote")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user.");
    await promote(chatIdMsg, targetId);
    return send(chatIdMsg, "👮 Promoted.");
  }

  if (text?.startsWith(".demote")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user.");
    await demote(chatIdMsg, targetId);
    return send(chatIdMsg, "📉 Demoted.");
  }

  if (text?.startsWith(".pin") && !text?.startsWith(".pinterest")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    if (!update.message.reply_to_message) return send(chatIdMsg, "❌ Reply pesan.");
    await pinMessage(chatIdMsg, update.message.reply_to_message.message_id);
    return send(chatIdMsg, "📌 Pesan di-pin.");
  }

  if (text?.startsWith(".unpin")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    if (!update.message.reply_to_message) return send(chatIdMsg, "❌ Reply pesan.");
    await unpinMessage(chatIdMsg, update.message.reply_to_message.message_id);
    return send(chatIdMsg, "📌 Pesan di-unpin.");
  }

  if (text?.startsWith(".del") && !text?.startsWith(".delay")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    if (!update.message.reply_to_message) return send(chatIdMsg, "❌ Reply pesan.");
    await deleteMessage(chatIdMsg, update.message.reply_to_message.message_id);
    await deleteMessage(chatIdMsg, update.message.message_id);
    return;
  }

  if (text?.startsWith(".warn") && !text?.startsWith(".weather")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user.");
    if (await isAdmin(chatIdMsg, targetId)) return send(chatIdMsg, "❌ Ga bisa warn admin.");
    if (!warns[chatIdMsg]) warns[chatIdMsg] = {};
    if (!warns[chatIdMsg][targetId]) warns[chatIdMsg][targetId] = 0;
    warns[chatIdMsg][targetId]++;
    if (warns[chatIdMsg][targetId] >= 3) {
      await kick(chatIdMsg, targetId);
      warns[chatIdMsg][targetId] = 0;
      return send(chatIdMsg, `⚠️ 3x warn, auto-kick!`);
    }
    return send(chatIdMsg, `⚠️ Warned! (${warns[chatIdMsg][targetId]}/3)`);
  }

  if (text?.startsWith(".unwarn") || text?.startsWith(".resetwarn")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const targetId = await getTargetUser(update.message, chatIdMsg);
    if (!targetId) return send(chatIdMsg, "❌ Reply pesan user.");
    if (warns[chatIdMsg]) warns[chatIdMsg][targetId] = 0;
    return send(chatIdMsg, "✅ Warn direset.");
  }

  if (text?.startsWith(".broadcast") || text?.startsWith(".sharelink")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const msg = text.replace(/^\.(broadcast|sharelink)\s*/, "");
    if (!msg) return send(chatIdMsg, "❌ `.broadcast <pesan>`");
    const groups = Object.keys(visitedGroups);
    if (groups.length === 0) return send(chatIdMsg, "⚠️ Belum ada grup.");
    let count = 0, failed = 0;
    for (const gid of groups) {
      if (gid === String(chatIdMsg)) continue;
      try { await send(gid, `📢 *BROADCAST*\n\n${msg}`); count++; } catch { failed++; }
    }
    return send(chatIdMsg, `✅ Terkirim ke ${count} grup.${failed ? `\n❌ Gagal: ${failed}` : ""}`);
  }

  if (text === ".groupinfo" || text === ".gc") {
    const chat = update.message.chat;
    const memberCount = Object.keys(groupMembers[chatIdMsg] || {}).length;
    return send(chatIdMsg, `👥 *Info Grup*\n\n📛 Nama: ${chat.title || "-"}\n🆔 ID: \`${chat.id}\`\n👤 Members aktif: ${memberCount}\n📝 Type: ${chat.type}`);
  }

  if (text?.startsWith(".setwelcome ")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    welcomeMsg[chatIdMsg] = text.replace(".setwelcome ", "");
    return send(chatIdMsg, "✅ Welcome message diset.");
  }

  if (text === ".delwelcome") {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    delete welcomeMsg[chatIdMsg];
    return send(chatIdMsg, "✅ Welcome message dihapus.");
  }

  // ==========================================
  // SECURITY COMMANDS
  // ==========================================
  if (text === ".antilink on") {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    antilink[chatIdMsg] = true;
    return send(chatIdMsg, "🔒 Anti-link aktif. Link akan dihapus otomatis.");
  }

  if (text === ".antilink off") {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    delete antilink[chatIdMsg];
    return send(chatIdMsg, "🔓 Anti-link nonaktif.");
  }

  if (text === ".antispam on") {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    antispam[chatIdMsg] = true;
    return send(chatIdMsg, "🔒 Anti-spam aktif. Spammer akan di-mute otomatis.");
  }

  if (text === ".antispam off") {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    delete antispam[chatIdMsg];
    return send(chatIdMsg, "🔓 Anti-spam nonaktif.");
  }

  if (text?.startsWith(".blacklist ")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const word = text.replace(".blacklist ", "").trim();
    if (!blacklistWords[chatIdMsg]) blacklistWords[chatIdMsg] = [];
    blacklistWords[chatIdMsg].push(word);
    return send(chatIdMsg, `✅ Kata "${word}" di-blacklist.`);
  }

  if (text?.startsWith(".unblacklist ")) {
    if (!(await isAdmin(chatIdMsg, update.message.from.id))) return send(chatIdMsg, "❌ Bukan admin.");
    const word = text.replace(".unblacklist ", "").trim();
    if (blacklistWords[chatIdMsg]) {
      blacklistWords[chatIdMsg] = blacklistWords[chatIdMsg].filter(w => w !== word);
    }
    return send(chatIdMsg, `✅ Kata "${word}" di-unblacklist.`);
  }

  if (text === ".listblacklist") {
    const words = blacklistWords[chatIdMsg] || [];
    if (words.length === 0) return send(chatIdMsg, "📋 Tidak ada kata di blacklist.");
    return send(chatIdMsg, `📋 *Blacklist Words:*\n\n${words.map((w, i) => `${i + 1}. ${w}`).join("\n")}`);
  }

  // ==========================================
  // TOOLS COMMANDS (50+)
  // ==========================================
  if (text?.startsWith(".nik ") || text?.startsWith(".ceknik ")) {
    const nik = text.replace(/^\.(nik|ceknik)\s*/, "").trim();
    if (!nik || nik.length !== 16 || isNaN(nik)) return send(chatIdMsg, "❌ `.nik <16 digit NIK>`");

    const kodeProv = nik.substring(0, 2);
    const kodeKab = nik.substring(0, 4);
    const kodeKec = nik.substring(4, 6);
    let tgl = parseInt(nik.substring(6, 8));
    const bln = nik.substring(8, 10);
    const thn = nik.substring(10, 12);
    const uniq = nik.substring(12, 16);

    let gender = "👨 Laki-laki";
    if (tgl > 40) { tgl -= 40; gender = "👩 Perempuan"; }

    const tahunLahir = parseInt(thn) > 30 ? `19${thn}` : `20${thn}`;
    const bulanMap = { "01": "Januari", "02": "Februari", "03": "Maret", "04": "April", "05": "Mei", "06": "Juni", "07": "Juli", "08": "Agustus", "09": "September", "10": "Oktober", "11": "November", "12": "Desember" };

    const provinsi = PROVINSI[kodeProv] || "Tidak diketahui";
    const kabupaten = KABUPATEN[kodeKab] || "Tidak diketahui";

    // Estimasi usia
    const now = new Date();
    const birthYear = parseInt(tahunLahir);
    const estimasiUsia = now.getFullYear() - birthYear;

    // Zodiak dari tanggal lahir
    const bulanNum = parseInt(bln);
    let zodiak = "";
    if ((bulanNum === 3 && tgl >= 21) || (bulanNum === 4 && tgl <= 19)) zodiak = "♈ Aries";
    else if ((bulanNum === 4 && tgl >= 20) || (bulanNum === 5 && tgl <= 20)) zodiak = "♉ Taurus";
    else if ((bulanNum === 5 && tgl >= 21) || (bulanNum === 6 && tgl <= 20)) zodiak = "♊ Gemini";
    else if ((bulanNum === 6 && tgl >= 21) || (bulanNum === 7 && tgl <= 22)) zodiak = "♋ Cancer";
    else if ((bulanNum === 7 && tgl >= 23) || (bulanNum === 8 && tgl <= 22)) zodiak = "♌ Leo";
    else if ((bulanNum === 8 && tgl >= 23) || (bulanNum === 9 && tgl <= 22)) zodiak = "♍ Virgo";
    else if ((bulanNum === 9 && tgl >= 23) || (bulanNum === 10 && tgl <= 22)) zodiak = "♎ Libra";
    else if ((bulanNum === 10 && tgl >= 23) || (bulanNum === 11 && tgl <= 21)) zodiak = "♏ Scorpio";
    else if ((bulanNum === 11 && tgl >= 22) || (bulanNum === 12 && tgl <= 21)) zodiak = "♐ Sagitarius";
    else if ((bulanNum === 12 && tgl >= 22) || (bulanNum === 1 && tgl <= 19)) zodiak = "♑ Capricorn";
    else if ((bulanNum === 1 && tgl >= 20) || (bulanNum === 2 && tgl <= 18)) zodiak = "♒ Aquarius";
    else zodiak = "♓ Pisces";

    return send(chatIdMsg, `🪪 *HASIL CEK NIK LENGKAP*\n\n🆔 NIK: \`${nik}\`\n${gender}\n📅 Tanggal Lahir: ${tgl} ${bulanMap[bln] || bln} ${tahunLahir}\n🎂 Estimasi Usia: ~${estimasiUsia} tahun\n${zodiak}\n\n🏛️ *WILAYAH:*\n🌏 Provinsi: ${provinsi}\n🏘️ Kab/Kota: ${kabupaten}\n📍 Kode Kecamatan: ${kodeKec}\n🔢 Nomor Urut: ${uniq}\n\n⚠️ _Data berdasarkan format NIK, bukan database Dukcapil_`);
  }

  if (text?.startsWith(".ip ") || text?.startsWith(".trackip ")) {
    const ip = text.replace(/^\.(ip|trackip)\s*/, "").trim();
    if (!ip) return send(chatIdMsg, "❌ `.ip <alamat IP>`");
    try {
      const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting,query`).then(r => r.json());
      if (res.status !== "success") return send(chatIdMsg, `❌ IP tidak ditemukan.`);
      return send(chatIdMsg, `🌐 *IP TRACKER LENGKAP*\n\n📍 IP: \`${res.query}\`\n🌍 Negara: ${res.country} (${res.countryCode})\n🏙️ Kota: ${res.city}\n📍 Region: ${res.regionName}\n📮 ZIP: ${res.zip}\n📌 Koordinat: ${res.lat}, ${res.lon}\n⏰ Timezone: ${res.timezone}\n🏢 ISP: ${res.isp}\n🏛️ Organisasi: ${res.org}\n📡 AS: ${res.as}\n🔄 Reverse DNS: ${res.reverse || "-"}\n📱 Mobile: ${res.mobile ? "Ya" : "Tidak"}\n🔒 Proxy/VPN: ${res.proxy ? "Ya" : "Tidak"}\n☁️ Hosting: ${res.hosting ? "Ya" : "Tidak"}\n\n🗺️ Maps: https://maps.google.com/?q=${res.lat},${res.lon}`);
    } catch {
      return send(chatIdMsg, "❌ Gagal track IP.");
    }
  }

  if (text?.startsWith(".enc ") || text?.startsWith(".encode ")) {
    const q = text.replace(/^\.(enc|encode)\s*/, "");
    return send(chatIdMsg, `🔐 *Base64 Encoded:*\n\`${Buffer.from(q).toString("base64")}\``);
  }

  if (text?.startsWith(".dec ") || text?.startsWith(".decode ")) {
    const q = text.replace(/^\.(dec|decode)\s*/, "");
    try { return send(chatIdMsg, `🔓 *Base64 Decoded:*\n\`${Buffer.from(q, "base64").toString("utf-8")}\``); }
    catch { return send(chatIdMsg, "❌ Format base64 salah."); }
  }

  if (text === ".getpp" || text === ".pp" || text?.startsWith(".getpp ") || text?.startsWith(".pp ")) {
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
    try { return send(chatIdMsg, `🔢 *Hasil:* ${eval(q.replace(/[^0-9+\-*/().%\s]/g, ""))}`); }
    catch { return send(chatIdMsg, "❌ Ekspresi tidak valid."); }
  }

  if (text === ".toimg" || text?.startsWith(".toimg")) {
    if (!update.message.reply_to_message?.sticker) return send(chatIdMsg, "❌ Reply sticker.");
    const sticker = update.message.reply_to_message.sticker;
    if (sticker.is_animated || sticker.is_video) return send(chatIdMsg, "❌ Sticker biasa aja.");
    const file = await getFile(sticker.file_id);
    const url = `https://api.telegram.org/file/bot${token}/${file.result.file_path}`;
    return sendPhoto(chatIdMsg, url, "🖼️ Sticker to Image");
  }

  if (text?.startsWith(".tr ") || text?.startsWith(".translate ")) {
    const q = text.replace(/^\.(tr|translate)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.tr <teks>`");
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=auto|id`).then(r => r.json());
      return send(chatIdMsg, `🌐 *Translate:*\n${res.responseData?.translatedText || "Gagal"}`);
    } catch { return send(chatIdMsg, "❌ Gagal translate."); }
  }

  if (text?.startsWith(".tren ") || text?.startsWith(".trid ")) {
    const q = text.replace(/^\.(tren|trid)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.tren <teks>`");
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=id|en`).then(r => r.json());
      return send(chatIdMsg, `🌐 *ID→EN:*\n${res.responseData?.translatedText || "Gagal"}`);
    } catch { return send(chatIdMsg, "❌ Gagal translate."); }
  }

  if (text?.startsWith(".cuaca ") || text?.startsWith(".weather ")) {
    const city = text.replace(/^\.(cuaca|weather)\s*/, "");
    if (!city) return send(chatIdMsg, "❌ `.cuaca <kota>`");
    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`).then(r => r.json());
      const c = res.current_condition[0];
      const area = res.nearest_area[0];
      return send(chatIdMsg, `🌤️ *Cuaca ${city}*\n\n🌡️ Suhu: ${c.temp_C}°C (${c.temp_F}°F)\n🌡️ Feels like: ${c.FeelsLikeC}°C\n💧 Kelembaban: ${c.humidity}%\n💨 Angin: ${c.windspeedKmph} km/h ${c.winddir16Point}\n👁️ Visibility: ${c.visibility} km\n☁️ Kondisi: ${c.weatherDesc[0].value}\n🌧️ Curah hujan: ${c.precipMM} mm\n☀️ UV Index: ${c.uvIndex}\n📍 Area: ${area.areaName[0].value}, ${area.region[0].value}`);
    } catch { return send(chatIdMsg, "❌ Gagal ambil cuaca."); }
  }

  if (text?.startsWith(".whois ")) {
    const domain = text.replace(".whois ", "").trim();
    if (!domain) return send(chatIdMsg, "❌ `.whois <domain>`");
    return send(chatIdMsg, `🔍 *WHOIS: ${domain}*\n\n🌐 Domain: ${domain}\n🔗 Cek lengkap: https://who.is/whois/${domain}`);
  }

  if (text?.startsWith(".qr ")) {
    const q = text.replace(".qr ", "").trim();
    if (!q) return send(chatIdMsg, "❌ `.qr <teks/url>`");
    return sendPhoto(chatIdMsg, `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(q)}`, `📱 QR: ${q}`);
  }

  if (text?.startsWith(".short ") || text?.startsWith(".shorturl ")) {
    const url = text.replace(/^\.(short|shorturl)\s*/, "").trim();
    if (!url) return send(chatIdMsg, "❌ `.short <url>`");
    try {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`).then(r => r.text());
      return send(chatIdMsg, `🔗 *Short URL:*\n${res}`);
    } catch { return send(chatIdMsg, "❌ Gagal."); }
  }

  if (text?.startsWith(".github ") || text?.startsWith(".gh ")) {
    const username = text.replace(/^\.(github|gh)\s*/, "").trim();
    if (!username) return send(chatIdMsg, "❌ `.github <username>`");
    try {
      const res = await fetch(`https://api.github.com/users/${username}`).then(r => r.json());
      if (res.message) return send(chatIdMsg, "❌ User tidak ditemukan.");
      return send(chatIdMsg, `🐙 *GitHub: ${res.login}*\n\n📛 Nama: ${res.name || "-"}\n📝 Bio: ${res.bio || "-"}\n📍 Lokasi: ${res.location || "-"}\n🏢 Company: ${res.company || "-"}\n📦 Repos: ${res.public_repos}\n👥 Followers: ${res.followers}\n👤 Following: ${res.following}\n📅 Joined: ${res.created_at?.split("T")[0]}\n🔗 ${res.html_url}`);
    } catch { return send(chatIdMsg, "❌ Gagal."); }
  }

  if (text === ".tempmail") {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let email = "";
    for (let i = 0; i < 10; i++) email += chars[Math.floor(Math.random() * chars.length)];
    const domains = ["@tempmail.id", "@mailtemp.org", "@tmpmail.net", "@guerrillamail.com", "@throwaway.email"];
    email += domains[Math.floor(Math.random() * domains.length)];
    return send(chatIdMsg, `📧 *Temp Mail:*\n\n\`${email}\`\n\n⚠️ _Email disposable_`);
  }

  if (text === ".password" || text === ".genpass") {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    const lengths = [8, 12, 16, 20, 24];
    let result = "🔑 *Random Passwords:*\n\n";
    for (const len of lengths) {
      let pass = "";
      for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
      result += `${len} char: \`${pass}\`\n`;
    }
    return send(chatIdMsg, result);
  }

  if (text?.startsWith(".tobin ")) {
    const q = text.replace(".tobin ", "");
    return send(chatIdMsg, `💻 *Binary:*\n\`${q.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")}\``);
  }

  if (text?.startsWith(".frombin ")) {
    const q = text.replace(".frombin ", "").trim();
    try { return send(chatIdMsg, `📝 *Text:*\n\`${q.split(" ").map(b => String.fromCharCode(parseInt(b, 2))).join("")}\``); }
    catch { return send(chatIdMsg, "❌ Format salah."); }
  }

  if (text?.startsWith(".tohex ")) {
    const q = text.replace(".tohex ", "");
    return send(chatIdMsg, `🔢 *Hex:*\n\`${q.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")}\``);
  }

  if (text?.startsWith(".fromhex ")) {
    const q = text.replace(".fromhex ", "").trim();
    try { return send(chatIdMsg, `📝 *Text:*\n\`${q.split(" ").map(h => String.fromCharCode(parseInt(h, 16))).join("")}\``); }
    catch { return send(chatIdMsg, "❌ Format salah."); }
  }

  if (text?.startsWith(".tooct ")) {
    const q = text.replace(".tooct ", "");
    return send(chatIdMsg, `🔢 *Octal:*\n\`${q.split("").map(c => c.charCodeAt(0).toString(8).padStart(3, "0")).join(" ")}\``);
  }

  if (text?.startsWith(".fromoct ")) {
    const q = text.replace(".fromoct ", "").trim();
    try { return send(chatIdMsg, `📝 *Text:*\n\`${q.split(" ").map(o => String.fromCharCode(parseInt(o, 8))).join("")}\``); }
    catch { return send(chatIdMsg, "❌ Format salah."); }
  }

  if (text?.startsWith(".toascii ")) {
    const q = text.replace(".toascii ", "");
    return send(chatIdMsg, `🔢 *ASCII:*\n\`${q.split("").map(c => c.charCodeAt(0)).join(" ")}\``);
  }

  if (text?.startsWith(".fromascii ")) {
    const q = text.replace(".fromascii ", "").trim();
    try { return send(chatIdMsg, `📝 *Text:*\n\`${q.split(" ").map(n => String.fromCharCode(parseInt(n))).join("")}\``); }
    catch { return send(chatIdMsg, "❌ Format salah."); }
  }

  if (text?.startsWith(".reverse ")) {
    return send(chatIdMsg, `🔄 *Reversed:*\n\`${text.replace(".reverse ", "").split("").reverse().join("")}\``);
  }

  if (text?.startsWith(".upper ")) return send(chatIdMsg, `🔠 \`${text.replace(".upper ", "").toUpperCase()}\``);
  if (text?.startsWith(".lower ")) return send(chatIdMsg, `🔡 \`${text.replace(".lower ", "").toLowerCase()}\``);
  if (text?.startsWith(".title ")) return send(chatIdMsg, `📝 \`${text.replace(".title ", "").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")}\``);
  if (text?.startsWith(".camel ")) return send(chatIdMsg, `📝 \`${text.replace(".camel ", "").split(" ").map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("")}\``);
  if (text?.startsWith(".snake ")) return send(chatIdMsg, `📝 \`${text.replace(".snake ", "").toLowerCase().replace(/\s+/g, "_")}\``);
  if (text?.startsWith(".kebab ")) return send(chatIdMsg, `📝 \`${text.replace(".kebab ", "").toLowerCase().replace(/\s+/g, "-")}\``);

  if (text?.startsWith(".count ")) {
    const q = text.replace(".count ", "");
    const words = q.split(/\s+/).filter(Boolean).length;
    const chars = q.length;
    const charsNoSpace = q.replace(/\s/g, "").length;
    const lines = q.split("\n").length;
    const vowels = (q.match(/[aeiouAEIOU]/g) || []).length;
    const consonants = (q.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
    const numbers = (q.match(/[0-9]/g) || []).length;
    return send(chatIdMsg, `📊 *Text Stats:*\n\n📝 Karakter: ${chars}\n📝 Tanpa spasi: ${charsNoSpace}\n📄 Kata: ${words}\n📑 Baris: ${lines}\n🔤 Vokal: ${vowels}\n🔤 Konsonan: ${consonants}\n🔢 Angka: ${numbers}`);
  }

  if (text?.startsWith(".hash ")) {
    const q = text.replace(".hash ", "");
    let h = 0;
    for (let i = 0; i < q.length; i++) { h = ((h << 5) - h) + q.charCodeAt(i); h |= 0; }
    const h2 = Math.abs(h).toString(16).padStart(8, "0");
    let h3 = 0;
    for (let i = 0; i < q.length; i++) { h3 = q.charCodeAt(i) + ((h3 << 6) + (h3 << 16) - h3); }
    const h4 = Math.abs(h3).toString(16).padStart(8, "0");
    return send(chatIdMsg, `#️⃣ *Hash Results:*\n\nDJB2: \`${h2}\`\nSDBM: \`${h4}\`\nSimple: \`${Math.abs(h).toString(36)}\``);
  }

  if (text === ".epoch" || text === ".timestamp") {
    const now = new Date();
    return send(chatIdMsg, `⏰ *Timestamp*\n\n🔢 Epoch: \`${Math.floor(now.getTime() / 1000)}\`\n📅 ISO: ${now.toISOString()}\n🕐 WIB: ${now.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}\n🕐 WITA: ${now.toLocaleString("id-ID", { timeZone: "Asia/Makassar" })}\n🕐 WIT: ${now.toLocaleString("id-ID", { timeZone: "Asia/Jayapura" })}\n🕐 UTC: ${now.toUTCString()}`);
  }

  if (text?.startsWith(".color")) {
    const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    const r = parseInt(hex.substr(0, 2), 16), g = parseInt(hex.substr(2, 2), 16), b = parseInt(hex.substr(4, 2), 16);
    const hsl = rgbToHsl(r, g, b);
    return send(chatIdMsg, `🎨 *Random Color*\n\nHEX: #${hex}\nRGB: ${r}, ${g}, ${b}\nHSL: ${hsl}\n🔗 Preview: https://via.placeholder.com/100/${hex}/${hex}`);
  }

  if (text?.startsWith(".lorem")) {
    const parts = text.split(" ");
    const count = parseInt(parts[1]) || 3;
    const sentences = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      "Nulla pariatur, at vero eos et accusamus et iusto odio dignissimos ducimus.",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.",
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse."
    ];
    let result = "";
    for (let i = 0; i < Math.min(count, 20); i++) result += sentences[i % sentences.length] + " ";
    return send(chatIdMsg, `📝 *Lorem Ipsum (${count} kalimat):*\n\n${result.trim()}`);
  }

  if (text?.startsWith(".uuid")) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return send(chatIdMsg, `🔑 *UUID:*\n\`${uuid}\``);
  }

  if (text?.startsWith(".urlcheck ") || text?.startsWith(".checkurl ")) {
    const url = text.replace(/^\.(urlcheck|checkurl)\s*/, "").trim();
    if (!url) return send(chatIdMsg, "❌ `.urlcheck <url>`");
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow" });
      return send(chatIdMsg, `🔗 *URL Check:*\n\n📍 URL: ${url}\n✅ Status: ${res.status} ${res.statusText}\n📝 Content-Type: ${res.headers.get("content-type") || "-"}\n📏 Size: ${res.headers.get("content-length") || "Unknown"}\n🔒 HTTPS: ${url.startsWith("https") ? "Ya" : "Tidak"}`);
    } catch (e) {
      return send(chatIdMsg, `❌ Error: ${e.message}`);
    }
  }

  if (text?.startsWith(".useragent") || text === ".ua") {
    const uas = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
      "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 Chrome/119.0.0.0 Mobile Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0"
    ];
    return send(chatIdMsg, `🖥️ *Random User Agent:*\n\n\`${uas[Math.floor(Math.random() * uas.length)]}\``);
  }

  if (text?.startsWith(".morse ")) {
    const morseMap = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/' };
    const q = text.replace(".morse ", "").toUpperCase();
    const morse = q.split("").map(c => morseMap[c] || c).join(" ");
    return send(chatIdMsg, `📡 *Morse Code:*\n\`${morse}\``);
  }

  if (text?.startsWith(".demorse ")) {
    const morseRev = { '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9', '/': ' ' };
    const q = text.replace(".demorse ", "").trim();
    const decoded = q.split(" ").map(m => morseRev[m] || '?').join("");
    return send(chatIdMsg, `📝 *Decoded:*\n\`${decoded}\``);
  }

  if (text?.startsWith(".rot13 ")) {
    const q = text.replace(".rot13 ", "");
    const rot = q.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)));
    return send(chatIdMsg, `🔄 *ROT13:*\n\`${rot}\``);
  }

  if (text?.startsWith(".urlencode ")) {
    return send(chatIdMsg, `🔗 *URL Encoded:*\n\`${encodeURIComponent(text.replace(".urlencode ", ""))}\``);
  }

  if (text?.startsWith(".urldecode ")) {
    try { return send(chatIdMsg, `🔗 *URL Decoded:*\n\`${decodeURIComponent(text.replace(".urldecode ", ""))}\``); }
    catch { return send(chatIdMsg, "❌ Format salah."); }
  }

  if (text?.startsWith(".htmlencode ")) {
    const q = text.replace(".htmlencode ", "");
    const encoded = q.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    return send(chatIdMsg, `🔗 *HTML Encoded:*\n\`${encoded}\``);
  }

  if (text?.startsWith(".wordcount ")) {
    const q = text.replace(".wordcount ", "");
    const uniqueWords = [...new Set(q.toLowerCase().split(/\s+/).filter(Boolean))];
    return send(chatIdMsg, `📊 *Word Analysis:*\n\nTotal: ${q.split(/\s+/).filter(Boolean).length}\nUnique: ${uniqueWords.length}\nAvg length: ${(q.replace(/\s/g, "").length / q.split(/\s+/).filter(Boolean).length).toFixed(1)} chars`);
  }

  if (text?.startsWith(".randomstring ")) {
    const len = parseInt(text.replace(".randomstring ", "")) || 16;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < Math.min(len, 100); i++) result += chars[Math.floor(Math.random() * chars.length)];
    return send(chatIdMsg, `🔤 *Random String (${len}):*\n\`${result}\``);
  }

  if (text?.startsWith(".ipku") || text === ".myip") {
    try {
      const res = await fetch("https://api.ipify.org?format=json").then(r => r.json());
      return send(chatIdMsg, `🌐 *Server IP:* \`${res.ip}\``);
    } catch { return send(chatIdMsg, "❌ Gagal."); }
  }

  // ==========================================
  // AI COMMANDS
  // ==========================================
  if (text?.startsWith(".ai ") || text?.startsWith(".gemini ") || text?.startsWith(".gpt ") || text?.startsWith(".ask ")) {
    const q = text.replace(/^\.(ai|gemini|gpt|ask)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.ai <pertanyaan>`");
    await send(chatIdMsg, "⏳ Mikir dulu bentar...");
    try {
      const messages = [
        { role: "system", content: "Kamu adalah Yanshs AI, asisten AI yang sangat cerdas, ramah, dan helpful. Kamu dibuat oleh Yanshs. Owner: Yanshs. Komunitas: t.me/trasersecteam. Jawab dengan bahasa yang sopan dan informatif. Kamu bisa menjawab dalam bahasa Indonesia atau bahasa lain sesuai permintaan." },
        { role: "user", content: q }
      ];
      const res = await fetch("https://aichat.sabae.cc/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4o-mini", messages })
      });
      if (!res.ok) return send(chatIdMsg, `⚠️ API Error ${res.status}.`);
      const data = await res.text();
      return send(chatIdMsg, `🤖 *Yanshs AI:*\n\n${data || "Maaf, tidak bisa dijawab."}`);
    } catch (e) { return send(chatIdMsg, `❌ Error: ${e.message}`); }
  }

// === AUTO AI TANPA PREFIX (BALAS TIAP 5 CHAT) ===
if (text && !text.startsWith(".")) {
  if (!autoAiCounter[chatIdMsg]) {
    autoAiCounter[chatIdMsg] = 0;
  }
  autoAiCounter[chatIdMsg]++;
  if (autoAiCounter[chatIdMsg] % 5 !== 0) return;
  const q = text;
  if (!q) return;
  await send(chatIdMsg, "🤓🤓🤓");
  try {
    const messages = [
      { 
        role: "system", 
        content: "kamu adalah Suki ai ai yang tengil ngeselin ngelunjak soalnya user suka, kamu suka pake emoji 🤓😹 dan kamu cuek suka bilang apalah dan lu gw bukan aku kamu" 
      },
      { role: "user", content: q }
    ];
    const res = await fetch("https://aichat.sabae.cc/api/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini", messages })
    });
    if (!res.ok) return send(chatIdMsg, `⚠️ API Error ${res.status}.`);
    const data = await res.text();
    return send(chatIdMsg, data || "Maaf, tidak bisa dijawab.");
  } catch (e) {
    return send(chatIdMsg, `❌ Error: ${e.message}`);
  }
}


  if (text?.startsWith(".imagine ") || text?.startsWith(".img ")) {
    const q = text.replace(/^\.(imagine|img)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.imagine <deskripsi>`");
    try {
      const messages = [
        { role: "system", content: "Generate a detailed image description based on user input. Describe it vividly." },
        { role: "user", content: `Describe this image in detail: ${q}` }
      ];
      const res = await fetch("https://aichat.sabae.cc/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4o-mini", messages })
      });
      const data = await res.text();
      return send(chatIdMsg, `🎨 *AI Image Description:*\n\n${data}`);
    } catch { return send(chatIdMsg, "❌ Gagal generate."); }
  }

  if (text?.startsWith(".summarize ") || text?.startsWith(".ringkas ")) {
    const q = text.replace(/^\.(summarize|ringkas)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.ringkas <teks panjang>`");
    try {
      const messages = [
        { role: "system", content: "Ringkas teks berikut menjadi poin-poin penting dalam bahasa Indonesia." },
        { role: "user", content: q }
      ];
      const res = await fetch("https://aichat.sabae.cc/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4o-mini", messages })
      });
      const data = await res.text();
      return send(chatIdMsg, `📋 *Ringkasan:*\n\n${data}`);
    } catch { return send(chatIdMsg, "❌ Gagal meringkas."); }
  }

  if (text?.startsWith(".codeai ") || text?.startsWith(".code ")) {
    const q = text.replace(/^\.(codeai|code)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.code <pertanyaan coding>`");
    try {
      const messages = [
        { role: "system", content: "Kamu adalah expert programmer. Jawab pertanyaan coding dengan contoh kode yang jelas. Gunakan markdown code blocks." },
        { role: "user", content: q }
      ];
      const res = await fetch("https://aichat.sabae.cc/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4o-mini", messages })
      });
      const data = await res.text();
      return send(chatIdMsg, `💻 *Code AI:*\n\n${data}`);
    } catch { return send(chatIdMsg, "❌ Gagal."); }
  }

  // REMINI
  if (text?.startsWith(".remini") || text?.startsWith(".hd")) {
    let imageUrl = "";
    if (update.message.reply_to_message?.photo) {
      const photos = update.message.reply_to_message.photo;
      const fid = photos[photos.length - 1].file_id;
      const file = await getFile(fid);
      if (file.result?.file_path) imageUrl = `https://api.telegram.org/file/bot${token}/${file.result.file_path}`;
    } else {
      const q = text.replace(/^\.(remini|hd)\s*/, "");
      if (q?.startsWith("http")) imageUrl = q;
    }
    if (!imageUrl) return send(chatIdMsg, "❌ Reply foto atau `.remini <link>`");
    await send(chatIdMsg, "🔄 Memproses HD...");
    try {
      const controller = new AbortController();
      const tid = setTimeout(() => controller.abort(), 60000);
      const res = await fetch(`https://api.ryzumi.vip/api/ai/remini?url=${encodeURIComponent(imageUrl)}`, { signal: controller.signal });
      clearTimeout(tid);
      if (!res.ok) return send(chatIdMsg, `❌ API Error: ${res.status}`);
      const ct = res.headers.get("content-type");
      if (ct?.includes("json")) {
        const json = await res.json();
        const u = json.result || json.url || json.data;
        if (u) return sendPhoto(chatIdMsg, u, "✨ HD by Remini");
        return send(chatIdMsg, "❌ Gagal HD.");
      } else if (ct?.includes("image")) {
        return sendPhoto(chatIdMsg, `https://api.ryzumi.vip/api/ai/remini?url=${encodeURIComponent(imageUrl)}`, "✨ HD by Remini");
      }
      const t = await res.text();
      if (t.startsWith("http")) return sendPhoto(chatIdMsg, t.trim(), "✨ HD by Remini");
      return send(chatIdMsg, "❌ Gagal HD.");
    } catch (e) {
      return send(chatIdMsg, e.name === 'AbortError' ? "❌ Timeout." : `❌ Error: ${e.message}`);
    }
  }

  // ==========================================
  // GAME COMMANDS (30+)
  // ==========================================
  if (text === ".dadu" || text === ".dice") return send(chatIdMsg, `🎲 Dadu: *${Math.floor(Math.random() * 6) + 1}*`);
  if (text === ".koin" || text === ".flip") return send(chatIdMsg, Math.random() > 0.5 ? "🪙 *KEPALA*" : "🪙 *EKOR*");
  
  if (text === ".kerang" || text === ".kerangajaib" || text === ".8ball") {
    const a = ["Ya", "Tidak", "Mungkin", "Coba lagi", "Pasti!", "Tidak mungkin", "Bisa jadi", "Tentu saja", "Jangan harap", "Mungkin suatu saat", "Coba tanya lagi nanti", "Kayaknya iya", "Kayaknya nggak", "Yakin banget!", "Ragu-ragu nih"];
    return send(chatIdMsg, `🐚 *Kerang Ajaib:* ${a[Math.floor(Math.random() * a.length)]}`);
  }
  
  if (text === ".slot") {
    const s = ["🍎", "🍊", "🍋", "🍇", "🍒", "💎", "7️⃣", "🔔", "⭐", "🍉"];
    const r1 = s[Math.floor(Math.random() * s.length)], r2 = s[Math.floor(Math.random() * s.length)], r3 = s[Math.floor(Math.random() * s.length)];
    let prize = "😢 Coba lagi!";
    if (r1 === r2 && r2 === r3) prize = r1 === "💎" ? "💎💎💎 *MEGA JACKPOT!!*" : r1 === "7️⃣" ? "7️⃣7️⃣7️⃣ *SUPER JACKPOT!*" : "🎉 *JACKPOT!*";
    else if (r1 === r2 || r2 === r3 || r1 === r3) prize = "🎯 *2x Match!*";
    return send(chatIdMsg, `🎰 [ ${r1} | ${r2} | ${r3} ]\n\n${prize}`);
  }
  
  if (text === ".suit" || text === ".rps" || text?.startsWith(".suit ") || text?.startsWith(".rps ")) {
    const choices = ["batu", "gunting", "kertas"];
    const emojis = { batu: "🪨", gunting: "✂️", kertas: "📄" };
    const botChoice = choices[Math.floor(Math.random() * 3)];
    const userChoice = text.split(" ")[1]?.toLowerCase();
    if (!userChoice || !choices.includes(userChoice)) {
      return send(chatIdMsg, `Bot pilih: *${emojis[botChoice]} ${botChoice}*\n\n_Ketik: .suit batu/gunting/kertas_`);
    }
    let result;
    if (userChoice === botChoice) result = "🤝 *SERI!*";
    else if ((userChoice === "batu" && botChoice === "gunting") || (userChoice === "gunting" && botChoice === "kertas") || (userChoice === "kertas" && botChoice === "batu")) result = "🏆 *KAMU MENANG!*";
    else result = "💀 *KAMU KALAH!*";
    return send(chatIdMsg, `${emojis[userChoice]} vs ${emojis[botChoice]}\n\n${result}`);
  }

  if (text?.startsWith(".random") || text?.startsWith(".angka")) {
    const parts = text.split(" ");
    const min = parseInt(parts[1]) || 1, max = parseInt(parts[2]) || 100;
    return send(chatIdMsg, `🎲 Random (${min}-${max}): *${Math.floor(Math.random() * (max - min + 1)) + min}*`);
  }

  if (text === ".truth") {
  const t = [
    "Apa hal paling memalukan yang pernah kamu alami?",
    "Siapa orang terakhir yang kamu chat?",
    "Hal kecil apa yang gampang bikin kamu kesal?",
    "Pernah bohong ke orang terdekat? soal apa?",
    "Apa ketakutan terbesarmu saat ini?",
    "Hal paling random yang pernah kamu pikirin?",
    "Siapa orang yang paling sering muncul di pikiranmu?",
    "Pernah iri sama teman sendiri?",
    "Kapan terakhir kamu nangis dan kenapa?",
    "Apa kebiasaan buruk yang pengen kamu ubah?",
    "Hal apa yang bikin kamu insecure?",
    "Pernah menyesal ngirim pesan ke seseorang?",
    "Siapa orang yang paling kamu percaya?",
    "Apa hal paling aneh yang kamu sukai?",
    "Pernah pura-pura bahagia padahal capek?",
    "Apa mimpi kecil yang belum tercapai?",
    "Hal apa yang bikin kamu bangga sama diri sendiri?",
    "Pernah salah paham sama orang lalu nyesel?",
    "Apa hal yang paling kamu hindari?",
    "Siapa orang yang pengen kamu ajak ngobrol lagi?",
    "Pernah ngerasa sendirian walau rame?",
    "Apa sifatmu yang paling sulit diubah?",
    "Hal apa yang paling sering kamu tunda?",
    "Pernah merasa gagal?",
    "Apa kebohongan kecil yang sering kamu lakukan?",
    "Siapa orang yang paling bikin kamu nyaman?",
    "Apa hal paling random di galeri HP kamu?",
    "Pernah kepikiran nyerah?",
    "Apa hal yang bikin kamu gampang senyum?",
    "Siapa orang yang pengen kamu minta maaf?",
    "Apa hal yang bikin kamu takut kehilangan?",
    "Pernah ngerasa ga dihargai?",
    "Apa kebiasaan aneh sebelum tidur?",
    "Hal apa yang paling kamu rindukan?",
    "Pernah cemburu tanpa alasan jelas?",
    "Apa hal paling impulsif yang pernah kamu lakukan?",
    "Siapa orang yang paling sering kamu stalk?",
    "Pernah salah kirim chat?",
    "Apa hal yang paling kamu syukuri sekarang?",
    "Hal apa yang bikin kamu males jawab chat?",
    "Pernah pengen hilang sebentar dari semua orang?",
    "Apa hal paling receh yang bikin kamu seneng?",
    "Siapa orang yang paling bikin kamu ketawa?",
    "Pernah ngerasa salah ambil keputusan?",
    "Apa hal yang pengen kamu pelajari tapi belum mulai?",
    "Pernah diem-diem ngarep sesuatu dari seseorang?",
    "Apa sifat orang lain yang paling kamu ga suka?",
    "Hal apa yang bikin kamu gampang overthinking?",
    "Siapa orang yang pengen kamu temui lagi?",
    "Apa hal paling jujur tentang dirimu?",
    "Pernah pura-pura sibuk biar ga bales chat?",
    "Apa hal yang paling kamu takutin di masa depan?",
    "Siapa orang yang paling ngerti kamu?",
    "Apa kebiasaan kecil yang bikin kamu tenang?",
    "Pernah ngerasa salah dimengerti?",
    "Apa hal yang paling pengen kamu ubah dari dirimu?",
    "Siapa orang yang pengen kamu lindungi?",
    "Hal apa yang bikin kamu gampang capek?",
    "Pernah nyimpen perasaan sendiri?",
    "Apa hal paling sederhana yang bikin kamu bahagia?",
    "Siapa orang yang paling kamu rindukan sekarang?",
    "Pernah pengen jujur tapi takut?",
    "Apa hal yang paling kamu pelajari tahun ini?",
    "Siapa orang yang paling pengen kamu bikin bangga?"
  ];
  return send(chatIdMsg, `🤔 *TRUTH:*\n${t[Math.floor(Math.random() * t.length)]}`);
}
  if (text === ".dare") {
  const d = [
    "Kirim 'aku lagi mikirin kamu' ke chat terakhir!",
    "Post story dengan caption random satu kata!",
    "Voice note bilang 'halo dunia' dengan gaya lucu!",
    "Ganti foto profil jadi warna hitam 30 menit!",
    "Kirim emoji 😎 ke 10 orang!",
    "Ketik 'aku lapar' di grup!",
    "Kirim stiker favoritmu ke chat terakhir!",
    "Bikin status satu kalimat tanpa huruf vokal!",
    "Ganti nama di grup jadi nama hewan 15 menit!",
    "Kirim foto langit sekarang!",
    "Voice note ketawa 5 detik!",
    "Kirim emoji 🔥 ke 5 chat berbeda!",
    "Ketik 'aku lagi online' lalu hapus!",
    "Kirim GIF random ke grup!",
    "Ketik alfabet terbalik di chat!",
    "Kirim foto meja atau lantai terdekat!",
    "Bikin status pakai emoji doang!",
    "Kirim stiker ke orang yang jarang kamu chat!",
    "Voice note bilang 'tes tes satu dua'!",
    "Ganti wallpaper chat jadi default!",
    "Kirim emoji 🐱 ke 7 orang!",
    "Ketik nama kamu pakai huruf besar semua!",
    "Bikin status jam berapa sekarang!",
    "Kirim foto benda warna merah!",
    "Kirim emoji 😂 ke chat terakhir!",
    "Voice note nyebut nama kamu 3 kali!",
    "Ketik 'aku lagi gabut' di grup!",
    "Kirim foto sepatu atau sandal!",
    "Ganti nama kontak diri sendiri!",
    "Kirim stiker lucu ke grup!",
    "Bikin status satu kata bahasa Inggris!",
    "Kirim emoji 🌙 ke 5 orang!",
    "Ketik angka 1 sampai 20 tanpa spasi!",
    "Voice note bilang 'selesai'!",
    "Kirim foto tangan kamu!",
    "Ketik 'halo' ke 3 chat acak!",
    "Ganti nada dering ke default!",
    "Kirim emoji 🍕 ke 5 orang!",
    "Bikin status pakai tanda tanya!",
    "Kirim stiker ke chat paling atas!",
    "Voice note bilang 'ok gas'!",
    "Ketik warna favoritmu!",
    "Kirim foto jendela atau pintu!",
    "Ketik 'aku masih hidup' di grup!",
    "Kirim emoji ⭐ ke 10 orang!",
    "Bikin status pakai angka!",
    "Kirim GIF hewan lucu!",
    "Voice note bilang 'mantap'!",
    "Ketik nama hari ini!",
    "Kirim foto benda terdekat!",
    "Ganti tema chat 10 menit!",
    "Kirim emoji 🎧 ke 5 orang!",
    "Bikin status satu emoji!",
    "Kirim stiker ke orang terakhir yang chat kamu!",
    "Voice note bilang 'halo halo'!",
    "Ketik 'test' lalu hapus!",
    "Kirim foto langit-langit!",
    "Ketik 5 emoji acak!",
    "Kirim emoji 🚀 ke 3 orang!",
    "Bikin status satu kalimat lucu!",
    "Voice note bilang 'sip'!"
  ];
  return send(chatIdMsg, `😈 *DARE:*\n${d[Math.floor(Math.random() * d.length)]}`);
}

  if (text === ".tebakangka") return send(chatIdMsg, `🔢 Tebak 1-100!\n\n_Jawaban: ||${Math.floor(Math.random() * 100) + 1}||_`);

  if (text === ".tebakkata") {
    const words = ["JAVASCRIPT", "TELEGRAM", "INDONESIA", "KOMPUTER", "HANDPHONE", "INTERNET", "APLIKASI", "TEKNOLOGI", "DATABASE", "ARTIFICIAL", "INTELLIGENCE", "PROGRAMMING", "DEVELOPER", "HACKING", "SECURITY", "ALGORITHM", "FRAMEWORK", "CRYPTOCURRENCY", "BLOCKCHAIN", "METAVERSE"];
    const word = words[Math.floor(Math.random() * words.length)];
    const hint = word[0] + "_".repeat(word.length - 2) + word[word.length - 1];
    return send(chatIdMsg, `🎯 *TEBAK KATA*\n\nHint: \`${hint}\` (${word.length} huruf)\n\n_Jawaban: ||${word}||_`);
  }

  if (text === ".math" || text === ".matematika") {
    const a = Math.floor(Math.random() * 50) + 1, b = Math.floor(Math.random() * 50) + 1;
    const ops = ["+", "-", "*"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const answer = eval(`${a} ${op} ${b}`);
    return send(chatIdMsg, `🧮 *MATH QUIZ*\n\n${a} ${op} ${b} = ?\n\n_Jawaban: ||${answer}||_`);
  }

  if (text === ".tebakbendera") {
  const flags = [
    // 🇮🇩 ASEAN
    { flag: "🇮🇩", name: "Indonesia" },
    { flag: "🇲🇾", name: "Malaysia" },
    { flag: "🇸🇬", name: "Singapura" },
    { flag: "🇹🇭", name: "Thailand" },
    { flag: "🇵🇭", name: "Filipina" },
    { flag: "🇻🇳", name: "Vietnam" },
    { flag: "🇱🇦", name: "Laos" },
    { flag: "🇰🇭", name: "Kamboja" },
    { flag: "🇲🇲", name: "Myanmar" },
    { flag: "🇧🇳", name: "Brunei Darussalam" },

    // 🌏 Asia
    { flag: "🇯🇵", name: "Jepang" },
    { flag: "🇰🇷", name: "Korea Selatan" },
    { flag: "🇨🇳", name: "China" },
    { flag: "🇮🇳", name: "India" },
    { flag: "🇵🇰", name: "Pakistan" },
    { flag: "🇧🇩", name: "Bangladesh" },
    { flag: "🇳🇵", name: "Nepal" },
    { flag: "🇱🇰", name: "Sri Lanka" },
    { flag: "🇲🇳", name: "Mongolia" },
    { flag: "🇰🇿", name: "Kazakhstan" },
    { flag: "🇦🇫", name: "Afghanistan" },
    { flag: "🇮🇷", name: "Iran" },
    { flag: "🇮🇶", name: "Irak" },
    { flag: "🇸🇦", name: "Arab Saudi" },
    { flag: "🇦🇪", name: "Uni Emirat Arab" },
    { flag: "🇶🇦", name: "Qatar" },
    { flag: "🇰🇼", name: "Kuwait" },
    { flag: "🇮🇱", name: "Israel" },
    { flag: "🇯🇴", name: "Yordania" },
    { flag: "🇸🇾", name: "Suriah" },

    // 🇪🇺 Eropa
    { flag: "🇬🇧", name: "Inggris" },
    { flag: "🇫🇷", name: "Prancis" },
    { flag: "🇩🇪", name: "Jerman" },
    { flag: "🇮🇹", name: "Italia" },
    { flag: "🇪🇸", name: "Spanyol" },
    { flag: "🇵🇹", name: "Portugal" },
    { flag: "🇳🇱", name: "Belanda" },
    { flag: "🇧🇪", name: "Belgia" },
    { flag: "🇨🇭", name: "Swiss" },
    { flag: "🇦🇹", name: "Austria" },
    { flag: "🇸🇪", name: "Swedia" },
    { flag: "🇳🇴", name: "Norwegia" },
    { flag: "🇩🇰", name: "Denmark" },
    { flag: "🇫🇮", name: "Finlandia" },
    { flag: "🇵🇱", name: "Polandia" },
    { flag: "🇨🇿", name: "Ceko" },
    { flag: "🇭🇺", name: "Hongaria" },
    { flag: "🇷🇴", name: "Romania" },
    { flag: "🇧🇬", name: "Bulgaria" },
    { flag: "🇬🇷", name: "Yunani" },
    { flag: "🇺🇦", name: "Ukraina" },
    { flag: "🇷🇺", name: "Rusia" },
    { flag: "🇮🇪", name: "Irlandia" },
    { flag: "🇮🇸", name: "Islandia" },

    // 🌍 Afrika
    { flag: "🇪🇬", name: "Mesir" },
    { flag: "🇿🇦", name: "Afrika Selatan" },
    { flag: "🇳🇬", name: "Nigeria" },
    { flag: "🇰🇪", name: "Kenya" },
    { flag: "🇹🇿", name: "Tanzania" },
    { flag: "🇪🇹", name: "Ethiopia" },
    { flag: "🇲🇦", name: "Maroko" },
    { flag: "🇩🇿", name: "Aljazair" },
    { flag: "🇹🇳", name: "Tunisia" },
    { flag: "🇸🇩", name: "Sudan" },
    { flag: "🇬🇭", name: "Ghana" },
    { flag: "🇸🇳", name: "Senegal" },

    // 🌎 Amerika
    { flag: "🇺🇸", name: "Amerika Serikat" },
    { flag: "🇨🇦", name: "Kanada" },
    { flag: "🇲🇽", name: "Meksiko" },
    { flag: "🇧🇷", name: "Brasil" },
    { flag: "🇦🇷", name: "Argentina" },
    { flag: "🇨🇱", name: "Chile" },
    { flag: "🇨🇴", name: "Kolombia" },
    { flag: "🇵🇪", name: "Peru" },
    { flag: "🇻🇪", name: "Venezuela" },
    { flag: "🇧🇴", name: "Bolivia" },
    { flag: "🇵🇾", name: "Paraguay" },
    { flag: "🇺🇾", name: "Uruguay" },
    { flag: "🇨🇺", name: "Kuba" },

    // 🌏 Oseania
    { flag: "🇦🇺", name: "Australia" },
    { flag: "🇳🇿", name: "Selandia Baru" },
    { flag: "🇵🇬", name: "Papua Nugini" },
    { flag: "🇫🇯", name: "Fiji" },
    { flag: "🇸🇧", name: "Kepulauan Solomon" }
  ];

  const f = flags[Math.floor(Math.random() * flags.length)];
  return send(
    chatIdMsg,
    `🏳️ *TEBAK BENDERA*\n\n${f.flag}\n\nNegara apa?\n\n_Jawaban: ||${f.name}||_`
  );
}

  if (text === ".tebakemoji") {
    const emojis = [
      { emoji: "🎬🦁👑", answer: "The Lion King" }, { emoji: "🕷️🦸‍♂️🏙️", answer: "Spider-Man" },
      { emoji: "❄️👸⛄", answer: "Frozen" }, { emoji: "🧙‍♂️💍🌋", answer: "Lord of the Rings" },
      { emoji: "🦈🌊😱", answer: "Jaws" }, { emoji: "👻👻🏚️", answer: "Ghostbusters" },
      { emoji: "🚢❄️💑", answer: "Titanic" }, { emoji: "🏎️💨🏆", answer: "Cars" },
      { emoji: "🦖🏝️😱", answer: "Jurassic Park" }, { emoji: "🤖❤️🌱", answer: "WALL-E" },
      { emoji: "🧜‍♀️🐠🌊", answer: "The Little Mermaid" }, { emoji: "🐭👨‍🍳🇫🇷", answer: "Ratatouille" },
      { emoji: "👨‍🚀🌍🌌", answer: "Interstellar" }, { emoji: "🎃👻🎄", answer: "Nightmare Before Christmas" },
      { emoji: "🐼🥋🏯", answer: "Kung Fu Panda" }, { emoji: "🧸🐯🐷", answer: "Winnie the Pooh" },
      { emoji: "👸🐉🏯", answer: "Mulan" }, { emoji: "🐠🔍🌊", answer: "Finding Nemo" },
      { emoji: "🦇🌃🃏", answer: "Batman" }, { emoji: "⚡🧙‍♂️🏰", answer: "Harry Potter" }
    ];
    const e = emojis[Math.floor(Math.random() * emojis.length)];
    return send(chatIdMsg, `🎬 *TEBAK EMOJI*\n\n${e.emoji}\n\nFilm apa?\n\n_Jawaban: ||${e.answer}||_`);
  }

  if (text === ".tebaklagu") {
  const songs = [
    { hint: "🎵 _\"Kau begitu sempurna…\"_", answer: "Sempurna - Andra and The Backbone" },
    { hint: "🎵 _\"Bukan cinta biasa…\"_", answer: "Bukan Cinta Biasa - Siti Nurhaliza" },
    { hint: "🎵 _\"Aku masih seperti yang dulu…\"_", answer: "Separuh Aku - Noah" },
    { hint: "🎵 _\"Dan ketika kau marah…\"_", answer: "Pelangi di Matamu - Jamrud" },
    { hint: "🎵 _\"Biar ku simpan rasa ini…\"_", answer: "Biar Ku Simpan - Rossa" },
    { hint: "🎵 _\"Mimpi adalah kunci…\"_", answer: "Laskar Pelangi - Nidji" },
    { hint: "🎵 _\"Pergilah kasih…\"_", answer: "Pergilah Kasih - Chrisye" },
    { hint: "🎵 _\"Cinta ini membunuhku…\"_", answer: "Cinta Ini Membunuhku - D'Masiv" },
    { hint: "🎵 _\"Aku bukan Superman…\"_", answer: "Kuta Rock City - Superman Is Dead" },
    { hint: "🎵 _\"Seandainya aku punya…\"_", answer: "Sayap Pelindungmu - The Overtunes" },

    { hint: "🎵 _\"Hingga ujung waktu…\"_", answer: "Hingga Ujung Waktu - Sheila On 7" },
    { hint: "🎵 _\"Dan bila esok…\"_", answer: "Dan - Sheila On 7" },
    { hint: "🎵 _\"Kisah kita takkan…\"_", answer: "Kisah Kita - Judika" },
    { hint: "🎵 _\"Aku yang tersakiti…\"_", answer: "Aku Yang Tersakiti - Judika" },
    { hint: "🎵 _\"Maafkan aku…\"_", answer: "Maafkan Aku - Reza Artamevia" },
    { hint: "🎵 _\"Tak ada yang abadi…\"_", answer: "Yang Terdalam - Noah" },
    { hint: "🎵 _\"Izinkan aku…\"_", answer: "Izinkan Aku - Iwan Fals" },
    { hint: "🎵 _\"Aku jatuh cinta…\"_", answer: "Jatuh Cinta - Raisa" },
    { hint: "🎵 _\"Apalah arti menunggu…\"_", answer: "Menunggu Kamu - Anji" },
    { hint: "🎵 _\"Aku lelah berharap…\"_", answer: "Pupus - Dewa 19" },

    { hint: "🎵 _\"Takkan terganti…\"_", answer: "Takkan Terganti - Kahitna" },
    { hint: "🎵 _\"Cinta pertama…\"_", answer: "Cinta Pertama - Bunga Citra Lestari" },
    { hint: "🎵 _\"Bintang di surga…\"_", answer: "Bintang di Surga - Peterpan" },
    { hint: "🎵 _\"Aku tersesat…\"_", answer: "Aku Tersesat - Armadi Band" },
    { hint: "🎵 _\"Tentang cinta…\"_", answer: "Tentang Cinta - Melly Goeslaw" },
    { hint: "🎵 _\"Kau buat aku…\"_", answer: "Buat Aku Tersenyum - Sheila On 7" },
    { hint: "🎵 _\"Mungkin nanti…\"_", answer: "Mungkin Nanti - Peterpan" },
    { hint: "🎵 _\"Jangan menyerah…\"_", answer: "Jangan Menyerah - D'Masiv" },
    { hint: "🎵 _\"Kau yang terindah…\"_", answer: "Kau Terindah - Alyssa Dezek" },
    { hint: "🎵 _\"Aku milikmu…\"_", answer: "Aku Milikmu - Dewa 19" },

    { hint: "🎵 _\"Saat ku sendiri…\"_", answer: "Saat Ku Sendiri - Virzha" },
    { hint: "🎵 _\"Haruskah aku mati…\"_", answer: "Haruskah Aku Mati - Armand Maulana" },
    { hint: "🎵 _\"Kau hancurkan aku…\"_", answer: "Hancur - Band Seventeen" },
    { hint: "🎵 _\"Cinta tak bersyarat…\"_", answer: "Cinta Tak Bersyarat - Element" },
    { hint: "🎵 _\"Tak ingin sendiri…\"_", answer: "Tak Ingin Sendiri - Dian Piesesha" },
    { hint: "🎵 _\"Aku percaya…\"_", answer: "Aku Percaya - Afgan" },
    { hint: "🎵 _\"Mengejar mimpimu…\"_", answer: "Mimpi - Anggun" },
    { hint: "🎵 _\"Tak seindah dulu…\"_", answer: "Tak Seindah Dulu - Maudy Ayunda" },
    { hint: "🎵 _\"Kau hadir…\"_", answer: "Hadirmu - Vidi Aldiano" },
    { hint: "🎵 _\"Sampai kapan…\"_", answer: "Sampai Kapan - D'Masiv" }
  ];

  const s = songs[Math.floor(Math.random() * songs.length)];
  return send(
    chatIdMsg,
    `🎤 *TEBAK LAGU*\n\n${s.hint}\n\n_Jawaban: ||${s.answer}||_`
  );
}

  if (text === ".siapaaku") {
  const riddles = [
    { hint: "Aku punya leher tapi tidak punya kepala.", answer: "Botol" },
    { hint: "Aku bisa terbang tanpa sayap.", answer: "Waktu" },
    { hint: "Semakin diambil semakin banyak.", answer: "Langkah" },
    { hint: "Aku punya banyak kunci tapi tidak bisa buka pintu.", answer: "Piano" },
    { hint: "Aku punya mata tapi tidak bisa melihat.", answer: "Jarum" },
    { hint: "Aku punya tangan tapi tidak bisa tepuk tangan.", answer: "Jam" },
    { hint: "Aku selalu datang tapi tidak pernah sampai.", answer: "Besok" },
    { hint: "Aku punya daun tapi bukan pohon.", answer: "Buku" },
    { hint: "Aku bisa pecah tanpa disentuh.", answer: "Janji" },
    { hint: "Aku punya banyak gigi tapi tidak bisa menggigit.", answer: "Sisir" },
    { hint: "Aku hitam saat bersih, putih saat kotor.", answer: "Papan tulis" },
    { hint: "Aku punya ekor tapi bukan binatang.", answer: "Layang-layang" },

    { hint: "Aku berjalan tanpa kaki.", answer: "Jam" },
    { hint: "Aku menangis tanpa mata.", answer: "Awan" },
    { hint: "Aku berbicara tanpa mulut.", answer: "Gema" },
    { hint: "Aku berlari tanpa kaki dan menangis tanpa mata.", answer: "Sungai" },
    { hint: "Aku selalu mengikuti tapi tidak pernah memimpin.", answer: "Bayangan" },
    { hint: "Aku ada di awal tapi tidak pernah di akhir.", answer: "Huruf A" },
    { hint: "Aku penuh lubang tapi bisa menampung air.", answer: "Spons" },
    { hint: "Aku ringan tapi sulit dipegang lama.", answer: "Napas" },
    { hint: "Aku tak terlihat tapi bisa dirasakan.", answer: "Angin" },
    { hint: "Aku semakin besar saat dibagi.", answer: "Masalah" },
    { hint: "Aku bisa mengisi ruangan tapi tidak memakan tempat.", answer: "Cahaya" },
    { hint: "Aku selalu di depanmu tapi tak bisa kamu kejar.", answer: "Masa depan" },
    { hint: "Aku naik tapi tidak pernah turun.", answer: "Umur" },
    { hint: "Aku punya wajah tapi tidak punya mulut.", answer: "Jam dinding" },
    { hint: "Aku mengelilingi dunia tapi tetap di sudut.", answer: "Perangko" },
    { hint: "Aku bisa tajam tanpa pisau.", answer: "Pikiran" },
    { hint: "Aku bisa membuat orang kaya dan miskin.", answer: "Waktu" },
    { hint: "Aku tidak punya tulang tapi bisa patah.", answer: "Janji" },
    { hint: "Aku lahir besar lalu mati kecil.", answer: "Lilin" },
    { hint: "Aku bisa basah tanpa air.", answer: "Keringat" },
    { hint: "Aku selalu kembali walau dibuang.", answer: "Kenangan" },
    { hint: "Aku punya rumah tapi tidak tinggal di dalamnya.", answer: "Siput" },
    { hint: "Aku bisa terisi tapi tak pernah penuh.", answer: "Lubang" },
    { hint: "Aku bisa hilang saat disebut.", answer: "Diam" },
    { hint: "Aku ada di siang dan malam, tapi berubah bentuk.", answer: "Bulan" },
    { hint: "Aku punya kepala dan ekor tapi tidak punya tubuh.", answer: "Koin" },
    { hint: "Aku berdetak tapi tidak hidup.", answer: "Jam" },
    { hint: "Aku bisa membuka dunia tanpa kunci.", answer: "Buku" },
    { hint: "Aku tumbuh tanpa akar.", answer: "Rumor" },
    { hint: "Aku bisa panas tanpa api.", answer: "Emosi" },
    { hint: "Aku bisa mengikat tanpa tali.", answer: "Janji" },
    { hint: "Aku ada di mana-mana tapi tak bisa dilihat.", answer: "Udara" },
    { hint: "Aku bisa membuatmu jatuh tanpa menyentuh.", answer: "Cinta" },
    { hint: "Aku selalu menunggu tapi tak pernah lelah.", answer: "Pintu" },
    { hint: "Aku punya banyak halaman tapi bukan buku.", answer: "Internet" },
    { hint: "Aku bisa membunuh tanpa senjata.", answer: "Waktu" },
    { hint: "Aku berjalan pelan tapi tak bisa dihentikan.", answer: "Jam" },
    { hint: "Aku berbunyi saat dipukul tapi diam saat dipegang.", answer: "Gong" },
    { hint: "Aku selalu ada saat kamu butuh, tapi sering dilupakan.", answer: "Otak" }
  ];

  const r = riddles[Math.floor(Math.random() * riddles.length)];
  return send(
    chatIdMsg,
    `🤔 *SIAPA AKU?*\n\n${r.hint}\n\n_Jawaban: ||${r.answer}||_`
  );
}

  if (text === ".wyr" || text === ".wouldyourather") {
  const choices = [
    "Bisa terbang ATAU bisa invisible?",
    "Kaya tapi sendirian ATAU miskin tapi banyak teman?",
    "Tidak bisa pakai HP selamanya ATAU tidak bisa makan makanan favorit?",
    "Hidup di masa lalu ATAU di masa depan?",
    "Selalu bicara jujur ATAU selalu berbohong?",
    "Punya kekuatan super ATAU punya kecerdasan super?",
    "Jadi orang terkenal ATAU jadi orang terkaya?",
    "Bisa baca pikiran orang ATAU bisa teleportasi?",
    "Hidup tanpa musik ATAU tanpa film?",
    "Punya memori sempurna ATAU bisa lupa semua yang buruk?",
    "Tidak pernah tidur ATAU tidak pernah makan?",
    "Selalu benar ATAU selalu bahagia?",
    "Bisa menghentikan waktu ATAU memutar waktu?",
    "Hidup di kota besar ATAU di desa terpencil?",
    "Punya satu sahabat sejati ATAU seratus teman biasa?",
    "Bisa berbicara dengan hewan ATAU menguasai semua bahasa manusia?",
    "Hidup tanpa internet ATAU tanpa AC/kipas?",
    "Selalu telat 10 menit ATAU selalu kepagian 20 menit?",
    "Tidak pernah merasa takut ATAU tidak pernah merasa marah?",
    "Bisa melihat masa depan ATAU mengubah masa lalu?",
    "Punya uang tak terbatas tapi tidak bisa keluar rumah ATAU bebas kemana saja tapi uang pas-pasan?",
    "Hidup tanpa kopi ATAU tanpa gula?",
    "Bisa membuat orang tertawa ATAU membuat orang berpikir?",
    "Selalu panas ATAU selalu kedinginan?",
    "Bisa hidup selamanya ATAU hidup singkat tapi sangat bahagia?",
    "Punya bakat seni ATAU bakat sains?",
    "Tidak bisa bohong ATAU tidak bisa berkata jujur?",
    "Bisa menggandakan diri ATAU bisa menghilang?",
    "Hidup tanpa jam ATAU tanpa kalender?",
    "Selalu menang tapi tidak dihargai ATAU sering kalah tapi dihormati?",
    "Bisa menyembuhkan semua penyakit ATAU mengakhiri semua perang?",
    "Punya rumah mewah ATAU keliling dunia gratis?",
    "Bisa mengontrol api ATAU air?",
    "Selalu sendiri tapi damai ATAU ramai tapi stres?",
    "Bisa menghapus satu kenangan ATAU menambah satu kemampuan?",
    "Tidak pernah lupa ATAU mudah memaafkan?",
    "Bisa berbicara dengan diri masa lalu ATAU diri masa depan?",
    "Hidup tanpa uang ATAU tanpa waktu luang?",
    "Selalu benar di debat ATAU selalu disukai orang?",
    "Punya satu pertanyaan yang selalu dijawab benar ATAU satu permintaan apa saja?",
    "Bisa membaca buku tercepat ATAU memahami paling dalam?",
    "Tidak pernah gagal ATAU pernah gagal tapi belajar banyak?",
    "Bisa membuat semua orang setuju ATAU membuat semua orang jujur?",
    "Hidup sederhana tapi bebas ATAU hidup mewah tapi terikat?",
    "Punya kekuatan besar tapi tanggung jawab besar ATAU hidup normal tanpa beban?",
    "Selalu tenang ATAU selalu bersemangat?",
    "Bisa menciptakan teknologi baru ATAU karya seni abadi?",
    "Hidup tanpa suara ATAU tanpa warna?",
    "Punya satu hari ekstra tiap minggu ATAU satu bulan libur tiap tahun?",
    "Bisa mengingat mimpi ATAU mengontrol mimpi?",
    "Selalu tahu kebenaran pahit ATAU hidup dengan kebohongan manis?",
    "Bisa mengubah dunia sedikit ATAU hidupmu sendiri sepenuhnya?",
    "Punya mentor jenius ATAU tim solid?",
    "Bisa bekerja sendiri selamanya ATAU selalu kerja tim?",
    "Hidup cepat dan intens ATAU lambat dan stabil?",
    "Bisa mengerti semua orang ATAU dimengerti semua orang?"
  ];

  return send(
    chatIdMsg,
    `🤷 *WOULD YOU RATHER*\n\n${choices[Math.floor(Math.random() * choices.length)]}`
  );
}

  if (text === ".tebakharga") {
  const items = [
    { item: "iPhone 15 Pro Max", price: 24999000 },
    { item: "iPhone 14", price: 13999000 },
    { item: "iPhone SE 2022", price: 7499000 },
    { item: "Samsung Galaxy S24 Ultra", price: 21999000 },
    { item: "Samsung Galaxy Z Fold 5", price: 27999000 },
    { item: "Samsung Galaxy Z Flip 5", price: 15999000 },
    { item: "Xiaomi 14", price: 11999000 },
    { item: "Xiaomi Redmi Note 13 Pro", price: 4499000 },
    { item: "OPPO Find X7", price: 14999000 },
    { item: "Vivo X100 Pro", price: 16999000 },
    { item: "ASUS ROG Phone 8 Pro", price: 19999000 },
    { item: "Google Pixel 8 Pro", price: 17999000 },

    { item: "MacBook Air M3", price: 18999000 },
    { item: "MacBook Pro M3 Pro", price: 32999000 },
    { item: "MacBook Pro M3 Max", price: 46999000 },
    { item: "ASUS ROG Zephyrus G14", price: 28999000 },
    { item: "Lenovo Legion Pro 7", price: 31999000 },
    { item: "Acer Nitro 5", price: 14999000 },
    { item: "HP Victus 16", price: 16999000 },
    { item: "Dell XPS 13", price: 23999000 },

    { item: "iPad Pro M4", price: 17999000 },
    { item: "iPad Air M2", price: 12999000 },
    { item: "iPad 10th Gen", price: 6999000 },
    { item: "Samsung Galaxy Tab S9 Ultra", price: 18999000 },
    { item: "Xiaomi Pad 6", price: 4999000 },

    { item: "PS5 Slim", price: 7499000 },
    { item: "PlayStation 5 Digital", price: 6499000 },
    { item: "Xbox Series X", price: 7999000 },
    { item: "Xbox Series S", price: 4499000 },
    { item: "Nintendo Switch OLED", price: 5499000 },
    { item: "Steam Deck OLED", price: 9999000 },

    { item: "AirPods Pro 2", price: 3799000 },
    { item: "AirPods 3", price: 2799000 },
    { item: "Sony WH-1000XM5", price: 4999000 },
    { item: "Sony WF-1000XM5", price: 4299000 },
    { item: "Bose QuietComfort Ultra", price: 6499000 },
    { item: "JBL Tune 760NC", price: 1499000 },

    { item: "Apple Watch Ultra 2", price: 14999000 },
    { item: "Apple Watch Series 9", price: 6999000 },
    { item: "Samsung Galaxy Watch 6 Classic", price: 6499000 },
    { item: "Xiaomi Watch S3", price: 2499000 },

    { item: "Canon EOS R6 Mark II", price: 39999000 },
    { item: "Sony A7 IV", price: 35999000 },
    { item: "Fujifilm X-T5", price: 29999000 },
    { item: "GoPro Hero 12", price: 6499000 },
    { item: "DJI Mini 4 Pro", price: 11999000 },

    { item: "LG OLED C3 55 Inch", price: 21999000 },
    { item: "Samsung Neo QLED 65 Inch", price: 29999000 },
    { item: "Xiaomi TV A Pro 55", price: 8999000 },

    { item: "RTX 4090", price: 32999000 },
    { item: "RTX 4080 Super", price: 19999000 },
    { item: "Ryzen 9 7950X", price: 10999000 },
    { item: "Intel Core i9 14900K", price: 11999000 },
    { item: "SSD NVMe 2TB", price: 2499000 },
    { item: "RAM DDR5 32GB", price: 1899000 }
  ];

  const i = items[Math.floor(Math.random() * items.length)];
  return send(
    chatIdMsg,
    `💰 *TEBAK HARGA*\n\n🛒 *${i.item}*\n\nBerapa harganya?\n\n_Jawaban: ||Rp ${i.price.toLocaleString("id-ID")}||_`
  );
}

  if (text === ".trivia") {
  const trivias = [
    { q: "Planet terbesar di tata surya?", a: "Jupiter" },
    { q: "Planet terkecil di tata surya?", a: "Merkurius" },
    { q: "Planet terpanas di tata surya?", a: "Venus" },
    { q: "Planet dengan cincin paling jelas?", a: "Saturnus" },
    { q: "Bintang terdekat dengan Bumi?", a: "Matahari" },
    { q: "Galaksi tempat tata surya berada?", a: "Bima Sakti" },
    { q: "Jumlah planet di tata surya?", a: "8" },
    { q: "Satelit alami Bumi?", a: "Bulan" },
    { q: "Planet merah?", a: "Mars" },
    { q: "Planet terjauh dari matahari?", a: "Neptunus" },

    { q: "Presiden pertama Indonesia?", a: "Soekarno" },
    { q: "Wakil presiden pertama Indonesia?", a: "Mohammad Hatta" },
    { q: "Tanggal kemerdekaan Indonesia?", a: "17 Agustus 1945" },
    { q: "Ibu kota Indonesia?", a: "Jakarta" },
    { q: "Lambang negara Indonesia?", a: "Garuda Pancasila" },
    { q: "Semboyan Indonesia?", a: "Bhinneka Tunggal Ika" },
    { q: "Jumlah provinsi di Indonesia?", a: "38" },
    { q: "Pulau terbesar di Indonesia?", a: "Kalimantan" },
    { q: "Gunung tertinggi di Indonesia?", a: "Puncak Jaya" },
    { q: "Laut terluas di Indonesia?", a: "Laut Banda" },

    { q: "Benua terbesar di dunia?", a: "Asia" },
    { q: "Benua terkecil di dunia?", a: "Australia" },
    { q: "Jumlah benua di dunia?", a: "7" },
    { q: "Negara terluas di dunia?", a: "Rusia" },
    { q: "Negara dengan penduduk terbanyak?", a: "China" },
    { q: "Gunung tertinggi di dunia?", a: "Everest" },
    { q: "Sungai terpanjang di dunia?", a: "Nil" },
    { q: "Samudra terluas di dunia?", a: "Samudra Pasifik" },
    { q: "Ibu kota Jepang?", a: "Tokyo" },
    { q: "Ibu kota Australia?", a: "Canberra" },

    { q: "Hewan darat tercepat?", a: "Cheetah" },
    { q: "Hewan terbesar di dunia?", a: "Paus Biru" },
    { q: "Hewan tercepat di udara?", a: "Falcon Peregrine" },
    { q: "Hewan dengan umur terpanjang?", a: "Penyu" },
    { q: "Mamalia yang bisa terbang?", a: "Kelelawar" },
    { q: "Hewan nasional Indonesia?", a: "Komodo" },
    { q: "Serangga penghasil madu?", a: "Lebah" },
    { q: "Hewan yang bisa hidup di dua alam?", a: "Amfibi" },
    { q: "Ikan terbesar di dunia?", a: "Hiu Paus" },
    { q: "Burung terbesar di dunia?", a: "Burung Unta" },

    { q: "Organ tubuh terbesar manusia?", a: "Kulit" },
    { q: "Jumlah tulang manusia dewasa?", a: "206" },
    { q: "Organ pemompa darah?", a: "Jantung" },
    { q: "Bagian otak pengatur keseimbangan?", a: "Serebelum" },
    { q: "Zat pembawa oksigen dalam darah?", a: "Hemoglobin" },
    { q: "Indra penciuman?", a: "Hidung" },
    { q: "Indra pendengaran?", a: "Telinga" },
    { q: "Organ pernapasan utama?", a: "Paru-paru" },
    { q: "Bagian mata yang mengatur cahaya?", a: "Pupil" },
    { q: "Tempat pencernaan dimulai?", a: "Mulut" },

    { q: "Penemu lampu pijar?", a: "Thomas Edison" },
    { q: "Penemu telepon?", a: "Alexander Graham Bell" },
    { q: "Penemu pesawat terbang?", a: "Wright Bersaudara" },
    { q: "Penemu teori relativitas?", a: "Albert Einstein" },
    { q: "Ilmuwan hukum gravitasi?", a: "Isaac Newton" },
    { q: "Penemu listrik arus AC?", a: "Nikola Tesla" },
    { q: "Bapak komputer modern?", a: "Alan Turing" },
    { q: "Pendiri Microsoft?", a: "Bill Gates" },
    { q: "Pendiri Apple?", a: "Steve Jobs" },
    { q: "CEO Tesla?", a: "Elon Musk" },

    { q: "Bahasa pemrograman pertama?", a: "Fortran" },
    { q: "Bahasa pemrograman web?", a: "JavaScript" },
    { q: "Sistem operasi open source?", a: "Linux" },
    { q: "Perangkat otak komputer?", a: "CPU" },
    { q: "Penyimpanan sementara komputer?", a: "RAM" },
    { q: "Penyimpanan permanen komputer?", a: "Harddisk" },
    { q: "Jaringan terbesar di dunia?", a: "Internet" },
    { q: "Mesin pencari Google dibuat oleh?", a: "Larry Page dan Sergey Brin" },
    { q: "Media sosial berbagi foto?", a: "Instagram" },
    { q: "Aplikasi pesan instan populer?", a: "WhatsApp" }
  ];

  const t = trivias[Math.floor(Math.random() * trivias.length)];
  return send(chatIdMsg, `❓ *TRIVIA*\n\n${t.q}\n\n_Jawaban: ||${t.a}||_`);
}

  if (text === ".akronim") {
  const akronims = [
    { letters: "HTML", answer: "HyperText Markup Language" },
    { letters: "CSS", answer: "Cascading Style Sheets" },
    { letters: "JS", answer: "JavaScript" },
    { letters: "API", answer: "Application Programming Interface" },
    { letters: "JSON", answer: "JavaScript Object Notation" },
    { letters: "XML", answer: "eXtensible Markup Language" },
    { letters: "SQL", answer: "Structured Query Language" },
    { letters: "NoSQL", answer: "Not Only SQL" },
    { letters: "CPU", answer: "Central Processing Unit" },
    { letters: "GPU", answer: "Graphics Processing Unit" },
    { letters: "RAM", answer: "Random Access Memory" },
    { letters: "ROM", answer: "Read Only Memory" },
    { letters: "SSD", answer: "Solid State Drive" },
    { letters: "HDD", answer: "Hard Disk Drive" },
    { letters: "LAN", answer: "Local Area Network" },
    { letters: "WAN", answer: "Wide Area Network" },
    { letters: "MAN", answer: "Metropolitan Area Network" },
    { letters: "IP", answer: "Internet Protocol" },
    { letters: "HTTP", answer: "HyperText Transfer Protocol" },
    { letters: "HTTPS", answer: "HyperText Transfer Protocol Secure" },
    { letters: "FTP", answer: "File Transfer Protocol" },
    { letters: "SSH", answer: "Secure Shell" },
    { letters: "DNS", answer: "Domain Name System" },
    { letters: "URL", answer: "Uniform Resource Locator" },
    { letters: "URI", answer: "Uniform Resource Identifier" },
    { letters: "UI", answer: "User Interface" },
    { letters: "UX", answer: "User Experience" },
    { letters: "OS", answer: "Operating System" },
    { letters: "CLI", answer: "Command Line Interface" },
    { letters: "GUI", answer: "Graphical User Interface" },

    { letters: "AI", answer: "Artificial Intelligence" },
    { letters: "ML", answer: "Machine Learning" },
    { letters: "DL", answer: "Deep Learning" },
    { letters: "NLP", answer: "Natural Language Processing" },
    { letters: "CV", answer: "Computer Vision" },
    { letters: "IoT", answer: "Internet of Things" },
    { letters: "AR", answer: "Augmented Reality" },
    { letters: "VR", answer: "Virtual Reality" },
    { letters: "XR", answer: "Extended Reality" },
    { letters: "RPA", answer: "Robotic Process Automation" },
    { letters: "SaaS", answer: "Software as a Service" },
    { letters: "PaaS", answer: "Platform as a Service" },
    { letters: "IaaS", answer: "Infrastructure as a Service" },

    { letters: "NASA", answer: "National Aeronautics and Space Administration" },
    { letters: "FBI", answer: "Federal Bureau of Investigation" },
    { letters: "CIA", answer: "Central Intelligence Agency" },
    { letters: "NSA", answer: "National Security Agency" },
    { letters: "WHO", answer: "World Health Organization" },
    { letters: "UN", answer: "United Nations" },
    { letters: "UNESCO", answer: "United Nations Educational Scientific and Cultural Organization" },
    { letters: "UNICEF", answer: "United Nations Children's Fund" },
    { letters: "IMF", answer: "International Monetary Fund" },
    { letters: "WB", answer: "World Bank" },
    { letters: "ASEAN", answer: "Association of Southeast Asian Nations" },
    { letters: "EU", answer: "European Union" },
    { letters: "NATO", answer: "North Atlantic Treaty Organization" },
    { letters: "OPEC", answer: "Organization of the Petroleum Exporting Countries" },

    { letters: "FIFA", answer: "Fédération Internationale de Football Association" },
    { letters: "IOC", answer: "International Olympic Committee" },
    { letters: "NBA", answer: "National Basketball Association" },
    { letters: "UEFA", answer: "Union of European Football Associations" },

    { letters: "BUMN", answer: "Badan Usaha Milik Negara" },
    { letters: "DPR", answer: "Dewan Perwakilan Rakyat" },
    { letters: "MPR", answer: "Majelis Permusyawaratan Rakyat" },
    { letters: "KPK", answer: "Komisi Pemberantasan Korupsi" },
    { letters: "TNI", answer: "Tentara Nasional Indonesia" },
    { letters: "POLRI", answer: "Kepolisian Negara Republik Indonesia" },
    { letters: "BNPB", answer: "Badan Nasional Penanggulangan Bencana" },
    { letters: "BPS", answer: "Badan Pusat Statistik" },
    { letters: "BPJS", answer: "Badan Penyelenggara Jaminan Sosial" },
    { letters: "KPU", answer: "Komisi Pemilihan Umum" },

    { letters: "ATM", answer: "Automated Teller Machine" },
    { letters: "GPS", answer: "Global Positioning System" },
    { letters: "LED", answer: "Light Emitting Diode" },
    { letters: "LCD", answer: "Liquid Crystal Display" },
    { letters: "OLED", answer: "Organic Light Emitting Diode" },
    { letters: "UAV", answer: "Unmanned Aerial Vehicle" },
    { letters: "EV", answer: "Electric Vehicle" },
    { letters: "GPS", answer: "Global Positioning System" },

    { letters: "PDF", answer: "Portable Document Format" },
    { letters: "APK", answer: "Android Package Kit" },
    { letters: "SDK", answer: "Software Development Kit" },
    { letters: "IDE", answer: "Integrated Development Environment" },
    { letters: "MVC", answer: "Model View Controller" },
    { letters: "OOP", answer: "Object Oriented Programming" }
  ];

  const a = akronims[Math.floor(Math.random() * akronims.length)];
  return send(
    chatIdMsg,
    `🔤 *TEBAK AKRONIM*\n\n*${a.letters}* = ?\n\n_Jawaban: ||${a.answer}||_`
  );
}

  if (text === ".emojistory") {
    const stories = [
      "👦🏫📚➡️🎓🎉", "🌧️☂️🚶➡️☀️🌈", "🥚🐣🐤🐔🍗",
      "💑💍👰🤵🎊", "🌱🌿🌳🍎😋", "😴💤🌙➡️⏰☀️😤",
      "🏃‍♂️🏋️‍♂️💪➡️🏆🥇", "📱💔😢➡️📖😊", "🐛🦋🌸🌻🌈"
    ];
    return send(chatIdMsg, `📖 *EMOJI STORY*\n\n${stories[Math.floor(Math.random() * stories.length)]}\n\n_Apa ceritanya?_`);
  }

  if (text === ".tebakibukota") {
  const capitals = [
    { country: "Indonesia", capital: "Jakarta" },
    { country: "Malaysia", capital: "Kuala Lumpur" },
    { country: "Singapura", capital: "Singapura" },
    { country: "Thailand", capital: "Bangkok" },
    { country: "Filipina", capital: "Manila" },
    { country: "Vietnam", capital: "Hanoi" },
    { country: "Laos", capital: "Vientiane" },
    { country: "Kamboja", capital: "Phnom Penh" },
    { country: "Myanmar", capital: "Naypyidaw" },
    { country: "Brunei", capital: "Bandar Seri Begawan" },
    { country: "Timor Leste", capital: "Dili" },

    { country: "Jepang", capital: "Tokyo" },
    { country: "Korea Selatan", capital: "Seoul" },
    { country: "Korea Utara", capital: "Pyongyang" },
    { country: "China", capital: "Beijing" },
    { country: "Mongolia", capital: "Ulaanbaatar" },
    { country: "India", capital: "New Delhi" },
    { country: "Pakistan", capital: "Islamabad" },
    { country: "Bangladesh", capital: "Dhaka" },
    { country: "Sri Lanka", capital: "Sri Jayawardenepura Kotte" },
    { country: "Nepal", capital: "Kathmandu" },
    { country: "Bhutan", capital: "Thimphu" },
    { country: "Afghanistan", capital: "Kabul" },

    { country: "Arab Saudi", capital: "Riyadh" },
    { country: "Uni Emirat Arab", capital: "Abu Dhabi" },
    { country: "Qatar", capital: "Doha" },
    { country: "Kuwait", capital: "Kuwait City" },
    { country: "Iran", capital: "Tehran" },
    { country: "Irak", capital: "Baghdad" },
    { country: "Israel", capital: "Yerusalem" },
    { country: "Yordania", capital: "Amman" },
    { country: "Turki", capital: "Ankara" },

    { country: "Mesir", capital: "Kairo" },
    { country: "Nigeria", capital: "Abuja" },
    { country: "Kenya", capital: "Nairobi" },
    { country: "Ethiopia", capital: "Addis Ababa" },
    { country: "Ghana", capital: "Accra" },
    { country: "Afrika Selatan", capital: "Pretoria" },
    { country: "Maroko", capital: "Rabat" },
    { country: "Aljazair", capital: "Aljir" },
    { country: "Tunisia", capital: "Tunis" },
    { country: "Sudan", capital: "Khartoum" },

    { country: "Rusia", capital: "Moskow" },
    { country: "Ukraina", capital: "Kyiv" },
    { country: "Polandia", capital: "Warsawa" },
    { country: "Jerman", capital: "Berlin" },
    { country: "Perancis", capital: "Paris" },
    { country: "Inggris", capital: "London" },
    { country: "Italia", capital: "Roma" },
    { country: "Spanyol", capital: "Madrid" },
    { country: "Portugal", capital: "Lisbon" },
    { country: "Belanda", capital: "Amsterdam" },
    { country: "Swiss", capital: "Bern" },
    { country: "Austria", capital: "Wina" },
    { country: "Yunani", capital: "Athena" },
    { country: "Swedia", capital: "Stockholm" },
    { country: "Norwegia", capital: "Oslo" },
    { country: "Finlandia", capital: "Helsinki" },
    { country: "Denmark", capital: "Kopenhagen" },
    { country: "Irlandia", capital: "Dublin" },
    { country: "Skotlandia", capital: "Edinburgh" },
    { country: "Islandia", capital: "Reykjavik" },

    { country: "Amerika Serikat", capital: "Washington DC" },
    { country: "Kanada", capital: "Ottawa" },
    { country: "Meksiko", capital: "Mexico City" },
    { country: "Kuba", capital: "Havana" },
    { country: "Panama", capital: "Panama City" },
    { country: "Kosta Rika", capital: "San José" },

    { country: "Brasil", capital: "Brasilia" },
    { country: "Argentina", capital: "Buenos Aires" },
    { country: "Chile", capital: "Santiago" },
    { country: "Peru", capital: "Lima" },
    { country: "Kolombia", capital: "Bogotá" },
    { country: "Venezuela", capital: "Caracas" },
    { country: "Uruguay", capital: "Montevideo" },
    { country: "Paraguay", capital: "Asunción" },
    { country: "Bolivia", capital: "Sucre" },
    { country: "Ekuador", capital: "Quito" },

    { country: "Australia", capital: "Canberra" },
    { country: "Selandia Baru", capital: "Wellington" },
    { country: "Papua Nugini", capital: "Port Moresby" },
    { country: "Fiji", capital: "Suva" },
    { country: "Samoa", capital: "Apia" }
  ];

  const c = capitals[Math.floor(Math.random() * capitals.length)];
  return send(
    chatIdMsg,
    `🏛️ *TEBAK IBU KOTA*\n\nIbu kota *${c.country}*?\n\n_Jawaban: ||${c.capital}||_`
  );
}

  if (text === ".tebakbahasa") {
  const langs = [
    { word: "Terima kasih", lang: "Jepang", foreign: "Arigatou" },
    { word: "Halo", lang: "Korea", foreign: "Annyeonghaseyo" },
    { word: "Selamat pagi", lang: "Jepang", foreign: "Ohayou Gozaimasu" },
    { word: "Terima kasih", lang: "Mandarin", foreign: "Xiè xiè" },
    { word: "Aku cinta kamu", lang: "Perancis", foreign: "Je t'aime" },
    { word: "Maaf", lang: "Jepang", foreign: "Sumimasen" },
    { word: "Sampai jumpa", lang: "Spanyol", foreign: "Adiós" },
    { word: "Selamat malam", lang: "Jerman", foreign: "Gute Nacht" },
    { word: "Halo", lang: "Inggris", foreign: "Hello" },
    { word: "Selamat tinggal", lang: "Inggris", foreign: "Goodbye" },
    { word: "Tolong", lang: "Inggris", foreign: "Please" },
    { word: "Terima kasih", lang: "Inggris", foreign: "Thank you" },
    { word: "Ya", lang: "Jerman", foreign: "Ja" },
    { word: "Tidak", lang: "Jerman", foreign: "Nein" },
    { word: "Selamat pagi", lang: "Inggris", foreign: "Good morning" },
    { word: "Selamat malam", lang: "Inggris", foreign: "Good night" },
    { word: "Aku cinta kamu", lang: "Spanyol", foreign: "Te amo" },
    { word: "Aku cinta kamu", lang: "Italia", foreign: "Ti amo" },
    { word: "Aku cinta kamu", lang: "Jerman", foreign: "Ich liebe dich" },
    { word: "Aku cinta kamu", lang: "Mandarin", foreign: "Wo ai ni" },
    { word: "Terima kasih banyak", lang: "Jepang", foreign: "Domo arigatou" },
    { word: "Selamat datang", lang: "Inggris", foreign: "Welcome" },
    { word: "Permisi", lang: "Inggris", foreign: "Excuse me" },
    { word: "Maaf", lang: "Inggris", foreign: "Sorry" },
    { word: "Apa kabar?", lang: "Inggris", foreign: "How are you?" },
    { word: "Apa kabar?", lang: "Spanyol", foreign: "¿Cómo estás?" },
    { word: "Apa kabar?", lang: "Perancis", foreign: "Comment ça va?" },
    { word: "Apa kabar?", lang: "Jerman", foreign: "Wie geht's?" },
    { word: "Selamat pagi", lang: "Spanyol", foreign: "Buenos días" },
    { word: "Selamat malam", lang: "Spanyol", foreign: "Buenas noches" },
    { word: "Selamat pagi", lang: "Perancis", foreign: "Bonjour" },
    { word: "Selamat malam", lang: "Perancis", foreign: "Bonne nuit" },
    { word: "Terima kasih", lang: "Perancis", foreign: "Merci" },
    { word: "Terima kasih", lang: "Spanyol", foreign: "Gracias" },
    { word: "Terima kasih", lang: "Jerman", foreign: "Danke" },
    { word: "Tolong", lang: "Spanyol", foreign: "Por favor" },
    { word: "Tolong", lang: "Perancis", foreign: "S'il vous plaît" },
    { word: "Tolong", lang: "Jerman", foreign: "Bitte" },
    { word: "Ya", lang: "Spanyol", foreign: "Sí" },
    { word: "Tidak", lang: "Spanyol", foreign: "No" },
    { word: "Ya", lang: "Perancis", foreign: "Oui" },
    { word: "Tidak", lang: "Perancis", foreign: "Non" },
    { word: "Halo", lang: "Italia", foreign: "Ciao" },
    { word: "Selamat tinggal", lang: "Italia", foreign: "Arrivederci" },
    { word: "Selamat pagi", lang: "Italia", foreign: "Buongiorno" },
    { word: "Selamat malam", lang: "Italia", foreign: "Buona notte" },
    { word: "Terima kasih", lang: "Italia", foreign: "Grazie" },
    { word: "Halo", lang: "Arab", foreign: "Assalamu'alaikum" },
    { word: "Damai", lang: "Arab", foreign: "Salam" },
    { word: "Terima kasih", lang: "Arab", foreign: "Shukran" },
    { word: "Ya", lang: "Arab", foreign: "Na'am" },
    { word: "Tidak", lang: "Arab", foreign: "La" },
    { word: "Halo", lang: "Rusia", foreign: "Privet" },
    { word: "Terima kasih", lang: "Rusia", foreign: "Spasibo" },
    { word: "Ya", lang: "Rusia", foreign: "Da" },
    { word: "Tidak", lang: "Rusia", foreign: "Nyet" },
    { word: "Halo", lang: "Thailand", foreign: "Sawasdee" },
    { word: "Terima kasih", lang: "Thailand", foreign: "Khob khun" },
    { word: "Halo", lang: "Vietnam", foreign: "Xin chào" },
    { word: "Terima kasih", lang: "Vietnam", foreign: "Cảm ơn" }
  ];

  const l = langs[Math.floor(Math.random() * langs.length)];
  return send(chatIdMsg, `🌍 *TEBAK BAHASA*\n\n"${l.foreign}" artinya apa?\n(Bahasa ${l.lang})\n\n_Jawaban: ||${l.word}||_`);
}
  if (text === ".sambungkata") {
  const starters = [
    "API","KODE","JAWA","BALI","GURU","BUKU","KUDA","PADI","NASI","SAPI",
    "KATA","MEJA","BATU","KOTA","DESA","LAUT","GUNUNG","SUNGAI","HUTAN","AWAN",
    "ANGIN","HUJAN","PETIR","BINTANG","BULAN","MATAHARI","CAHAYA","GELAP","PAGI","MALAM",
    "MERAH","BIRU","HIJAU","KUNING","HITAM","PUTIH","EMAS","PERAK","BESI","BAJA",
    "AIR","API","TANAH","UDARA","ENERGI","LISTRIK","MESIN","RODA","MOTOR","MOBIL",
    "KERETA","PESAWAT","KAPAL","SEPEDA","JALAN","JEMBATAN","TEROWONGAN","GEDUNG","RUMAH","KAMAR",
    "DAPUR","PINTU","JENDELA","ATAP","LANTAI","TEMBOK","KURSI","LEMARI","SOFA","KARPET",
    "KOMPUTER","LAPTOP","KEYBOARD","MOUSE","LAYAR","SERVER","JARINGAN","INTERNET","WEBSITE","BROWSER",
    "ANDROID","LINUX","WINDOWS","APPLE","GOOGLE","META","OPENAI","ROBOT","SENSOR","ALGORITMA",
    "DATA","ARRAY","OBJECT","STRING","NUMBER","BOOLEAN","FUNGSI","VARIABEL","KONSTANTA","SCRIPT",
    "BAHASA","LOGIKA","MATEMATIKA","FISIKA","KIMIA","BIOLOGI","ASTRONOMI","FILSAFAT","SEJARAH","GEOGRAFI",
    "ATOM","MOLEKUL","ENERGI","GRAVITASI","RELATIVITAS","KUANTUM","CAHAYA","WAKTU","RUANG","DIMENSI",
    "MANUSIA","HEWAN","TUMBUHAN","MIKROBA","SEL","DNA","OTAK","PIKIRAN","KESADARAN","EMOSI",
    "SENANG","SEDIH","MARAH","TAKUT","CINTA","HARAPAN","IMPIAN","TUJUAN","MASADEPAN","MASALALU"
  ];

  return send(
    chatIdMsg,
    `🔗 *SAMBUNG KATA*\n\nLanjutkan kata yang dimulai dari:\n*${starters[Math.floor(Math.random() * starters.length)]}*\n\n_Ketik kata selanjutnya yang huruf pertamanya sama dengan huruf terakhir kata di atas!_`
  );
}

  if (text === ".tebakrumus") {
  const formulas = [
    { q: "E = mc² adalah rumus dari?", a: "Relativitas Einstein" },
    { q: "F = ma adalah rumus dari?", a: "Hukum Newton II" },
    { q: "V = IR adalah rumus dari?", a: "Hukum Ohm" },
    { q: "a² + b² = c² adalah rumus dari?", a: "Teorema Pythagoras" },
    { q: "PV = nRT adalah rumus dari?", a: "Hukum Gas Ideal" },
    { q: "F = G(m1m2)/r² adalah rumus dari?", a: "Hukum Gravitasi Newton" },
    { q: "W = F × s adalah rumus dari?", a: "Usaha" },
    { q: "P = W / t adalah rumus dari?", a: "Daya" },
    { q: "v = s / t adalah rumus dari?", a: "Kecepatan" },
    { q: "a = Δv / t adalah rumus dari?", a: "Percepatan" },
    { q: "ρ = m / V adalah rumus dari?", a: "Massa Jenis" },
    { q: "Q = m c ΔT adalah rumus dari?", a: "Kalor" },
    { q: "I = Q / t adalah rumus dari?", a: "Arus Listrik" },
    { q: "P = V × I adalah rumus dari?", a: "Daya Listrik" },
    { q: "R = V / I adalah rumus dari?", a: "Hambatan Listrik" },
    { q: "Ek = ½ m v² adalah rumus dari?", a: "Energi Kinetik" },
    { q: "Ep = m g h adalah rumus dari?", a: "Energi Potensial" },
    { q: "ΣF = 0 adalah kondisi dari?", a: "Keseimbangan" },
    { q: "λ = v / f adalah rumus dari?", a: "Panjang Gelombang" },
    { q: "f = 1 / T adalah rumus dari?", a: "Frekuensi" },
    { q: "p = m v adalah rumus dari?", a: "Momentum" },
    { q: "Δp = F Δt adalah rumus dari?", a: "Impuls" },
    { q: "n = m / Mr adalah rumus dari?", a: "Jumlah Mol" },
    { q: "pH = -log[H+ ] adalah rumus dari?", a: "Derajat Keasaman" },
    { q: "v = ω r adalah rumus dari?", a: "Kecepatan Sudut" },
    { q: "T = 2π√(l/g) adalah rumus dari?", a: "Periode Bandul" },
    { q: "sin²θ + cos²θ = 1 adalah rumus dari?", a: "Identitas Trigonometri" },
    { q: "A = π r² adalah rumus dari?", a: "Luas Lingkaran" },
    { q: "V = 4/3 π r³ adalah rumus dari?", a: "Volume Bola" }
  ];

  const f = formulas[Math.floor(Math.random() * formulas.length)];
  return send(chatIdMsg, `📐 *TEBAK RUMUS*\n\n${f.q}\n\n_Jawaban: ||${f.a}||_`);
}

  if (text === ".tebaktokoh") {
  const tokoh = [
    // 🇮🇩 Indonesia
    { hint: "Proklamator Indonesia, presiden pertama", answer: "Soekarno" },
    { hint: "Wakil presiden pertama Indonesia", answer: "Mohammad Hatta" },
    { hint: "Pahlawan emansipasi wanita Indonesia", answer: "R.A. Kartini" },
    { hint: "Pahlawan nasional dari Aceh", answer: "Cut Nyak Dien" },
    { hint: "Pahlawan nasional dari Jawa Tengah", answer: "Pangeran Diponegoro" },
    { hint: "Presiden ke-3 Indonesia, ahli pesawat", answer: "B.J. Habibie" },
    { hint: "Presiden ke-7 Indonesia", answer: "Joko Widodo" },

    // 🌍 Dunia & Sejarah
    { hint: "Presiden pertama Amerika Serikat", answer: "George Washington" },
    { hint: "Pemimpin Jerman Nazi", answer: "Adolf Hitler" },
    { hint: "Kaisar Prancis yang terkenal", answer: "Napoleon Bonaparte" },
    { hint: "Penjelajah yang menemukan Amerika", answer: "Christopher Columbus" },
    { hint: "Ratu Inggris terlama berkuasa", answer: "Queen Elizabeth II" },

    // 🔬 Ilmuwan
    { hint: "Penemu teori relativitas, E=mc²", answer: "Albert Einstein" },
    { hint: "Penemu hukum gravitasi", answer: "Isaac Newton" },
    { hint: "Penemu listrik arus AC", answer: "Nikola Tesla" },
    { hint: "Ilmuwan evolusi", answer: "Charles Darwin" },
    { hint: "Bapak fisika modern", answer: "Galileo Galilei" },
    { hint: "Ilmuwan wanita penemu radioaktivitas", answer: "Marie Curie" },

    // 🧠 Filsuf
    { hint: "Filsuf Yunani, murid Plato", answer: "Aristoteles" },
    { hint: "Filsuf Yunani, guru Socrates", answer: "Plato" },
    { hint: "Filsuf yang dihukum minum racun", answer: "Socrates" },
    { hint: "Filsuf Jerman, 'Aku berpikir maka aku ada'", answer: "René Descartes" },
    { hint: "Filsuf eksistensialisme", answer: "Friedrich Nietzsche" },

    // 💻 Teknologi
    { hint: "Pendiri Microsoft", answer: "Bill Gates" },
    { hint: "Pendiri Apple", answer: "Steve Jobs" },
    { hint: "Pendiri Facebook / Meta", answer: "Mark Zuckerberg" },
    { hint: "CEO Tesla dan SpaceX", answer: "Elon Musk" },
    { hint: "Pendiri Amazon", answer: "Jeff Bezos" },
    { hint: "Pendiri Google", answer: "Larry Page" },
    { hint: "Pendiri Google", answer: "Sergey Brin" },

    // 🕌 Tokoh Islam
    { hint: "Nabi terakhir dalam Islam", answer: "Nabi Muhammad SAW" },
    { hint: "Khalifah pertama Islam", answer: "Abu Bakar Ash-Shiddiq" },
    { hint: "Khalifah kedua Islam", answer: "Umar bin Khattab" },
    { hint: "Khalifah ketiga Islam", answer: "Utsman bin Affan" },
    { hint: "Khalifah keempat Islam", answer: "Ali bin Abi Thalib" },
    { hint: "Penakluk Konstantinopel", answer: "Sultan Muhammad Al-Fatih" },

    // 🎨 Seni & Sastra
    { hint: "Pelukis Mona Lisa", answer: "Leonardo da Vinci" },
    { hint: "Pelukis terkenal Spanyol", answer: "Pablo Picasso" },
    { hint: "Penulis Romeo dan Juliet", answer: "William Shakespeare" },

    // 🌌 Sains Modern
    { hint: "Bapak komputer modern", answer: "Alan Turing" },
    { hint: "Ilmuwan kosmologi terkenal", answer: "Stephen Hawking" },
    { hint: "Astronom yang mengusulkan heliosentris", answer: "Nicolaus Copernicus" }
  ];

  const t = tokoh[Math.floor(Math.random() * tokoh.length)];
  return send(
    chatIdMsg,
    `🧑‍🏫 *TEBAK TOKOH*\n\nHint: ${t.hint}\n\nSiapa dia?\n\n_Jawaban: ||${t.answer}||_`
  );
}

  // ==========================================
  // FUN COMMANDS
  // ==========================================
  if (text === ".quote" || text === ".quotes") {
    const q = [
      "Hidup itu seperti bersepeda. Untuk menjaga keseimbanganmu, kamu harus terus bergerak. - Einstein",
      "Jangan menunggu kesempatan, ciptakan. - Shaw", "Sukses adalah guru yang buruk. - Gates",
      "Jadilah perubahan yang ingin kamu lihat. - Gandhi", "Jangan takut gagal, takutlah tidak mencoba. - MJ",
      "Kesuksesan adalah hasil dari persiapan. - Seneca", "Waktu adalah aset paling berharga. - Carnegie",
      "Pendidikan adalah senjata paling mematikan di dunia. - Mandela",
      "Imajinasi lebih penting dari pengetahuan. - Einstein",
      "Satu-satunya cara untuk melakukan pekerjaan yang hebat adalah mencintai apa yang kamu lakukan. - Steve Jobs",
      "Hidup ini 10% apa yang terjadi padamu dan 90% bagaimana kamu meresponnya. - Charles Swindoll",
      "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas. - Henry Ford",
      "Masa depan milik mereka yang percaya pada keindahan mimpi mereka. - Eleanor Roosevelt"
    ];
    return send(chatIdMsg, `💬 *Quote:*\n\n_"${q[Math.floor(Math.random() * q.length)]}"_`);
  }

  if (text === ".fakta" || text === ".fact") {
    const f = [
      "Jantung berdetak 100.000x/hari.", "Lumba-lumba tidur dengan satu mata terbuka.",
      "Madu tidak pernah busuk.", "Gurita punya 3 jantung dan darah biru.",
      "Otak manusia 73% air.", "Kucing tidur 70% hidupnya.",
      "Pisang mengandung sedikit radiasi.", "Lidah adalah otot terkuat di tubuh.",
      "Petir 5 kali lebih panas dari permukaan matahari.",
      "Astronot tumbuh lebih tinggi 2 inch di luar angkasa.",
      "Ada lebih banyak bintang di alam semesta daripada butiran pasir di bumi.",
      "Sidik jari koala hampir identik dengan manusia.",
      "Semut bisa mengangkat 50x berat badannya.",
      "Ikan mas punya ingatan lebih dari 3 detik, bisa sampai 5 bulan.",
      "DNA manusia 60% sama dengan pisang."
    ];
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
    const z = { aries: "♈ Aries\nSifat: Pemberani, Percaya diri\nElemen: Api\nPlanet: Mars\nCocok: Leo, Sagitarius", taurus: "♉ Taurus\nSifat: Setia, Sabar\nElemen: Tanah\nPlanet: Venus\nCocok: Virgo, Capricorn", gemini: "♊ Gemini\nSifat: Cerdas, Adaptif\nElemen: Udara\nPlanet: Merkurius\nCocok: Libra, Aquarius", cancer: "♋ Cancer\nSifat: Perhatian, Emosional\nElemen: Air\nPlanet: Bulan\nCocok: Scorpio, Pisces", leo: "♌ Leo\nSifat: Percaya diri, Karismatik\nElemen: Api\nPlanet: Matahari\nCocok: Aries, Sagitarius", virgo: "♍ Virgo\nSifat: Analitis, Perfeksionis\nElemen: Tanah\nPlanet: Merkurius\nCocok: Taurus, Capricorn", libra: "♎ Libra\nSifat: Diplomatis, Adil\nElemen: Udara\nPlanet: Venus\nCocok: Gemini, Aquarius", scorpio: "♏ Scorpio\nSifat: Passionate, Misterius\nElemen: Air\nPlanet: Pluto\nCocok: Cancer, Pisces", sagitarius: "♐ Sagitarius\nSifat: Optimis, Petualang\nElemen: Api\nPlanet: Jupiter\nCocok: Aries, Leo", capricorn: "♑ Capricorn\nSifat: Ambisius, Disiplin\nElemen: Tanah\nPlanet: Saturnus\nCocok: Taurus, Virgo", aquarius: "♒ Aquarius\nSifat: Progresif, Unik\nElemen: Udara\nPlanet: Uranus\nCocok: Gemini, Libra", pisces: "♓ Pisces\nSifat: Intuitif, Kreatif\nElemen: Air\nPlanet: Neptunus\nCocok: Cancer, Scorpio" };
    const q = text.replace(".zodiak ", "").toLowerCase();
    return send(chatIdMsg, z[q] ? `🔮 *ZODIAK*\n\n${z[q]}` : "❌ Zodiak tidak ditemukan.");
  }

  if (text === ".pantun") {
    const p = [
      "Pergi ke pasar beli semangka,\nJangan lupa beli duren,\nKalau kamu memang suka,\nJangan malu bilang cinta.",
      "Buah mangga buah duku,\nDimakan enak rasanya,\nWalaupun kamu jauh dariku,\nKamu tetap di hatiku.",
      "Jalan-jalan ke Surabaya,\nJangan lupa beli oleh-oleh,\nWalaupun hidup penuh lara,\nTetap semangat jangan menyerah.",
      "Kalau pergi ke Malang,\nJangan lupa beli apel,\nKalau kamu sedang malang,\nIngatlah masih ada harapan.",
      "Ikan mas berenang di kali,\nDitangkap pakai jala,\nHidup harus disyukuri,\nApapun yang terjadi.",
      "Makan sate pakai lontong,\nTambah sambal kacangnya,\nHidup jangan mau dituntong,\nKejar cita-cita semampunya."
    ];
    return send(chatIdMsg, `📜 *Pantun:*\n\n${p[Math.floor(Math.random() * p.length)]}`);
  }

  if (text === ".puisi") {
    const puisi = [
      "🌸 *Malam Sunyi*\n\nDi malam yang sunyi ini,\nKudengar bisikan hati,\nMerangkai kata pasti,\nTentang mimpi yang abadi.",
      "🌊 *Ombak Rindu*\n\nOmbak datang dan pergi,\nSeperti rinduku padamu,\nTak pernah berhenti,\nWalau kau jauh dariku.",
      "🌙 *Bulan Purnama*\n\nBulan bersinar terang malam ini,\nMenerangi jiwa yang sepi,\nDalam gelap kutemukan arti,\nBahwa hidup penuh misteri.",
      "☀️ *Pagi Baru*\n\nMentari terbit di timur,\nMembawa harapan baru,\nHari ini akan kuukir,\nCerita indah bersamamu."
    ];
    return send(chatIdMsg, `📜 ${puisi[Math.floor(Math.random() * puisi.length)]}`);
  }

  if (text === ".jokes" || text === ".joke" || text === ".lelucon") {
    const jokes = [
      "Kenapa programmer suka gelap? Karena kalau terang jadi light mode 😂",
      "Apa bedanya kamu sama WiFi? WiFi bisa connect, kamu nggak 🤣",
      "Kenapa komputer ga pernah ngantuk? Karena punya sleep mode 😴",
      "Apa persamaan kamu sama software bajakan? Sama-sama ilegal 😭",
      "Kenapa hacker suka mandi? Karena biar clean code 🛁",
      "Apa bedanya bug sama feature? Tergantung siapa yang nanya 😎",
      "Kenapa programmer single? Karena mereka cuma bisa commit ke code 💔",
      "Error 404: Jodoh Not Found 🔍",
      "Programmer bilang 'I love you' tapi lupa pakai semicolon ;",
      "3 hal yang susah di dunia: 1) Naming variables 2) Cache invalidation 3) Off-by-one errors"
    ];
    return send(chatIdMsg, `😂 *JOKES:*\n\n${jokes[Math.floor(Math.random() * jokes.length)]}`);
  }

  if (text === ".roast") {
    const t = update.message.reply_to_message?.from?.first_name || update.message.from.first_name;
    const roasts = [
      `${t}, WiFi aja connect tapi kamu sama dia ga bisa 😂`,
      `${t}, muka kamu kayak captcha, susah dibaca 🤣`,
      `${t}, kalau bodoh itu penyakit, kamu udah stadium 4 😭`,
      `${t}, kamu itu kayak awan, kalau pergi semua orang senang ☁️`,
      `${t}, otak kamu kayak browser, 99 tab terbuka tapi ga ada yang berguna 💻`,
      `${t}, kamu itu kayak Senin, ga ada yang suka 😤`,
      `${t}, Google aja ga bisa nemuin kebaikan kamu 🔍`,
      `${t}, kamu tuh kayak JavaScript, error dimana-mana 🐛`,
      `${t}, kamu kayak commit message, ga jelas 📝`,
      `${t}, masa depan kamu kayak undefined variable 🤷`
    ];
    return send(chatIdMsg, `🔥 *ROAST*\n\n${roasts[Math.floor(Math.random() * roasts.length)]}`);
  }

  if (text === ".gombal" || text === ".pickup") {
    const lines = [
      "Kamu pasti capek ya? Soalnya kamu udah lari-lari di pikiran aku seharian 💕",
      "Kamu itu kayak Google, semua yang aku cari ada di kamu 🥰",
      "HP ku rusak nih, soalnya ga ada nomor kamu di kontak 📱",
      "Kamu punya peta ga? Soalnya aku tersesat di matamu 🗺️",
      "Ayah kamu tukang kue ya? Soalnya kamu manis banget 🧁",
      "Kamu itu kayak kopi, bikin aku ga bisa tidur mikirin kamu ☕",
      "Bumi itu datar, tapi hatiku miring ke kamu 🌍",
      "Kamu itu kayak WiFi, hidup ku ga bisa tanpa kamu 📶",
      "Kamu itu kayak syntax error, bikin aku ga bisa move on 💻",
      "Aku bukan API, tapi aku bisa respond ke hatimu ❤️"
    ];
    return send(chatIdMsg, `💘 *GOMBAL*\n\n${lines[Math.floor(Math.random() * lines.length)]}`);
  }

  if (text?.startsWith(".ramalan ") || text?.startsWith(".horoscope ")) {
    const z = text.replace(/^\.(ramalan|horoscope)\s*/, "").toLowerCase();
    const fortunes = [
      "Hari ini keberuntungan ada di pihakmu! 🍀", "Hati-hati dalam mengambil keputusan ⚠️",
      "Seseorang spesial akan muncul 💫", "Hari yang baik untuk memulai hal baru 🌟",
      "Jangan terlalu overthinking 🧠", "Rejeki datang dari arah tak terduga 💰",
      "Fokus pada kesehatan mental 🧘", "Ada surprise menyenangkan menunggumu 🎁",
      "Saatnya ambil langkah berani 🦁", "Kebahagiaan ada di hal-hal kecil 🌻"
    ];
    return send(chatIdMsg, `🔮 *RAMALAN ${z.toUpperCase()}*\n\n${fortunes[Math.floor(Math.random() * fortunes.length)]}\n\n🍀 Lucky: ${Math.floor(Math.random() * 100)}\n⭐ ${Math.floor(Math.random() * 5) + 1}/5`);
  }

  if (text?.startsWith(".afk")) {
    const reason = text.replace(".afk", "").trim() || "Tidak ada alasan";
    const name = update.message.from.first_name;
    if (!afkUsers[chatIdMsg]) afkUsers[chatIdMsg] = {};
    afkUsers[chatIdMsg][update.message.from.id] = { reason, time: Date.now() };
    return send(chatIdMsg, `💤 *AFK*\n\n${name} sedang AFK.\n📝 Alasan: ${reason}`);
  }

  if (text === ".couple") {
    const members = groupMembers[chatIdMsg];
    if (!members || Object.keys(members).length < 2) return send(chatIdMsg, "⚠️ Minimal 2 member.");
    const ids = Object.keys(members);
    const id1 = ids[Math.floor(Math.random() * ids.length)];
    let id2 = ids[Math.floor(Math.random() * ids.length)];
    while (id2 === id1 && ids.length > 1) id2 = ids[Math.floor(Math.random() * ids.length)];
    return send(chatIdMsg, `💑 *COUPLE OF THE DAY*\n\n${members[id1].firstName || "User1"} ❤️ ${members[id2].firstName || "User2"}\n\n💕 Cocok: ${Math.floor(Math.random() * 101)}%`);
  }

  if (text?.startsWith(".match ")) {
    const names = text.replace(".match ", "").split("&");
    if (names.length < 2) return send(chatIdMsg, "❌ `.match Nama1 & Nama2`");
    const pct = Math.floor(Math.random() * 101);
    let status;
    if (pct >= 80) status = "💖 Sangat cocok! Kalian jodoh!";
    else if (pct >= 60) status = "💕 Lumayan cocok!";
    else if (pct >= 40) status = "😐 Biasa aja sih...";
    else if (pct >= 20) status = "😢 Kurang cocok...";
    else status = "💔 Ga cocok sama sekali!";
    return send(chatIdMsg, `💘 *LOVE MATCH*\n\n${names[0].trim()} ❤️ ${names[1].trim()}\n\n💕 Kecocokan: ${pct}%\n${status}`);
  }

  if (text === ".meme") {
    try {
      const res = await fetch("https://meme-api.com/gimme").then(r => r.json());
      if (res.url) return sendPhoto(chatIdMsg, res.url, `😂 ${res.title || "Meme"}`);
      return send(chatIdMsg, "❌ Gagal.");
    } catch { return send(chatIdMsg, "❌ Error."); }
  }

  if (text === ".cerpen") {
    const cerpen = [
      "🌧️ *Hujan di Sore Hari*\n\nDia berdiri di halte bus, menatap hujan yang turun deras. Sebuah payung tiba-tiba menutupi kepalanya. Seorang gadis tersenyum, 'Mau berbagi?' Itulah awal dari kisah yang tak pernah dia duga.",
      "☕ *Kopi Pagi*\n\nSetiap pagi, dia pesan kopi yang sama di kedai kecil itu. Barista selalu ingat pesanannya. Suatu hari, di gelas kopinya tertulis nomor telepon. Dia tersenyum, akhirnya memberanikan diri menelepon.",
      "📚 *Buku Lama*\n\nDi rak tua perpustakaan, dia menemukan buku berdebu. Di dalamnya, ada foto hitam putih kakek dan nenek yang tak pernah dia kenal. Kisah cinta mereka tertulis di balik foto itu.",
      "🌅 *Senja Terakhir*\n\nMereka duduk di tepi pantai, menikmati senja terakhir sebelum dia pergi ke luar negeri. 'Aku akan kembali,' bisiknya. Lima tahun kemudian, dia menepati janjinya."
    ];
    return send(chatIdMsg, cerpen[Math.floor(Math.random() * cerpen.length)]);
  }

  if (text === ".motivasi") {
    const m = [
      "💪 Setiap hari adalah kesempatan baru. Jangan sia-siakan!",
      "🌟 Kegagalan bukanlah akhir, tapi awal dari pembelajaran.",
      "🔥 Yang membedakan pemenang dan pecundang adalah keberanian untuk mencoba.",
      "🌈 Setelah hujan, selalu ada pelangi. Tetap semangat!",
      "⭐ Mimpi besar dimulai dari langkah kecil. Mulai sekarang!",
      "💎 Berlian terbentuk dari tekanan. Masalahmu membentukmu menjadi lebih kuat.",
      "🚀 Jangan takut gagal. Takutlah jika kamu tidak pernah mencoba.",
      "🌱 Pertumbuhan terjadi di luar zona nyaman. Beranilah melangkah!"
    ];
    return send(chatIdMsg, `✨ *MOTIVASI*\n\n${m[Math.floor(Math.random() * m.length)]}`);
  }

  if (text === ".saran" || text === ".advice") {
    const advices = [
      "💡 Minum air putih minimal 8 gelas sehari!", "💡 Tidur cukup 7-8 jam per malam.",
      "💡 Jangan lupa olahraga minimal 30 menit sehari.", "💡 Kurangi main HP sebelum tidur.",
      "💡 Belajar hal baru setiap hari, sekecil apapun.", "💡 Sisihkan minimal 10% penghasilan untuk ditabung.",
      "💡 Luangkan waktu untuk keluarga dan teman.", "💡 Jangan membandingkan diri dengan orang lain.",
      "💡 Bersyukur atas apa yang sudah dimiliki.", "💡 Backup data pentingmu secara berkala!"
    ];
    return send(chatIdMsg, `📌 *SARAN HARI INI*\n\n${advices[Math.floor(Math.random() * advices.length)]}`);
  }

  // ==========================================
  // INFO COMMANDS
  // ==========================================
  if (text === ".info" || text === ".me") {
    const t = update.message.reply_to_message?.from || update.message.from;
    return send(chatIdMsg, `👤 *Info User*\n\n📛 Nama: ${t.first_name} ${t.last_name || ""}\n📝 Username: @${t.username || "-"}\n🆔 ID: \`${t.id}\`\n🤖 Bot: ${t.is_bot ? "Ya" : "Tidak"}\n🌐 Language: ${t.language_code || "-"}`);
  }

  if (text === ".ping") {
    const start = Date.now();
    return send(chatIdMsg, `🏓 Pong! ${Date.now() - start}ms`);
  }

  if (text === ".runtime" || text === ".uptime") {
    const u = process.uptime();
    return send(chatIdMsg, `⏱️ *Uptime:* ${Math.floor(u / 86400)}d ${Math.floor((u % 86400) / 3600)}h ${Math.floor((u % 3600) / 60)}m ${Math.floor(u % 60)}s`);
  }

  // ==========================================
  // SEARCH COMMANDS
  // ==========================================
  if (text?.startsWith(".wiki ") || text?.startsWith(".wikipedia ")) {
    const q = text.replace(/^\.(wiki|wikipedia)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.wiki <kata>`");
    try {
      const res = await fetch(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`).then(r => r.json());
      if (res.extract) {
        return send(chatIdMsg, `📚 *Wikipedia: ${res.title}*\n\n${res.extract.substring(0, 1000)}${res.extract.length > 1000 ? "..." : ""}\n\n🔗 ${res.content_urls?.desktop?.page || ""}`);
      }
      return send(chatIdMsg, "❌ Artikel tidak ditemukan.");
    } catch { return send(chatIdMsg, "❌ Gagal."); }
  }

  if (text?.startsWith(".kbbi ") || text?.startsWith(".kamus ")) {
    const q = text.replace(/^\.(kbbi|kamus)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.kbbi <kata>`");
    return send(chatIdMsg, `📖 *KBBI: ${q}*\n\n🔗 Cek di: https://kbbi.kemdikbud.go.id/entri/${encodeURIComponent(q)}`);
  }

  if (text?.startsWith(".lirik ") || text?.startsWith(".lyrics ")) {
    const q = text.replace(/^\.(lirik|lyrics)\s*/, "");
    if (!q) return send(chatIdMsg, "❌ `.lirik <judul lagu>`");
    try {
      const parts = q.split(" - ");
      const artist = parts.length > 1 ? parts[0].trim() : "";
      const title = parts.length > 1 ? parts[1].trim() : q;
      const url = artist
        ? `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
        : `https://api.lyrics.ovh/v1/_/${encodeURIComponent(title)}`;
      const res = await fetch(url).then(r => r.json());
      if (res.lyrics) {
        return send(chatIdMsg, `🎵 *Lirik: ${q}*\n\n${res.lyrics.substring(0, 3000)}${res.lyrics.length > 3000 ? "\n\n..." : ""}`);
      }
      return send(chatIdMsg, "❌ Lirik tidak ditemukan. Coba format: `.lirik Artis - Judul`");
    } catch { return send(chatIdMsg, "❌ Gagal."); }
  }

  // ==========================================
  // DOWNLOAD COMMANDS
  // ==========================================
  if (text?.startsWith(".tiktok ") || text?.startsWith(".tt ")) return send(chatIdMsg, "📥 Fitur TikTok downloader sedang dalam pengembangan. Stay tuned!");
  if (text?.startsWith(".ig ") || text?.startsWith(".instagram ")) return send(chatIdMsg, "📥 Fitur Instagram downloader sedang dalam pengembangan.");
  if (text?.startsWith(".yt ") || text?.startsWith(".youtube ")) return send(chatIdMsg, "📥 Fitur YouTube downloader sedang dalam pengembangan.");
  if (text?.startsWith(".spotify ")) return send(chatIdMsg, "📥 Fitur Spotify downloader sedang dalam pengembangan.");
  if (text?.startsWith(".pinterest ")) return send(chatIdMsg, "📥 Fitur Pinterest downloader sedang dalam pengembangan.");
  if (text?.startsWith(".twitter ") || text?.startsWith(".tw ")) return send(chatIdMsg, "📥 Fitur Twitter downloader sedang dalam pengembangan.");
  if (text?.startsWith(".fb ") || text?.startsWith(".facebook ")) return send(chatIdMsg, "📥 Fitur Facebook downloader sedang dalam pengembangan.");

  // ==========================================
  // CONVERTER COMMANDS
  // ==========================================
  if (text?.startsWith(".celcius ") || text?.startsWith(".ctof ")) {
    const c = parseFloat(text.split(" ")[1]);
    if (isNaN(c)) return send(chatIdMsg, "❌ `.celcius <angka>`");
    return send(chatIdMsg, `🌡️ ${c}°C = ${(c * 9/5 + 32).toFixed(1)}°F = ${(c + 273.15).toFixed(1)}K`);
  }

  if (text?.startsWith(".fahrenheit ") || text?.startsWith(".ftoc ")) {
    const f = parseFloat(text.split(" ")[1]);
    if (isNaN(f)) return send(chatIdMsg, "❌ `.fahrenheit <angka>`");
    return send(chatIdMsg, `🌡️ ${f}°F = ${((f - 32) * 5/9).toFixed(1)}°C = ${((f - 32) * 5/9 + 273.15).toFixed(1)}K`);
  }

  if (text?.startsWith(".kmtomil ")) {
    const km = parseFloat(text.split(" ")[1]);
    if (isNaN(km)) return send(chatIdMsg, "❌ `.kmtomil <angka>`");
    return send(chatIdMsg, `📏 ${km} km = ${(km * 0.621371).toFixed(2)} mil`);
  }

  if (text?.startsWith(".miltokm ")) {
    const mil = parseFloat(text.split(" ")[1]);
    if (isNaN(mil)) return send(chatIdMsg, "❌ `.miltokm <angka>`");
    return send(chatIdMsg, `📏 ${mil} mil = ${(mil * 1.60934).toFixed(2)} km`);
  }

  if (text?.startsWith(".kgtolbs ")) {
    const kg = parseFloat(text.split(" ")[1]);
    if (isNaN(kg)) return send(chatIdMsg, "❌ `.kgtolbs <angka>`");
    return send(chatIdMsg, `⚖️ ${kg} kg = ${(kg * 2.20462).toFixed(2)} lbs`);
  }

  if (text?.startsWith(".lbstokg ")) {
    const lbs = parseFloat(text.split(" ")[1]);
    if (isNaN(lbs)) return send(chatIdMsg, "❌ `.lbstokg <angka>`");
    return send(chatIdMsg, `⚖️ ${lbs} lbs = ${(lbs * 0.453592).toFixed(2)} kg`);
  }

  if (text?.startsWith(".bmi ")) {
    const parts = text.split(" ");
    const bb = parseFloat(parts[1]);
    const tb = parseFloat(parts[2]);
    if (isNaN(bb) || isNaN(tb)) return send(chatIdMsg, "❌ `.bmi <berat_kg> <tinggi_cm>`");
    const bmi = bb / ((tb/100) * (tb/100));
    let status;
    if (bmi < 18.5) status = "Kurus 🏃";
    else if (bmi < 25) status = "Normal ✅";
    else if (bmi < 30) status = "Gemuk ⚠️";
    else status = "Obesitas 🔴";
    return send(chatIdMsg, `⚖️ *BMI Calculator*\n\nBerat: ${bb} kg\nTinggi: ${tb} cm\nBMI: ${bmi.toFixed(1)}\nStatus: ${status}`);
  }

  if (text?.startsWith(".umur ") || text?.startsWith(".age ")) {
    const q = text.replace(/^\.(umur|age)\s*/, "");
    const parts = q.split(/[-/]/);
    if (parts.length < 3) return send(chatIdMsg, "❌ `.umur DD-MM-YYYY`");
    const birth = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    return send(chatIdMsg, `🎂 *Umur:*\n\n${years} tahun ${months} bulan ${days} hari\n📅 Total: ${totalDays.toLocaleString()} hari\n⏰ Total: ${(totalDays * 24).toLocaleString()} jam`);
  }

  if (text?.startsWith(".roman ")) {
    const num = parseInt(text.split(" ")[1]);
    if (isNaN(num) || num < 1 || num > 3999) return send(chatIdMsg, "❌ `.roman <1-3999>`");
    const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let result = "", n = num;
    for (let i = 0; i < vals.length; i++) { while (n >= vals[i]) { result += syms[i]; n -= vals[i]; } }
    return send(chatIdMsg, `🏛️ ${num} = *${result}*`);
  }

  // ==========================================
  // EDUKASI COMMANDS
  // ==========================================
  if (text?.startsWith(".rumus ")) {
    const q = text.replace(".rumus ", "").toLowerCase();
    const rumus = {
      "luas lingkaran": "πr² (π × jari-jari²)",
      "keliling lingkaran": "2πr (2 × π × jari-jari)",
      "luas persegi": "s² (sisi × sisi)",
      "keliling persegi": "4s (4 × sisi)",
      "luas segitiga": "½ × alas × tinggi",
      "luas trapesium": "½ × (a + b) × t",
      "volume kubus": "s³ (sisi × sisi × sisi)",
      "volume balok": "p × l × t",
      "volume tabung": "πr²t",
      "volume kerucut": "⅓ × πr²t",
      "volume bola": "⁴⁄₃ × πr³",
      "pythagoras": "a² + b² = c²",
      "kecepatan": "v = s/t (jarak/waktu)",
      "percepatan": "a = Δv/t",
      "gaya": "F = m × a (massa × percepatan)",
      "energi kinetik": "Ek = ½mv²",
      "energi potensial": "Ep = mgh",
      "tekanan": "P = F/A (gaya/luas)",
      "massa jenis": "ρ = m/V (massa/volume)",
      "ohm": "V = IR (tegangan = arus × hambatan)",
      "daya": "P = V × I (tegangan × arus)"
    };
    if (rumus[q]) return send(chatIdMsg, `📐 *Rumus ${q}:*\n\n${rumus[q]}`);
    return send(chatIdMsg, `📐 *Rumus yang tersedia:*\n\n${Object.keys(rumus).map(k => `• ${k}`).join("\n")}`);
  }

  if (text?.startsWith(".unsur ") || text?.startsWith(".element ")) {
    const q = text.replace(/^\.(unsur|element)\s*/, "").toLowerCase();
    const elements = {
      "hidrogen": "H | No: 1 | Massa: 1.008 | Gas | Nonlogam",
      "helium": "He | No: 2 | Massa: 4.003 | Gas | Gas mulia",
      "litium": "Li | No: 3 | Massa: 6.941 | Padat | Logam alkali",
      "karbon": "C | No: 6 | Massa: 12.011 | Padat | Nonlogam",
      "nitrogen": "N | No: 7 | Massa: 14.007 | Gas | Nonlogam",
      "oksigen": "O | No: 8 | Massa: 15.999 | Gas | Nonlogam",
      "besi": "Fe | No: 26 | Massa: 55.845 | Padat | Logam transisi",
      "emas": "Au | No: 79 | Massa: 196.967 | Padat | Logam transisi",
      "perak": "Ag | No: 47 | Massa: 107.868 | Padat | Logam transisi",
      "tembaga": "Cu | No: 29 | Massa: 63.546 | Padat | Logam transisi"
    };
    if (elements[q]) return send(chatIdMsg, `⚗️ *Unsur: ${q}*\n\n${elements[q]}`);
    return send(chatIdMsg, `⚗️ Unsur tersedia: ${Object.keys(elements).join(", ")}`);
  }

  // ==========================================
  // RANDOM COMMANDS
  // ==========================================
  if (text === ".randomnama" || text === ".randname") {
    const firstNames = ["Andi", "Budi", "Citra", "Dewi", "Eka", "Fajar", "Gita", "Hadi", "Indra", "Joko", "Kartika", "Lina", "Mira", "Nita", "Okta", "Putra", "Rina", "Sari", "Tika", "Umar", "Vina", "Wati", "Yudi", "Zahra"];
    const lastNames = ["Pratama", "Sari", "Wijaya", "Kusuma", "Hidayat", "Putri", "Saputra", "Rahayu", "Firmansyah", "Permata", "Nugraha", "Lestari", "Wibowo", "Anggraini", "Setiawan"];
    return send(chatIdMsg, `👤 *Random Nama:*\n${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`);
  }

  if (text === ".randomwarna" || text === ".randcolor") {
    const colors = ["Merah 🔴", "Biru 🔵", "Hijau 🟢", "Kuning 🟡", "Ungu 🟣", "Oranye 🟠", "Putih ⚪", "Hitam ⚫", "Cokelat 🟤", "Pink 🩷", "Cyan 🩵", "Magenta", "Emas 🥇", "Perak 🥈"];
    return send(chatIdMsg, `🎨 *Random Warna:* ${colors[Math.floor(Math.random() * colors.length)]}`);
  }

  if (text === ".randommakanan" || text === ".randfood") {
  const foods = [
    "Nasi Goreng 🍛","Mie Ayam 🍜","Soto 🥣","Rendang 🥩","Sate 🍢","Gado-gado 🥗","Bakso 🍲","Nasi Padang 🍚","Ayam Geprek 🐔","Martabak 🥞",
    "Seblak 🌶️","Pempek 🐟","Gudeg 🍛","Rawon 🥣","Pecel Lele 🐟","Nasi Uduk 🍚","Nasi Kuning 🍚","Nasi Liwet 🍚","Ayam Bakar 🍗","Ayam Goreng 🍗",
    "Ikan Bakar 🐟","Ikan Goreng 🐟","Tahu Tempe 🧈","Tempe Mendoan 🍘","Perkedel 🥔","Opor Ayam 🍲","Capcay 🥦","Fuyunghai 🍳","Bihun Goreng 🍝","Kwetiau Goreng 🍜",
    "Mie Goreng 🍝","Mie Rebus 🍜","Laksa 🍲","Lontong Sayur 🥗","Ketoprak 🥗","Siomay 🥟","Batagor 🥟","Cireng 🍘","Cilok 🍡","Cimol 🍡",
    "Kerak Telor 🥚","Sop Buntut 🍲","Sop Iga 🍲","Tongseng 🥘","Gulai 🥘","Pindang 🍲","Asinan 🥗","Rujak 🥭","Rujak Cingur 🥗","Lotek 🥗",
    "Burger 🍔","Pizza 🍕","Hot Dog 🌭","Kentang Goreng 🍟","Spaghetti 🍝","Lasagna 🍝","Fried Chicken 🍗","Steak 🥩","Sandwich 🥪","Kebab 🌯",
    "Sushi 🍣","Ramen 🍜","Udon 🍜","Takoyaki 🐙","Okonomiyaki 🥞","Onigiri 🍙","Bibimbap 🍚","Kimchi 🥬","Tteokbokki 🌶️","Jajangmyeon 🍜",
    "Dimsum 🥟","Peking Duck 🦆","Chow Mein 🍜","Spring Roll 🥟","Mapo Tofu 🧈","Pad Thai 🍜","Tom Yum 🍲","Green Curry 🍛","Pho 🍜","Banh Mi 🥪",
    "Donat 🍩","Roti Bakar 🍞","Pancake 🥞","Waffle 🧇","Croissant 🥐","Cake 🍰","Brownies 🍫","Es Krim 🍨","Puding 🍮","Klepon 🍡",
    "Onde-onde 🍘","Dadar Gulung 🍘","Lemper 🍙","Serabi 🥞","Kue Cubit 🍰","Martabak Manis 🥞","Es Teh 🧊","Es Jeruk 🍊","Kopi ☕","Teh 🍵"
  ];
  return send(chatIdMsg, `🍽️ *Makan Apa Ya?*\n\n${foods[Math.floor(Math.random() * foods.length)]}`);
}

  if (text === ".randomhewan" || text === ".randanimal") {
  const animals = [
    "Kucing 🐱","Anjing 🐕","Kelinci 🐰","Hamster 🐹","Panda 🐼","Koala 🐨","Singa 🦁","Harimau 🐯","Gajah 🐘","Jerapah 🦒",
    "Zebra 🦓","Badak 🦏","Kuda 🐴","Sapi 🐮","Kambing 🐐","Domba 🐑","Babi 🐷","Ayam 🐔","Bebek 🦆","Angsa 🦢",
    "Burung Hantu 🦉","Elang 🦅","Merpati 🕊️","Gagak 🐦‍⬛","Flamingo 🦩","Merak 🦚","Burung Unta 🐦",
    "Ikan 🐟","Ikan Mas 🐠","Ikan Hiu 🦈","Ikan Pari 🐡","Paus 🐳","Paus Biru 🐋","Lumba-lumba 🐬","Anjing Laut 🦭",
    "Penyu 🐢","Buaya 🐊","Kadal 🦎","Ular 🐍","Katak 🐸","Salamander 🦎",
    "Monyet 🐒","Gorila 🦍","Orangutan 🦧","Simpanse 🐵","Lemur 🐒",
    "Beruang 🐻","Beruang Kutub 🐻‍❄️","Serigala 🐺","Rubah 🦊","Rakoon 🦝","Landak 🦔","Berang-berang 🦫",
    "Kanguru 🦘","Wallaby 🦘","Platipus 🦫","Wombat 🐾",
    "Semut 🐜","Lebah 🐝","Kupu-kupu 🦋","Ngengat 🦋","Laba-laba 🕷️","Kalajengking 🦂","Kepiting 🦀","Udang 🦐","Lobster 🦞",
    "Cumi-cumi 🦑","Gurita 🐙","Bintang Laut ⭐","Ubur-ubur 🪼",
    "Kuda Nil 🦛","Tapir 🐗","Trenggiling 🐾","Oposum 🐾","Kuskus 🐾"
  ];
  return send(chatIdMsg, `🐾 *Random Hewan:* ${animals[Math.floor(Math.random() * animals.length)]}`);
}

  if (text === ".randomnegara" || text === ".randcountry") {
  const countries = [
    "Indonesia 🇮🇩","Malaysia 🇲🇾","Singapura 🇸🇬","Thailand 🇹🇭","Filipina 🇵🇭","Vietnam 🇻🇳","Brunei 🇧🇳","Myanmar 🇲🇲","Laos 🇱🇦","Kamboja 🇰🇭",
    "Jepang 🇯🇵","Korea Selatan 🇰🇷","Korea Utara 🇰🇵","China 🇨🇳","Taiwan 🇹🇼","Hong Kong 🇭🇰","Makau 🇲🇴","Mongolia 🇲🇳","India 🇮🇳","Pakistan 🇵🇰",
    "Bangladesh 🇧🇩","Sri Lanka 🇱🇰","Nepal 🇳🇵","Bhutan 🇧🇹","Maladewa 🇲🇻","Afghanistan 🇦🇫","Iran 🇮🇷","Irak 🇮🇶","Arab Saudi 🇸🇦","Uni Emirat Arab 🇦🇪",
    "Qatar 🇶🇦","Kuwait 🇰🇼","Bahrain 🇧🇭","Oman 🇴🇲","Yaman 🇾🇪","Israel 🇮🇱","Yordania 🇯🇴","Suriah 🇸🇾","Lebanon 🇱🇧","Turki 🇹🇷",
    "Inggris 🇬🇧","Irlandia 🇮🇪","Prancis 🇫🇷","Jerman 🇩🇪","Belanda 🇳🇱","Belgia 🇧🇪","Luksemburg 🇱🇺","Swiss 🇨🇭","Austria 🇦🇹","Italia 🇮🇹",
    "Spanyol 🇪🇸","Portugal 🇵🇹","Andorra 🇦🇩","Monako 🇲🇨","San Marino 🇸🇲","Vatikan 🇻🇦","Swedia 🇸🇪","Norwegia 🇳🇴","Denmark 🇩🇰","Finlandia 🇫🇮",
    "Islandia 🇮🇸","Polandia 🇵🇱","Ceko 🇨🇿","Slovakia 🇸🇰","Hungaria 🇭🇺","Romania 🇷🇴","Bulgaria 🇧🇬","Yunani 🇬🇷","Albania 🇦🇱","Serbia 🇷🇸",
    "Kroasia 🇭🇷","Bosnia & Herzegovina 🇧🇦","Slovenia 🇸🇮","Makedonia Utara 🇲🇰","Montenegro 🇲🇪","Kosovo 🇽🇰","Ukraina 🇺🇦","Belarus 🇧🇾","Rusia 🇷🇺","Moldova 🇲🇩",
    "Amerika Serikat 🇺🇸","Kanada 🇨🇦","Meksiko 🇲🇽","Guatemala 🇬🇹","Honduras 🇭🇳","El Salvador 🇸🇻","Nikaragua 🇳🇮","Kosta Rika 🇨🇷","Panama 🇵🇦","Kuba 🇨🇺",
    "Jamaika 🇯🇲","Haiti 🇭🇹","Republik Dominika 🇩🇴","Kolombia 🇨🇴","Venezuela 🇻🇪","Ekuador 🇪🇨","Peru 🇵🇪","Bolivia 🇧🇴","Brasil 🇧🇷","Paraguay 🇵🇾",
    "Uruguay 🇺🇾","Argentina 🇦🇷","Chile 🇨🇱","Guyana 🇬🇾","Suriname 🇸🇷","Afrika Selatan 🇿🇦","Mesir 🇪🇬","Nigeria 🇳🇬","Kenya 🇰🇪","Tanzania 🇹🇿",
    "Uganda 🇺🇬","Ethiopia 🇪🇹","Somalia 🇸🇴","Sudan 🇸🇩","Sudan Selatan 🇸🇸","Ghana 🇬🇭","Pantai Gading 🇨🇮","Senegal 🇸🇳","Maroko 🇲🇦","Aljazair 🇩🇿",
    "Tunisia 🇹🇳","Libya 🇱🇾","Kamerun 🇨🇲","Kongo 🇨🇬","DR Kongo 🇨🇩","Angola 🇦🇴","Zambia 🇿🇲","Zimbabwe 🇿🇼","Mozambik 🇲🇿","Madagaskar 🇲🇬",
    "Australia 🇦🇺","Selandia Baru 🇳🇿","Papua Nugini 🇵🇬","Fiji 🇫🇯","Samoa 🇼🇸","Tonga 🇹🇴","Vanuatu 🇻🇺","Kepulauan Solomon 🇸🇧","Kiribati 🇰🇮","Nauru 🇳🇷"
  ];
  return send(chatIdMsg, `🌍 *Random Negara:* ${countries[Math.floor(Math.random() * countries.length)]}`);
}

  // ==========================================
  // CALLBACK MENU HANDLERS
  // ==========================================
  if (!update.callback_query) return;

  const chatId = update.callback_query.message.chat.id;
  const msgId = update.callback_query.message.message_id;
  const d = update.callback_query.data;

  await fetch(`${API}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: update.callback_query.id })
  });

  if (d === "menu_grup") {
    return send(chatId, "*👥 MENU GRUP (15+ Commands)*\n\n_Kelola grup dengan mudah:_", {
      inline_keyboard: [
        [{ text: "📣 Tag All", callback_data: "help_tagall" }, { text: "⚠️ Kick/Ban", callback_data: "help_kick" }],
        [{ text: "🔇 Mute/Unmute", callback_data: "help_mute" }, { text: "👮 Promote/Demote", callback_data: "help_promote" }],
        [{ text: "📌 Pin/Unpin", callback_data: "help_pin" }, { text: "🗑️ Delete", callback_data: "help_delete" }],
        [{ text: "⚠️ Warn/Unwarn", callback_data: "help_warn" }, { text: "📢 Broadcast", callback_data: "help_broadcast" }],
        [{ text: "👥 Group Info", callback_data: "help_groupinfo" }, { text: "👋 Welcome", callback_data: "help_welcome" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_tools") {
    return send(chatId, "*🛠️ MENU TOOLS (50+ Commands)*\n\n_Semua tools yang kamu butuhkan:_", {
      inline_keyboard: [
        [{ text: "🌍 IP Tracker", callback_data: "help_ip" }, { text: "🪪 Cek NIK", callback_data: "help_nik" }],
        [{ text: "🔐 Encode/Decode", callback_data: "help_encode" }, { text: "📱 QR Code", callback_data: "help_qr" }],
        [{ text: "🌐 Translate", callback_data: "help_translate" }, { text: "🌤️ Cuaca", callback_data: "help_cuaca" }],
        [{ text: "🐙 GitHub", callback_data: "help_github" }, { text: "🔗 Short URL", callback_data: "help_short" }],
        [{ text: "📡 Morse", callback_data: "help_morse" }, { text: "🔄 ROT13", callback_data: "help_rot13" }],
        [{ text: "💻 Binary/Hex/Oct", callback_data: "help_convert" }, { text: "📊 Count/Stats", callback_data: "help_count" }],
        [{ text: "#️⃣ Hash", callback_data: "help_hash" }, { text: "⏰ Epoch", callback_data: "help_epoch" }],
        [{ text: "🔑 Password", callback_data: "help_password" }, { text: "📧 TempMail", callback_data: "help_tempmail" }],
        [{ text: "🖼️ Get PP", callback_data: "help_getpp" }, { text: "🧮 Calculator", callback_data: "help_calc" }],
        [{ text: "🔗 URL Check", callback_data: "help_urlcheck" }, { text: "🔑 UUID", callback_data: "help_uuid" }],
        [{ text: "📝 Lorem", callback_data: "help_lorem" }, { text: "🎨 Color", callback_data: "help_color" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_ai") {
    return send(chatId, "*🤖 MENU AI (5+ Commands)*\n\n🧠 Powered by GPT-4o-mini\n👨‍💻 Owner: Yanshs\n👥 t.me/trasersecteam", {
      inline_keyboard: [
        [{ text: "🤖 Yanshs AI (.ai)", callback_data: "help_ai" }],
        [{ text: "💻 Code AI (.code)", callback_data: "help_codeai" }],
        [{ text: "📋 Ringkas (.ringkas)", callback_data: "help_ringkas" }],
        [{ text: "🎨 Imagine (.imagine)", callback_data: "help_imagine" }],
        [{ text: "✨ Remini HD", callback_data: "help_remini" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_game") {
    return send(chatId, "*🎮 MENU GAME (30+ Games)*\n\n_Games seru buat rame-rame:_", {
      inline_keyboard: [
        [{ text: "🎲 Dadu", callback_data: "help_dadu" }, { text: "🪙 Flip", callback_data: "help_flip" }],
        [{ text: "🐚 8Ball", callback_data: "help_8ball" }, { text: "🎰 Slot", callback_data: "help_slot" }],
        [{ text: "✊ Suit/RPS", callback_data: "help_suit" }, { text: "🔢 Random", callback_data: "help_random" }],
        [{ text: "🤔 Truth", callback_data: "help_truth" }, { text: "😈 Dare", callback_data: "help_dare" }],
        [{ text: "🎯 Tebak Kata", callback_data: "help_tebakkata" }, { text: "🧮 Math Quiz", callback_data: "help_math" }],
        [{ text: "🏳️ Tebak Bendera", callback_data: "help_bendera" }, { text: "🎬 Tebak Emoji", callback_data: "help_tebakemoji" }],
        [{ text: "🎤 Tebak Lagu", callback_data: "help_tebaklagu" }, { text: "🤔 Siapa Aku", callback_data: "help_siapaaku" }],
        [{ text: "🤷 WYR", callback_data: "help_wyr" }, { text: "💰 Tebak Harga", callback_data: "help_tebakharga" }],
        [{ text: "❓ Trivia", callback_data: "help_trivia" }, { text: "🔤 Akronim", callback_data: "help_akronim" }],
        [{ text: "🏛️ Ibu Kota", callback_data: "help_ibukota" }, { text: "🌍 Tebak Bahasa", callback_data: "help_tebakbahasa" }],
        [{ text: "🔗 Sambung Kata", callback_data: "help_sambungkata" }, { text: "📐 Tebak Rumus", callback_data: "help_tebakrumus" }],
        [{ text: "🧑‍🏫 Tebak Tokoh", callback_data: "help_tebaktokoh" }, { text: "📖 Emoji Story", callback_data: "help_emojistory" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_fun") {
    return send(chatId, "*🔮 MENU FUN (20+ Commands)*\n\n_Fitur hiburan:_", {
      inline_keyboard: [
        [{ text: "💬 Quote", callback_data: "help_quote" }, { text: "📖 Fakta", callback_data: "help_fakta" }],
        [{ text: "⭐ Rate", callback_data: "help_rate" }, { text: "💕 Ship", callback_data: "help_ship" }],
        [{ text: "✨ Ganteng/Cantik", callback_data: "help_ganteng" }, { text: "♈ Zodiak", callback_data: "help_zodiak" }],
        [{ text: "📜 Pantun", callback_data: "help_pantun" }, { text: "📜 Puisi", callback_data: "help_puisi" }],
        [{ text: "🔥 Roast", callback_data: "help_roast" }, { text: "💘 Gombal", callback_data: "help_gombal" }],
        [{ text: "🔮 Ramalan", callback_data: "help_ramalan" }, { text: "💤 AFK", callback_data: "help_afk" }],
        [{ text: "💑 Couple", callback_data: "help_couple" }, { text: "💘 Match", callback_data: "help_match" }],
        [{ text: "😂 Meme", callback_data: "help_meme" }, { text: "😂 Jokes", callback_data: "help_jokes" }],
        [{ text: "📖 Cerpen", callback_data: "help_cerpen" }, { text: "💪 Motivasi", callback_data: "help_motivasi" }],
        [{ text: "💡 Saran", callback_data: "help_saran" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_download") {
    return send(chatId, "*📥 MENU DOWNLOAD*\n\n_Download media sosial:_", {
      inline_keyboard: [
        [{ text: "🎵 TikTok", callback_data: "help_tiktok" }, { text: "📸 Instagram", callback_data: "help_ig" }],
        [{ text: "🎬 YouTube", callback_data: "help_yt" }, { text: "🎧 Spotify", callback_data: "help_spotify" }],
        [{ text: "📌 Pinterest", callback_data: "help_pinterest" }, { text: "🐦 Twitter", callback_data: "help_twitter" }],
        [{ text: "📘 Facebook", callback_data: "help_facebook" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_security") {
    return send(chatId, "*🔒 MENU SECURITY*\n\n_Fitur keamanan grup:_", {
      inline_keyboard: [
        [{ text: "🔗 Anti-Link", callback_data: "help_antilink" }, { text: "🚫 Anti-Spam", callback_data: "help_antispam" }],
        [{ text: "📝 Blacklist", callback_data: "help_blacklist" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_search") {
    return send(chatId, "*🔍 MENU SEARCH*\n\n_Cari informasi:_", {
      inline_keyboard: [
        [{ text: "📚 Wikipedia", callback_data: "help_wiki" }, { text: "📖 KBBI", callback_data: "help_kbbi" }],
        [{ text: "🎵 Lirik Lagu", callback_data: "help_lirik" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_media") {
    return send(chatId, "*🎵 MENU MEDIA*\n\n_Media tools:_", {
      inline_keyboard: [
        [{ text: "🖼️ Get PP", callback_data: "help_getpp" }, { text: "🎨 Sticker→Img", callback_data: "help_toimg" }],
        [{ text: "✨ Remini HD", callback_data: "help_remini" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_stalk") {
    return send(chatId, "*📊 MENU STALK*\n\n_Stalking tools:_", {
      inline_keyboard: [
        [{ text: "🐙 GitHub Stalk", callback_data: "help_github" }],
        [{ text: "🌍 IP Stalk", callback_data: "help_ip" }],
        [{ text: "🪪 NIK Stalk", callback_data: "help_nik" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_converter") {
    return send(chatId, "*🧰 MENU CONVERTER*\n\n_Konversi satuan:_", {
      inline_keyboard: [
        [{ text: "🌡️ Celcius↔F", callback_data: "help_temp" }, { text: "📏 KM↔Mil", callback_data: "help_distance" }],
        [{ text: "⚖️ KG↔Lbs", callback_data: "help_weight" }, { text: "⚖️ BMI", callback_data: "help_bmi" }],
        [{ text: "🎂 Umur", callback_data: "help_umur" }, { text: "🏛️ Romawi", callback_data: "help_roman" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_edukasi") {
    return send(chatId, "*📚 MENU EDUKASI*\n\n_Belajar bareng:_", {
      inline_keyboard: [
        [{ text: "📐 Rumus", callback_data: "help_rumus" }, { text: "⚗️ Unsur Kimia", callback_data: "help_unsur" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_random") {
    return send(chatId, "*🎭 MENU RANDOM*\n\n_Random generator:_", {
      inline_keyboard: [
        [{ text: "👤 Nama", callback_data: "help_randnama" }, { text: "🎨 Warna", callback_data: "help_randwarna" }],
        [{ text: "🍽️ Makanan", callback_data: "help_randmakanan" }, { text: "🐾 Hewan", callback_data: "help_randhewan" }],
        [{ text: "🌍 Negara", callback_data: "help_randnegara" }],
        [{ text: "⬅️ Kembali", callback_data: "back_main" }]
      ]
    });
  }

  if (d === "menu_info") {
    return send(chatId, "*ℹ️ INFO BOT*\n\n🤖 *Yanshs Bot v3.0*\n\n📦 Version: 3.0 Ultra\n👨‍💻 Owner: Yanshs\n👥 Komunitas: t.me/trasersecteam\n⚡ Status: Online\n🎯 Commands: 1000+\n\n_Commands:_\n`.info` - Info user\n`.ping` - Ping\n`.runtime` - Uptime\n`.groupinfo` - Info grup", {
      inline_keyboard: [[{ text: "⬅️ Kembali", callback_data: "back_main" }]]
    });
  }

  // ALL HELP CALLBACKS
  const helpTexts = {
    "help_tagall": "*📣 TAG ALL*\n\nCommand: `.tagall`\nTag semua member aktif.\n⚠️ Admin only.",
    "help_kick": "*⚠️ KICK/BAN*\n\n`.kick` - Kick user\n`.ban` - Ban\n`.unban` - Unban\n\n_Reply atau tag @user_",
    "help_mute": "*🔇 MUTE*\n\n`.mute <menit>` - Mute\n`.unmute` - Unmute\n\nDefault: 60 menit",
    "help_promote": "*👮 PROMOTE/DEMOTE*\n\n`.promote` - Jadikan admin\n`.demote` - Hapus admin",
    "help_pin": "*📌 PIN/UNPIN*\n\n`.pin` - Pin pesan\n`.unpin` - Unpin",
    "help_delete": "*🗑️ DELETE*\n\n`.del` - Hapus pesan",
    "help_warn": "*⚠️ WARN*\n\n`.warn` - Warn (3x = kick)\n`.unwarn` - Reset warn",
    "help_broadcast": "*📢 BROADCAST*\n\n`.broadcast <pesan>`\nKirim ke semua grup.",
    "help_groupinfo": "*👥 GROUP INFO*\n\n`.groupinfo` - Info grup lengkap",
    "help_welcome": "*👋 WELCOME*\n\n`.setwelcome <pesan>` - Set\n`.delwelcome` - Hapus",
    "help_ip": "*🌍 IP TRACKER*\n\n`.ip <IP>` - Track lengkap\nLokasi, ISP, VPN detect, Maps link",
    "help_nik": "*🪪 CEK NIK*\n\n`.nik <16 digit>`\n34 Provinsi + 514 Kab/Kota\nGender, lahir, zodiak, usia",
    "help_encode": "*🔐 ENCODE/DECODE*\n\n`.enc <teks>` - Base64 encode\n`.dec <teks>` - Base64 decode",
    "help_qr": "*📱 QR CODE*\n\n`.qr <teks/url>` - Buat QR",
    "help_translate": "*🌐 TRANSLATE*\n\n`.tr <teks>` - Ke Indonesia\n`.tren <teks>` - ID ke English",
    "help_cuaca": "*🌤️ CUACA*\n\n`.cuaca <kota>` - Info cuaca lengkap",
    "help_github": "*🐙 GITHUB*\n\n`.github <user>` - Profil lengkap",
    "help_short": "*🔗 SHORT URL*\n\n`.short <url>` - Persingkat URL",
    "help_morse": "*📡 MORSE*\n\n`.morse <teks>` - Ke morse\n`.demorse <morse>` - Ke teks",
    "help_rot13": "*🔄 ROT13*\n\n`.rot13 <teks>` - ROT13 cipher",
    "help_convert": "*💻 CONVERTER*\n\n`.tobin` `.frombin` - Binary\n`.tohex` `.fromhex` - Hex\n`.tooct` `.fromoct` - Octal\n`.toascii` `.fromascii` - ASCII",
    "help_count": "*📊 COUNT*\n\n`.count <teks>` - Statistik teks",
    "help_hash": "*#️⃣ HASH*\n\n`.hash <teks>` - Hash teks",
    "help_epoch": "*⏰ EPOCH*\n\n`.epoch` - Timestamp WIB/WITA/WIT",
    "help_password": "*🔑 PASSWORD*\n\n`.password` - Generate 5 password",
    "help_tempmail": "*📧 TEMP MAIL*\n\n`.tempmail` - Email disposable",
    "help_getpp": "*🖼️ GET PP*\n\n`.getpp` - Foto profil",
    "help_calc": "*🧮 CALC*\n\n`.calc <expr>` - Kalkulator",
    "help_urlcheck": "*🔗 URL CHECK*\n\n`.urlcheck <url>` - Cek status URL",
    "help_uuid": "*🔑 UUID*\n\n`.uuid` - Generate UUID v4",
    "help_lorem": "*📝 LOREM*\n\n`.lorem <jumlah>` - Lorem ipsum",
    "help_color": "*🎨 COLOR*\n\n`.color` - Random color",
    "help_ai": "*🤖 YANSHS AI*\n\n`.ai <tanya>` `.gpt <tanya>` `.ask <tanya>`\n\nGPT-4o-mini powered",
    "help_codeai": "*💻 CODE AI*\n\n`.code <pertanyaan coding>`\n\nBantu coding",
    "help_ringkas": "*📋 RINGKAS*\n\n`.ringkas <teks panjang>`\n\nRingkas otomatis",
    "help_imagine": "*🎨 IMAGINE*\n\n`.imagine <deskripsi>`\n\nDeskripsi gambar AI",
    "help_remini": "*✨ REMINI HD*\n\n`.remini` `.hd`\nReply foto atau kirim link",
    "help_dadu": "*🎲 DADU*\n\n`.dadu` - Lempar dadu",
    "help_flip": "*🪙 FLIP*\n\n`.flip` - Lempar koin",
    "help_8ball": "*🐚 8BALL*\n\n`.8ball` `.kerang` - Tanya kerang",
    "help_slot": "*🎰 SLOT*\n\n`.slot` - Slot machine",
    "help_suit": "*✊ SUIT*\n\n`.suit batu/gunting/kertas`",
    "help_random": "*🔢 RANDOM*\n\n`.random <min> <max>`",
    "help_truth": "*🤔 TRUTH*\n\n`.truth` - Pertanyaan truth",
    "help_dare": "*😈 DARE*\n\n`.dare` - Tantangan dare",
    "help_tebakkata": "*🎯 TEBAK KATA*\n\n`.tebakkata`",
    "help_math": "*🧮 MATH QUIZ*\n\n`.math`",
    "help_bendera": "*🏳️ TEBAK BENDERA*\n\n`.tebakbendera` - 50 negara",
    "help_tebakemoji": "*🎬 TEBAK EMOJI*\n\n`.tebakemoji` - 20 film",
    "help_tebaklagu": "*🎤 TEBAK LAGU*\n\n`.tebaklagu`",
    "help_siapaaku": "*🤔 SIAPA AKU*\n\n`.siapaaku`",
    "help_wyr": "*🤷 WOULD YOU RATHER*\n\n`.wyr`",
    "help_tebakharga": "*💰 TEBAK HARGA*\n\n`.tebakharga`",
    "help_trivia": "*❓ TRIVIA*\n\n`.trivia` - 20 soal",
    "help_akronim": "*🔤 AKRONIM*\n\n`.akronim` - 15 akronim",
    "help_ibukota": "*🏛️ IBU KOTA*\n\n`.tebakibukota`",
    "help_tebakbahasa": "*🌍 TEBAK BAHASA*\n\n`.tebakbahasa`",
    "help_sambungkata": "*🔗 SAMBUNG KATA*\n\n`.sambungkata`",
    "help_tebakrumus": "*📐 TEBAK RUMUS*\n\n`.tebakrumus`",
    "help_tebaktokoh": "*🧑‍🏫 TEBAK TOKOH*\n\n`.tebaktokoh`",
    "help_emojistory": "*📖 EMOJI STORY*\n\n`.emojistory`",
    "help_quote": "*💬 QUOTE*\n\n`.quote`",
    "help_fakta": "*📖 FAKTA*\n\n`.fakta`",
    "help_rate": "*⭐ RATE*\n\n`.rate <sesuatu>`",
    "help_ship": "*💕 SHIP*\n\n`.ship`",
    "help_ganteng": "*✨ GANTENG/CANTIK*\n\n`.ganteng` `.cantik`",
    "help_zodiak": "*♈ ZODIAK*\n\n`.zodiak <zodiak>` - Info lengkap",
    "help_pantun": "*📜 PANTUN*\n\n`.pantun`",
    "help_puisi": "*📜 PUISI*\n\n`.puisi`",
    "help_roast": "*🔥 ROAST*\n\n`.roast` - Reply user",
    "help_gombal": "*💘 GOMBAL*\n\n`.gombal` `.pickup`",
    "help_ramalan": "*🔮 RAMALAN*\n\n`.ramalan <zodiak>`",
    "help_afk": "*💤 AFK*\n\n`.afk <alasan>`",
    "help_couple": "*💑 COUPLE*\n\n`.couple`",
    "help_match": "*💘 MATCH*\n\n`.match Nama1 & Nama2`",
    "help_meme": "*😂 MEME*\n\n`.meme`",
    "help_jokes": "*😂 JOKES*\n\n`.jokes`",
    "help_cerpen": "*📖 CERPEN*\n\n`.cerpen`",
    "help_motivasi": "*💪 MOTIVASI*\n\n`.motivasi`",
    "help_saran": "*💡 SARAN*\n\n`.saran`",
    "help_tiktok": "*🎵 TIKTOK*\n\n`.tiktok <url>`\n⚠️ Coming soon!",
    "help_ig": "*📸 INSTAGRAM*\n\n`.ig <url>`\n⚠️ Coming soon!",
    "help_yt": "*🎬 YOUTUBE*\n\n`.yt <url>`\n⚠️ Coming soon!",
    "help_spotify": "*🎧 SPOTIFY*\n\n`.spotify <url>`\n⚠️ Coming soon!",
    "help_pinterest": "*📌 PINTEREST*\n\n`.pinterest <url>`\n⚠️ Coming soon!",
    "help_twitter": "*🐦 TWITTER*\n\n`.tw <url>`\n⚠️ Coming soon!",
    "help_facebook": "*📘 FACEBOOK*\n\n`.fb <url>`\n⚠️ Coming soon!",
    "help_antilink": "*🔗 ANTI-LINK*\n\n`.antilink on` - Aktifkan\n`.antilink off` - Nonaktifkan\n\nLink auto dihapus!",
    "help_antispam": "*🚫 ANTI-SPAM*\n\n`.antispam on` - Aktifkan\n`.antispam off` - Nonaktifkan\n\nSpammer auto mute!",
    "help_blacklist": "*📝 BLACKLIST*\n\n`.blacklist <kata>` - Tambah\n`.unblacklist <kata>` - Hapus\n`.listblacklist` - Lihat list",
    "help_wiki": "*📚 WIKIPEDIA*\n\n`.wiki <kata>`",
    "help_kbbi": "*📖 KBBI*\n\n`.kbbi <kata>`",
    "help_lirik": "*🎵 LIRIK*\n\n`.lirik Artis - Judul`",
    "help_toimg": "*🎨 STICKER→IMG*\n\n`.toimg` - Reply sticker",
    "help_temp": "*🌡️ TEMPERATUR*\n\n`.celcius <C>` - C ke F\n`.fahrenheit <F>` - F ke C",
    "help_distance": "*📏 JARAK*\n\n`.kmtomil <km>`\n`.miltokm <mil>`",
    "help_weight": "*⚖️ BERAT*\n\n`.kgtolbs <kg>`\n`.lbstokg <lbs>`",
    "help_bmi": "*⚖️ BMI*\n\n`.bmi <berat_kg> <tinggi_cm>`",
    "help_umur": "*🎂 UMUR*\n\n`.umur DD-MM-YYYY`",
    "help_roman": "*🏛️ ROMAWI*\n\n`.roman <angka>`",
    "help_rumus": "*📐 RUMUS*\n\n`.rumus <nama rumus>`\n20+ rumus tersedia",
    "help_unsur": "*⚗️ UNSUR KIMIA*\n\n`.unsur <nama unsur>`",
    "help_randnama": "*👤 RANDOM NAMA*\n\n`.randomnama`",
    "help_randwarna": "*🎨 RANDOM WARNA*\n\n`.randomwarna`",
    "help_randmakanan": "*🍽️ RANDOM MAKANAN*\n\n`.randommakanan`",
    "help_randhewan": "*🐾 RANDOM HEWAN*\n\n`.randomhewan`",
    "help_randnegara": "*🌍 RANDOM NEGARA*\n\n`.randomnegara`"
  };

  if (helpTexts[d]) return send(chatId, helpTexts[d]);

  if (d === "back_main") {
    return send(chatId, "*📌 MENU UTAMA - YANSHS BOT v3.0*\n_1000+ Fitur Lengkap!_\n\n_Pilih menu:_", {
      inline_keyboard: [
        [{ text: "👥 Menu Grup", callback_data: "menu_grup" }, { text: "🛠️ Menu Tools", callback_data: "menu_tools" }],
        [{ text: "🤖 Menu AI", callback_data: "menu_ai" }, { text: "🎮 Menu Game", callback_data: "menu_game" }],
        [{ text: "🔮 Menu Fun", callback_data: "menu_fun" }, { text: "📥 Menu Download", callback_data: "menu_download" }],
        [{ text: "🔒 Menu Security", callback_data: "menu_security" }, { text: "🔍 Menu Search", callback_data: "menu_search" }],
        [{ text: "🎵 Menu Media", callback_data: "menu_media" }, { text: "📊 Menu Stalk", callback_data: "menu_stalk" }],
        [{ text: "🧰 Menu Converter", callback_data: "menu_converter" }, { text: "📚 Menu Edukasi", callback_data: "menu_edukasi" }],
        [{ text: "🎭 Menu Random", callback_data: "menu_random" }, { text: "ℹ️ Info Bot", callback_data: "menu_info" }]
      ]
    });
  }
}

// Helper function
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
}
