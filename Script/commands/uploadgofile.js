const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

module.exports.config = {
  name: "uploadgofile",
  version: "1.0",
  hasPermssion: 0,
  credits: "rX",
  description: "Upload replied file or video to GoFile.io",
  commandCategory: "tools",
  usages: "[reply to a file]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, messageReply } = event;

  // Make sure user replied to a file or video
  if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0)
    return api.sendMessage("❌ Please reply to a video or file to upload.", threadID, messageID);

  try {
    const attachment = messageReply.attachments[0];
    const fileUrl = attachment.url;
    const fileExt = path.extname(attachment.name || ".mp4");
    const fileName = `file_${Date.now()}${fileExt}`;
    const filePath = __dirname + `/cache/${fileName}`;

    // Create cache folder if not exists
    if (!fs.existsSync(__dirname + "/cache")) {
      fs.mkdirSync(__dirname + "/cache");
    }

    // Download file
    const response = await axios({
      method: "GET",
      url: fileUrl,
      responseType: "stream",
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // Get available GoFile server
    const serverRes = await axios.get("https://api.gofile.io/getServer");
    const server = serverRes.data.data.server;

    // Upload using FormData
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const uploadRes = await axios.post(`https://${server}.gofile.io/uploadFile`, form, {
      headers: form.getHeaders(),
    });

    // Get uploaded info
    const { downloadPage, fileName: uploadedName } = uploadRes.data.data;

    // Cleanup local file
    fs.unlinkSync(filePath);

    // Send response
    return api.sendMessage(
      `✅ File Uploaded Successfully!\n📄 Name: ${uploadedName}\n🔗 Link: ${downloadPage}`,
      threadID,
      messageID
    );
  } catch (err) {
    console.log("❌ Upload Error:", err.response?.data || err.message);
    return api.sendMessage("❌ Failed to upload file. Please try again.", threadID, messageID);
  }
};
