const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "Obot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "CYBER TEAM + Modified by rX Abdullah",
  description: "Funny, romantic & reactive chatbot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:mm:ss");

  const { threadID, messageID } = event;
  const name = await Users.getNameUser(event.senderID);

  const replyList = [
    "বেশি bot Bot করলে leave নিবো কিন্তু😒😒",
    "শুনবো না😼তুমি আমাকে প্রেম করাই দাও নাই🥺পচা তুমি🥺",
    "আমি আবাল দের সাথে কথা বলি না,ok😒",
    "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈",
    "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋",
    "I love you janu🥰",
    "Hop beda😾,Boss বল boss😼",
    "Bot না , জানু বল জানু 😘",
    "মেয়ে হলে বস আব্দুল্লাহ'এর সাথে প্রেম করো🙈??.",
    "হুম জান তোমার ওই খানে উম্মহ😑😘",
    "চুনা ও চুনা আমার বস আব্দুল্লাহ এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না😪🤧😭",
    "জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽",
    "জান বাল ফালাইবা-🙂🥱🙆‍♂",
    "তাকাই আছো কেন চুমু দিবা-🙄🐸😘",
    "জান তুমি কি এখন আমার জন্য free?",
    "তুমি ডাক দিলে আমার হৃদয় কাঁপে 😻",
    "bot bot করছো মানে প্রেমের ঘ্রাণ পাই 😼",
    "ভালোবাসা নামক আবলামী করতে চাইলে ইনবক্সে চলে যা পাগল ছাগল🌚🐸🌶️🍆",
    "তোমাকে প্রতিদিন ভালোবাসি জানু 🥰",
    "এখন বকা খাইয়া লাভ নাই 😑"
  ];

  const rand = replyList[Math.floor(Math.random() * replyList.length)];

  if (event.body) {
    const msgBody = event.body.toLowerCase();

    const matchTriggers = {
      "miss you": "আমি তোমাকে রাইতে মিস খাই🥹🤖👅",
      "bbz": "হে পাখি, শুনসি তো তোমার কথা 😌",
      "pik dew": "শরম নাই তোর? আমার কাছে পিক চাইছিস 😑 আমি তোর শালী লাগে নাকি?",
      "😘": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
      "😽": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
      "help": "type /help",
      "sim": "simsimi কমান্ড এড় নাই টাইপ করুন baby",
      "simsimi": "simsimi কমান্ড এড় নাই টাইপ করুন baby",
      "oi kire": "মধু মধু রসমালাই 🍆⛏️🐸🤣",
      "bc": "SAME TO YOU😊",
      "mc": "SAME TO YOU😊",
      "🫦": "কিরে হালা লুচ্চা, এগুলো কি ইমুজি দেস ।",
      "👀": "kiya dekh raha hai haluya hai kiya 🤨",
      "morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
      "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
      "dur bal": "~ তোমার বাল উঠে নাই নাকি তোমার?? 🤖",
      "bal": "~ তোমার বাল উঠে নাই নাকি তোমার?? 🤖",
      "abdullah": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
      "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ Abdullah ッ ☜\n𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 rX Abdullah.\n𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 :- https://www.facebook.com/share/12LeMnSrwFj/?mibextid=wwXIfr",
      "ceo": "‎[𝐎𝐖𝐍𝐄𝐑:☞ Abdullah ッ ☜\n𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 rX Abdullah.\n𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 :- https://www.facebook.com/share/12LeMnSrwFj/?mibextid=wwXIfr",
      "ai": "If you want to use the AI command, type /ai",
      "chup": "তুই চুপ চুপ কর পাগল ছাগল",
      "stop": "তুই চুপ চুপ কর পাগল ছাগল",
      "চুপ কর": "তুই চুপ চুপ কর পাগল ছাগল",
      "salam": "️- ওয়ালাইকুমুস-সালাম-!!🖤",
      "assalamualaikum": "️- ওয়ালাইকুমুস-সালাম-!!🖤"
    };

    if (msgBody in matchTriggers) {
      return api.sendMessage(matchTriggers[msgBody], threadID, messageID);
    }

    if (msgBody.includes("bot")) {
      return api.sendMessage(`${name}, ${rand}`, threadID, messageID);
    }
  }
};

module.exports.run = function() {};
