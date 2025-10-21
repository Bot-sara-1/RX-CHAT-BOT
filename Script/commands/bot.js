const fs = global.nodemodule["fs-extra"];

module.exports.config = {
  name: "obot",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "Modified by rX",
  description: "Maria Baby-style reply system (only exact 'bot' trigger)",
  commandCategory: "noprefix",
  usages: "bot",
  cooldowns: 3
};

module.exports.handleEvent = async function({ api, event, Users }) {
  const { threadID, messageID, body, senderID } = event;
  
  // no text or not exactly "bot" => ignore
  if (!body) return;
  if (body.trim().toLowerCase() !== "bot") return;

  const name = await Users.getNameUser(senderID);

  const replies = [
    "𝘼𝙨𝙨𝙖𝙡𝙖𝙢𝙪𝙖𝙡𝙖𝙞𝙠𝙪𝙢♥",
    "𝘽𝙤𝙡𝙤 𝙗𝙖𝙗𝙮 🥹",
    "আমাকে ডাকলে ,আমি কিন্তু 𝐊𝐢𝐬𝐬 করে দিব 😘",
    "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🫶🏻",
    "৮১ , ৮২ , ৮৩ আমি তোমাকে ভালবাসি",
    "তোমাকে ছাড়া বেঁচে থাকা অসম্ভব মনে হয়🙈",
    "তুমি কি জানো? আমি কিন্তু তোমায় Miss করি...💌"
  ];

  const randReply = replies[Math.floor(Math.random() * replies.length)];

  const message =
`╭──────•◈•──────╮
   "HEY XAN I'M SARA BBZ"✨   

 ❄ Dᴇᴀʀ, ${name}
 💌 ${randReply}

╰──────•◈•──────╯`;

  return api.sendMessage(message, threadID, messageID);
};

module.exports.run = function() {};
