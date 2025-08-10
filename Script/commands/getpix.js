const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "getpix",
  version: "1.1",
  hasPermssion: 2,
  credits: "rX Abdullah + Modified by ChatGPT",
  description: "Download and send video from Pixeldrain using file ID",
  commandCategory: "media",
  usages: "[fileID]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const fileID = args[0];
  if (!fileID) {
    return api.sendMessage("❌ Please provide a Pixeldrain file ID!", event.threadID, event.messageID);
  }

  const downloadURL = `https://pixeldrain.com/api/file/${fileID}?download`;
  const cacheDir = path.join(__dirname, "cache");
  const filePath = path.join(cacheDir, `${fileID}.mp4`);

  try {
    await fs.ensureDir(cacheDir);

    // Step 1: Send "retrieving" message
    api.sendMessage("⏳ 𝗥𝗲𝘁𝗿𝗶𝗲𝘃𝗶𝗻𝗴 𝘆𝗼𝘂𝗿 𝘃𝗶𝗱𝗲𝗼...", event.threadID, async (err, info) => {
      if (err) return;

      try {
        const response = await axios({
          url: downloadURL,
          method: "GET",
          responseType: "stream"
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on("finish", () => {
          // Step 2: Unsend the "retrieving" message
          api.unsendMessage(info.messageID);

          // Step 3: Send actual video
          api.sendMessage({
            body: `🎬 Here's your video from Pixeldrain! ID: ${fileID}`,
            attachment: fs.createReadStream(filePath)
          }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
        });

        writer.on("error", (error) => {
          console.error(error);
          api.unsendMessage(info.messageID);
          api.sendMessage("❌ Error saving the video file.", event.threadID, event.messageID);
        });

      } catch (downloadErr) {
        console.error(downloadErr.message);
        api.unsendMessage(info.messageID);
        api.sendMessage("❌ Failed to download the video. Please check the file ID.", event.threadID, event.messageID);
      }
    });

  } catch (error) {
    console.error(error.message);
    api.sendMessage("❌ An error occurred while preparing the video.", event.threadID, event.messageID);
  }
};
