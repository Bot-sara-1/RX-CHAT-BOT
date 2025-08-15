// In-memory status
let warnStatus = true; // Default ON

module.exports.config = {
    name: "warn",
    version: "1.3.0",
    hasPermssion: 2,
    credits: "rX + Modified by Maria",
    description: "War warning in group chat (Bangla version) with ON/OFF",
    commandCategory: "group",
    usages: "warn @mention / warn on / warn off",
    cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
    const ADMIN_UID = "100068565380737","61578848926124"; // শুধু এই UID ব্যবহার করতে পারবে
    if (event.senderID !== ADMIN_UID) {
        return api.sendMessage("❌ শুধুমাত্র rX Abdullah এই কমান্ড চালাতে পারবেন!", event.threadID, event.messageID);
    }

    // ON/OFF system
    if (args[0] === "off") {
        warnStatus = false;
        return api.sendMessage("⚠️ Warn সিস্টেম বন্ধ করা হয়েছে!", event.threadID);
    }

    if (args[0] === "on") {
        warnStatus = true;
        return api.sendMessage("✅ Warn সিস্টেম চালু করা হয়েছে!", event.threadID);
    }

    if (!warnStatus) {
        return api.sendMessage("⚠️ Warn বর্তমানে বন্ধ আছে!", event.threadID);
    }

    // Mention
    const mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("⚠️ কারো নাম ট্যাগ দাও warn করার জন্য!", event.threadID);

    const name = event.mentions[mention];
    const arraytag = [{ id: mention, tag: name }];

    // সব লাইন (নতুন + পুরানো) - এখানে কোনো double @ নেই
    const messages = [
        `এই বোকাচোদা খানকি মাগির পোলা...`,
        `তোদের টিউবওয়েলের পানিতে আয়রন বেশি তাই তোর বাপে তোর মারে ভালোভাবে পারল না...`,
        `তোর কচি বোনকে রাস্তার পাবলিক দিয়ে গন ধর্শন করি...`,
        `খানকির পোলা তোর মারে উড়ে উড়ে কন্ডম ছাড়া চুদি...`,
        `আকাশ চুদিলাম,, বাতাস চুদিলাম,, চুদিলাম কুয়ের খাল...`,
        // ... (সব নতুন লাইন এখানে বসাবে)
        // পুরানো লাইনগুলোও এখানে রাখবে
        `শোন ছোটলোকগুলো, তোর বাপ কথা বলতেছে!`,
        `তোর মাকে চুদি`,
        `এই ছোট ছোট হারামিরা বের হয়ে আয়, তোর বাপের গালি শোন!`,
        `তাড়াতাড়ি কুত্তাগুলারে দেখা`,
        `তোর বাপের আত্মাটারে দেখা`,
        `তোদের কি যুদ্ধ করতে খুব ভালো লাগে?`,
        `তোদেরও ধিক্কার!`,
        `তোর বাপকে যুদ্ধের বয়স দে`,
        `তাড়াতাড়ি আয়, আমার সাথে গালি দে!`,
        `এই বদ ছেলেরা কি নাক সিঁটকে তোর বাপের সাথে যুদ্ধ করতে চায়?`,
        `আমি তোর মাকে চুদি`,
        `তখন মজা ছিল, এখন তোর মারে হাই তুলে খাই`,
        `তোর বাপ র‍্যাপ করে গুলি করে মারছে তোকে!`,
        `দয়া করে বয়সে আমায় খাও?`,
        `মজা লাগলে তোর বাপকে খা!`,
        `তার আগে ১ মিনিট বিরতি দে`,
        `অনুমতি দে, আবার শুরু করি!`,
        `প্রথমেই তোকে উপরে নিচে চুদব`,
        `চুদের ছিদ্র থেকে খাঁজ পর্যন্ত সব ফাটিয়ে দেব`,
        `তোর যোনিটা মহিষের যোনির চেয়েও বড়, যেন নর্দমার পাইপ!`,
        `আমার মত দুইজন ছেলেও তোর পাছায় কম মনে হয়!`,
        `আমি ক্লান্ত, আর গালি দিব না...`,
        `চল বস, নতুন গালি লেখ, যুদ্ধ চলুক!`,
        `আমার যুদ্ধ শোনার জন্য ধন্যবাদ!`,
        `বিদায়! আবার দেখা হবে পরের প্রোগ্রামে!`,
        `গুড বাই 🥺`
    ];

    let delay = 0;
    const gap = 3000; // ৩ সেকেন্ড গ্যাপ

    messages.forEach((msg) => {
        setTimeout(() => {
            api.sendMessage({ body: `@${name} ${msg}`, mentions: arraytag }, event.threadID);
        }, delay);
        delay += gap;
    });
};
