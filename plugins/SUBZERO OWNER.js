/*

$$$$$$\            $$\                                               
$$  __$$\           $$ |                                              
$$ /  \__|$$\   $$\ $$$$$$$\  $$$$$$$$\  $$$$$$\   $$$$$$\   $$$$$$\  
\$$$$$$\  $$ |  $$ |$$  __$$\ \____$$  |$$  __$$\ $$  __$$\ $$  __$$\ 
 \____$$\ $$ |  $$ |$$ |  $$ |  $$$$ _/ $$$$$$$$ |$$ |  \__|$$ /  $$ |
$$\   $$ |$$ |  $$ |$$ |  $$ | $$  _/   $$   ____|$$ |      $$ |  $$ |
\$$$$$$  |\$$$$$$  |$$$$$$$  |$$$$$$$$\ \$$$$$$$\ $$ |      \$$$$$$  |
 \______/  \______/ \_______/ \________| \_______|\__|       \______/

Project Name : SubZero MD
Creator      : Darrell Mucheri ( Mr Frank OFC )
Repo         : https//github.com/mrfrank-ofc/SUBZERO-MD
Support      : wa.me/18062212660
*/








































































































































































































/* const { cmd ,commands } = require('../command');
const { exec } = require('child_process');
const config = require('../config');
const {sleep} = require('../lib/functions')
// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});
// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");
    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());
    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }
    reply("📢 Message broadcasted to all groups.");
});
// 3. Set Profile Picture
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");
    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

cmd({
    pattern: "jid",
    desc: "Get the bot's JID.",
    category: "owner",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply(`🤖 *Bot JID:* ${conn.user.jid}`);
});
// 8. Group JIDs List
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
});


// block 

cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to block.");
    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User ${user} blocked successfully.`);
    } catch (error) {
        reply(`❌ Error blocking user: ${error.message}`);
    }
});
// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");
    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});

*/

// SETTINGS 2


const { cmd ,commands } = require('../command');
const { exec } = require('child_process');
const config = require('../config');
const {sleep} = require('../lib/functions')


const Jimp = require("jimp");

const axios = require('axios');
const fs = require('fs');

cmd({
    pattern: "repotree",
    alias: ["repostructure", "repodir"],
    react: "📁",
    desc: "Show repository folder structure",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        // Get repo from config or use default
        const repoUrl =  "https://github.com/3strox/x" || config.REPO ;
        const repoPath = repoUrl.replace('https://github.com/', '');
        const [owner, repo] = repoPath.split('/');
        
        if (!owner || !repo) {
            return reply("❌ Invalid repository URL in config");
        }

        // Fetch root directory
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
        const { data } = await axios.get(apiUrl);

        // Build simple structure
        let structure = `📁 ${repo}\n`;
        
        for (const item of data) {
            if (item.type === 'dir') {
                structure += `├── 📂 ${item.name}/\n`;
            } else {
                structure += `├── 📄 ${item.name}\n`;
            }
        }

        await reply(`\`\`\`\n${structure}\`\`\``);

    } catch (error) {
        console.error("Repotree error:", error);
        reply("❌ Failed to fetch repository structure");
    }
});



// TO ALL SUBZERO BOT CLONERS
// THATS WHY I ADD HARD ENC BECOZ YOU DONT ASK FOR PERMISSION 
// F*CK YOU IF YOU ARE THAT KIND, MR FRANK



// Developer's WhatsApp number
const MRFRANK = '263719647303@s.whatsapp.net'; // Replace with your number

cmd({
    pattern: 'report',
    alias: ['bug', 'feedback'],
    react: '📬',
    desc: 'Send a report to the developer.',
    category: 'misc',
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
        // Extract the report message (everything after ".report")
        const reportMessage = body.replace('.report', '').trim();

        if (!reportMessage) {
            return reply('Please provide a report message.\n\n Example: `.report` My bot is not downloading Songs');
        }

        // Format the report
        const formattedReport = `🚨 *New Subzero Report* 🚨\n\n` +
                               `*👤 From:* ${sender.split('@')[0]}\n` +
                               `*👥 Group:* ${isGroup ? 'Yes' : 'No'}\n` +
                               `*📩 Message:* ${reportMessage}`;

        // Send the report to the developer with an image
        await conn.sendMessage(MRFRANK, {
            image: { url: 'https://i.postimg.cc/k4Kd698F/IMG-20250305-WA0000.jpg' }, // Image URL
            caption: formattedReport,
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
        });

        // Notify the user with an image
        await conn.sendMessage(from, {
            image: { url: 'https://i.postimg.cc/k4Kd698F/IMG-20250305-WA0000.jpg' }, // Image URL
            caption: 'Your report has been sent to the developer. Thank you!✅',
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

    } catch (error) {
        console.error('Error in report command:', error);
        reply('An error occurred while sending your report. Please try again later.');
    }
});


// Store cached plugins
let pluginCache = [];

cmd({
    pattern: "listplugins2",
    alias: ["plugins2", "plugs"],
    react: "📂",
    desc: "List all available plugins",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        // Get repo from config or use default
        const repoUrl = config.REPO || "https://github.com/3strox/x";
        const repoPath = repoUrl.replace('https://github.com/', '');
        const [owner, repo] = repoPath.split('/');
        
        if (!owner || !repo) {
            return reply("❌ Invalid repository URL in config");
        }

        // Fetch plugins folder
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/plugins`;
        const { data } = await axios.get(apiUrl);
        
        // Filter only JS files
        const plugins = data.filter(item => 
            item.type === 'file' && item.name.endsWith('.js')
        );
        
        if (plugins.length === 0) {
            return reply("❌ No plugins found in repository");
        }

        // Cache plugins
        pluginCache = plugins;

        // Format list
        let list = "📂 *Subzero Available Plugins:*\n\n";
        plugins.forEach((plugin, i) => {
            list += `${i+1}. ${plugin.name}\n`;
        });
        
        list += "\n💡 Use `.getplugin <number>` to download";
        
        await reply(list);
        
    } catch (error) {
        console.error("Listplugins error:", error);
        reply("❌ Failed to fetch plugins list");
    }
});

cmd({
    pattern: "getplugin",
    alias: ["plugin", "download"],
    react: "⬇️",
    desc: "Download a plugin",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) return reply("❌ Please specify plugin number or name\nExample: .getplugin 1");

        // Get plugin by number or name
        let plugin;
        const input = args[0];
        
        if (/^\d+$/.test(input)) {
            // Input is a number
            const num = parseInt(input) - 1;
            if (num < 0 || num >= pluginCache.length) {
                return reply("❌ Invalid plugin number");
            }
            plugin = pluginCache[num];
        } else {
            // Input is a name
            plugin = pluginCache.find(p => 
                p.name.toLowerCase() === input.toLowerCase()
            );
            if (!plugin) return reply("❌ Plugin not found");
        }

        // Download plugin
        const { data } = await axios.get(plugin.download_url, {
            responseType: 'arraybuffer'
        });

        // Send as document
        await conn.sendMessage(
            m.chat, 
            {
                document: data,
                fileName: plugin.name,
                mimetype: 'application/javascript'
            }, 
            { quoted: mek }
        );

        await reply(`✅ Successfully downloaded ${plugin.name}`);

    } catch (error) {
        console.error("Getplugin error:", error);
        reply("❌ Failed to download plugin");
    }
});

cmd({
  pattern: "fullpp",
  alias: ["setpp", "setdp", "pp"],
  react: "🖼️",
  desc: "Set full image as bot's profile picture",
  category: "tools",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    // Get bot's JID (two possible methods)
    const botJid = client.user?.id || (client.user.id.split(":")[0] + "@s.whatsapp.net");
    
    // Allow both bot owner and bot itself to use the command
    if (message.sender !== botJid && !isCreator) {
      return await client.sendMessage(from, {
        text: "*📛 This command can only be used by the bot or its owner.*"
      }, { quoted: message });
    }

    if (!message.quoted || !message.quoted.mtype || !message.quoted.mtype.includes("image")) {
      return await client.sendMessage(from, {
        text: "*⚠️ Please reply to an image to set as profile picture*"
      }, { quoted: message });
    }

    await client.sendMessage(from, {
      text: "*⏳ Processing image, please wait...*"
    }, { quoted: message });

    const imageBuffer = await message.quoted.download();
    const image = await Jimp.read(imageBuffer);

    // Image processing pipeline
    const blurredBg = image.clone().cover(640, 640).blur(10);
    const centeredImage = image.clone().contain(640, 640);
    blurredBg.composite(centeredImage, 0, 0);
    const finalImage = await blurredBg.getBufferAsync(Jimp.MIME_JPEG);

    // Update profile picture
    await client.updateProfilePicture(botJid, finalImage);

    await client.sendMessage(from, {
      text: "*✅ User profile picture updated successfully!*"
    }, { quoted: message });

  } catch (error) {
    console.error("fullpp Error:", error);
    await client.sendMessage(from, {
      text: `*❌ Error updating profile picture:*\n${error.message}`
    }, { quoted: message });
  }
});

// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});
// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast2",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");
    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());
    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }
    reply("📢 Message broadcasted to all groups.");
});
// 3. Set Profile Picture

cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename,
}, async (conn, mek, m, { isOwner, isGroup, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    let target = "";
    if (isGroup) {
        if (quoted) {
            target = quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else {
            return reply("❌ In a group, please reply to or mention the user you want to block.");
        }
    } else {
        target = m.chat;
    }
    
    try {
        await conn.updateBlockStatus(target, 'block');
        reply(`🚫 User @${target.split('@')[0]} blocked successfully.`, null, { mentions: [target] });
    } catch (error) {
        console.error("Error blocking user:", error);
        reply(`❌ Error blocking user: ${error.message}`);
    }
});
// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");
    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});
// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    alias: ["clear"],
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

cmd({
    pattern: "jid",
    desc: "Get the bot's JID.",
    category: "owner",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply(`🤖 *Bot JID:* ${conn.user.jid}`);
});
// 8. Group JIDs List
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
});

