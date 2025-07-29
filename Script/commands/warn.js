module.exports.config = {
    name: "warn",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "rX + Modified by Maria",
    description: "War warning in group chat (Bangla version)",
    commandCategory: "group",
    usages: "warn @mention",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function({ api, args, event }) {
    const ADMIN_UID = "100068565380737"; // শুধু এই UID ব্যবহার করতে পারবে
    if (event.senderID !== ADMIN_UID) {
        return api.sendMessage("❌ শুধুমাত্র rX Abdullah এই কমান্ড চালাতে পারবেন!", event.threadID, event.messageID);
    }

    const mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("⚠️ কারো নাম ট্যাগ দাও warn করার জন্য!", event.threadID);

    const name = event.mentions[mention];
    const arraytag = [{ id: mention }];
    const a = msg => api.sendMessage(typeof msg === 'string' ? { body: msg, mentions: arraytag } : msg, event.threadID);

    a("শোন ছোটলোকগুলো, তোর বাপ কথা বলতেছে!");

    setTimeout(() => { a({ body: "তোর মাকে চুদি" }) }, 3000);
    setTimeout(() => { a({ body: "এই ছোট ছোট হারামিরা বের হয়ে আয়, তোর বাপের গালি শোন!" }) }, 5000);
    setTimeout(() => { a({ body: "তাড়াতাড়ি কুত্তাগুলারে দেখা" }) }, 7000);
    setTimeout(() => { a({ body: "তোর বাপের আত্মাটারে দেখা" }) }, 9000);
    setTimeout(() => { a({ body: "তোদের কি যুদ্ধ করতে খুব ভালো লাগে?" }) }, 12000);
    setTimeout(() => { a({ body: "তোদেরও ধিক্কার!" }) }, 15000);
    setTimeout(() => { a({ body: "তোর বাপকে যুদ্ধের বয়স দে" }) }, 17000);
    setTimeout(() => { a({ body: "তাড়াতাড়ি আয়, আমার সাথে গালি দে!" }) }, 20000);
    setTimeout(() => { a({ body: "এই বদ ছেলেরা কি নাক সিঁটকে তোর বাপের সাথে যুদ্ধ করতে চায়?" }) }, 23000);
    setTimeout(() => { a({ body: "আমি তোর মাকে চুদি" }) }, 25000);
    setTimeout(() => { a({ body: "তখন মজা ছিল, এখন তোর মারে হাই তুলে খাই" }) }, 28500);
    setTimeout(() => { a({ body: "তোর বাপ র‍্যাপ করে গুলি করে মারছে তোকে!" }) }, 31000);
    setTimeout(() => { a({ body: "দয়া করে বয়সে আমায় খাও?" }) }, 36000);
    setTimeout(() => { a({ body: "মজা লাগলে তোর বাপকে খা!" }) }, 39000);
    setTimeout(() => { a({ body: "তার আগে ১ মিনিট বিরতি দে" }) }, 40000);
    setTimeout(() => { a({ body: "অনুমতি দে, আবার শুরু করি!" }) }, 65000);
    setTimeout(() => { a({ body: "প্রথমেই তোকে উপরে নিচে চুদব" }) }, 70000);
    setTimeout(() => { a({ body: "চুদের ছিদ্র থেকে খাঁজ পর্যন্ত সব ফাটিয়ে দেব" }) }, 75000);
    setTimeout(() => { a({ body: "তোর যোনিটা মহিষের যোনির চেয়েও বড়, যেন নর্দমার পাইপ!" }) }, 80000);
    setTimeout(() => { a({ body: "আমার মত দুইজন ছেলেও তোর পাছায় কম মনে হয়!" }) }, 85000);
    setTimeout(() => { a("আমি ক্লান্ত, আর গালি দিব না...") }, 90000);
    setTimeout(() => { a({ body: "চল বস, নতুন গালি লেখ, যুদ্ধ চলুক!" }) }, 95000);
    setTimeout(() => { a({ body: "আমার যুদ্ধ শোনার জন্য ধন্যবাদ!" }) }, 100000);
    setTimeout(() => { a({ body: "বিদায়! আবার দেখা হবে পরের প্রোগ্রামে!" }) }, 105000);
    setTimeout(() => { a({ body: "গুড বাই 🥺" }) }, 115000);
};
