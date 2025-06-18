// I WILL FIND YOU 🫵
// MR FRANK


const axios = require("axios");

const config = require('../config');
const { cmd, commands } = require('../command');
const moment = require('moment-timezone');

const prefix = config.PREFIX;
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { runtime, fetchJson } = require('../lib/functions');

const Jimp = require('jimp');
const qrCode = require('qrcode-reader');

const { isJidGroup } = require(config.BAILEYS);

 JavaScriptObfuscator = require("javascript-obfuscator");
const Notice = require("../models/Notice");
const mongoose = require("mongoose");







/ Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

cmd({
  pattern: "imagescan",
  alias: ["vision2", "analyze2", "vision", "analyse","analyze", "analyzeimg"],
  react: '🔍',
  desc: "Scan and analyze images using AI",
  category: "utility",
  use: ".imgscan [reply to image]",
  filename: __filename
}, async (client, message, { reply, quoted }) => {
  try {
    // Check if quoted message exists and has media
    const quotedMsg = quoted || message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType || !mimeType.startsWith('image/')) {
      return reply("Please reply to an image file (JPEG/PNG)");
    }

    // Download the media
    const mediaBuffer = await quotedMsg.download();
    const fileSize = formatBytes(mediaBuffer.length);
    
    // Get file extension based on mime type
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else {
      return reply("Unsupported image format. Please use JPEG or PNG");
    }

    const tempFilePath = path.join(os.tmpdir(), `imgscan_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath); // Clean up temp file

    if (!imageUrl) {
      throw "Failed to upload image to Catbox";
    }

    // Scan the image using the API
    const scanUrl = `https://apis.davidcyriltech.my.id/imgscan?url=${encodeURIComponent(imageUrl)}`;
    const scanResponse = await axios.get(scanUrl);

    if (!scanResponse.data.success) {
      throw scanResponse.data.message || "Failed to analyze image";
    }

    // Format the response
    await reply(
      `🔮 \`Image Analysis Results\`\n\n` +
      `${scanResponse.data.result}\n\n` +
      `> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ`
    );

  } catch (error) {
    console.error('Image Scan Error:', error);
    await reply(`❌ Error: ${error.message || error}`);
  }
});


cmd({
  pattern: "imagine",
  alias: ["flux3", "metaimg"],
  react: "✨",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *Brewing Up Magic...✨*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `* 🤖 ᴘʀᴏᴍᴘᴛ : ${q}*\n\n> © *Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});

cmd({
  pattern: "stablediffusion",
  alias: ["sdiffusion", "imagine2"],
  react: "✨",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *Brewing Up Some Magic...⚡*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `* 🤖 ᴘʀᴏᴍᴘᴛ : ${q}*\n\n> © *Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});

cmd({
  pattern: "midjourneyai",
  alias: ["midjourney", "imagine3"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *ωαιτ α ѕєϲοи∂...*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `* 🤖 ᴘʀᴏᴍᴘᴛ : ${q}*\n\n> © *Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});


cmd({
  pattern: "bingimg",
  alias: ["bimg", "bingimage"],
  desc: "Search for images using Bing and send 5 results.",
  category: "utility",
  use: ".bingimg <query>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply("❌ Please provide a search query. Example: `.bingimg dog`");
    }

    // Fetch images from the Bing Image Search API
    const response = await axios.get(`https://api.siputzx.my.id/api/s/bimg?query=${encodeURIComponent(query)}`);
    const { status, data } = response.data;

    if (!status || !data || data.length === 0) {
      return reply("❌ No images found for the specified query. Please try again.");
    }

    // Select the first 5 images
    const images = data.slice(0, 5);

    // Send each image as an attachment
    for (const imageUrl of images) {
      await conn.sendMessage(from, {
        image: { url: imageUrl }, // Attach the image
        caption: `🔍 *Bing Image Search*: ${query}`,
      });
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    reply("❌ Unable to fetch images. Please try again later.");
  }
});


// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

cmd({
  pattern: "imagescan",
  alias: ["vision2", "analyze2", "vision", "analyse","analyze", "analyzeimg"],
  react: '🔍',
  desc: "Scan and analyze images using AI",
  category: "utility",
  use: ".imgscan [reply to image]",
  filename: __filename
}, async (client, message, { reply, quoted }) => {
  try {
    // Check if quoted message exists and has media
    const quotedMsg = quoted || message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType || !mimeType.startsWith('image/')) {
      return reply("Please reply to an image file (JPEG/PNG)");
    }

    // Download the media
    const mediaBuffer = await quotedMsg.download();
    const fileSize = formatBytes(mediaBuffer.length);
    
    // Get file extension based on mime type
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else {
      return reply("Unsupported image format. Please use JPEG or PNG");
    }

    const tempFilePath = path.join(os.tmpdir(), `imgscan_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath); // Clean up temp file

    if (!imageUrl) {
      throw "Failed to upload image to Catbox";
    }

    // Scan the image using the API
    const scanUrl = `https://apis.davidcyriltech.my.id/imgscan?url=${encodeURIComponent(imageUrl)}`;
    const scanResponse = await axios.get(scanUrl);

    if (!scanResponse.data.success) {
      throw scanResponse.data.message || "Failed to analyze image";
    }

    // Format the response
    await reply(
      `🔮 \`Image Analysis Results\`\n\n` +
      `${scanResponse.data.result}\n\n` +
      `> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ`
    );

  } catch (error) {
    console.error('Image Scan Error:', error);
    await reply(`❌ Error: ${error.message || error}`);
  }
});

cmd({
    pattern: 'version',
    react: '📦',
    desc: 'Check bot version and compare with repository',
    category: 'info',
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const time = moment().tz('Africa/Harare').format('HH:mm:ss');
        const date = moment().tz('Africa/Harare').format('DD/MM/YYYY');
        
        // Get local version
        const localPackage = require('../package.json');
        const currentVersion = localPackage.version;
        
        // Extract repo info from config.REPO
        const repoUrl = config.REPO || 'https://github.com/mrfrankofcc/SUBZERO-MD';
        const repoPath = repoUrl.replace('https://github.com/', '');
        const rawUrl = `https://raw.githubusercontent.com/${repoPath}/master/package.json`;

        // Fetch remote version
        const { data: remotePackage } = await axios.get(rawUrl);
        const latestVersion = remotePackage.version;

        // Version comparison
        const versionStatus = currentVersion === latestVersion 
            ? '🟢 UP-TO-DATE' 
            : '🔴 UPDATE AVAILABLE';
        
        const versionDiff = currentVersion === latestVersion
            ? `✅ You're running the latest version (v${currentVersion})`
            : `📥 Current: v${currentVersion}\n🆕 Latest: v${latestVersion}`;

        // Build message
        const message = `
📦 *VERSION COMPARISON* 📦

${versionStatus}

${versionDiff}

⏰ Checked at: ${time} (${date})

💻 *Developer:* ${config.OWNER_NAME || "Mr Frank"}
🤖 *Bot Name:* ${config.BOT_NAME || "SUBZERO-MD"}

🔗 *Repository:*
${repoUrl}
⭐ *Please star the repo to support development!*
`.trim();

        // Send response
        await conn.sendMessage(from, { 
            image: { 
                url: config.ALIVE_IMG || 'https://i.postimg.cc/zv76KffW/IMG-20250115-WA0020.jpg' 
            },
            caption: message,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: config.BOT_NAME ? `${config.BOT_NAME} Bot` : 'SUBZERO MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Version check error:", e);
        
        // Fallback with local version only
        const localPackage = require('../package.json');
        const fallback = `
⚠️ *Version Check (Partial)*
        
📦 Local Version: v${localPackage.version}
🔗 Repository: ${config.REPO || "Not configured"}

❌ Couldn't fetch remote version:
${e.message}
`.trim();
        
        reply(fallback);
    }
});




// Owner ID (only this user can add/delete notices)
const OWNER_ID = "263719647303@s.whatsapp.net"; // Replace with the owner's WhatsApp number in the correct format

// Add Notice
cmd({
  pattern: "addnotice",
  react: "📩",
  alias: "noticeadd",
  desc: "Add a new notice to the noticeboard (Owner Only).",
  category: "utility",
  use: ".addnotice <message>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    // Check if the user is the owner
    const sender = mek.participant || mek.key.remoteJid; // Get the sender's ID
    if (sender !== OWNER_ID) {
      return reply("*[❌] Ooops You are not authorized to add notices, only Mr Frank can.*");
    }

    const message = args.join(" ");
    if (!message) {
      return reply("❌ Please provide a notice message.");
    }

    // Save the notice to the database
    const newNotice = new Notice({ message });
    await newNotice.save();

    reply("*✅ Notice added successfully!*");
  } catch (error) {
    console.error("Error adding notice:", error);
    reply("❌ An error occurred while adding the notice.");
  }
});

// Delete Notice by Index
cmd({
  pattern: "noticedelete",
  alias: "deletenotice",
  react: "🗑️",
  desc: "Delete a notice by its index (Owner Only).",
  category: "utility",
  use: ".noticedelete <index>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    // Check if the user is the owner
    const sender = mek.participant || mek.key.remoteJid; // Get the sender's ID
    if (sender !== OWNER_ID) {
      return reply("*[❌] You are not authorized to delete notices.*");
    }

    const index = parseInt(args[0]) - 1; // Convert index to zero-based
    if (isNaN(index) || index < 0) {
      return reply("❌ Please provide a valid notice index.");
    }

    // Fetch all notices
    const notices = await Notice.find().sort({ timestamp: -1 });
    if (index >= notices.length) {
      return reply("❌ Notice index out of range.");
    }

    // Delete the notice by index
    const noticeToDelete = notices[index];
    await Notice.findByIdAndDelete(noticeToDelete._id);

    reply("✅ Notice deleted successfully!");
  } catch (error) {
    console.error("Error deleting notice:", error);
    reply("❌ An error occurred while deleting the notice.");
  }
});

// View Noticeboard with Status Message Attachment
cmd({
  pattern: "noticeboard",
  alias: ["updates","changelog"],
  desc: "View the noticeboard with all updates.",
  category: "utility",
  use: ".noticeboard",
  filename: __filename,
}, async (conn, mek, msg, { from, reply }) => {
  try {
    // Fetch all notices from the database
    const notices = await Notice.find().sort({ timestamp: -1 });

    if (notices.length === 0) {
      return reply("*📭 No notices/Updates available.*");
    }

    // Format the notices into a message
    let noticeMessage = "⟣┄〔 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐔𝐏𝐃𝐀𝐓𝐄𝐒 〕┅⟢\n\n";
    notices.forEach((notice, index) => {
      noticeMessage += `${index + 1}. ${notice.message}\n`;
    });

    // Add a footer to the message
    noticeMessage += "\n> sᴜʙᴢᴇʀᴏ ᴍᴅ ᴜᴘᴅᴀᴛᴇs";

    // Send the noticeboard with an image (status message)
    await conn.sendMessage(from, {
      image: { url: `https://i.postimg.cc/QMR3dVBd/IMG-20250305-WA0003.jpg` }, // Replace with your image URL
      caption: noticeMessage,
      contextInfo: {
        mentionedJid: [msg.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363304325601080@newsletter',
          newsletterName: '『 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 』',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("Error fetching notices:", error);
    reply("❌ An error occurred while fetching the noticeboard.");
  }
});

cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");
        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        const weather = `
> 🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍
> 🌡️ *Temperature*: ${data.main.temp}°C
> 🌡️ *Feels Like*: ${data.main.feels_like}°C
> 🌡️ *Min Temp*: ${data.main.temp_min}°C
> 🌡️ *Max Temp*: ${data.main.temp_max}°C
> 💧 *Humidity*: ${data.main.humidity}%
> ☁️ *Weather*: ${data.weather[0].main}
> 🌫️ *Description*: ${data.weather[0].description}
> 💨 *Wind Speed*: ${data.wind.speed} m/s
> 🔽 *Pressure*: ${data.main.pressure} hPa

> *© Powered By SubZero*
`;
        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});
                 


cmd({
  pattern: "tinyurl",
  alias: ["shorten", "shorturl", "tiny"],
  desc: "Shorten a long URL using TinyURL with an optional custom alias.",
  category: "utility",
  use: ".tinyurl <long_url>|<alias>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const input = args.join(" ");
    const [longUrl, alias] = input.split("|");

    if (!longUrl) {
      return reply("❌ Please provide a valid URL. Example: `.tinyurl https://example.com/very-long-url`");
    }

    // Validate the URL
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      return reply("❌ Invalid URL. Please include 'http://' or 'https://'.");
    }

    let shortUrl;

    if (alias) {
      // Check if the alias is already taken
      const aliasCheckUrl = `https://tinyurl.com/${alias}`;
      try {
        const aliasCheckResponse = await axios.head(aliasCheckUrl);
        if (aliasCheckResponse.status === 200) {
          return reply(`❌ The alias '${alias}' is already taken. Please choose another alias.`);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Alias is available, create the custom URL
          shortUrl = `https://tinyurl.com/${alias}`;
        } else {
          throw error;
        }
      }
    } else {
      // Shorten the URL using TinyURL API
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      shortUrl = response.data;
    }

    // Create the caption for the status message
    const caption = `\`SUBZERO URL SHORTENER\`\n\n\n*Original Link:* ${longUrl}\n\n*Shortened Link:* ${shortUrl}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ`;

    // Send the status message with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/DR0k2XM/mrfrankofc.jpg` }, // Image URL
      caption: caption,
      contextInfo: {
        mentionedJid: [mek.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363304325601080@newsletter',
          newsletterName: '『 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 』',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("Error shortening URL:", error);
    reply(`❌ An error occurred: ${error.message}`);
  }
});


cmd({
  'pattern': "srepo",
  'desc': "Fetch information about a GitHub repository.",
  'category': "other",
  'react': '📂',
  'filename': __filename
}, async (_0x50251e, _0x14f82c, _0x4b5519, {
  from: _0x4efb12,
  quoted: _0x19ce97,
  body: _0x3b1251,
  isCmd: _0x470fc9,
  command: _0x12d4bd,
  args: _0x5124d6,
  q: _0x97f68a,
  isGroup: _0x54558e,
  sender: _0x15e95b,
  senderNumber: _0x5159e7,
  botNumber2: _0x231e7a,
  botNumber: _0x332f02,
  pushname: _0x4aa8e5,
  isMe: _0x2d6111,
  isOwner: _0x386543,
  groupMetadata: _0xf34fb3,
  groupName: _0x1c85cc,
  participants: _0x294cdb,
  groupAdmins: _0x3de5c1,
  isBotAdmins: _0x4897ce,
  isAdmins: _0x19fa91,
  reply: _0x4bb281
}) => {
  try {
    const _0x4316bb = _0x5124d6.join(" ");
    if (!_0x4316bb) {
      return _0x4bb281("Please provide a GitHub repository name in the format 📌`owner/repo`.");
    }
    const _0x1710d7 = "https://api.github.com/repos/" + _0x4316bb;
    const _0x5e6198 = await axios.get(_0x1710d7);
    const _0x3b32a2 = _0x5e6198.data;
    let _0x5966d9 = "📁*GITHUB REPO INFO BY SUBZERO MD*📁\n\n";
    _0x5966d9 += "📌 *ɴᴀᴍᴇ*: " + _0x3b32a2.name + "\n";
    _0x5966d9 += "🔗 *ᴜʀʟ*: " + _0x3b32a2.html_url + "\n";
    _0x5966d9 += "📝 *ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ*: " + _0x3b32a2.description + "\n";
    _0x5966d9 += "⭐ *ꜱᴛᴀʀꜱ*: " + _0x3b32a2.stargazers_count + "\n";
    _0x5966d9 += "🍴 *ꜰᴏʀᴋꜱ*: " + _0x3b32a2.forks_count + "\n";
    _0x5966d9 += "\n";
    _0x5966d9 += "> *© Powered By SubZero*\n";
    await _0x50251e.sendMessage(_0x4efb12, {
      'text': _0x5966d9
    }, {
      'quoted': _0x14f82c
    });
  } catch (_0x4b990c) {
    console.log(_0x4b990c);
    _0x4bb281("Error fetching repository data🤕: " + _0x4b990c.message);
  }
});


cmd({
    pattern: "ringtone",
    alias: ["ringtones", "ring"],
    desc: "Get a random ringtone from the API.",
    react: "💝",
    category: "fun",
    filename: __filename,
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("⚠️ Please provide a search query! Example: .ringtone Yay");
        }

        const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

        if (!data.status || !data.result || data.result.length === 0) {
            return reply("No ringtones found for your query. Please try a different keyword.❗");
        }

        const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];

        await conn.sendMessage(
            from,
            {
                audio: { url: randomRingtone.dl_link },
                mimetype: "audio/mpeg",
                fileName: `${randomRingtone.title}.mp3`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error("Error in ringtone command:", error);
        reply("Sorry, something went wrong while fetching the ringtone. Please try again later.");
    }
});


cmd({
  pattern: 'qrcode',
  alias: ['qr'],
  react: '🔄',
  desc: 'Generate a QR code.',
  category: 'main',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) return reply('Please provide text to generate QR code.');
    await reply('> *Subzero Generating QR code...🧩*');
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(q)}&size=200x200`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    
    await conn.sendMessage(m.chat, { image: buffer }, { quoted: m, caption: 'QR Code By Subzero' });
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});


cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for KHAN-MD bot",
    category: "download",
    use: ".pair +923477868XXX",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Extract phone number from command
        const phoneNumber = q ? q.trim() : senderNumber;
        
        // Validate phone number format
        if (!phoneNumber || !phoneNumber.match(/^\+?\d{10,15}$/)) {
            return await reply("❌ Please provide a valid phone number with country code\nExample: .pair +923427582XXX");
        }

        // Make API request to get pairing code
        const response = await axios.get(`https://subzero-auth.koyeb.app/code?number=${encodeURIComponent(phoneNumber)}`);
        
        if (!response.data || !response.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;
        const doneMessage = "`PAIRING COMPLETED SUCCESSFULLY` ✅";

        // Send initial message with formatting
        await reply(`${doneMessage}\n\n*Your pairing code is:* ${pairingCode}`);

        // Add 2 second delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Send clean code message
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("Pair command error:", error);
        await reply("❌ An error occurred while getting pairing code. Please try again later.");
    }
});


cmd({
    pattern: "pair2",
    alias: ["getpair2", "clonebot2"],
    react: "✅",
    desc: "Get pairing code for KHAN-MD bot",
    category: "download",
    use: ".pair +923427582XXX",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Extract phone number from command
        const phoneNumber = q ? q.trim() : senderNumber;
        
        // Validate phone number format
        if (!phoneNumber || !phoneNumber.match(/^\+?\d{10,15}$/)) {
            return await reply("❌ Please provide a valid phone number with country code\nExample: .pair +923427582XXX");
        }

        // Make API request to get pairing code
        const response = await axios.get(`https://subzeromd.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);
        
        if (!response.data || !response.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;
        const doneMessage = "> *CONNECTED SUCCESSFULLY ✅*";

        // Send initial message with formatting
        await reply(`${doneMessage}\n\n*Your pairing code is:* ${pairingCode}`);

        // Add 2 second delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Send clean code message
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("Pair command error:", error);
        await reply("❌ An error occurred while getting pairing code. Please try again later.");
    }
});


cmd({
    pattern: "obfuscate2",
    alias: ["obf2", "encrypt2"],
    react: "🔒",
    desc: "Obfuscate JavaScript code",
    category: "tools",
    use: "<javascript code>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide JavaScript code to obfuscate");

        await reply("⏳ Obfuscating your code...");

        // Encode the input code for URL
        const encodedCode = encodeURIComponent(q);
        const apiUrl = `https://api.giftedtech.web.id/api/tools/encryptv3?apikey=gifted&code=${encodedCode}`;

        const { data } = await axios.get(apiUrl);

        if (!data?.result?.encrypted_code) {
            return reply("❌ Failed to obfuscate the code");
        }

        // Send the obfuscated code
        await conn.sendMessage(from, {
            text: `*Obfuscated JavaScript Code:*\n\n${data.result.encrypted_code}`,
            contextInfo: {
                externalAdReply: {
                    title: "JavaScript Obfuscator",
                    body: "Powered By Mr Frank",
                    thumbnail: await axios.get('https://files.catbox.moe/rthhuj.jpg', { 
                        responseType: 'arraybuffer' 
                    }).then(res => res.data).catch(() => null),
                    mediaType: 2
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Obfuscation error:", error);
        reply(`❌ Error: ${error.response?.data?.message || error.message}`);
    }
});


cmd({
  pattern: "obfuscate",
  alias: ["obf", "confuse"],
  desc: "Obfuscate JavaScript code to make it harder to read.",
  category: "utility",
  use: ".obfuscate <code>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const code = args.join(" ");
    if (!code) {
      return reply("❌ Please provide JavaScript code to obfuscate.");
    }

    // Obfuscate the code
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
      compact: true, // Compact code output
      controlFlowFlattening: true, // Make control flow harder to follow
      deadCodeInjection: true, // Inject dead code
      debugProtection: true, // Add debug protection
      disableConsoleOutput: true, // Disable console output
      stringArray: true, // Encrypt strings
      stringArrayEncoding: ["base64"], // Encode strings using base64
      rotateStringArray: true, // Rotate string array
    }).getObfuscatedCode();

    reply(`🔐 *Obfuscated Code*:\n\n${obfuscatedCode}`);
  } catch (error) {
    console.error("Error obfuscating code:", error);
    reply("❌ An error occurred while obfuscating the code.");
  }
});

cmd({
  pattern: "deobfuscate",
  alias: ["deobf", "unconfuse"],
  desc: "Attempt to deobfuscate JavaScript code (limited functionality).",
  category: "utility",
  use: ".deobfuscate <obfuscated_code>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const obfuscatedCode = args.join(" ");
    if (!obfuscatedCode) {
      return reply("❌ Please provide obfuscated code to deobfuscate.");
    }

    // Deobfuscation is not straightforward, but we can try to format the code
    reply(`⚠️ *Deobfuscation is not guaranteed*. Here's the formatted code:\n\n${obfuscatedCode}`);
  } catch (error) {
    console.error("Error deobfuscating code:", error);
    reply("❌ An error occurred while deobfuscating the code.");
  }
});





cmd({
    pattern: "jid1",
    desc: "Get the JID of the user or group.",
    react: "📍",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the user has the necessary permissions (Owner or Admin)
        if (!isGroup && !isOwner) {
            return reply("⚠️ Only the bot owner or group admins can use this command.");
        }

        // If it's a group, reply with the group JID
        if (isGroup) {
            return reply(`Group JID: *${from}@g.us*`);
        }

        // If it's a personal chat, reply with the user's JID
        if (!isGroup) {
            return reply(`User JID: *${sender}@s.whatsapp.net*`);
        }

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});


// jid2

cmd({
    pattern: "jid2",
    desc: "Get the JID of the user or group.",
    react: "📍",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure the command is being used in a group or personal chat and the user has necessary permissions
        if (!isGroup && !isOwner) {
            return reply("⚠️ Only the bot owner or group admins can use this command.");
        }

        // If the message is from a group
        if (isGroup) {
            // Respond with the group JID
            return reply(`Group JID: *${from}@g.us*`);
        }

        // If it's a personal chat, respond with the user's JID
        if (!isGroup) {
            return reply(`User JID: *${sender}@s.whatsapp.net*`);
        }

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});


cmd({
    pattern: "fetch",
    alias: ["get", "api"],
    desc: "Fetch data from a provided URL or API",
    category: "main",
    react: "♻️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        const q = args.join(' ').trim(); // Extract the URL or API query
        if (!q) return reply('❌ Please provide a valid URL or query.');

        if (!/^https?:\/\//.test(q)) return reply('❌ URL must start with http:// or https://.');

        const data = await fetchJson(q); // Use your fetchJson utility function to get data
        const content = JSON.stringify(data, null, 2);

        await conn.sendMessage(from, {
            text: `🌐 *Fetched Data*:\n\`\`\`${content}\`\`\`\n\n> sᴜʙᴢᴇʀᴏ ᴍᴅ ʙᴏᴛ`,
         // text: `🌐 *Fetched Data*:\n\`\`\`${content.slice(0, 2048)}\`\`\`\n\n> sᴜʙᴢᴇʀᴏ ᴍᴅ ʙᴏᴛ`,
              
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardingSourceMessage: 'Your Data Request',
            }
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in fetch command:", e);
        reply(`❌ An error occurred:\n${e.message}`);
    }
});



const crypto = require('crypto');
const { cmd } = require('../command');

cmd({
    pattern: "gpass",
    desc: "Generate a strong password.",
    category: "other",
    react: "🔐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const length = args[0] ? parseInt(args[0]) : 12; // Default length is 12 if not provided
        if (isNaN(length) || length < 8) {
            return reply('Please provide a valid length for the password (Minimum 08 Characters💦).');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `🔐 *Your Strong Password* 🔐\n\nPlease find your generated password below:\n\n *ɢᴇɴᴇʀᴀᴛᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ*`;

        // Send initial notification message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Send the password in a separate message
        await conn.sendMessage(from, { text: password }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error generating password🤕: ${e.message}`);
    }
});


cmd({
  pattern: "cid",
  alias: ["newsletter", "channelid"],
  react: "⏳",
  desc: "Get WhatsApp Channel info from link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, {
  from,
  args,
  q,
  reply
}) => {
  try {
    if (!q) return reply("❎ Please provide a WhatsApp Channel link.\n\n*Example:* .cinfo https://whatsapp.com/channel/123456789");

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match) return reply("⚠️ *Invalid channel link format.*\n\nMake sure it looks like:\nhttps://whatsapp.com/channel/xxxxxxxxx");

    const inviteId = match[1];

    let metadata;
    try {
      metadata = await conn.newsletterMetadata("invite", inviteId);
    } catch (e) {
      return reply("❌ Failed to fetch channel metadata. Make sure the link is correct.");
    }

    if (!metadata || !metadata.id) return reply("❌ Channel not found or inaccessible.");

    const infoText = `\`📡 Channel Info\`\n\n` +
      `🛠️ *ID:* ${metadata.id}\n` +
      `📌 *Name:* ${metadata.name}\n` +
      `👥 *Followers:* ${metadata.subscribers?.toLocaleString() || "N/A"}\n` +
      `📅 *Created on:* ${metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString("id-ID") : "Unknown"}`;

    if (metadata.preview) {
      await conn.sendMessage(from, {
        image: { url: `https://pps.whatsapp.net${metadata.preview}` },
        caption: infoText
      }, { quoted: m });
    } else {
      await reply(infoText);
    }

  } catch (error) {
    console.error("❌ Error in .cinfo plugin:", error);
    reply("⚠️ An unexpected error occurred.");
  }
});



cmd({
  pattern: "vv",
  alias: ["viewonce", 'retrive','👀','💀','see'],
  react: '😏',
  desc: "Owner Only - retrieve quoted message back to user",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isOwner }) => {
  try {
    if (!isOwner) {
      return await client.sendMessage(from, {
        text: "*❌ Bro command for owner only.*"
      }, { quoted: message });
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*Baka🐦 !, reply to a view once message jeish !*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, { quoted: message });
    }

    await client.sendMessage(from, messageContent, options);
  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});


// 2viewonce


cmd({
  pattern: "vv2",
  alias: ["viewonce2", 'retrieve2','🤤','🤫','nice','woww','ahh','kkk'],
  react: '🫂',
  desc: "Owner Only - retrieve quoted message to bot's inbox",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isOwner }) => {
  try {
    if (!isOwner) {
      return await client.sendMessage(from, {
        text: "*❌ Command for owner only.*"
      }, { quoted: message });
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*Reply to a view once message!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const botInbox = client.user.id; // Bot's own JID (inbox)
    const isGroup = isJidGroup(from);
    const currentTime = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Create context info similar to anti-delete plugin
    let contextInfo = `\`SUBZERO BOT VV\`\n\n` +
                     `*🕒 Time:* ${currentTime}\n` +
                     `*📌 Source:* ${isGroup ? 'Group' : 'Private Chat'}\n` +
                     `*👤 Sender:* @${message.sender.split('@')[0]}`;

    if (isGroup) {
      const groupMetadata = await client.groupMetadata(from);
      contextInfo += `\n*👥 Group:* ${groupMetadata.subject}`;
    }

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: contextInfo,
          mimetype: match.quoted.mimetype || "image/jpeg",
          contextInfo: {
            mentionedJid: [message.sender],
            forwardingScore: 999,
            isForwarded: true
          }
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: contextInfo,
          mimetype: match.quoted.mimetype || "video/mp4",
          contextInfo: {
            mentionedJid: [message.sender],
            forwardingScore: 999,
            isForwarded: true
          }
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false,
          contextInfo: {
            mentionedJid: [message.sender],
            forwardingScore: 999,
            isForwarded: true
          }
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, { quoted: message });
    }

    // Forward to bot's inbox using same pattern as anti-delete
    await client.sendMessage(botInbox, messageContent);
    
    // Notification in original chat
   /* await client.sendMessage(from, {
      text: "✅ View-once media has been forwarded to my inbox",
      contextInfo: {
        mentionedJid: [message.sender]
      }
    }, { quoted: message }); */
    
  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error retrieving view-once message:\n" + error.message
    }, { quoted: message });
  }
});


// Anti-Link System
const linkPatterns = [
  /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
  /wa\.me\/\S+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
  /https?:\/\/ngl\/\S+/gi,
  /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
  /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
];

cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    if (containsLink && config.ANTI_LINK === 'true') {
      await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });
      await conn.sendMessage(from, {
        'text': `⚠️ Links are not allowed in this group.\n@${sender.split('@')[0]}. Bastard Eliminated. 🚫`,
        'mentions': [sender]
      }, { 'quoted': m });

      await conn.groupParticipantsUpdate(from, [sender], "remove");
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});



cmd(
    {
        pattern: 'channelstalk',
        alias: ['whatsappchannel', 'wastalk'],
        desc: 'Get WhatsApp channel information',
        category: 'utility',
        react: '🔍',
        use: '<channel-url>',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        try {
            if (!q) return reply('🔗 *Please provide a WhatsApp channel URL*\nExample: .channelstalk https://whatsapp.com/channel/0029VaGvk6XId7nHNGfiRs0m');

            // Send processing reaction
            await conn.sendMessage(mek.chat, { react: { text: "⏳", key: mek.key } });

            // Extract channel ID from URL
            let channelUrl = q.trim();
            if (!channelUrl.includes('whatsapp.com/channel/')) {
                return reply('❌ *Invalid URL* - Must be a WhatsApp channel link');
            }

            // Call Nexoracle API
            const apiUrl = `https://api.nexoracle.com/stalking/whatsapp-channel?apikey=e276311658d835109c&url=${encodeURIComponent(channelUrl)}`;
            const response = await axios.get(apiUrl);
            
            if (response.data.status !== 200) {
                return reply('❌ *Error fetching channel info* - API returned non-200 status');
            }

            const channelData = response.data.result;

            // Format the response
            const message = `
📢 *Channel Stalker* 📢

🏷️ *Title:* ${channelData.title}
👤 *Owner:* ${response.data.owner}
👥 *Followers:* ${channelData.followers}

📝 *Description:*
${channelData.description}

🔗 *Link:* ${channelData.link}
            `;

            // Send message with channel image
            await conn.sendMessage(mek.chat, { 
                image: { url: channelData.image },
                caption: message,
                contextInfo: {
                    externalAdReply: {
                        title: channelData.title,
                        body: `Powered By Subzero`,
                        thumbnail: await getImageBuffer(channelData.image),
                        mediaType: 1,
                        mediaUrl: channelData.link,
                        sourceUrl: channelData.link
                    }
                }
            }, { quoted: mek });

            // Send success reaction
            await conn.sendMessage(mek.chat, { react: { text: "✅", key: mek.key } });

        } catch (error) {
            console.error('Channel stalk error:', error);
            await conn.sendMessage(mek.chat, { react: { text: "❌", key: mek.key } });
            reply('⚠️ *Error stalking channel* - Please check the URL and try again');
        }
    }
);

// Helper function to get image buffer
async function getImageBuffer(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
    } catch {
        return null;
    }
}

cmd({
    pattern: 'sb',
    alias: ['uptime', 'status', 'runtime'],
    desc: 'Check bot status and uptime',
    category: 'general',
    react: '🤖',
    filename: __filename
}, async (message, reply) => {
    try {
        // Calculate uptime
        const uptimeSeconds = process.uptime();
        const days = Math.floor(uptimeSeconds / (3600 * 24));
        const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeSeconds % 60);

        // Social media info
        const social = {
            instagram: "mrfrankofc",
            github: "mrfr8nk",
            facebook: "Darrell Mucheri",
            botName: "SUBZERO MD"
        };

        // Generate API URL for image
        const apiUrl = `https://kaiz-apis.gleeze.com/api/uptime?instag=${social.instagram}&ghub=${social.github}&fb=${social.facebook}&hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=${social.botName}`;

        // Status message template
        const statusMessage = `╭──「 *${social.botName} STATUS* 」──╮
│
│ ✅ *Bot Status:* Online
│ ⏱️ *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
│ 
│ 📊 *System Info:*
│ ⚡ *Version:* ${config.VERSION || "1.0.0"}
│ 💻 *Mode:* ${config.MODE || "Default"}
│
│ 🔗 *Social Media:*
│ 📷 Instagram: ${social.instagram}
│ 💻 GitHub: ${social.github}
│
╰──────────────────╯`;

        // Try to send with image
        try {
            await reply(
                { 
                    image: { url: apiUrl },
                    caption: statusMessage,
                    contextInfo: {
                        mentionedJid: [message.sender],
                        forwardingScore: 999,
                        isForwarded: true
                    }
                },
                { quoted: message }
            );
        } catch (imageError) {
            console.error("Image API failed, sending text only:", imageError);
            await reply(
                `${statusMessage}\n\n⚠️ *Image service temporarily unavailable*`,
                { quoted: message }
            );
        }

    } catch (error) {
        console.error("Error in alive command:", error);
        await reply(
            `❌ Error checking bot status. Please try again later.`,
            { quoted: message }
        );
    }
});


cmd({
  pattern: "tempnumber",
  alias: ["tempnum", "randomnumber","tn","tempsms"],
  react: '📞',
  desc: "Get a random temporary number for SMS verification.",
  category: "tools",
  use: ".tempnumber2",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the API URL
    const apiUrl = "https://apis-keith.vercel.app/tempnumber";

    // Call the API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || !response.data.status || !response.data.result || !response.data.result.length) {
      return reply('❌ Unable to fetch temporary numbers. Please try again later.');
    }

    // Get a random number from the list
    const numbers = response.data.result;
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

    // Extract number details
    const { country, number, link } = randomNumber;

    // Prepare the message
    const message = `📞 *\`Temporary Number for SMS\`* 📞\n\n` +
                    `🌍 *Country:* ${country}\n` +
                    `📱 *Number:* ${number}\n` +
                    `🔗 *Link:* ${link}\n\n` +
                    `> © 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐁𝐎𝐓`;

    // Attach an image (replace with your image URL)
    const imageUrl = "https://i.postimg.cc/nLn4gDGg/Glavnoe-New-Africa-0f076b51bf.webp"; // Example image URL

    // Send the message with the image
    await conn.sendMessage(from, {
      image: { url: imageUrl },
      caption: message,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363304325601080@newsletter',
          newsletterName: '『 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 』',
          serverMessageId: 143
        }
      } 
    }, { quoted: mek });

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error fetching temporary number:', error);
    reply('❌ Unable to fetch a temporary number. Please try again later.');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});




cmd({
  pattern: "wow",
  alias: ["mmm", "save2", "cool", "take","😂"],
  react: '❤️',
  desc: "Forwards quoted message to bot's inbox",
  category: "utility",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a message!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const botInbox = client.user.id; // Bot's own JID (your inbox)
    const currentTime = new Date().toLocaleString();

    // Create context info
    const contextInfo = `*📥 Saved Message*\n\n` +
                       `*🕒 Time:* ${currentTime}\n` +
                       `*👤 From:* @${message.sender.split('@')[0]}\n` +
                       `*💬 Original Caption:* ${match.quoted.text || 'None'}`;

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: contextInfo,
          mimetype: match.quoted.mimetype || "image/jpeg",
          contextInfo: {
            mentionedJid: [message.sender],
            forwardingScore: 999,
            isForwarded: true
          }
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: contextInfo,
          mimetype: match.quoted.mimetype || "video/mp4",
          contextInfo: {
            mentionedJid: [message.sender],
            forwardingScore: 999,
            isForwarded: true
          }
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false,
          contextInfo: {
            mentionedJid: [message.sender],
            forwardingScore: 999,
            isForwarded: true
          }
        };
        break;
      case "documentMessage":
        messageContent = {
          document: buffer,
          mimetype: match.quoted.mimetype,
          fileName: match.quoted.fileName || "document",
          caption: contextInfo
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, audio and document messages are supported"
        }, { quoted: message });
    }

    // Send to bot's inbox
    await client.sendMessage(botInbox, messageContent);

    // Optional: Confirm to user (you can remove this if you want it silent)
   /* await client.sendMessage(from, {
      text: "✅ Message saved to my inbox",
      contextInfo: {
        mentionedJid: [message.sender]
      }
    }, { quoted: message });*/

  } catch (error) {
    console.error("Save Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error saving message:\n" + error.message
    }, { quoted: message });
  }
});


cmd({
  pattern: "send",
  alias: ["sendme", "save","steal","🤌"],
  react: '❤️',
  desc: "Forwards quoted message back to user",
  category: "utility",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a message!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, { quoted: message });
    }

    await client.sendMessage(from, messageContent, options);
  } catch (error) {
    console.error("Forward Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error forwarding message:\n" + error.message
    }, { quoted: message });
  }
});


cmd({
  pattern: "screenshot",
  react: "🌐",
  alias: ["ss", "ssweb"],
  desc: "Capture a full-page screenshot of a website.",
  category: "utility",
  use: ".screenshot <url>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const url = args[0];
    if (!url) {
      return reply("❌ Please provide a valid URL. Example: `.screenshot https://mrfrankinc.vercel.app`");
    }

    // Validate the URL
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return reply("❌ Invalid URL. Please include 'http://' or 'https://'.");
    }

    // Generate the screenshot URL using Thum.io API
    const screenshotUrl = `https://image.thum.io/get/fullpage/${url}`;

    // Send the screenshot as an image message
    await conn.sendMessage(from, {
      image: { url: screenshotUrl },
      caption: `  *🌐 Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ 🌐*\n\n🔗 *Website URL:* \n${url}`,
      contextInfo: {
        mentionedJid: [msg.sender], // Fix: Use `msg.sender` instead of `m.sender`
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363304325601080@newsletter',
          newsletterName: "𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃",
          serverMessageId: 143,
        },
      },
    }, { quoted: mek });

  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    reply("❌ Failed to capture the screenshot. Please try again.");
  }
});



// ==================== QR CODE READER ====================
cmd({
    pattern: "qrread",
    desc: "Read QR codes from images",
    alias: ["scanqr", "readqr","scanqrcode"],
    category: "tools",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, reply, quoted }) => {
    try {
        const quotedMsg = m.quoted ? m.quoted : m;
        const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
        
        if (!mimeType.startsWith('image')) {
            return reply('❌ Please reply to an image (JPEG/PNG) containing a QR code');
        }

        // Download and process image
        const buffer = await quotedMsg.download();
        const tempPath = path.join(os.tmpdir(), `qr_${Date.now()}.jpg`);
        fs.writeFileSync(tempPath, buffer);

        try {
            const image = await Jimp.read(tempPath);
            const qr = new qrCode();
            
            const decodedText = await new Promise((resolve) => {
                qr.callback = (err, value) => {
                    if (err) {
                        console.error('QR Decode Error:', err);
                        resolve(null);
                    } else {
                        resolve(value?.result);
                    }
                };
                qr.decode(image.bitmap);
            });

            if (!decodedText) {
                return reply('❌ No QR code found. Please send a clearer image.');
            }

            let response = `✅ *QR Code Content:*\n\n${decodedText}`;
            if (decodedText.match(/^https?:\/\//i)) {
                response += `\n\n⚠️ *Warning:* Be careful visiting unknown URLs`;
            }

            await reply(response);

        } finally {
            fs.unlinkSync(tempPath);
        }

    } catch (error) {
        console.error('QR Read Error:', error);
        reply('❌ Failed to read QR code. Error: ' + (error.message || error));
    }
});

// ==================== VOICE FX PLUGIN ====================




cmd({
    pattern: "ringtones",
    alias: ["tones", "phonetones",],
    desc: "Check uptime and system status",
    category: "main",
    react:"🎶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `*🎺SUBZERO RINGTONES🎺*

────────────
1. Querky
2. QUERER QUEREMOS
3. HK47 - Query
4. Query-sms-tone
5. Querida
6. Querido
7. Querer
8. Querersin
9. 8bit Art Of Thedress
10. 8bitartofthedress2
11. Lunas Future
12. Equestria Girls Tone
13. Pony Swag
14. Milkshake Race
15. Evil Enchantress
16. Yay
17. Hush Now Metal Now
18. Mlp Yay
19. BIBIDDY-BOOPY
20. Adventure
21. Sandviches
22. Friendship
23. Redheart - Shh
24. Flutterbeep
25. Nurse Redheart
─────────────

  \`\`\` USAGE EXAMPLE\`\`\`
      \`.ringtone\` Querky


> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ ʙᴏᴛ`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/Y8Bv9P0/mrfrankofc.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐑𝐈𝐍𝐆𝐓𝐎𝐍𝐄𝐒',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error :", e);
        reply(`An error occurred: ${e.message}`);
    }
});




cmd({
  pattern: "removebg",
  alias: ["rmbg", "nobg", "transparentbg"],
  react: '🖼️',
  desc: "Remove background from an image",
  category: "utility",
  use: ".removebg [reply to image]",
  filename: __filename
}, async (client, message, { reply, quoted }) => {
  try {
    // Check if quoted message exists and has media
    const quotedMsg = quoted || message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType || !mimeType.startsWith('image/')) {
      return reply("Please reply to an image file (JPEG/PNG)");
    }

    // Download the media
    const mediaBuffer = await quotedMsg.download();
    
    // Get file extension based on mime type
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else {
      return reply("Unsupported image format. Please use JPEG or PNG");
    }

    // Create temp file
    const tempFilePath = path.join(os.tmpdir(), `removebg_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath); // Clean up temp file

    if (!imageUrl) {
      throw "Failed to upload image to Catbox";
    }

    // Remove background using API
    const apiUrl = `https://apis.davidcyriltech.my.id/removebg?url=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

    // Check if response is valid image
    if (!response.data || response.data.length < 100) { // Minimum size check
      throw "API returned invalid image data";
    }

    // Save processed image
    const outputPath = path.join(os.tmpdir(), `removebg_output_${Date.now()}.png`);
    fs.writeFileSync(outputPath, response.data);

    // Send the processed image
    await client.sendMessage(message.chat, {
      image: fs.readFileSync(outputPath),
      caption: "Background removed successfully!",
    }, { quoted: message });

    // Clean up
    fs.unlinkSync(outputPath);

  } catch (error) {
    console.error('RemoveBG Error:', error);
    await reply(`❌ Error: ${error.message || error}`);
  }
});


cmd({
  pattern: "remini",
  alias: ["enhance", "hq", "qualityup"],
  react: '✨',
  desc: "Enhance photo quality using Remini AI",
  category: "utility",
  use: ".remini [reply to image]",
  filename: __filename
}, async (client, message, { reply, quoted }) => {
  try {
    // Check if quoted message exists and has media
    const quotedMsg = quoted || message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType || !mimeType.startsWith('image/')) {
      return reply("Please reply to an image file (JPEG/PNG)");
    }

    // Download the media
    const mediaBuffer = await quotedMsg.download();
    
    // Get file extension based on mime type
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else {
      return reply("Unsupported image format. Please use JPEG or PNG");
    }

    // Create temp file
    const tempFilePath = path.join(os.tmpdir(), `remini_input_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath); // Clean up temp file

    if (!imageUrl) {
      throw "Failed to upload image to Catbox";
    }

    // Enhance image using Remini API
    const apiUrl = `https://apis.davidcyriltech.my.id/remini?url=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { 
      responseType: 'arraybuffer',
      timeout: 60000 // 1 minute timeout
    });

    // Check if response is valid image
    if (!response.data || response.data.length < 100) {
      throw "API returned invalid image data";
    }

    // Save enhanced image
    const outputPath = path.join(os.tmpdir(), `remini_output_${Date.now()}.jpg`);
    fs.writeFileSync(outputPath, response.data);

    // Send the enhanced image with loading message
    await reply("🔄 Enhancing image quality...");
    await client.sendMessage(message.chat, {
      image: fs.readFileSync(outputPath),
      caption: "✅ Image enhanced successfully!",
    }, { quoted: message });

    // Clean up
    fs.unlinkSync(outputPath);

  } catch (error) {
    console.error('Remini Error:', error);
    await reply(`❌ Error: ${error.message || "Failed to enhance image. The image might be too large or the API is unavailable."}`);
  }
});


// Store active timers
const activeReminders = new Map();

// Reminder image URL
const REMINDER_IMAGE = 'https://files.catbox.moe/18il7k.jpg';

cmd({
    pattern: "reminder",
    alias: ["remind", "remindme"],
    category: "utility",
    desc: "Sets a reminder with custom time duration",
    filename: __filename,
    usage: `${prefix}reminder <time> <message>\nExample: ${prefix}reminder 15minutes Check the oven`,
}, async (conn, mek, m, { args, reply, sender }) => {
    try {
        if (args.length < 2) {
            return reply(`❌ Invalid format! Use:\n${prefix}reminder <time> <message>\nExample: ${prefix}reminder 15minutes Check the oven`);
        }

        // Extract time and unit
        const timeInput = args[0].toLowerCase();
        const message = args.slice(1).join(' ');
        
        // Parse time (support for: 10s, 5m, 2h, 30sec, 15min, 1hour, etc.)
        const timeMatch = timeInput.match(/^(\d+)(s|sec|seconds|m|min|minutes|h|hr|hours|hour)$/);
        
        if (!timeMatch) {
            return reply(`❌ Invalid time format! Examples:\n- 30s\n- 15min\n- 2h`);
        }

        const amount = parseInt(timeMatch[1]);
        const unit = timeMatch[2][0]; // Get first letter (s/m/h)

        // Convert to milliseconds
        let milliseconds;
        switch(unit) {
            case 's':
                milliseconds = amount * 1000;
                break;
            case 'm':
                milliseconds = amount * 60 * 1000;
                break;
            case 'h':
                milliseconds = amount * 60 * 60 * 1000;
                break;
            default:
                return reply(`❌ Unsupported time unit. Use s, m, or h`);
        }

        if (milliseconds > 365 * 24 * 60 * 60 * 1000) {
            return reply(`❌ Maximum reminder time is 1 year`);
        }

        // Format human-readable time
        let displayTime;
        if (unit === 's') {
            displayTime = `${amount} second${amount !== 1 ? 's' : ''}`;
        } else if (unit === 'm') {
            displayTime = `${amount} minute${amount !== 1 ? 's' : ''}`;
        } else {
            displayTime = `${amount} hour${amount !== 1 ? 's' : ''}`;
        }

        // Create reminder
        const reminderId = `${sender}-${Date.now()}`;
        
        const timer = setTimeout(async () => {
            try {
                // Try to send with image first
                await conn.sendMessage(m.chat, { 
                    image: { url: REMINDER_IMAGE },
                    caption: `⏰ REMINDER: ${message}\n\n(Set ${displayTime} ago)`,
                    contextInfo: {
                        mentionedJid: [sender]
                    }
                });
            } catch (e) {
                // Fallback to text if image fails
                await conn.sendMessage(m.chat, { 
                    text: `⏰ REMINDER: ${message}\n\n(Set ${displayTime} ago)`,
                    contextInfo: {
                        mentionedJid: [sender]
                    }
                });
            } finally {
                activeReminders.delete(reminderId);
            }
        }, milliseconds);

        // Store the timer
        activeReminders.set(reminderId, {
            timer,
            startTime: Date.now(),
            duration: milliseconds,
            message,
            sender,
            chat: m.chat,
            displayTime
        });

        // Send confirmation
        try {
            await conn.sendMessage(m.chat, {
                image: { url: REMINDER_IMAGE },
                caption: `✅ Reminder set for ${displayTime}:\n"${message}"\n\nI'll notify you when the time is up!`
            });
        } catch (e) {
            await reply(`✅ Reminder set for ${displayTime}:\n"${message}"\n\nI'll notify you when the time is up!`);
        }

    } catch (e) {
        console.error('Reminder error:', e);
        reply(`❌ Failed to set reminder: ${e.message}`);
    }
});

cmd({
    pattern: "myreminders",
    alias: ["listreminders"],
    category: "utility",
    desc: "Shows your active reminders",
    filename: __filename,
}, async (conn, mek, m, { reply, sender }) => {
    try {
        const userReminders = [];
        
        // Safely iterate through reminders
        activeReminders.forEach((reminder, id) => {
            if (reminder.sender === sender) {
                userReminders.push({ id, reminder });
            }
        });

        if (userReminders.length === 0) {
            return reply("⏳ You don't have any active reminders.");
        }

        let reminderList = "⏰ YOUR ACTIVE REMINDERS:\n\n";
        
        userReminders.forEach(({ id, reminder }, index) => {
            const elapsed = Date.now() - reminder.startTime;
            const remaining = Math.max(0, reminder.duration - elapsed);
            
            // Format remaining time
            let remainingTime;
            if (remaining < 60000) {
                const seconds = Math.ceil(remaining / 1000);
                remainingTime = `${seconds} second${seconds !== 1 ? 's' : ''}`;
            } else if (remaining < 3600000) {
                const minutes = Math.ceil(remaining / 60000);
                remainingTime = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
            } else {
                const hours = Math.ceil(remaining / 3600000);
                remainingTime = `${hours} hour${hours !== 1 ? 's' : ''}`;
            }
            
            reminderList += `${index + 1}. "${reminder.message}"\n⏳ ${remainingTime} remaining (set for ${reminder.displayTime})\n\n`;
        });

        await reply(reminderList);

    } catch (e) {
        console.error('MyReminders error:', e);
        reply(`❌ Failed to fetch reminders: ${e.message}`);
    }
});

cmd({
    pattern: "cancelreminder",
    alias: ["stopreminder", "deletereminder"],
    category: "utility",
    desc: "Cancels an active reminder",
    filename: __filename,
    usage: `${prefix}cancelreminder <number>\n(Use ${prefix}myreminders to see numbers)`,
}, async (conn, mek, m, { args, reply, sender }) => {
    try {
        if (!args[0]) {
            return reply(`❌ Please provide a reminder number\n(Use ${prefix}myreminders to see your reminders)`);
        }

        const reminderNumber = parseInt(args[0]);
        if (isNaN(reminderNumber)) {
            return reply(`❌ Please enter a valid number\n(Use ${prefix}myreminders to see your reminders)`);
        }

        const userReminders = [];
        activeReminders.forEach((reminder, id) => {
            if (reminder.sender === sender) {
                userReminders.push({ id, reminder });
            }
        });

        if (reminderNumber < 1 || reminderNumber > userReminders.length) {
            return reply(`❌ Invalid reminder number. You have ${userReminders.length} active reminders`);
        }

        const { id, reminder } = userReminders[reminderNumber - 1];
        clearTimeout(reminder.timer);
        activeReminders.delete(id);
        
        await reply(`✅ Reminder canceled:\n"${reminder.message}"\n(Was set for ${reminder.displayTime})`);

    } catch (e) {
        console.error('CancelReminder error:', e);
        reply(`❌ Failed to cancel reminder: ${e.message}`);
    }
});

cmd({
    pattern: "cancelallreminders",
    alias: ["stopallreminders"],
    category: "utility",
    desc: "Cancels all your active reminders",
    filename: __filename,
}, async (conn, mek, m, { reply, sender }) => {
    try {
        let canceledCount = 0;
        
        // Create a copy of entries to avoid modification during iteration
        const remindersToCancel = [];
        activeReminders.forEach((reminder, id) => {
            if (reminder.sender === sender) {
                remindersToCancel.push({ id, reminder });
            }
        });

        if (remindersToCancel.length === 0) {
            return reply("⏳ You don't have any active reminders to cancel.");
        }

        for (const { id, reminder } of remindersToCancel) {
            clearTimeout(reminder.timer);
            activeReminders.delete(id);
            canceledCount++;
        }
        
        await reply(`✅ Canceled all ${canceledCount} of your active reminders.`);

    } catch (e) {
        console.error('CancelAllReminders error:', e);
        reply(`❌ Failed to cancel reminders: ${e.message}`);
    }
});




const stylizedChars = {
    a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
    h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
    o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
    v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
    '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
    '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
};

cmd({
    pattern: "channelreact",
    alias: ["creact"],
    react: "🔤",
    desc: "React to channel messages with stylized text",
    category: "owner",
    use: '.chr <channel-link> <text>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isCreator) return reply("❌ Owner only command");
        if (!q) return reply(`Usage:\n${command} https://whatsapp.com/channel/1234567890 hello`);

        const [link, ...textParts] = q.split(' ');
        if (!link.includes("whatsapp.com/channel/")) return reply("Invalid channel link format");
        
        const inputText = textParts.join(' ').toLowerCase();
        if (!inputText) return reply("Please provide text to convert");

        const emoji = inputText
            .split('')
            .map(char => {
                if (char === ' ') return '―';
                return stylizedChars[char] || char;
            })
            .join('');

        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];
        if (!channelId || !messageId) return reply("Invalid link - missing IDs");

        const channelMeta = await conn.newsletterMetadata("invite", channelId);
        await conn.newsletterReactMessage(channelMeta.id, messageId, emoji);

        return reply(`╭━━━〔 *SUBZERO-MD* 〕━━━┈⊷
┃▸ *Success!* Reaction sent
┃▸ *Channel:* ${channelMeta.name}
┃▸ *Reaction:* ${emoji}
╰────────────────┈⊷
> *© SUBZERO MD`);
    } catch (e) {
        console.error(e);
        reply(`❎ Error: ${e.message || "Failed to send reaction"}`);
    }
});







// Enhanced ping command with repo info
cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    desc: "Check bot's response time and status",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const start = Date.now();
        
        // Emoji collections
        const emojiSets = {
            reactions: ['⚡', '🚀', '💨', '🎯', '🌟', '💎', '🔥', '✨', '🌀', '🔹'],
            decorations: ['▰▰▰▰▰▰▰▰▰▰', '▰▱▱▱▱▱▱▱▱▱', '▰▰▱▱▱▱▱▱▱▱', '▰▰▰▱▱▱▱▱▱▱', '▰▰▰▰▱▱▱▱▱▱'],
            status: ['🟢 ONLINE', '🔵 ACTIVE', '🟣 RUNNING', '🟡 RESPONDING']
        };

        // Random selections
        const reactionEmoji = emojiSets.reactions[Math.floor(Math.random() * emojiSets.reactions.length)];
        const statusEmoji = emojiSets.status[Math.floor(Math.random() * emojiSets.status.length)];
        const loadingBar = emojiSets.decorations[Math.floor(Math.random() * emojiSets.decorations.length)];

        // Send reaction
        await conn.sendMessage(from, {
            react: { text: reactionEmoji, key: mek.key }
        });

        // Calculate response time
        const responseTime = (Date.now() - start) / 1000;
        
        // Get current time
        const time = moment().tz('Africa/Harare').format('HH:mm:ss');
        const date = moment().tz('Africa/Harare').format('DD/MM/YYYY');

        // Build response message
        const pingMessage = `
${loadingBar}
*${statusEmoji}*
        
⚡ \`Response Time:\` ${responseTime.toFixed(2)}ms
⏰ \`Time:\` ${time}
📅 \`Date:\` ${date}

💻 \`DEVELOPER:\` ${config.OWNER_NAME || "Mr Frank"}
🤖 \`Bot Name:\` ${config.BOT_NAME || "SUBZERO-MD"}

🌟 *Don't forget to star & fork the repo!*
🔗 ${config.REPO || "https://github.com/mrfrank-ofc/SUBZERO-MD"}

${loadingBar}
`.trim();

        // Send ping response
        await conn.sendMessage(from, {
            text: pingMessage,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: "🚀 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 🚀",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Ping command error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

// Ping2 with enhanced visuals
cmd({
    pattern: "ping2",
    desc: "Advanced ping with system info",
    category: "main",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const startTime = Date.now();
        const loadingMsg = await conn.sendMessage(from, { 
            text: '🚀 *Measuring SUBZERO performance...*' 
        });

        const endTime = Date.now();
        const ping = endTime - startTime;

        // System emojis
        const systemEmojis = {
            cpu: '⚙️',
            ram: '🧠', 
            speed: '⚡',
            clock: '⏱️',
            repo: '📦'
        };

        const pingMessage = `
${systemEmojis.cpu} *SYSTEM PERFORMANCE*
        
${systemEmojis.clock} *Response Time:* ${ping}ms
${systemEmojis.speed} *Speed:* ${ping < 500 ? '⚡ Blazing Fast' : ping < 1000 ? '🚀 Fast' : '🐢 Slow'}

${systemEmojis.repo} *Repository:*
${config.REPO || "https://github.com/mrfrank-ofc/SUBZERO-MD"}

💫 *Don't forget to star the repo!*
`.trim();

        await conn.sendMessage(from, { 
            text: pingMessage,
            edit: loadingMsg.key
        });

    } catch (e) {
        console.error("Ping2 error:", e);
        reply(`⚠️ Command failed: ${e.message}`);
    }
});

// Ping3 with typing indicator
cmd({
    pattern: "ping3",
    desc: "Ping with typing simulation",
    category: "utility",
    react: "⏱️",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Show typing indicator
        await conn.sendPresenceUpdate('composing', from);
        
        const start = Date.now();
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const latency = Date.now() - start;
        await conn.sendPresenceUpdate('paused', from);

        const resultMessage = `
⏱️ *Real-time Performance Metrics*
        
🏓 *Pong!* 
📶 *Latency:* ${latency}ms
📊 *Status:* ${latency < 300 ? 'Excellent' : latency < 600 ? 'Good' : 'Fair'}

✨ *Keep SUBZERO alive by starring the repo!*
🔗 ${config.REPO || "https://github.com/mrfrank-ofc/SUBZERO-MD"}
`.trim();

        await reply(resultMessage);

    } catch (error) {
        console.error('Ping3 error:', error);
        reply('❌ Failed to measure performance');
    }
});








cmd({
    pattern: "getpp",
    alias: ["stealpp"],
    react: "🖼️",
    desc: "Sends the profile picture of a user by phone number (owner only)",
    category: "owner",
    use: ".getpp <phone number>",
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the user is the bot owner
        if (!isOwner) return reply("🛑 This command is only for the bot owner!");

        // Check if a phone number is provided
        if (!args[0]) return reply("🔥 Please provide a phone number (e.g., .getpp 1234567890)");

        // Format the phone number to JID
        let targetJid = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

        // Get the profile picture URL
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(targetJid, "image");
        } catch (e) {
            return reply("🖼️ This user has no profile picture or it cannot be accessed!");
        }

        // Get the user's name or number for the caption
        let userName = targetJid.split("@")[0]; // Default to phone number
        try {
            const contact = await conn.getContact(targetJid);
            userName = contact.notify || contact.vname || userName;
        } catch {
            // Fallback to phone number if contact info is unavailable
        }

        // Send the profile picture
        await conn.sendMessage(from, { 
            image: { url: ppUrl }, 
            caption: `📌 Profile picture of ${userName}` 
        });

        // Send a reaction to the command message
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        // Reply with a generic error message and log the error
        reply("🛑 An error occurred while fetching the profile picture! Please try again later.");
        l(e); // Log the error for debugging
    }
});


// Safety Configuration
const SAFETY = {
  MAX_JIDS: 20,
  BASE_DELAY: 2000,  // jawad on top 🔝
  EXTRA_DELAY: 4000,  // huh don't copy mine file 
};

cmd({
  pattern: "forward",
  alias: ["fwd"],
  desc: "Bulk forward media to groups",
  category: "owner",
  filename: __filename
}, async (client, message, match, { isOwner }) => {
  try {
    // Owner check
    if (!isOwner) return await message.reply("*📛 Owner Only Command*");
    
    // Quoted message check
    if (!message.quoted) return await message.reply("*🍁 Please reply to a message*");

    // ===== [BULLETPROOF JID PROCESSING] ===== //
    let jidInput = "";
    
    // Handle all possible match formats
    if (typeof match === "string") {
      jidInput = match.trim();
    } else if (Array.isArray(match)) {
      jidInput = match.join(" ").trim();
    } else if (match && typeof match === "object") {
      jidInput = match.text || "";
    }
    
    // Extract JIDs (supports comma or space separated)
    const rawJids = jidInput.split(/[\s,]+/).filter(jid => jid.trim().length > 0);
    
    // Process JIDs (accepts with or without @g.us)
    const validJids = rawJids
      .map(jid => {
        // Remove existing @g.us if present
        const cleanJid = jid.replace(/@g\.us$/i, "");
        // Only keep if it's all numbers
        return /^\d+$/.test(cleanJid) ? `${cleanJid}@g.us` : null;
      })
      .filter(jid => jid !== null)
      .slice(0, SAFETY.MAX_JIDS);

    if (validJids.length === 0) {
      return await message.reply(
        "❌ No valid group JIDs found\n" +
        "Examples:\n" +
        ".fwd 120363411055156472@g.us,120363333939099948@g.us\n" +
        ".fwd 120363411055156472 120363333939099948"
      );
    }

    // ===== [ENHANCED MEDIA HANDLING - ALL TYPES] ===== //
    let messageContent = {};
    const mtype = message.quoted.mtype;
    
    // For media messages (image, video, audio, sticker, document)
    if (["imageMessage", "videoMessage", "audioMessage", "stickerMessage", "documentMessage"].includes(mtype)) {
      const buffer = await message.quoted.download();
      
      switch (mtype) {
        case "imageMessage":
          messageContent = {
            image: buffer,
            caption: message.quoted.text || '',
            mimetype: message.quoted.mimetype || "image/jpeg"
          };
          break;
        case "videoMessage":
          messageContent = {
            video: buffer,
            caption: message.quoted.text || '',
            mimetype: message.quoted.mimetype || "video/mp4"
          };
          break;
        case "audioMessage":
          messageContent = {
            audio: buffer,
            mimetype: message.quoted.mimetype || "audio/mp4",
            ptt: message.quoted.ptt || false
          };
          break;
        case "stickerMessage":
          messageContent = {
            sticker: buffer,
            mimetype: message.quoted.mimetype || "image/webp"
          };
          break;
        case "documentMessage":
          messageContent = {
            document: buffer,
            mimetype: message.quoted.mimetype || "application/octet-stream",
            fileName: message.quoted.fileName || "document"
          };
          break;
      }
    } 
    // For text messages
    else if (mtype === "extendedTextMessage" || mtype === "conversation") {
      messageContent = {
        text: message.quoted.text
      };
    } 
    // For other message types (forwarding as-is)
    else {
      try {
        // Try to forward the message directly
        messageContent = message.quoted;
      } catch (e) {
        return await message.reply("❌ Unsupported message type");
      }
    }

    // ===== [OPTIMIZED SENDING WITH PROGRESS] ===== //
    let successCount = 0;
    const failedJids = [];
    
    for (const [index, jid] of validJids.entries()) {
      try {
        await client.sendMessage(jid, messageContent);
        successCount++;
        
        // Progress update (every 10 groups instead of 5)
        if ((index + 1) % 10 === 0) {
          await message.reply(`🔄 Sent to ${index + 1}/${validJids.length} groups...`);
        }
        
        // Apply reduced delay
        const delayTime = (index + 1) % 10 === 0 ? SAFETY.EXTRA_DELAY : SAFETY.BASE_DELAY;
        await new Promise(resolve => setTimeout(resolve, delayTime));
        
      } catch (error) {
        failedJids.push(jid.replace('@g.us', ''));
        await new Promise(resolve => setTimeout(resolve, SAFETY.BASE_DELAY));
      }
    }

    // ===== [COMPREHENSIVE REPORT] ===== //
    let report = `✅ *Forward Complete*\n\n` +
                 `📤 Success: ${successCount}/${validJids.length}\n` +
                 `📦 Content Type: ${mtype.replace('Message', '') || 'text'}\n`;
    
    if (failedJids.length > 0) {
      report += `\n❌ Failed (${failedJids.length}): ${failedJids.slice(0, 5).join(', ')}`;
      if (failedJids.length > 5) report += ` +${failedJids.length - 5} more`;
    }
    
    if (rawJids.length > SAFETY.MAX_JIDS) {
      report += `\n⚠️ Note: Limited to first ${SAFETY.MAX_JIDS} JIDs`;
    }

    await message.reply(report);

  } catch (error) {
    console.error("Forward Error:", error);
    await message.reply(
      `💢 Error: ${error.message.substring(0, 100)}\n\n` +
      `Please try again or check:\n` +
      `1. JID formatting\n` +
      `2. Media type support\n` +
      `3. Bot permissions`
    );
  }
});


cmd({
  pattern: "fakecard",
  alias: ["gencard", "fakeid", "cardgen","cc"],
  react: "💳",
  desc: "Generate fake identity cards",
  category: "fun",
  use: ".fakecard",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Send waiting message
    await reply("🔄 *Generating fake card... Please wait*");

    // Call the API
    const response = await axios.get('https://draculazyx-xyzdrac.hf.space/api/Card');
    const data = response.data;

    // Format the response
    const cardInfo = `
🎫 *Fake Identity Card* 🎫

👤 *Name*: ${data.name}
⚧ *Gender*: ${data.gender}
🎂 *Birthdate*: ${data.birthdate}
🏠 *Address*: ${data.address}
📞 *Phone*: ${data.phone}
📧 *Email*: ${data.email}
🌍 *Nationality*: ${data.nationality}

💼 *Job*: ${data.jobTitle}
🏢 *Company*: ${data.company}

💳 *Credit Card*:
   - Number: ${data.creditCard.number}
   - Type: ${data.creditCard.type.toUpperCase()}
   - CVV: ${data.creditCard.cvv}
   - Expiry: ${data.creditCard.expiry}

✨ *Creator*: ${data.CREATOR}
✅ *Status*: ${data.STATUS}

> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ
    `;

    // Send the formatted message
    await conn.sendMessage(from, {
      text: cardInfo,
      contextInfo: {
        externalAdReply: {
          title: "Fake Card Generator",
          body: "Powered by Mr Frank OFC",
          thumbnail: Buffer.alloc(0),
          mediaType: 1,
          mediaUrl: 'https://files.catbox.moe/18il7k.jpg',
          sourceUrl: 'https://mrfrankinc.vercel.app'
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error('Error in fakecard command:', error);
    reply("❌ *Failed to generate card. Please try again later.*");
  }
});




cmd({
  pattern: "country",

  alias: ["countryinfo", "info"],
  react: "🌍",
  desc: "Get information about a country, including its flag, capital, and more.",
  category: "utility",
  use: ".country <country_name>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const countryName = args.join(" ");
    if (!countryName) {
      return reply("❌ Please provide a country name. Example: `.country Zimbabwe`");
    }

    // Fetch country information from the API
    const response = await axios.get(`https://api.siputzx.my.id/api/tools/countryInfo?name=${encodeURIComponent(countryName)}`);
    const { status, data } = response.data;

    if (!status || !data) {
      return reply("❌ No information found for the specified country. Please try again.");
    }

    const {
      name,
      capital,
      flag,
      phoneCode,
      googleMapsLink,
      continent,
      coordinates,
      area,
      landlocked,
      languages,
      famousFor,
      constitutionalForm,
      neighbors,
      currency,
      drivingSide,
      alcoholProhibition,
      internetTLD,
      isoCode,
    } = data;

    // Format the country information message
    const countryMessage = `\`SUBZERO GLOBE\`\n\n
🌍 *Country*: ${name}
🏛️ *Capital*: ${capital}
📞 *Phone Code*: ${phoneCode}
📍 *Continent*: ${continent.name} ${continent.emoji}
🌐 *Google Maps*: ${googleMapsLink}
📏 *Area*: ${area.squareKilometers} km² (${area.squareMiles} mi²)
🚗 *Driving Side*: ${drivingSide}
🍺 *Alcohol Prohibition*: ${alcoholProhibition}
💻 *Internet TLD*: ${internetTLD}
💰 *Currency*: ${currency}
📜 *Constitutional Form*: ${constitutionalForm}
🗣️ *Languages*: ${languages.native.join(", ")} (${languages.codes.join(", ")})
🌟 *Famous For*: ${famousFor}
🧭 *Coordinates*: Latitude ${coordinates.latitude}, Longitude ${coordinates.longitude}
🛂 *ISO Code*: ${isoCode.alpha2} (${isoCode.alpha3}, ${isoCode.numeric})
    `;

    // Send the country information message with the flag as an image attachment
    await conn.sendMessage(from, {
      image: { url: flag }, // Attach the flag image
      caption: countryMessage, // Add the formatted message as caption
    });
  } catch (error) {
    console.error("Error fetching country information:", error);
    reply("❌ Unable to fetch country information. Please try again later.");
  }
});


cmd(
    {
        pattern: "txtdetect",
        alias: ["aidetect", "textdetect"],
        desc: "Detect if a text is AI-generated or human-written.",
        category: "AI",
        use: "<text>\nExample: .txtdetect Hello",
        filename: __filename,
        react: "🤖"
    },
    async (conn, mek, m, { args, reply, from }) => {
        try {
            const query = args.join(" "); // Combine the query parts

            if (!query) {
                return reply("Please provide a text to analyze.\nExample: `.txtdetect Hello`");
            }

            // Call the AI Text Detector API
            const apiUrl = `https://bk9.fun/tools/txtdetect?q=${encodeURIComponent(query)}`;
            const response = await axios.get(apiUrl);

            // Log the API response for debugging
            console.log("API Response:", response.data);

            // Check if the API response is valid
            if (!response.data || !response.data.status || !response.data.BK9 || !response.data.BK9.success) {
                return reply("❌ Unable to analyze the text. Please try again later.");
            }

            // Extract the detection results
            const detectionData = response.data.BK9.data;

            // Format the results with emojis
            const resultText = `
🤖 *AI Text Detection Results:* 🤖

📝 *Input Text:* ${detectionData.input_text || "N/A"}

🔍 *Detection Summary:*
   - 🧑 *Human Probability:* ${detectionData.isHuman || 0}%
   - 🤖 *AI Probability:* ${100 - (detectionData.isHuman || 0)}%
   - 📊 *Fake Percentage:* ${detectionData.fakePercentage || 0}%
   - 🌐 *Detected Language:* ${detectionData.detected_language || "Unknown"}

📋 *Feedback:* ${detectionData.feedback || "N/A"}

📌 *Additional Feedback:* ${detectionData.additional_feedback || "N/A"}

🔎 *Special Sentences Detected:*
${detectionData.specialSentences?.map((sentence, index) => `   - ${sentence}`).join("\n") || "   - None"}

> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ
            `;

            // Send the formatted results
            await reply(resultText);

        } catch (error) {
            console.error("Error in txtdetect command:", error);
            reply("❌ An error occurred while processing your request. Please try again later.");
        }
    }
);

// SUBZERO 

const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require("axios");

cmd({
  pattern: "country",

  alias: ["countryinfo", "info"],
  react: "🌍",
  desc: "Get information about a country, including its flag, capital, and more.",
  category: "utility",
  use: ".country <country_name>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const countryName = args.join(" ");
    if (!countryName) {
      return reply("❌ Please provide a country name. Example: `.country Indonesia`");
    }

    // Fetch country information from the API
    const response = await axios.get(`https://api.siputzx.my.id/api/tools/countryInfo?name=${encodeURIComponent(countryName)}`);
    const { status, data } = response.data;

    if (!status || !data) {
      return reply("❌ No information found for the specified country. Please try again.");
    }

    const {
      name,
      capital,
      flag,
      phoneCode,
      googleMapsLink,
      continent,
      coordinates,
      area,
      landlocked,
      languages,
      famousFor,
      constitutionalForm,
      neighbors,
      currency,
      drivingSide,
      alcoholProhibition,
      internetTLD,
      isoCode,
    } = data;

    // Format the country information message
    const countryMessage = `\`SUBZERO GLOBE\`\n\n
🌍 *Country*: ${name}
🏛️ *Capital*: ${capital}
📞 *Phone Code*: ${phoneCode}
📍 *Continent*: ${continent.name} ${continent.emoji}
🌐 *Google Maps*: ${googleMapsLink}
📏 *Area*: ${area.squareKilometers} km² (${area.squareMiles} mi²)
🚗 *Driving Side*: ${drivingSide}
🍺 *Alcohol Prohibition*: ${alcoholProhibition}
💻 *Internet TLD*: ${internetTLD}
💰 *Currency*: ${currency}
📜 *Constitutional Form*: ${constitutionalForm}
🗣️ *Languages*: ${languages.native.join(", ")} (${languages.codes.join(", ")})
🌟 *Famous For*: ${famousFor}
🧭 *Coordinates*: Latitude ${coordinates.latitude}, Longitude ${coordinates.longitude}
🛂 *ISO Code*: ${isoCode.alpha2} (${isoCode.alpha3}, ${isoCode.numeric})
    `;

    // Send the country information message with the flag as an image attachment
    await conn.sendMessage(from, {
      image: { url: flag }, // Attach the flag image
      caption: countryMessage, // Add the formatted message as caption
    });
  } catch (error) {
    console.error("Error fetching country information:", error);
    reply("❌ Unable to fetch country information. Please try again later.");
  }
});

