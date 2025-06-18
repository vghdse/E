
const config = require('../config')
const {cmd , commands} = require('../command')
const axios = require('axios');
const moment = require('moment-timezone');
const fs = require("fs");
const path = require("path");
const { sleep } = require('../lib/functions');
const { exec } = require('child_process');





const OWNER_PATH = path.join(__dirname, "../lib/sudo.json");

// Ensure the sudo.json file exists
const ensureOwnerFile = () => {
  if (!fs.existsSync(OWNER_PATH)) {
    fs.writeFileSync(OWNER_PATH, JSON.stringify([]));
  }
};





// Command: Add a temporary owner
cmd({
    pattern: "setsudo",
    alias: ["addsudo", "addowner"],
    desc: "Add a temporary owner",
    category: "owner",
    react: "😇",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗This Command Can Only Be Used By My Owner!_");

        // Identify the target user
        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("❌ Please provide a number or tag/reply a user.");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));

        if (owners.includes(target)) {
            return reply("❌ This user is already a temporary owner.");
        }

        owners.push(target);
        const uniqueOwners = [...new Set(owners)];
        fs.writeFileSync(OWNER_PATH, JSON.stringify(uniqueOwners, null, 2));

        const successMsg = "✅ Successfully Added User As Temporary Owner";
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: successMsg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// Command: Remove a temporary owner
cmd({
    pattern: "delsudo",
    alias: ["delowner", "deletesudo"],
    desc: "Remove a temporary owner",
    category: "owner",
    react: "🫩",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗This Command Can Only Be Used By My Owner!_");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("❌ Please provide a number or tag/reply a user.");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));

        if (!owners.includes(target)) {
            return reply("❌ User not found in owner list.");
        }

        const updated = owners.filter(x => x !== target);
        fs.writeFileSync(OWNER_PATH, JSON.stringify(updated, null, 2));

        const successMsg = "✅ Successfully Removed User As Temporary Owner";
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: successMsg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// Command: List all temporary owners
cmd({
    pattern: "listsudo",
    alias: ["listowner"],
    desc: "List all temporary owners",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗This Command Can Only Be Used By My Owner!_");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));
        owners = [...new Set(owners)];

        if (owners.length === 0) {
            return reply("❌ No temporary owners found.");
        }

        let listMessage = "`🤴 List of Sudo Owners:`\n\n";
        owners.forEach((owner, i) => {
            listMessage += `${i + 1}. ${owner.replace("@s.whatsapp.net", "")}\n`;
        });

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: listMessage
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

/*const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");

const OWNER_PATH = path.join(__dirname, "../lib/sudo.json");

// مطمئن شو فایل owner.json هست
const ensureOwnerFile = () => {
  if (!fs.existsSync(OWNER_PATH)) {
    fs.writeFileSync(OWNER_PATH, JSON.stringify([]));
  }
};

// افزودن شماره به owner.json
cmd({
    pattern: "setsudo",
    alias: ["addsudo","addowner"],
    desc: "Add a temporary owner",
    category: "owner",
    react: "😇",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply, isOwner }) => {
    try {
        if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

        // پیدا کردن هدف (شماره یا کاربر)
        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        // اگر هیچ هدفی وارد نشده بود، پیام خطا بده
        if (!target) return reply("❌ Please provide a number or tag/reply a user.");

        let own = JSON.parse(fs.readFileSync("./lib/sudo.json", "utf-8"));

        if (own.includes(target)) {
            return reply("❌ This user is already a temporary owner.");
        }

        own.push(target);
        const uniqueOwners = [...new Set(own)];
        fs.writeFileSync("./lib/sudo.json", JSON.stringify(uniqueOwners, null, 2));

        const dec = "✅ Successfully Added User As Temporary Owner";
        await conn.sendMessage(from, {  // استفاده از await در اینجا درست است
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: dec
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// حذف شماره از owner.json
cmd({
    pattern: "delsudo",
    alias: ["delowner","deletesudo"],
    desc: "Remove a temporary owner",
    category: "owner",
    react: "🫩",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply, isOwner }) => {
    try {
        if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        // اگر هیچ هدفی وارد نشده بود، پیام خطا بده
        if (!target) return reply("❌ Please provide a number or tag/reply a user.");

        let own = JSON.parse(fs.readFileSync("./lib/sudo.json", "utf-8"));

        if (!own.includes(target)) {
            return reply("❌ User not found in owner list.");
        }

        const updated = own.filter(x => x !== target);
        fs.writeFileSync("./lib/sudo.json", JSON.stringify(updated, null, 2));

        const dec = "✅ Successfully Removed User As Temporary Owner";
        await conn.sendMessage(from, {  // استفاده از await در اینجا درست است
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: dec
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

cmd({
    pattern: "listsudo",
    alias: ["listowner],
    desc: "List all temporary owners",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { from, args, isCreator, reply, isOwner }) => {
    try {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");
        // Check if the user is the owner
        if (!isOwner) {
            return reply("❌ You are not the bot owner.");
        }

        // Read the owner list from the file and remove duplicates
        let own = JSON.parse(fs.readFileSync("./lib/sudo.json", "utf-8"));
        own = [...new Set(own)]; // Remove duplicates

        // If no temporary owners exist
        if (own.length === 0) {
            return reply("❌ No temporary owners found.");
        }

        // Create the message with owner list
        let listMessage = "\`🤴 List of Sudo Owners:\`\n\n";
        own.forEach((owner, index) => {
            listMessage += `${index + 1}. ${owner.replace("@s.whatsapp.net", "")}\n`;
        });

        // Send the message with an image and formatted caption
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: listMessage
        }, { quoted: mek });
    } catch (err) {
        // Handle errors
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});


*/

cmd({
    pattern: "subzeroinc",
    alias: ["about","creator","mrfrank","developer","support","channel","group"],
    desc: "All About The Bot & Dev",
    category: "fun",
    react: "🧠",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const familyList = `  *⟣────────────⟢*
    *[ • Developer: Darrell M ]*
 *⟣────────────•⟢*
              
      *⟣┈───────────────⟢*
            🗂️ *REPOSITORY*
       https://github.com/mrfrankofcc/SUBZERO-MD
      
      *⟣┈───────────────•*
            🔗 *PROJECT NAME*
           SUBZERO-MD W.A BOT
      
      *⟣┈───────────────•*
             👨‍💻 *DEVELOPER*
     https://github.com/mrfrankofcc
       
      *⟣┈───────────────•*
             🧮 *RELEASE DATE*
            15 December 2024 
       
      *⟣┈───────────────•*
            📩 *SUPPORT GROUP* 
      https://chat.whatsapp.com/InsR5qk3cBsG2781A6uxcO
    
      *⟣┈───────────────•*
           🎀 *SUPPORT CHANNEL*
      https://whatsapp.com/channel/0029VagQEmB002T7MWo3Sj1D
        
        ◦🪄  Hit Me Here :wa.me/263719647303* 
      *⟝┈───────────────⟞*
        *⟣────────────•⟢*
    `;

    try {
        // Envoi de la réponse avec l'image et la liste de la famille
        await conn.sendMessage(m.chat, {
            image: { url: "https://i.postimg.cc/FHN6KVzM/In-Shot-20241227-205053424.jpg" },
            caption: familyList.trim()
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the family list. Please try again.*");
    }
});

cmd({
    pattern: "restart",
    alias: ["reboot"],
    desc: "Restart the bot system",
    category: "system",
    react: "🔄",
    filename: __filename,
    ownerOnly: true
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Send initial message
        await reply("🔄 *Bot Restart Initiated*\n\nRestarting in 3 seconds...");
        await sleep(1000);
        
        // Simple countdown
        await reply("🔃 Restarting in 2...");
        await sleep(1000);
        
        await reply("🔃 Restarting in 1...");
        await sleep(1000);
        
        // Final message
        await reply("⚡ *Restarting Now!*\n\nPlease wait 15-20 seconds...");

        // Execute restart
        exec("pm2 restart all", (error) => {
            if (error) {
                console.error("Restart failed:", error);
                reply(`❌ Restart failed:\n${error.message}\n\nTry: pm2 restart all`);
            }
        });

    } catch (e) {
        console.error("Restart error:", e);
        reply(`⚠️ Error: ${e.message}\n\nManual restart required.`);
    }
});




cmd({
  pattern: 'script',
  alias: ['sc', 'subzero', 'repo'],
  react: '❄️',
  desc: 'Show SubZero MD script information',
  category: 'info',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    await reply('⏳ Fetching SubZero repository data...');

    // Fetch from BK9 API
    const { data } = await axios.get(`https://bk9.fun/stalk/githubrepo?url=${config.REPO}`, {
  timeout: 10000
});

    if (!data?.status || !data?.BK9) throw new Error('Invalid API response');

    const repo = data.BK9;
    const owner = repo.owner;
    const zipUrl = `${repo.html_url}/archive/refs/heads/${repo.default_branch}.zip`;
    const createdAt = new Date(repo.created_at).toLocaleDateString();
    const updatedAt = new Date(repo.updated_at).toLocaleDateString();

    // Format message with all API data
    const message = `
❄️ \`SUBZERO-MD SCRIPT\` ❄️

📂 *Repository:* ${repo.name}
👤 *Developer:* ${owner.login} (${owner.type})
🔗 *URL:* ${repo.html_url}

⭐ *Stars:* ${repo.stargazers_count}
🍴 *Forks:* ${repo.forks_count}
👀 *Watchers:* ${repo.watchers_count}
⚠️ *Issues:* ${repo.open_issues_count}
💻 *Language:* ${repo.language || 'Not specified'}

📅 *Created:* ${createdAt}
🔄 *Updated:* ${updatedAt}
🏷️ *License:* ${repo.license?.name || 'None'}

📥 \`Download:\`
▸ ZIP Download(${zipUrl})
▸ \`git clone ${repo.clone_url}\`

✨ \`Features:\`
• Multi-Device Baileys
• ${repo.size} KB of awesome features
• Plugin system
• ${repo.has_wiki ? 'Wiki available' : 'No wiki'}
• ${repo.archived ? '⚠️ ARCHIVED' : '🚀 Active development'}


• ${repo.has_downloads ? 'Git required' : ''}

*Type* \`.menu\` *for more info*
    `;

    await conn.sendMessage(m.chat, {
      image: { url: owner.avatar_url },
      caption: message,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true
      }
    }, { quoted: m });

  } catch (error) {
    console.error('Script command error:', error);
    reply(`*⚠️ Error fetching script info!*\n\nBasic Details:\n▸ Repo: https://github.com/itzfrakaumbadev/SUBZERO\n▸ ZIP: https://github.com/itzfrakaumbadev/SUBZERO/archive/main.zip\n\n_Error: ${error.message}_`);
  }
});




cmd({
  pattern: 'install',
  alias: ['addplugin','installplugin'],
  react: '📥',
  desc: 'Install plugins from Gist URLs',
  category: 'plugin',
  filename: __filename,
  use: '<gist_url>',
  owner: true
}, async (conn, mek, m, { reply, args }) => {
  try {
    if (!args[0]) return reply(`❌ Please provide a Gist URL\nExample: *${config.PREFIX}install https://gist.github.com/username/gistid*`);

    const url = args[0];
    const gistId = url.match(/(?:\/|gist\.github\.com\/)([a-fA-F0-9]+)/)?.[1];
    if (!gistId) return reply('❌ Invalid Gist URL format');

    // Fetch Gist data
    const { data } = await axios.get(`https://api.github.com/gists/${gistId}`);
    
    // Find first JavaScript file
    const jsFile = Object.values(data.files).find(f => f.filename.endsWith('.js'));
    if (!jsFile) return reply('❌ No JavaScript file found in Gist');

    // Create plugins directory if it doesn't exist
    const pluginsDir = path.join(__dirname, '..', 'plugins');
    if (!fs.existsSync(pluginsDir)) {
      fs.mkdirSync(pluginsDir);
    }

    // Check if plugin already exists
    const pluginPath = path.join(pluginsDir, jsFile.filename);
    if (fs.existsSync(pluginPath)) {
      return reply(`⚠️ Plugin *${jsFile.filename}* already exists!\nUse *${config.PREFIX}listplugins* to see plugin list`);
    }

    // Save the file
    await fs.promises.writeFile(pluginPath, jsFile.content);
    
    reply(`✅ Plugin *${jsFile.filename}* installed successfully!\n\nUse *${config.PREFIX}restart* to load it`);

  } catch (error) {
    console.error('Install error:', error);
    reply(`❌ Failed to install plugin:\n${error.message}\n\nMake sure:\n1. Gist exists and is public\n2. URL is correct`);
  }
});

// Plugin List Command
cmd({
  pattern: 'pluginlist',
  alias: ['listplugins'],
  react: '️✳️',
  desc: 'List installed plugins',
  category: 'plugin',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const pluginsDir = path.join(__dirname, '..', 'plugins');
    const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'));
    
    if (!files.length) return reply('No plugins installed');
    
    let msg = '📋 *Subzero Installed Plugins*:\n\n';
    files.forEach((file, i) => {
      msg += `${i+1}. ${file}\n`;
    });
    
    msg += `\nTotal: ${files.length} plugins`;
    reply(msg);
  } catch (error) {
    reply('❌ Failed to list plugins');
  }
});

// Plugin Delete Command
cmd({
  pattern: 'deleteplugin',
  alias: ['removeplugin', 'uninstall'],
  react: '🗑️',
  desc: 'Delete an installed plugin',
  category: 'plugin',
  filename: __filename,
  use: '<plugin_name>',
  owner: true
}, async (conn, mek, m, { reply, args }) => {
  try {
    if (!args[0]) return reply(`❌ Please specify a plugin name\nExample: *${config.PREFIX}deleteplugin example.js*`);

    let pluginName = args[0];
    if (!pluginName.endsWith('.js')) pluginName += '.js';

    const pluginsDir = path.join(__dirname, '..', 'plugins');
    const pluginPath = path.join(pluginsDir, pluginName);

    if (!fs.existsSync(pluginPath)) {
      return reply(`❌ Plugin *${pluginName}* not found\nUse *${config.PREFIX}pluginlist* to see installed plugins`);
    }

    fs.unlinkSync(pluginPath);
    reply(`✅ Plugin *${pluginName}* deleted successfully!\n\nUse *${config.PREFIX}restart* to apply changes`);

  } catch (error) {
    console.error('Delete plugin error:', error);
    reply(`❌ Failed to delete plugin:\n${error.message}`);
  }
});


cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url: 'https://i.postimg.cc/Tw01QQgN/White-and-Green-Simple-Professional-Business-Project-Presentation-3.jpg' }, // Image URL from your request
            caption: `╭━━〔 *SUBZERO MD* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃ 𝐇𝐄𝐑𝐄 𝐈𝐒 𝐌𝐘 𝐃𝐀𝐃𝐃𝐘 !
┃◈┃• *Name* - ${ownerName}
┃◈┃• *Number* ${ownerNumber}
┃◈┃
┃◈└───────────┈⊷
╰──────────────┈⊷
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜰʀᴀɴᴋ`, // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: 'Mr Frank OFC (🇿🇼)',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

        // Send audio as per your request
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/qda847.m4a' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});

cmd({
    pattern: "ban",
    alias: ["blockuser", "addban"],
    desc: "Ban a user from using the bot",
    category: "owner",
    react: "⛔",
    filename: __filename
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗Only the bot owner can use this command!_");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("❌ Please provide a number or tag/reply a user.");

        let banned = JSON.parse(fs.readFileSync("./lib/ban.json", "utf-8"));

        if (banned.includes(target)) {
            return reply("❌ This user is already banned.");
        }

        banned.push(target);
        fs.writeFileSync("./lib/ban.json", JSON.stringify([...new Set(banned)], null, 2));

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: `⛔ User has been banned from using the bot.`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

cmd({
    pattern: "unban",
    alias: ["removeban"],
    desc: "Unban a user",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗Only the bot owner can use this command!_");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("❌ Please provide a number or tag/reply a user.");

        let banned = JSON.parse(fs.readFileSync("./lib/ban.json", "utf-8"));

        if (!banned.includes(target)) {
            return reply("❌ This user is not banned.");
        }

        const updated = banned.filter(u => u !== target);
        fs.writeFileSync("./lib/ban.json", JSON.stringify(updated, null, 2));

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: `✅ User has been unbanned.`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

cmd({
    pattern: "listban",
    alias: ["banlist", "bannedusers"],
    desc: "List all banned users",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗Only the bot owner can use this command!_");

        let banned = JSON.parse(fs.readFileSync("./lib/ban.json", "utf-8"));
        banned = [...new Set(banned)];

        if (banned.length === 0) return reply("✅ No banned users found.");

        let msg = "`⛔ Banned Users:`\n\n";
        banned.forEach((id, i) => {
            msg += `${i + 1}. ${id.replace("@s.whatsapp.net", "")}\n`;
        });

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/18il7k.jpg" },
            caption: msg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});


cmd({
    pattern: "recentplugins",
    alias: ["recentplugs", "newplugins", "whatsnew"],
    react: "🆕",
    desc: "List plugins updated in the last 2 hours",
    category: "info",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Validate config.REPO
        if (!config.REPO) throw new Error('Repository URL not configured in config.REPO');
        
        // Extract repo path from config.REPO
        const repoPath = config.REPO.replace('https://github.com/', '').replace(/\/$/, '');
        const [owner, repo] = repoPath.split('/');
        
        if (!owner || !repo) throw new Error('Invalid repository URL format in config.REPO');

        const pluginsFolder = 'plugins';
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pluginsFolder}`;

        // Fetch plugins
        const { data: plugins } = await axios.get(apiUrl);
        const pluginFiles = plugins.filter(item => item.type === 'file' && item.name.endsWith('.js'));

        if (pluginFiles.length === 0) {
            return reply("❌ No plugin files found in the repository");
        }

        // Check recent updates
        const recentUpdates = [];
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

        for (const plugin of pluginFiles) {
            try {
                const { data: [latestCommit] } = await axios.get(
                    `https://api.github.com/repos/${owner}/${repo}/commits`,
                    { params: { path: plugin.path, per_page: 1 } }
                );
                
                if (latestCommit && new Date(latestCommit.commit.author.date) > twoHoursAgo) {
                    recentUpdates.push({
                        name: plugin.name.replace('.js', ''),
                        updated: moment(latestCommit.commit.author.date).fromNow(),
                        author: latestCommit.author?.login || 'Unknown'
                    });
                }
            } catch (e) {
                console.error(`Error checking ${plugin.name}:`, e.message);
            }
        }

        // Format response
        if (recentUpdates.length === 0) {
            return reply("🕒 No plugins updated in the last 2 hours");
        }

        let message = `🆕 *Recently Updated Plugins* 🆕\n`;
        message += `⏳ *Last 2 Hours*\n\n`;
        message += `📂 *Repository:* ${config.REPO}\n\n`;
        
        recentUpdates.forEach((plugin, index) => {
            message += `${index + 1}. *${plugin.name}*\n`;
            message += `   👤 Updated by: ${plugin.author}\n`;
            message += `   ⏰ ${plugin.updated}\n\n`;
        });

        message += `\n💡 *Tip:* Use .getplugin <name> to download updates`;
        
        await conn.sendMessage(from, {
            text: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: config.BOT_NAME ? `${config.BOT_NAME} Updates` : 'Plugin Updates',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Recent plugins error:", error);
        reply(`❌ Error: ${error.message}\n\nPlease ensure:\n1. config.REPO is properly set\n2. The repository is public\n3. GitHub API is available`);
    }
});


cmd({
    pattern: "test",
    desc: "Check bot online or no.",
    category: "main",
    react: "👋",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
//Quoted Type By Supun Fernando 
 const SupunFvoice = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) 
},
"message": {
"audioMessage": {
"url": "https://mmg.whatsapp.net/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172&mms3=true",
"mimetype": "audio/mp4",
"fileSha256": "oZeGy+La3ZfKAnQ1epm3rbm1IXH8UQy7NrKUK3aQfyo=",
"fileLength": "1067401",
"seconds": 60,
"ptt": true,
"mediaKey": "PeyVe3/+2nyDoHIsAfeWPGJlgRt34z1uLcV3Mh7Bmfg=",
"fileEncSha256": "TLOKOAvB22qIfTNXnTdcmZppZiNY9pcw+BZtExSBkIE=",
"directPath": "/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172",
"mediaKeyTimestamp": "1684161893"
  }
 }
}

    
let des = `*👋 Hello ${pushname}*`
return await conn.sendMessage(from,{
    image: {url: `https://files.catbox.moe/703kuc.jpg`},
    caption: des
},{quoted: SupunFvoice})

// {quoted: mek} ඔයාලගෙ ඔතන 👈 ඔහොම ඇත්තෙ එක උඩ විදිහට හදා ගන්න..👆

}catch(e){
console.log(e)
reply(`${e}`)
}
})

