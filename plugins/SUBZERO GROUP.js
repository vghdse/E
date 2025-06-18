const { cmd } = require('../command');
// const { getBuffer, fetchJson } = require('../lib/functions');
const config = require('../config');
const fs = require('fs');
const path = require('path');


const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const googleTTS = require('google-tts-api')

cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "🌍",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `> *SUBZERO MD TRANSLATION*

> 🔤 *Original*: ${textToTranslate}

> 🔠 *Translated*: ${translation}

> 🌐 *Language*: ${targetLang.toUpperCase()}`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred data while translating the your text. Please try again later🤕");
    }
});

//____________________________TTS___________________________
cmd({
    pattern: "tts",
    desc: "download songs",
    category: "download",
    react: "🚀",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Need some text.")
    const url = googleTTS.getAudioUrl(q, {
  lang: 'en-US',
  slow: false,
  host: 'https://translate.google.com',
})
await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek })
    }catch(a){
reply(`${a}`)
}
})



cmd({
    pattern: "tagadmins",
    react: "👑",
    alias: ["gc_tagadmins"],
    desc: "To Tag all Admins of the Group",
    category: "group",
    use: '.tagadmins [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        
        const botOwner = conn.user.id.split(":")[0]; // Extract bot owner's number
        const senderJid = senderNumber + "@s.whatsapp.net";

        // Ensure group metadata is fetched properly
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let admins = await getGroupAdmins(participants);
        let totalAdmins = admins ? admins.length : 0;
        if (totalAdmins === 0) return reply("❌ No admins found in this group.");

        let emojis = ['👑', '⚡', '🌟', '✨', '🎖️', '💎', '🔱', '🛡️', '🚀', '🏆'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Proper message extraction
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "Attention Admins"; // Default message

        let teks = `▢ Group : *${groupName}*\n▢ Admins : *${totalAdmins}*\n▢ Message: *${message}*\n\n┌───⊷ *ADMIN MENTIONS*\n`;

        for (let admin of admins) {
            if (!admin) continue; // Prevent undefined errors
            teks += `${randomEmoji} @${admin.split('@')[0]}\n`;
        }

        teks += "└──⟢ SUBZERO MD ⟣──";

        conn.sendMessage(from, { text: teks, mentions: admins }, { quoted: mek });

    } catch (e) {
        console.error("TagAdmins Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});



cmd({
    pattern: "vcf",
    desc: "Generate VCF contact file for all group members",
    category: "tools",
    filename: __filename,
    groupOnly: true,
    usage: `${config.PREFIX}vcf`
}, async (conn, mek, m, { reply }) => {
    try {
        // Get group metadata
        const groupMetadata = await conn.groupMetadata(m.chat);
        const participants = groupMetadata.participants || [];
        
        // Validate group size
        if (participants.length < 2) {
            return reply("❌ Group must have at least 2 members");
        }
        if (participants.length > 1000) {
            return reply("❌ Group is too large (max 1000 members)");
        }

        // Generate VCF content
        let vcfContent = '';
        participants.forEach(participant => {
            const phoneNumber = participant.id.split('@')[0];
            const displayName = participant.notify || `User_${phoneNumber}`;
            
            vcfContent += `BEGIN:VCARD\n` +
                          `VERSION:3.0\n` +
                          `FN:${displayName}\n` +
                          `TEL;TYPE=CELL:+${phoneNumber}\n` +
                          `NOTE:From ${groupMetadata.subject}\n` +
                          `END:VCARD\n\n`;
        });

        // Create temp file
        const sanitizedGroupName = groupMetadata.subject.replace(/[^\w]/g, '_');
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
        
        const vcfPath = path.join(tempDir, `${sanitizedGroupName}_${Date.now()}.vcf`);
        fs.writeFileSync(vcfPath, vcfContent);

        // Send VCF file
        await conn.sendMessage(m.chat, {
            document: { url: vcfPath },
            mimetype: 'text/vcard',
            fileName: `${sanitizedGroupName}_contacts.vcf`,
            caption: `📇 *Group Contacts*\n\n` +
                     `• Group: ${groupMetadata.subject}\n` +
                     `• Members: ${participants.length}\n` +
                     `• Generated: ${new Date().toLocaleString()}`
        }, { quoted: m });

        // Cleanup
        fs.unlinkSync(vcfPath);

    } catch (error) {
        console.error('VCF Error:', error);
        reply("❌ Failed to generate VCF file");
    }
});










// Command to list all pending group join requests
cmd({
    pattern: "requestlist",
    alias: "joinrequests",
    desc: "Shows pending group join requests",
    category: "group",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        if (!isGroup) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ This command can only be used in groups.");
        }
        if (!isAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ Only group admins can use this command.");
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ I need to be an admin to view join requests.");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, {
                react: { text: 'ℹ️', key: m.key }
            });
            return reply("ℹ️ No pending join requests.");
        }

        let text = `📋 *Pending Join Requests (${requests.length})*\n\n`;
        requests.forEach((user, i) => {
            text += `${i+1}. @${user.jid.split('@')[0]}\n`;
        });

        await conn.sendMessage(from, {
            react: { text: '✅', key: m.key }
        });
        return reply(text, { mentions: requests.map(u => u.jid) });
    } catch (error) {
        console.error("Request list error:", error);
        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });
        return reply("❌ Failed to fetch join requests.");
    }
});

// Command to accept all pending join requests
cmd({
    pattern: "acceptall",
    desc: "Accepts all pending group join requests",
    category: "group",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        if (!isGroup) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ This command can only be used in groups.");
        }
        if (!isAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ Only group admins can use this command.");
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ I need to be an admin to accept join requests.");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, {
                react: { text: 'ℹ️', key: m.key }
            });
            return reply("ℹ️ No pending join requests to accept.");
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "approve");
        
        await conn.sendMessage(from, {
            react: { text: '👍', key: m.key }
        });
        return reply(`✅ Successfully accepted ${requests.length} join requests.`);
    } catch (error) {
        console.error("Accept all error:", error);
        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });
        return reply("❌ Failed to accept join requests.");
    }
});

// Command to reject all pending join requests
cmd({
    pattern: "rejectall",
    desc: "Rejects all pending group join requests",
    category: "group",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        if (!isGroup) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ This command can only be used in groups.");
        }
        if (!isAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ Only group admins can use this command.");
        }
        if (!isBotAdmins) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ I need to be an admin to reject join requests.");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (requests.length === 0) {
            await conn.sendMessage(from, {
                react: { text: 'ℹ️', key: m.key }
            });
            return reply("ℹ️ No pending join requests to reject.");
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "reject");
        
        await conn.sendMessage(from, {
            react: { text: '👎', key: m.key }
        });
        return reply(`✅ Successfully rejected ${requests.length} join requests.`);
    } catch (error) {
        console.error("Reject all error:", error);
        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });
        return reply("❌ Failed to reject join requests.");
    }
});




cmd({
    pattern: "person",
    react: "👤",
    alias: ["userinfo", "profile"],
    desc: "Get complete user profile information",
    category: "utility",
    use: '.person [@tag or reply]',
    filename: __filename
},
async (conn, mek, m, { from, sender, isGroup, reply, quoted, participants }) => {
    try {
        // 1. DETERMINE TARGET USER
        let userJid = quoted?.sender || 
                     mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                     sender;

        // 2. VERIFY USER EXISTS
        const [user] = await conn.onWhatsApp(userJid).catch(() => []);
        if (!user?.exists) return reply("❌ User not found on WhatsApp");

        // 3. GET PROFILE PICTURE
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(userJid, 'image');
        } catch {
            ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
        }

        // 4. GET NAME (MULTI-SOURCE FALLBACK)
        let userName = userJid.split('@')[0];
        try {
            // Try group participant info first
            if (isGroup) {
                const member = participants.find(p => p.id === userJid);
                if (member?.notify) userName = member.notify;
            }
            
            // Try contact DB
            if (userName === userJid.split('@')[0] && conn.contactDB) {
                const contact = await conn.contactDB.get(userJid).catch(() => null);
                if (contact?.name) userName = contact.name;
            }
            
            // Try presence as final fallback
            if (userName === userJid.split('@')[0]) {
                const presence = await conn.presenceSubscribe(userJid).catch(() => null);
                if (presence?.pushname) userName = presence.pushname;
            }
        } catch (e) {
            console.log("Name fetch error:", e);
        }

        // 5. GET BIO/ABOUT
        let bio = {};
        try {
            // Try personal status
            const statusData = await conn.fetchStatus(userJid).catch(() => null);
            if (statusData?.status) {
                bio = {
                    text: statusData.status,
                    type: "Personal",
                    updated: statusData.setAt ? new Date(statusData.setAt * 1000) : null
                };
            } else {
                // Try business profile
                const businessProfile = await conn.getBusinessProfile(userJid).catch(() => null);
                if (businessProfile?.description) {
                    bio = {
                        text: businessProfile.description,
                        type: "Business",
                        updated: null
                    };
                }
            }
        } catch (e) {
            console.log("Bio fetch error:", e);
        }

        // 6. GET GROUP ROLE
        let groupRole = "";
        if (isGroup) {
            const participant = participants.find(p => p.id === userJid);
            groupRole = participant?.admin ? "👑 Admin" : "👥 Member";
        }

        // 7. FORMAT OUTPUT WITH ENHANCED VISUALS
        const formattedBio = bio.text ? 
            `┌─ 📝 *About*\n` +
            `│  ${bio.text}\n` +
            `└─ 🏷️ ${bio.type} Bio${bio.updated ? ` | ⏳ ${bio.updated.toLocaleString()}` : ''}` : 
            "└─ ❌ No bio available";

        const accountTypeEmoji = user.isBusiness ? "💼" : user.isEnterprise ? "🏢" : "👤";
        const accountTypeText = user.isBusiness ? "Business" : user.isEnterprise ? "Enterprise" : "Personal";

        const userInfo = `
╭─❖ *USER PROFILE* ❖─
│
│  � *Profile Picture* 👇
│
├─❖ *BASIC INFO* ❖─
│  📛 *Name*: ${userName}
│  🔢 *Number*: ${userJid.replace(/@.+/, '')}
│  ${accountTypeEmoji} *Account Type*: ${accountTypeText}
│
├─❖ *BIOGRAPHY* ❖─
${formattedBio.includes('┌─') ? formattedBio : `│  ${formattedBio}`}
│
├─❖ *ACCOUNT STATUS* ❖─
│  ✅ *Registered*: ${user.isUser ? "Yes" : "No"}
│  🛡️ *Verified*: ${user.verifiedName ? "✅ Verified" : "❌ Not verified"}
${isGroup ? `│  � *Group Role*: ${groupRole}\n` : ''}
╰───────────────────
`.trim();

        // 8. SEND RESULT WITH BETTER FORMATTING
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: userInfo,
            mentions: [userJid]
        }, { quoted: mek });

    } catch (e) {
        console.error("Person command error:", e);
        reply(`❌ Error: ${e.message || "Failed to fetch profile"}`);
    }
});

cmd({
    pattern: "groupstats",
    alias: ["gstats"],
    desc: "Safe group analytics",
    category: "group",
    react: "📊",
    filename: __filename
}, async (conn, mek, m, { groupMetadata, reply }) => {
    try {
        if (!m.isGroup) return reply("❌ Group only command");

        // 1. Basic member count (no message scanning)
        const members = groupMetadata.participants;
        const stats = {
            total: members.length,
            admins: members.filter(p => p.isAdmin).length,
            users: members.filter(p => !p.isAdmin).length
        };

        // 2. Safe last seen approximation
        const activeMembers = members
            .filter(p => p.lastSeen && p.lastSeen > Date.now() - 7 * 86400 * 1000)
            .length;

        // 3. Generate report
        const analysis = [
            `👥 *Total Members:* ${stats.total}`,
            `👑 *Admins:* ${stats.admins}`,
            `👤 *Regular Users:* ${stats.users}`,
            `💬 *Recently Active:* ${activeMembers}`,
            `ℹ️ *Note:* For detailed stats, use .activemembers`
        ];

        await reply(`📊 *Group Stats*\n\n${analysis.join('\n')}`);

    } catch (error) {
        console.error('GroupStats Error:', error);
        reply("❌ Error generating stats. Try again later.");
    }
});


cmd({
  pattern: "delete",
  alias: ["del", "d"],
  react: "🗑️",
  desc: "Delete messages",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { reply, isGroup, isAdmins, isOwner }) => {
  try {
    if (!m.quoted) return reply("❌ Please reply to a message to delete it!");

    // For groups - check admin status
    if (isGroup && !isAdmins && !isOwner) {
      return reply("❌ You need admin rights to delete messages in groups!");
    }

    // Delete the quoted message
    const deleteParams = {
      remoteJid: m.chat,
      id: m.quoted.id,
      participant: m.quoted.sender,
      fromMe: m.quoted.fromMe // Preserve original ownership
    };

    await conn.sendMessage(m.chat, { delete: deleteParams });

    // Delete the command message (optional)
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: m.id
      }
    });

  } catch (e) {
    console.error('Delete error:', e);
    reply(`❌ Failed to delete message! ${e.message}`);
  }
})





cmd({
    pattern: "out",
    alias: ["kick2", "🦶"],
    desc: "Removes all members with specific country code from the group",
    category: "admin",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, groupMetadata, senderNumber
}) => {
    // Check if the command is used in a group
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    // Get the bot owner's number dynamically from conn.user.id
    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) {
        return reply("❌ Only the bot owner can use this command.");
    }

    // Check if the bot is an admin
    if (!isBotAdmins) return reply("❌ I need to be an admin to use this command.");

    if (!q) return reply("❌ Please provide a country code. Example: .out 263");

    const countryCode = q.trim();
    if (!/^\d+$/.test(countryCode)) {
        return reply("❌ Invalid country code. Please provide only numbers (e.g., 263 for +263 numbers)");
    }

    try {
        const participants = await groupMetadata.participants;
        const targets = participants.filter(
            participant => participant.id.startsWith(countryCode) && 
                         !participant.admin // Don't remove admins
        );

        if (targets.length === 0) {
            return reply(`❌ No members found with country code +${countryCode}`);
        }

        const jids = targets.map(p => p.id);
        await conn.groupParticipantsUpdate(from, jids, "remove");
        
        reply(`✅ Successfully removed ${targets.length} members with country code +${countryCode}`);
    } catch (error) {
        console.error("Out command error:", error);
        reply("❌ Failed to remove members. Error: " + error.message);
    }
});


// ==========================
// Required Modules
// ==========================

// ==========================
// Helper: Custom Message Sender
// ==========================
const sendCustomMessage = async (conn, from, message, mek, m) => {
    await conn.sendMessage(from, {
        image: { url: `https://files.catbox.moe/18il7k.jpg` },
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
}


// ==========================
// Leave Group Command
// ==========================
cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc","exit"],
    desc: "Leave the group",
    react: "👋",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, senderNumber }) => {
    try {
        if (!isGroup) {
            return await sendCustomMessage(conn, from, "This command can only be used in groups.", mek, m);
        }
        const botOwner = conn.user.id.split(":")[0]; 
        if (senderNumber !== botOwner) {
            return await sendCustomMessage(conn, from, "Only the bot owner can use this command.", mek, m);
        }
        await sendCustomMessage(conn, from, "Leaving group...", mek, m);
        await sleep(1500);
        await conn.groupLeave(from);
        await sendCustomMessage(conn, from, "Goodbye! 👋", mek, m);
    } catch (e) {
        console.error(e);
        await sendCustomMessage(conn, from, `❌ Error: ${e}`, mek, m);
    }
});


// ==========================
// Add Member Command
// ==========================
cmd({
    pattern: "add",
    alias: ["a", "invite"],
    desc: "Adds a member to the group",
    category: "admin",
    react: "➕",
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, isBotAdmins, senderNumber }) => {
    if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) {
        return await sendCustomMessage(conn, from, "❌ Only the bot owner can use this command.", mek, m);
    }
    if (!isBotAdmins) return await sendCustomMessage(conn, from, "❌ I need to be an admin to use this command.", mek, m);
    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else if (q && /^\d+$/.test(q)) {
        number = q;
    } else {
        return await sendCustomMessage(conn, from, "❌ Please reply to a message, mention a user, or provide a number to add.", mek, m);
    }
    const jid = number + "@s.whatsapp.net";
    try {
        await conn.groupParticipantsUpdate(from, [jid], "add");
        await sendCustomMessage(conn, from, `✅ Successfully added @${number}`, mek, m);
    } catch (error) {
        console.error("Add command error:", error);
        await sendCustomMessage(conn, from, "❌ Failed to add the member.", mek, m);
    }
});


// ==========================
// Remove Member (Kick) Command
// ==========================
cmd({
    pattern: "remove",
    alias: ["kick", "k", "out"],
    desc: "Removes a member from the group",
    category: "admin",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, isBotAdmins, senderNumber }) => {
    if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) {
        return await sendCustomMessage(conn, from, "❌ Only the bot owner can use this command.", mek, m);
    }
    if (!isBotAdmins) return await sendCustomMessage(conn, from, "❌ I need to be an admin to use this command.", mek, m);
    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else {
        return await sendCustomMessage(conn, from, "❌ Please reply to a message or mention a user to remove.", mek, m);
    }
    const jid = number + "@s.whatsapp.net";
    try {
        await conn.groupParticipantsUpdate(from, [jid], "remove");
        await sendCustomMessage(conn, from, `✅ Successfully removed @${number}`, mek, m);
    } catch (error) {
        console.error("Remove command error:", error);
        await sendCustomMessage(conn, from, "❌ Failed to remove the member.", mek, m);
    }
});


// ==========================
// Promote Member Command
// ==========================
cmd({
    pattern: "promote",
    alias: ["p", "admin", "makeadmin"],
    desc: "Promotes a member to group admin",
    category: "admin",
    react: "🤴",
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, senderNumber, botNumber, isAdmins, isBotAdmins }) => {
    if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
    if (!isAdmins) return await sendCustomMessage(conn, from, "❌ Only group admins can use this command.", mek, m);
    if (!isBotAdmins) return await sendCustomMessage(conn, from, "❌ I need to be an admin to use this command.", mek, m);
    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else {
        return await sendCustomMessage(conn, from, "❌ Please reply to a message or provide a number to promote.", mek, m);
    }
    if (number === botNumber) return await sendCustomMessage(conn, from, "❌ The bot cannot promote itself.", mek, m);
    const jid = number + "@s.whatsapp.net";
    try {
        await conn.groupParticipantsUpdate(from, [jid], "promote");
        await sendCustomMessage(conn, from, `✅ Successfully promoted @${number} to admin.`, mek, m);
    } catch (error) {
        console.error("Promote command error:", error);
        await sendCustomMessage(conn, from, "❌ Failed to promote the member.", mek, m);
    }
});


// ==========================
// Demote Admin Command
// ==========================
cmd({
    pattern: "demote",
    alias: ["d", "dismiss", "removeadmin"],
    desc: "Demotes a group admin to a normal member",
    category: "admin",
    react: "🙅‍♂",
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, senderNumber, botNumber, isAdmins, isBotAdmins }) => {
    if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
    if (!isAdmins) return await sendCustomMessage(conn, from, "❌ Only group admins can use this command.", mek, m);
    if (!isBotAdmins) return await sendCustomMessage(conn, from, "❌ I need to be an admin to use this command.", mek, m);
    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else {
        return await sendCustomMessage(conn, from, "❌ Please reply to a message or provide a number to demote.", mek, m);
    }
    if (number === botNumber) return await sendCustomMessage(conn, from, "❌ The bot cannot demote itself.", mek, m);
    const jid = number + "@s.whatsapp.net";
    try {
        await conn.groupParticipantsUpdate(from, [jid], "demote");
        await sendCustomMessage(conn, from, `✅ Successfully demoted @${number} to a normal member.`, mek, m);
    } catch (error) {
        console.error("Demote command error:", error);
        await sendCustomMessage(conn, from, "❌ Failed to demote the member.", mek, m);
    }
});


// ==========================
// Unmute Group Command
// ==========================
cmd({
    pattern: "unmute",
    alias: ["groupunmute","open","unlock"],
    react: "🔊",
    desc: "Unmute the group (Everyone can send messages).",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins }) => {
    try {
        if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
        if (!isAdmins) return await sendCustomMessage(conn, from, "❌ Only group admins can use this command.", mek, m);
        if (!isBotAdmins) return await sendCustomMessage(conn, from, "❌ I need to be an admin to unmute the group.", mek, m);
        await conn.groupSettingUpdate(from, "not_announcement");
        await sendCustomMessage(conn, from, "✅ Group has been unmuted. Everyone can send messages.", mek, m);
    } catch (e) {
        console.error("Error unmuting group:", e);
        await sendCustomMessage(conn, from, "❌ Failed to unmute the group. Please try again.", mek, m);
    }
});


// ==========================
// Close Group Immediately Command ("lockgc", "lock", "close")
// ==========================
cmd({
    pattern: "lockgc",
    alias: ["lock", "close", "mute","closegc"],
    react: "🔒",
    desc: "Immediately close the group chat (only admins can send messages).",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins }) => {
    try {
        if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
        if (!isAdmins) return await sendCustomMessage(conn, from, "❌ Only group admins can use this command.", mek, m);
        if (!isBotAdmins) return await sendCustomMessage(conn, from, "❌ I need to be an admin to close the group.", mek, m);
        // Immediately close group chat by updating settings to 'announcement'
        await conn.groupSettingUpdate(from, "announcement");
        await sendCustomMessage(conn, from, "✅ Group chat has been closed. Only admins can send messages.", mek, m);
    } catch (e) {
        console.error("Error closing group:", e);
        await sendCustomMessage(conn, from, "❌ Failed to close the group. Please try again.", mek, m);
    }
});

    
// ==========================
// Update Group Description Command
// ==========================
cmd({
    pattern: "updategdesc",
    alias: ["upgdesc", "gdesc"],
    react: "📜",
    desc: "Change the group description.",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, q }) => {
    try {
        if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
        if (!isAdmins) return await sendCustomMessage(conn, from, "❌ Only group admins can use this command.", mek, m);
        if (!isBotAdmins) return await sendCustomMessage(conn, from, "❌ I need to be an admin to update the group description.", mek, m);
        if (!q) return await sendCustomMessage(conn, from, "❌ Please provide a new group description.", mek, m);
        await conn.groupUpdateDescription(from, q);
        await sendCustomMessage(conn, from, "✅ Group description has been updated.", mek, m);
    } catch (e) {
        console.error("Error updating group description:", e);
        await sendCustomMessage(conn, from, "❌ Failed to update the group description. Please try again.", mek, m);
    }
});


// ==========================
// Update Group Name Command
// ==========================
cmd({
    pattern: "updategname",
    alias: ["upgname", "gname"],
    react: "📝",
    desc: "Change the group name.",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, q }) => {
    try {
        if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
        if (!isAdmins) return await sendCustomMessage(conn, from, "❌ Only group admins can use this command.", mek, m);
        if (!isBotAdmins) return await sendCustomMessage(conn, from, "❌ I need to be an admin to update the group name.", mek, m);
        if (!q) return await sendCustomMessage(conn, from, "❌ Please provide a new group name.", mek, m);
        await conn.groupUpdateSubject(from, q);
        await sendCustomMessage(conn, from, `✅ Group name has been updated to: *${q}*`, mek, m);
    } catch (e) {
        console.error("Error updating group name:", e);
        await sendCustomMessage(conn, from, "❌ Failed to update the group name. Please try again.", mek, m);
    }
});


// ==========================
// Join Group via Invite Link Command
// ==========================
cmd({
    pattern: "join",
    react: "📬",
    alias: ["joinme", "f_join"],
    desc: "To Join a Group from Invite link",
    category: "group",
    use: '.join < Group Link >',
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, isCreator, isDev, isOwner, isMe, args }) => {
    try {
        const msr = (await fetchJson('https://raw.githubusercontent.com/XdTechPro/KHAN-DATA/refs/heads/main/MSG/mreply.json')).replyMsg;
        if (!isCreator && !isDev && !isOwner && !isMe) return await sendCustomMessage(conn, from, msr.own_cmd, mek, m);
        if (!q) return await sendCustomMessage(conn, from, "*Please write the Group Link*️ 🖇️", mek, m);
        let result = args[0].split('https://chat.whatsapp.com/')[1];
        await conn.groupAcceptInvite(result);
        await conn.sendMessage(from, { text: `✔️ *Successfully Joined*` }, { quoted: mek });
    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.error(e);
        await sendCustomMessage(conn, from, `❌ *Error Occurred !!*\n\n${e}`, mek, m);
    }
});


// ==========================
// Get Group Invite Link Command
// ==========================
cmd({
    pattern: "invite",
    react: "🖇️",
    alias: ["grouplink", "glink"],
    desc: "To Get the Group Invite link",
    category: "group",
    use: '.invite',
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isDev, isBotAdmins }) => {
    try {
        const msr = (await fetchJson('https://raw.githubusercontent.com/XdTechPro/KHAN-DATA/refs/heads/main/MSG/mreply.json')).replyMsg;
        if (!isGroup) return await sendCustomMessage(conn, from, msr.only_gp, mek, m);
        if (!isAdmins && !isDev) return await sendCustomMessage(conn, from, msr.you_adm, mek, m);
        if (!isBotAdmins) return await sendCustomMessage(conn, from, msr.give_adm, mek, m);
        const code = await conn.groupInviteCode(from);
        await conn.sendMessage(from, { text: `🖇️ *Group Link*\n\nhttps://chat.whatsapp.com/${code}` }, { quoted: mek });
    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.error(e);
        await sendCustomMessage(conn, from, `❌ *Error Occurred !!*\n\n${e}`, mek, m);
    }
});


// ==========================
// Reset (Revoke) Group Invite Link Command
// ==========================
cmd({
    pattern: "revoke",
    react: "🖇️",
    alias: ["revokegrouplink", "resetglink", "revokelink", "f_revoke"],
    desc: "To Reset the group link",
    category: "group",
    use: '.revoke',
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isDev, isBotAdmins }) => {
    try {
        const msr = (await fetchJson('https://raw.githubusercontent.com/XdTechPro/KHAN-DATA/refs/heads/main/MSG/mreply.json')).replyMsg;
        if (!isGroup) return await sendCustomMessage(conn, from, msr.only_gp, mek, m);
        if (!isAdmins && !isDev) return await sendCustomMessage(conn, from, msr.you_adm, mek, m);
        if (!isBotAdmins) return await sendCustomMessage(conn, from, msr.give_adm, mek, m);
        await conn.groupRevokeInvite(from);
        await conn.sendMessage(from, { text: `*Group link Reset* ⛔` }, { quoted: mek });
    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.error(e);
        await sendCustomMessage(conn, from, `❌ *Error Occurred !!*\n\n${e}`, mek, m);
    }
});


// ==========================
// Hidetag (Tag All Members with Provided Message) Command
// ==========================
cmd({
    pattern: "hidetag",
    alias: ["htag"],
    react: "🔊",
    desc: "To Tag all Members for Message",
    category: "group",
    use: '.tag <message>',
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, isAdmins, isDev, isBotAdmins, participants }) => {
    try {
        const msr = (await fetchJson('https://raw.githubusercontent.com/XdTechPro/KHAN-DATA/refs/heads/main/MSG/mreply.json')).replyMsg;
        if (!isGroup) return await sendCustomMessage(conn, from, msr.only_gp, mek, m);
        if (!isAdmins && !isDev) return await sendCustomMessage(conn, from, msr.you_adm, mek, m);
        if (!isBotAdmins) return await sendCustomMessage(conn, from, msr.give_adm, mek, m);
        if (!q) return await sendCustomMessage(conn, from, '*Please add a Message* ℹ️', mek, m);
        // Send the message with the provided text and mention all members
        await conn.sendMessage(from, { text: q, mentions: participants.map(a => a.id) }, { quoted: mek });
    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.error(e);
        await sendCustomMessage(conn, from, `❌ *Error Occurred !!*\n\n${e}`, mek, m);
    }
});


// ==========================
// Tagall Command (Simplified Version)
// ==========================
cmd({
    pattern: "tagall",
    desc: "Tag all members with a heading and message content",
    category: "group",
    use: '.tagall <message>',
    filename: __filename
},
async (conn, mek, m, { from, q, isGroup, participants }) => {
    try {
        if (!isGroup) return await sendCustomMessage(conn, from, "❌ This command can only be used in groups.", mek, m);
        if (!q) return await sendCustomMessage(conn, from, "❌ Please provide a message to send.", mek, m);
        const header = "🔔 `Attention Everyone:`";
        const fullMsg = `${header}\n\n> ${q}\n\n© SUBZERO BOT`;
        await conn.sendMessage(from, { text: fullMsg, mentions: participants.map(a => a.id) }, { quoted: mek });
    } catch(e) {
        await sendCustomMessage(conn, from, `❌ *Error Occurred!!* \n\n${e}`, mek, m);
    }
});


// ==========================
// Open Group by Time Command
// ==========================
cmd({
    pattern: "opentime",
    react: "🔑",
    desc: "To open group after a set time",
    category: "group",
    use: '.opentime <time> <unit>',
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, args, q, isGroup, isAdmins, participants }) => {
    try {   
        if (!isGroup) return await sendCustomMessage(conn, from, ONLGROUP, mek, m);
        if (!isAdmins) return await sendCustomMessage(conn, from, ADMIN, mek, m);
        let timer;
        if (args[1] === 'second') {
            timer = args[0] * 1000;
        } else if (args[1] === 'minute') {
            timer = args[0] * 60000;
        } else if (args[1] === 'hour') {
            timer = args[0] * 3600000;
        } else if (args[1] === 'day') {
            timer = args[0] * 86400000;
        } else {
            return await sendCustomMessage(conn, from, '*select:*\nsecond\nminute\nhour\n\n*example*\n10 second', mek, m);
        }
        await sendCustomMessage(conn, from, `_Group will automatically open after ${q}_`, mek, m);
        setTimeout(async () => {
            const openMsg = "```🔓Good News! Group has been opened. Enjoy :)```" +
                            "\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ";
            await conn.groupSettingUpdate(from, 'not_announcement');
            await sendCustomMessage(conn, from, openMsg, mek, m);
        }, timer);
        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
        await sendCustomMessage(conn, from, '*Error !!*', mek, m);
        l(e);
    }
});


// ==========================
// Close Group by Time Command
// ==========================
cmd({
    pattern: "closetime",
    react: "🔒",
    desc: "To close group after a set time",
    category: "group",
    use: '.closetime <time> <unit>',
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, args, q, isGroup, isAdmins, participants }) => {
    try {   
        if (!isGroup) return await sendCustomMessage(conn, from, ONLGROUP, mek, m);
        if (!isAdmins) return await sendCustomMessage(conn, from, ADMIN, mek, m);
        let timer;
        if (args[1] === 'second') {
            timer = args[0] * 1000;
        } else if (args[1] === 'minute') {
            timer = args[0] * 60000;
        } else if (args[1] === 'hour') {
            timer = args[0] * 3600000;
        } else if (args[1] === 'day') {
            timer = args[0] * 86400000;
        } else {
            return await sendCustomMessage(conn, from, '*select:*\nsecond\nminute\nhour\n\n*Example*\n10 second', mek, m);
        }
        await sendCustomMessage(conn, from, `_Group will be automatically closed after ${q}_`, mek, m);
        setTimeout(async () => {
            const closeMsg = "```🔐 Time's Up! Group auto closed.```" +
                             "\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ";
            await conn.groupSettingUpdate(from, 'announcement');
            await sendCustomMessage(conn, from, closeMsg, mek, m);
        }, timer);
        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
        await sendCustomMessage(conn, from, '*Error !!*', mek, m);
        l(e);
    }
});

// GINFO

cmd({
    pattern: "ginfo",
    react: "📌",
    alias: ["groupinfo"],
    desc: "Get detailed group information",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/JawadTech3/KHAN-DATA/refs/heads/main/MSG/mreply.json')).replyMsg

if (!isGroup) return reply(`*🌍 This command only works in groups!*\n\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ`)
if (!isAdmins) { if (!isDev) return reply(`*⚠️ You need to be admin to use this!*\n\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ`),{quoted:mek }} 
if (!isBotAdmins) return reply(`*🤖 Please make me admin first!*\n\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ`)

const ppUrls = [
        'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
        'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
        'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
      ];
let ppUrl = await conn.profilePictureUrl(from, 'image')
if (!ppUrl) { ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];}

const metadata = await conn.groupMetadata(from)
const groupAdmins = participants.filter(p => p.admin);
const listAdmin = groupAdmins.map((v, i) => `➤ @${v.id.split('@')[0]}`).join('\n');
const owner = metadata.owner

const gdata = `*〄━━━━━━━ GROUP INFO ━━━━━━━〄*

📛 *Name*: ${metadata.subject}
🆔 *JID*: ${metadata.id}
👥 *Members*: ${metadata.size}
👑 *Owner*: @${owner.split('@')[0]}
📝 *Description*: ${metadata.desc?.toString() || 'No description'}

*👮‍♂️ Admins List*:
${listAdmin}

*〄━━━━━━━━━━━━━━━━━━━━〄*\n
> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ`

await conn.sendMessage(from, {
    image: { url: ppUrl },
    caption: gdata,
    mentions: groupAdmins.map(a => a.id)
},{quoted:mek })

} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`*❌ Error Occurred!*\n\n${e}\n\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ`)
}
})


