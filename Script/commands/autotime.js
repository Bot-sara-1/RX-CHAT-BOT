const fs = global.nodemodule["fs-extra"];

module.exports.config = {
  name: "AutoTime",
  version: "2.0",
  hasPermssion: 0,
  credits: "CYBER ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "সময় অনুযায়ী গ্রুপে অটো মেসেজ পাঠায়!",
  commandCategory: "no prefix",
  usages: "[]",
  cooldowns: 3
};

const nam = [
  { timer: "4:00:00 AM", message: ["__এখন ভোর ৪টা বাজে,সবাই দাত মুখ ধুয়ে গোসল করে নামাজ পড়ে নিও 🥰\n\n𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗰𝗵𝗮𝘁 𝗯𝗼𝘁"] },
  { timer: "5:00:00 AM", message: ["__এখন ৫টা বাজে,সকাল সকাল ফজরের নামাজ পড়ছো তো?🤨না পড়লে পরবে,,!😒😊\n\n𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗰𝗵𝗮𝘁 𝗯𝗼𝘁"] },
  { timer: "6:00:00 AM", message: ["__এখন সকাল ৬টা বাজে,সবার স্কুল শুটুর হল ৭টা বাজে,এখন উঠো সবাই,আত্মমুখ ধুয়ে গোসল করে নাও🤗🤗\n\n𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗰𝗵𝗮𝘁 𝗯𝗼𝘁"] }
];

module.exports.onLoad = o => {
  // অটো টাইম মেসেজ বন্ধ করে রাখা হয়েছে
};

module.exports.run = async function () {};
