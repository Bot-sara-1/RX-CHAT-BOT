const fs = global.nodemodule["fs-extra"];

module.exports.config = {
  name: "Obot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  try {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;

    // Get sender name
    const name = await Users.getNameUser(senderID);

    // The list of possible random replies when message contains 'bot' or 'Bot'
    const botReplies = [
      "বেশি bot Bot করলে leave নিবো কিন্তু😒😒 ",
      "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নি🥺 পচা তুমি🥺 ",
      "আমি আবাল দের সাতে কথা বলি না,ok😒 ",
      "এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈 ",
      "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 ",
      "বার বার ডাকলে মাথা গরম হয় কিন্তু😑",
      "হা বলো😒,কি করতে পারি😐😑?",
      "এতো ডাকছিস কোনো?গালি শুনবি নাকি? 🤬",
      "মেয়ে হলে বস আব্দুল্লাহ'এর সাথে প্রেম করো🙈??. ",
      "আরে Bolo আমার জান ,কেমন আসো?😚 ",
      "Bot বলে অসম্মান করচ্ছিছ,😰😿",
      "Hop bedi😾,Boss বল boss😼",
      "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু",
      "Bot না , জানু বল জানু 😘 ",
      "বার বার Disturb করেছিস কোনো😾,আমার বস আব্দুল্লাহ এর এর সাথে ব্যাস্ত আসি😋",
      "আমি গরীব এর সাথে কথা বলি না😼😼",
      "আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘 ",
      "আরে আমি মজা করার mood এ নাই😒",
      "হা জানু , এইদিক এ আসো কিস দেই🤭 😘",
      "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস  😉😋🤣",
      "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 ",
      "আমাকে ডেকো না,আমি ব্যাস্ত আছি",
      "কি হলো ,মিস টিস করচ্ছিস নাকি🤣",
      "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏",
      "কালকে দেখা করিস তো একটু 😈",
      "হা বলো, শুনছি আমি 😏",
      "মাইয়া হলে আমার বস আব্দুল্লাহ কে Ummmmha দে 😒",
      "বলো কি করতে পারি তোমার জন্য",
      "আমি তো অন্ধ কিছু দেখি না🐸 😎",
      "Bot না জানু,বল 😌",
      "বলো জানু 🌚",
      "তোর কি চোখে পড়ে না আমি ব্যাস্ত আছি😒",
      // --- তুমি ইচ্ছা করলে এখানেও আরো মেসেজ যোগ করতে পারো ---
    ];

    // The map of triggers and replies for normal messages (from your old code)
    const replyMap = {
      "bot": () => botReplies[Math.floor(Math.random() * botReplies.length)],
      "Bot": () => botReplies[Math.floor(Math.random() * botReplies.length)],
      // এখানে তোমার আগের trigger-reply গুলো বসাতে পারো যেমন:
      // "i love you": "I love you too 😘",
      // "hello": "হ্যালো কেমন আছো?",
      // ... ইত্যাদি
    };

    // Lowercase body for case insensitive match
    const lcBody = body.toLowerCase();

    // প্রথমে চেক করব যদি message 'bot' শব্দ থাকে
    if (lcBody.includes("bot")) {
      // random reply from botReplies
      const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
      return api.sendMessage(randomReply, threadID, messageID);
    }

    // যদি অন্য কোন trigger থাকে replyMap এ
    for (const key in replyMap) {
      if (lcBody.includes(key.toLowerCase())) {
        let reply = replyMap[key];
        if (typeof reply === "function") reply = reply();
        return api.sendMessage(reply, threadID, messageID);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
