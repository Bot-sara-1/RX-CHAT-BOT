module.exports.config = {
	name: "adminUpdate",
	eventType: ["log:thread-admins","log:thread-name", "log:user-nickname","log:thread-icon","log:thread-call","log:thread-color"],
	version: "1.0.1",
	credits: "rX",
	description: "Update team information quickly",
    envConfig: {
        sendNoti: true,
    }
};

module.exports.run = async function ({ event, api, Threads, Users }) {
	const fs = require("fs");
	const moment = require("moment-timezone");
	var iconPath = __dirname + "/emoji.json";
	if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
    
    const { threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;

    const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["adminUpdate"] != "undefined" && thread["adminUpdate"] == false) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;

        // Bold font converter
        const toBold = (text) => {
            const boldMap = {
                "A":"𝗔","B":"𝗕","C":"𝗖","D":"𝗗","E":"𝗘","F":"𝗙","G":"𝗚","H":"𝗛","I":"𝗜","J":"𝗝","K":"𝗞","L":"𝗟","M":"𝗠",
                "N":"𝗡","O":"𝗢","P":"𝗣","Q":"𝗤","R":"𝗥","S":"𝗦","T":"𝗧","U":"𝗨","V":"𝗩","W":"𝗪","X":"𝗫","Y":"𝗬","Z":"𝗭",
                "a":"𝗮","b":"𝗯","c":"𝗰","d":"𝗱","e":"𝗲","f":"𝗳","g":"𝗴","h":"𝗵","i":"𝗶","j":"𝗷","k":"𝗸","l":"𝗹","m":"𝗺",
                "n":"𝗻","o":"𝗼","p":"𝗽","q":"𝗾","r":"𝗿","s":"𝘀","t":"𝘁","u":"𝘂","v":"𝘃","w":"𝘄","x":"𝘅","y":"𝘆","z":"𝘇",
                "0":"𝟬","1":"𝟭","2":"𝟮","3":"𝟯","4":"𝟰","5":"𝟱","6":"𝟲","7":"𝟳","8":"𝟴","9":"𝟵",
                ":":":","-":"-"," ":" "
            };
            return text.split("").map(c => boldMap[c] || c).join("");
        }

        switch (logMessageType) {
            case "log:thread-admins": {
                const timeNow = moment.tz("Asia/Dhaka").format("dddd, h:mm A");

                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID });
                    if (global.configModule[this.config.name].sendNoti) {
                        let addedBy = await Users.getNameUser(event.author);
                        let newAdmin = await Users.getNameUser(logMessageData.TARGET_ID);

                        const msg = `[ ADMIN ADDED ]
・${toBold("By")}       : ${toBold(addedBy)}
・${toBold("Made Admin")} : ${toBold(newAdmin)}
・${toBold("Time")}     : ${toBold(timeNow)}`;

                        api.sendMessage(msg, threadID);
                    }
                } else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    if (global.configModule[this.config.name].sendNoti) {
                        let removedBy = await Users.getNameUser(event.author);
                        let removedAdmin = await Users.getNameUser(logMessageData.TARGET_ID);

                        const msg = `[ ADMIN REMOVED ]
・${toBold("By")}         : ${toBold(removedBy)}
・${toBold("Removed")}    : ${toBold(removedAdmin)}
・${toBold("Time")}       : ${toBold(timeNow)}`;

                        api.sendMessage(msg, threadID);
                    }
                }
                break;
            }

            case "log:user-nickname":
            case "log:thread-call":
            case "log:thread-color":
            case "log:thread-icon":
            case "log:thread-name": {
                break;
            }
        }

        await setData(threadID, { threadInfo: dataThread });
    } catch (e) {
        console.log(e);
    }
}
