const axios = require("axios");
const simsim = "https://rx-simisimi-api-tllc.onrender.com";

module.exports.config = {
  name: "baby",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "rX", //prodct of. rX Abdullah. 
  description: "AI Chatbot with Teach & List support",
  commandCategory: "chat",
  usages: "[query]",
  cooldowns: 0,
  prefix: false
};
/*𝗪𝗼𝘄𝘄! 𝗔𝗺𝗮𝗿 “𝗯𝗮𝗯𝘆 𝗳𝗶𝗹𝗲” 𝘀𝗼𝗯𝗮𝗶 𝘂𝘀𝗲 𝗸𝗼𝗿𝗰𝗵𝗲 😍
𝗔𝗺𝗮𝗿 𝘁𝗿𝗮𝗽 𝗲 𝗽𝗲𝗿𝗲 𝗴𝗲𝗰𝗵𝗼 𝘁𝗼𝗺𝗿𝗮 🪤😏
𝗦𝗮𝗿𝗮 𝗱𝗶𝗻 𝗯𝗮𝗯𝘆 𝗯𝗮𝗯𝘆 𝗱𝗮𝗸𝗲 𝗮𝗶 𝗯𝗼𝘁 🍼😂
𝗧𝗼𝗺𝗿𝗮 𝘀𝗼𝗯𝗮𝗶𝗸𝗲 “𝗯𝗮𝗯𝘆 𝗴𝗮𝗻𝗴” 𝗲 𝘀𝗵𝘂𝗯𝗲𝗰𝗰𝗵𝗮 🫶
𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 𝘁𝗵𝗲 𝗺𝗮𝗱𝗻𝗲𝘀𝘀 𝗳𝗮𝗺𝗶𝗹𝘆 💥.*/

module.exports.run = async function ({ api, event, args, Users }) {
  const uid = event.senderID;
  const senderName = await Users.getNameUser(uid);
  const query = args.join(" ").toLowerCase();

  try {
    if (args[0] === "autoteach") {
      const mode = args[1];
      if (!["on", "off"].includes(mode)) {
        return api.sendMessage("✅ Use: baby autoteach on/off", event.threadID, event.messageID);
      }
      const status = mode === "on";
      await axios.post(`${simsim}/setting`, { autoTeach: status });
      return api.sendMessage(`✅ Auto teach is now ${status ? "ON 🟢" : "OFF 🔴"}`, event.threadID, event.messageID);
    }

    if (args[0] === "list") {
  const res = await axios.get(`${simsim}/list`);
  return api.sendMessage(
    `╭─╼🌟 𝐁𝐚𝐛𝐲 𝐀𝐈 𝐒𝐭𝐚𝐭𝐬\n├ 📝 𝐓𝐞𝐚𝐜𝐡𝐞𝐝 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬: ${res.data.totalQuestions}\n├ 📦 𝐒𝐭𝐨𝐫𝐞𝐝 𝐑𝐞𝐩𝐥𝐢𝐞𝐬: ${res.data.totalReplies}\n╰─╼👤 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: rX Abdullah`,
    event.threadID,
    event.messageID
  );
}
    if (args[0] === "msg") {
      const trigger = args.slice(1).join(" ").trim();
      if (!trigger) return api.sendMessage("❌ | Use: !baby msg [trigger]", event.threadID, event.messageID);

      const res = await axios.get(`${simsim}/simsimi-list?ask=${encodeURIComponent(trigger)}`);
      if (!res.data.replies || res.data.replies.length === 0) {
        return api.sendMessage("❌ No replies found.", event.threadID, event.messageID);
      }

      const formatted = res.data.replies.map((rep, i) => `➤ ${i + 1}. ${rep}`).join("\n");
      const msg = `📌 𝗧𝗿𝗶𝗴𝗴𝗲𝗿: ${trigger.toUpperCase()}\n📋 𝗧𝗼𝘁𝗮𝗹: ${res.data.total}\n━━━━━━━━━━━━━━\n${formatted}`;
      return api.sendMessage(msg, event.threadID, event.messageID);
    }

    if (args[0] === "teach") {
      const parts = query.replace("teach ", "").split(" - ");
      if (parts.length < 2)
        return api.sendMessage("❌ | Use: teach [Question] - [Reply]", event.threadID, event.messageID);

      const [ask, ans] = parts;
      const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}`);
      return api.sendMessage(`✅ ${res.data.message}`, event.threadID, event.messageID);
    }

    if (args[0] === "edit") {
      const parts = query.replace("edit ", "").split(" - ");
      if (parts.length < 3)
        return api.sendMessage("❌ | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);

      const [ask, oldR, newR] = parts;
      const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldR)}&new=${encodeURIComponent(newR)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    if (["remove", "rm"].includes(args[0])) {
      const parts = query.replace(/^(remove|rm)\s*/, "").split(" - ");
      if (parts.length < 2)
        return api.sendMessage("❌ | Use: remove [Question] - [Reply]", event.threadID, event.messageID);

      const [ask, ans] = parts;
      const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    if (!query) {
      const texts = ["Hey baby 💖", "Yes, I'm here 😘"];
      const reply = texts[Math.floor(Math.random() * texts.length)];
      return api.sendMessage(reply, event.threadID);
    }

    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
    return api.sendMessage(res.data.response, event.threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "simsimi"
        });
      }
    }, event.messageID);
  } catch (e) {
    return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, Users }) {
  const senderName = await Users.getNameUser(event.senderID);
  const text = event.body?.toLowerCase();
  if (!text) return;

  try {
    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(text)}&senderName=${encodeURIComponent(senderName)}`);
    return api.sendMessage(res.data.response, event.threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "simsimi"
        });
      }
    }, event.messageID);
  } catch (e) {
    return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const text = event.body?.toLowerCase().trim();
  if (!text) return;

  const senderName = await Users.getNameUser(event.senderID);

  const triggers = ["baby", "bby", "xan", "bbz", "maria", "hippi"];
  if (triggers.includes(text)) {
    const replies = [
      "𝘼𝙨𝙨𝙖𝙡𝙖𝙢𝙪𝙖𝙡𝙖𝙞𝙠𝙪𝙢♥",
      "বলেন sir__😌",
      "𝗔𝗶 𝗻𝗼𝘄 𝗹𝗲𝗺𝗼𝗻 𝗷𝘂𝘀𝘀 🍋🍹 𝗗𝗮𝗸𝘁𝗲 𝗱𝗮𝗸𝘁𝗲, 𝗧𝗼 𝗵𝗮𝗽𝗮𝘆 𝗴𝗮𝘀𝗼",
      "𝐆𝐚𝐣𝐚 𝐤𝐡𝐚 𝐦𝐚𝐧𝐮𝐬𝐡 𝐡𝐨 🍁🤡",
      "𝙇𝙚𝙢𝙤𝙣 𝙩𝙪𝙨 🍋",
      "মুড়ি খাও 🫥",
      "──‎ HuM..? 👉👈",
      "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🐸",
      "কি হলো, মিস টিস করচ্ছো নাকি 🤣",
      "𝘽𝙤𝙡𝙤 𝙗𝙖𝙗𝙮 🥹",
      "৮১ , ৮২ , ৮৩ আমি তোমাকে ভালবাসি",
      "আমাকে ডাকলে ,আমি কিন্তু 𝐊𝐢𝐬𝐬 করে দিব 😘"
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    return api.sendMessage(reply, event.threadID, (err, info) => {
      if (!err) {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "simsimi"
        });
      }
    });
  }

  const matchPrefix = /^(baby|bot|jan|bbz|maria|hippi)\s+/i;
  if (matchPrefix.test(text)) {
    const query = text.replace(matchPrefix, "").trim();
    if (!query) return;

    try {
      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
      return api.sendMessage(res.data.response, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "simsimi"
          });
        }
      }, event.messageID);
    } catch (e) {
      return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
    }
  }

  if (event.type === "message_reply") {
    try {
      const setting = await axios.get(`${simsim}/setting`);
      if (!setting.data.autoTeach) return;

      const ask = event.messageReply.body?.toLowerCase().trim();
      const ans = event.body?.toLowerCase().trim();
      if (!ask || !ans || ask === ans) return;

      setTimeout(async () => {
        try {
          await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderName=${encodeURIComponent(senderName)}`);
          console.log("✅ Auto-taught:", ask, "→", ans);
        } catch (err) {
          console.error("❌ Auto-teach internal error:", err.message);
        }
      }, 300); // Delay to avoid overload
    } catch (e) {
      console.log("❌ Auto-teach setting error:", e.message);
    }
  }
};
