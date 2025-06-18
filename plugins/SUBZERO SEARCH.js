const { cmd } = require('../command');
const axios = require('axios');

const config = require('../config')
const l = console.log
const dl = require('@bochilteam/scraper')  
const ytdl = require('yt-search');
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts sameer kutti',
    react: "🔎",
    desc: "Search and get details from youtube.",
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me words to search *E.g* .yts SUBZERO-MD*')
try {
let yts = require("yt-search")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from , { text:  mesaj }, { quoted: mek } )
} catch (e) {
    l(e)
  reply('*Error !!*')
}
});





cmd({
  pattern: "wiki",
  alias: ["wikipedia", "search"],
  desc: "Search for information on Wikipedia.",
  category: "utility",
  use: ".wiki <search_query>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply("❌ Please provide a search query. Example: `.wiki Albert Einstein`");
    }

    // Fetch Wikipedia summary
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    const { title, extract, content_urls } = response.data;

    if (!extract) {
      return reply("❌ No results found. Please try a different query.");
    }

    // Format the Wikipedia summary
    const wikiMessage = `
📚 *Wikipedia Summary*: ${title}

${extract}

🔗 *Read More*: ${content_urls.desktop.page}
    `;

    reply(wikiMessage);
  } catch (error) {
    console.error("Error fetching Wikipedia data:", error);
    reply("❌ Unable to fetch Wikipedia data. Please try again later.");
  }
});

/*
const wiki = require('wikipedia');

// Define the Wikipedia search command
cmd({
    pattern: "wiki",
    desc: "Search Wikipedia for information",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if a query was provided
        if (!q) {
            return reply('Please provide a search query.');
        }

        // Fetch summary from Wikipedia
        const summary = await wiki.summary(q);
        
        // Format the reply
        let replyText = `
*📚 Wikipedia Summary 📚*

🔍 *Query*: _${q}_

💬 *Title*: _${summary.title}_

📝 *Summary*: _${summary.extract}_

🔗 *URL*: ${summary.content_urls.desktop.page}

> @ Powdered By SubZero `;

        // Send the reply with the thumbnail image
        await conn.sendMessage(from, { image: { url: summary.originalimage.source }, caption: replyText }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
*/


cmd({
  pattern: 'technews',
  alias: ['tech'],
  react: '📱',
  desc: 'Get latest technology news',
  category: 'news',
  filename: __filename
}, async (conn, mek, msg, { from, reply }) => {
  try {
    // Send processing message
    await reply('📡 Fetching tech news...');

    // Fetch tech news data
    const { data } = await axios.get('https://bk9.fun/details/technewsworld');

    if (!data.status || !data.BK9) {
      return reply('❌ Failed to fetch tech news');
    }

    const articles = data.BK9.slice(0, 5); // Get first 5 articles

    for (const article of articles) {
      try {
        const { imageUrl, articleUrl, title, description, date, source } = article;

        // Create caption
        const caption = `*📱 Tech News*\n\n` +
                       `*${title}*\n\n` +
                       `${description}\n\n` +
                       `📅 ${date}\n` +
                       `📰 ${source}\n` +
                       `🔗 ${articleUrl}`;

        // Try to send with image
        try {
          const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          await conn.sendMessage(from, {
            image: Buffer.from(imageRes.data),
            caption: caption
          }, { quoted: mek });
        } catch {
          // If image fails, send text only
          await reply(caption);
        }

        // Small delay between messages
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (err) {
        console.log('Error sending article:', err);
        continue;
      }
    }

    await reply('✅ Tech news delivered!');

  } catch (error) {
    console.error('TechNews error:', error);
    reply('❌ Error fetching tech news');
  }
});


cmd(
    {
        pattern: 'repostalk',
        alias: ['reposearch', 'gitrepo'],
        desc: 'Get information about a GitHub repository',
        category: 'utility',
        use: '<github-repo-url>',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        try {
            if (!q) return reply('*Please provide a GitHub repository URL*\nExample: .repostalk https://github.com/mrfraank/SUBZERO');

            // Extract repo URL from message
            let repoUrl = q.trim();
            if (!repoUrl.startsWith('http')) {
                repoUrl = 'https://github.com/' + repoUrl;
            }

            // Send processing reaction
            await conn.sendMessage(mek.chat, { react: { text: "⏳", key: mek.key } });

            // Call BK9 API
            const apiUrl = `https://bk9.fun/stalk/githubrepo?url=${encodeURIComponent(repoUrl)}`;
            const response = await axios.get(apiUrl);
            
            if (!response.data.status) {
                return reply('*Failed to fetch repository information*');
            }

            const repoData = response.data.BK9;
            const ownerData = repoData.owner;

            // Format the response
            const message = `
📂 *Repository Information* 📂

🔹 *Name:* ${repoData.name}
🔹 *Owner:* [${ownerData.login}](${ownerData.html_url})
🔹 *Description:* ${repoData.description || 'No description'}
🔹 *Stars:* ⭐ ${repoData.stargazers_count}
🔹 *Forks:* 🍴 ${repoData.forks_count}
🔹 *Watchers:* 👀 ${repoData.watchers_count}
🔹 *Open Issues:* ⚠️ ${repoData.open_issues_count}
🔹 *Language:* ${repoData.language || 'Not specified'}
🔹 *Created At:* ${new Date(repoData.created_at).toLocaleDateString()}
🔹 *Last Updated:* ${new Date(repoData.updated_at).toLocaleDateString()}

🌐 *Links:*
- [Repository](${repoData.html_url})
- [Owner Profile](${ownerData.html_url})

📊 *Stats:*
- Size: ${repoData.size} KB
- Default Branch: ${repoData.default_branch}
- ${repoData.private ? '🔒 Private' : '🔓 Public'}
${repoData.archived ? '\n⚠️ This repository is archived' : ''}
            `;

            // Send owner avatar along with the message
            await conn.sendMessage(mek.chat, {
                image: { url: ownerData.avatar_url },
                caption: message,
            }, { quoted: mek });

            // Send success reaction
            await conn.sendMessage(mek.chat, { react: { text: "✅", key: mek.key } });

        } catch (error) {
            console.error('Error in repostalk command:', error);
            await conn.sendMessage(mek.chat, { react: { text: "❌", key: mek.key } });
            reply('*Error fetching repository information. Please check the URL and try again.*');
        }
    }
);


cmd({
    pattern: "npm",
    alias: ["npmpkg", "npmsearch"],
    react: "📦",
    desc: "Search for NPM packages",
    category: "search",
    use: ".npm <package-name>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide an NPM package name!");

        const processingMsg = await reply("🔍 Searching NPM registry...");

        const apiUrl = `https://api.giftedtech.web.id/api/search/npmsearch?apikey=gifted&packagename=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl, { timeout: 10000 });

        if (!response.data?.success || !response.data?.result) {
            return reply("❌ Package not found or API error");
        }

        const pkg = response.data.result;
        
        let message = `📦 \`NPM Package Info\` \n\n` +
                     `✨ *Name:* ${pkg.name || "N/A"}\n` +
                     `📝 *Description:* ${pkg.description || "N/A"}\n` +
                     `🏷️ *Version:* ${pkg.version || "N/A"}\n` +
                     `📅 *Published:* ${pkg.publishedDate || "N/A"}\n` +
                     `👤 *Owner:* ${pkg.owner || "N/A"}\n` +
                     `📜 *License:* ${pkg.license || "N/A"}\n\n` +
                     `🔗 *Package Link:* ${pkg.packageLink || "N/A"}\n` +
                     `🏠 *Homepage:* ${pkg.homepage || "N/A"}\n` +
                     `📥 *Download:* ${pkg.downloadLink || "N/A"}\n\n`;

        if (pkg.keywords?.length > 0) {
            message += `🏷️ *Keywords:* ${pkg.keywords.join(", ")}\n`;
        }

        message += `\n> Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ`;

        // Send the result
        await conn.sendMessage(from, { 
            text: message,
            contextInfo: {
                externalAdReply: {
                    title: pkg.name,
                    body: pkg.description || "NPM package",
                    thumbnail: await (await axios.get('https://files.catbox.moe/u099km.jpg', { responseType: 'arraybuffer' })).data,
                    sourceUrl: pkg.packageLink || "https://www.npmjs.com"
                }
            }
        }, { quoted: mek });

        // Delete processing message
        await conn.sendMessage(from, { delete: processingMsg.key });

    } catch (error) {
        console.error("NPM search error:", error);
       // reply(`❌ Error: ${error.response?.status === 404 ? "Package not found" : "Search failed"}`);
    }
});


// NASA APOD Command
cmd({
  pattern: 'nasa',
  alias: ['apod'],
  react: '🛰️',
  desc: 'Fetch NASA\'s Astronomy Picture of the Day',
  category: 'tools',
  filename: __filename
}, async (conn, mek, msg, { from, reply }) => {
  try {
    const { data } = await axios.get('https://api.nexoracle.com/details/nasa?apikey=e276311658d835109c');
    
    if (!data.result || data.status !== 200) {
      return reply('❌ Failed to fetch NASA data');
    }

    const { date, explanation, title, url } = data.result;
    const imageRes = await axios.get(url, { responseType: 'arraybuffer' });
    
    await conn.sendMessage(from, {
      image: Buffer.from(imageRes.data),
      caption: `*🚀 NASA Astronomy Picture of the Day*\n\n` +
               `*📛 Title:* ${title}\n` +
               `*📅 Date:* ${date}\n\n` +
               `*📝 Explanation:*\n${explanation}\n\n` +
               `_Powered by Subzero_`
    }, { quoted: mek });

  } catch (error) {
    console.error('NASA Error:', error);
    reply('❌ Failed to process NASA request');
  }
});

// WhatsApp Channel Stalker
cmd({
  pattern: 'whatsappchannelstalk',
  alias: ['chanstalk', 'wstalk'],
  react: '📢',
  desc: 'Get WhatsApp channel information',
  category: 'stalk',
  use: '.wstalk <channel-url>',
  filename: __filename
}, async (conn, mek, msg, { from, reply, args }) => {
  try {
    if (!args[0]) return reply('❌ Provide WhatsApp channel URL');
    
    const url = encodeURIComponent(args[0]);
    const { data } = await axios.get(`https://api.nexoracle.com/stalking/whatsapp-channel?apikey=e276311658d835109c&url=${url}`);
    
    if (!data.result || data.status !== 200) {
      return reply('❌ Invalid channel or API error');
    }

    const { title, followers, description, image, link } = data.result;
    const imageRes = await axios.get(image, { responseType: 'arraybuffer' });

    await conn.sendMessage(from, {
      image: Buffer.from(imageRes.data),
      caption: `*📢 WhatsApp Channel Info*\n\n` +
               `*🔖 Title:* ${title}\n` +
               `*👥 Followers:* ${followers}\n` +
               `*📄 Description:* ${description}\n\n` +
               `*🔗 Link:* ${link}\n\n` +
               `_Powered by Subzero_`
    }, { quoted: mek });

  } catch (error) {
    console.error('Channel Stalk Error:', error);
    reply('❌ Failed to fetch channel info');
  }
});

// IP Lookup Command
cmd({
  pattern: 'ip',
  alias: ['iplookup'],
  react: '🌐',
  desc: 'Lookup IP address information',
  category: 'stalk',
  use: '.ip <ip-address>',
  filename: __filename
}, async (conn, mek, msg, { from, reply, args }) => {
  try {
    if (!args[0]) return reply('❌ Provide IP address');
    
    const { data } = await axios.get(`https://api.nexoracle.com/stalking/ip?apikey=e276311658d835109c&q=${args[0]}`);
    
    if (!data.result || data.status !== 200) {
      return reply('❌ Invalid IP or API error');
    }

    const { ip, country, city, isp, org, lat, lon, timezone, mobile, proxy } = data.result;
    
    await reply(
      `*🌐 IP Address Information*\n\n` +
      `*🔢 IP:* ${ip}\n` +
      `*📍 Location:* ${city}, ${country}\n` +
      `*📡 ISP:* ${isp}\n` +
      `*🏢 Organization:* ${org}\n` +
      `*🌍 Coordinates:* ${lat}, ${lon}\n` +
      `*⏰ Timezone:* ${timezone}\n` +
      `*📱 Mobile:* ${mobile ? 'Yes' : 'No'}\n` +
      `*🛡️ Proxy:* ${proxy ? 'Yes' : 'No'}\n\n` +
      `_Powered by Subzero_`
    );

  } catch (error) {
    console.error('IP Error:', error);
    reply('❌ Failed to lookup IP address');
  }
});

cmd({
    pattern: "lyrics",
    alias: ["lyric", "lyrics2"],
    react: "🎤",
    desc: "Search for song lyrics",
    category: "search",
    use: "<song title>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a song title (e.g., !lyrics lily by alan walker)");

        await reply("🔍 Searching for lyrics...");

        const apiUrl = `https://api.giftedtech.web.id/api/search/lyrics?apikey=gifted&query=${encodeURIComponent(q)}`;
        
        const { data } = await axios.get(apiUrl, {
            timeout: 8000 // 8 second timeout
        });

        if (!data?.success || !data.result?.lyrics) {
            return reply("❌ No lyrics found for this song");
        }

        // Format the response
        const lyricsText = 
            `🎵 *${data.result.title}* 🎵\n` +
            `👩‍🎤 Artist: ${data.result.artist}\n\n` +
            `${data.result.lyrics}\n\n` +
            `Powered by Mr Frank`;

        // Split long lyrics into multiple messages if needed
        if (lyricsText.length > 1000) {
            const parts = [];
            for (let i = 0; i < lyricsText.length; i += 1000) {
                parts.push(lyricsText.substring(i, i + 1000));
            }
            for (const part of parts) {
                await conn.sendMessage(from, { text: part }, { quoted: mek });
            }
        } else {
            await conn.sendMessage(from, { 
                text: lyricsText,
                contextInfo: {
                    externalAdReply: {
                        title: data.result.title,
                        body: `Lyrics by ${data.result.artist.split('‣')[0].trim()}`,
                        thumbnail: await axios.get('https://files.catbox.moe/h8919f.jpg', {
                            responseType: 'arraybuffer'
                        }).then(res => res.data).catch(() => null),
                        mediaType: 2
                    }
                }
            }, { quoted: mek });
        }

    } catch (error) {
        console.error("Lyrics search error:", error);
        reply(`❌ Error searching lyrics: ${error.message}`);
    }
});


cmd({
  pattern: 'bbcnews',
  alias: ['bbc','news'],
  react: '📰',
  desc: 'Get latest BBC News headlines with images',
  category: 'news',
  filename: __filename
}, async (conn, mek, msg, { from, reply }) => {
  try {
    const { data } = await axios.get('https://api.nexoracle.com/news/bbc?apikey=e276311658d835109c');
    
    if (!data.result || data.status !== 200) {
      return reply('❌ Failed to fetch BBC News');
    }

    const articles = data.result;
    
    // Send processing notification
    await reply('📡 Fetching latest BBC News headlines...');

    for (const [index, article] of articles.entries()) {
      try {
        const { title, description, url, urlToImage, publishedAt } = article;
        
        // Download news image
        const imageRes = await axios.get(urlToImage, { 
          responseType: 'arraybuffer',
          timeout: 10000 // 10-second timeout
        });
        
        const imageBuffer = Buffer.from(imageRes.data);
        
        // Format publication date
        const newsDate = new Date(publishedAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        const caption = `*📰 BBC News Update* (${index + 1}/${articles.length})\n\n` +
                       `*${title}*\n\n` +
                       `${description}\n\n` +
                       `🗓️ Published: ${newsDate}\n` +
                       `🔗 Read more: ${url}\n\n` +
                       `_Powered by Subzero_`;

        await conn.sendMessage(from, {
          image: imageBuffer,
          caption: caption
        }, { quoted: mek });

        // Add delay between messages to prevent flooding
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (articleError) {
        console.error(`Error processing article ${index + 1}:`, articleError);
        // Continue to next article if one fails
        continue;
      }
    }

    await reply('✅ All BBC News updates delivered!');

  } catch (error) {
    console.error('BBC News Error:', error);
    reply('❌ Failed to fetch BBC News. Please try again later.');
  }
});


cmd(
    {
        pattern: 'mal',
        alias: ['animeinfo', 'anidetails'],
        desc: 'Get anime information from MyAnimeList',
        category: 'weeb',
        react: '🌸',
        use: '<anime title>',
        filename: __filename,
    },
    async (conn, mek, m, { text, reply }) => {
        try {
            if (!text) return reply(`🌸 *Usage:* ${Config.PREFIX}mal <anime title>\nExample: ${Config.PREFIX}mal Summertime Render`);

            await conn.sendMessage(mek.chat, { react: { text: "⏳", key: mek.key } });

            // Fetch MAL data
            const apiUrl = `https://lance-frank-asta.onrender.com/api/mal?title=${encodeURIComponent(text)}`;
            const { data } = await axios.get(apiUrl);

            if (!data?.title) {
                return reply('🌸 *Anime not found!* Try a different title');
            }

            // Format the information
            const malInfo = `🎌 *${data.title}* (${data.japanese || 'N/A'})\n\n` +
                           `📺 *Type:* ${data.type || 'N/A'}\n` +
                           `📊 *Status:* ${data.status || 'N/A'}\n` +
                           `🗓 *Aired:* ${data.aired || 'N/A'}\n` +
                           `🎞 *Episodes:* ${data.episodes || 'N/A'} (${data.duration || 'N/A'})\n\n` +
                           `⭐ *Score:* ${data.score || 'N/A'} (${data.scoreStats || 'N/A'})\n` +
                           `🏆 *Ranked:* ${data.ranked || 'N/A'}\n` +
                           `👥 *Members:* ${data.members || 'N/A'}\n\n` +
                           `🎭 *Genres:* ${data.genres || 'N/A'}\n` +
                           `🏢 *Studios:* ${data.studios || 'N/A'}\n\n` +
                           `📜 *Description:* ${data.description?.substring(0, 200) || 'No description'}${data.description?.length > 200 ? '...' : ''}\n\n` +
                           `🔗 *MAL URL:* ${data.url || 'Not available'}\n\n` +
                           `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ`;

            // Send the anime info with poster
            await conn.sendMessage(mek.chat, {
                image: { url: data.picture || 'https://i.imgur.com/3QNxQ4a.png' },
                caption: malInfo,
                contextInfo: {
                    externalAdReply: {
                        title: data.title,
                        body: `⭐ ${data.score} | ${data.type}`,
                        thumbnailUrl: data.picture || 'https://i.imgur.com/3QNxQ4a.png',
                        mediaType: 1,
                        mediaUrl: data.url,
                        sourceUrl: data.url
                    }
                }
            }, { quoted: mek });

            await conn.sendMessage(mek.chat, { react: { text: "✅", key: mek.key } });

        } catch (error) {
            console.error('MAL Error:', error);
            await conn.sendMessage(mek.chat, { react: { text: "❌", key: mek.key } });
            reply('🌸 *Error:* ' + (error.message || 'Failed to fetch MAL data'));
        }
    }
);





cmd({
                             pattern: "define",
                             desc: "📚 Get the definition of a word",
                             react: "🔍",
                             category: "Auther",
                             filename: __filename
                         },
                         async (conn, mek, m, { from, q, reply }) => {
                             try {
                                 if (!q) return reply("❗ Please provide a word to define. Usage: .define [word]");

                                 const word = q;
                                 const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

                                 const response = await axios.get(url);
                                 const definitionData = response.data[0];

                                 const definition = definitionData.meanings[0].definitions[0].definition;
                                 const example = definitionData.meanings[0].definitions[0].example || 'No example available';
                                 const synonyms = definitionData.meanings[0].definitions[0].synonyms.join(', ') || 'No synonyms available';

const wordInfo = `
📚 *Word*: ${definitionData.word}
🔍 *Definition*: ${definition}
📝 *Example*: ${example}
🔗 *Synonyms*: ${synonyms}

> *© Powered By SubZero*`;

                                 return reply(wordInfo);
                             } catch (e) {
                                 console.log(e);
                                 if (e.response && e.response.status === 404) {
                                     return reply("🚫 Word not found. Please check the spelling and try again.");
                                 }
                                 return reply("⚠️ An error occurred while fetching the definition. Please try again later.");
                             }
                         });


cmd({
  pattern: "eplstandings",
  alias: ["epltable", "standings"],
  react: '🏆',
  desc: "Get English Premier League standings.",
  category: "sports",
  use: ".eplstandings",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the API URL
    const apiUrl = "https://apis-keith.vercel.app/epl/standings";

    // Call the API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || !response.data.status || !response.data.result || !response.data.result.standings) {
      return reply('❌ Unable to fetch EPL standings. Please try again later.');
    }

    // Extract standings data
    const { competition, standings } = response.data.result;

    // Format the standings into a readable message
    let standingsList = `🏆 *${competition} - Standings* 🏆\n\n`;
    standings.forEach(team => {
      standingsList += `*${team.position}.* ${team.team}\n`;
      standingsList += `📊 *Played:* ${team.played} | *Won:* ${team.won} | *Draw:* ${team.draw} | *Lost:* ${team.lost}\n`;
      standingsList += `⚽ *Goals For:* ${team.goalsFor} | *Goals Against:* ${team.goalsAgainst} | *Goal Difference:* ${team.goalDifference}\n`;
      standingsList += `📈 *Points:* ${team.points}\n\n`;
    });

    // Send the standings list to the user
    await reply(standingsList);

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error fetching EPL standings:', error);
    reply('❌ Unable to fetch EPL standings. Please try again later.');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});


// SUBZERO EPL RESULTS

cmd({
  pattern: "finishedeplmatches",
  alias: ["eplfinished", "eplresults"],
  react: '⚽',
  desc: "Get finished English Premier League matches.",
  category: "sports",
  use: ".finishedEplmatches",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the API URL
    const apiUrl = "https://apis-keith.vercel.app/epl/matches";

    // Call the API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || !response.data.status || !response.data.result || !response.data.result.matches) {
      return reply('❌ Unable to fetch finished matches. Please try again later.');
    }

    // Extract match data
    const { competition, matches } = response.data.result;

    // Filter only finished matches
    const finishedMatches = matches.filter(match => match.status === "FINISHED");

    // Format the matches into a readable message
    let matchList = `⚽ *${competition} - Finished Matches* ⚽\n\n`;
    finishedMatches.forEach((match, index) => {
      matchList += `*Match ${index + 1}:*\n`;
      matchList += `🏠 *Home Team:* ${match.homeTeam}\n`;
      matchList += `🛫 *Away Team:* ${match.awayTeam}\n`;
      matchList += `📅 *Matchday:* ${match.matchday}\n`;
      matchList += `📊 *Score:* ${match.score}\n`;
      matchList += `🏆 *Winner:* ${match.winner}\n\n`;
    });

    // Send the match list to the user
    await reply(matchList);

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error fetching finished matches:', error);
    reply('❌ Unable to fetch finished matches. Please try again later.');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});


// EPL MATCHES


cmd({
  pattern: "upcomingeplmatches",
  alias: ["eplmatches", "epl"],
  react: '⚽',
  desc: "Get upcoming English Premier League matches.",
  category: "sports",
  use: ".upcomingEplmatches",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the API URL
    const apiUrl = "https://apis-keith.vercel.app/epl/upcomingmatches";

    // Call the API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || !response.data.status || !response.data.result || !response.data.result.upcomingMatches) {
      return reply('❌ Unable to fetch upcoming matches. Please try again later.');
    }

    // Extract match data
    const { competition, upcomingMatches } = response.data.result;

    // Format the matches into a readable message
    let matchList = `⚽ *${competition} - Upcoming Matches* ⚽\n\n`;
    upcomingMatches.forEach((match, index) => {
      matchList += `*Match ${index + 1}:*\n`;
      matchList += `🏠 *Home Team:* ${match.homeTeam}\n`;
      matchList += `🛫 *Away Team:* ${match.awayTeam}\n`;
      matchList += `📅 *Date:* ${match.date}\n`;
      matchList += `📋 *Matchday:* ${match.matchday}\n\n`;
    });

    // Send the match list to the user
    await reply(matchList);

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    reply('❌ Unable to fetch upcoming matches. Please try again later.');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});



cmd({
  pattern: "gitstalk",
  alias: ["githubstalk", "ghstalk"],
  desc: "Get information about a GitHub user, including their profile picture, bio, and more.",
  category: "utility",
  use: ".gitstalk <username>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const username = args.join(" ");
    if (!username) {
      return reply("❌ Please provide a GitHub username. Example: `.gitstalk octocat`");
    }

    // Fetch GitHub user information from the API
    const response = await axios.get(`https://api.siputzx.my.id/api/stalk/github?user=${encodeURIComponent(username)}`);
    const { status, data } = response.data;

    if (!status || !data) {
      return reply("❌ No information found for the specified GitHub user. Please try again.");
    }

    const {
      username: ghUsername,
      nickname,
      bio,
      id,
      nodeId,
      profile_pic,
      url,
      type,
      admin,
      company,
      blog,
      location,
      email,
      public_repo,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
    } = data;

    // Format the GitHub user information message
    const gitstalkMessage = `
👤 *GitHub Username*: ${ghUsername}
📛 *Nickname*: ${nickname || "N/A"}
📝 *Bio*: ${bio || "N/A"}
🆔 *ID*: ${id}
🔗 *Node ID*: ${nodeId}
🌐 *Profile URL*: ${url}
👥 *Type*: ${type}
👑 *Admin*: ${admin ? "Yes" : "No"}
🏢 *Company*: ${company || "N/A"}
📖 *Blog*: ${blog || "N/A"}
📍 *Location*: ${location || "N/A"}
📧 *Email*: ${email || "N/A"}
📂 *Public Repos*: ${public_repo}
📜 *Public Gists*: ${public_gists}
👥 *Followers*: ${followers}
👣 *Following*: ${following}
📅 *Created At*: ${new Date(created_at).toLocaleString()}
🔄 *Updated At*: ${new Date(updated_at).toLocaleString()}
\n\n> © Mr Frank OFC
  `;

    // Send the GitHub user information message with the profile picture as an image attachment
    await conn.sendMessage(from, {
      image: { url: profile_pic }, // Attach the profile picture
      caption: gitstalkMessage, // Add the formatted message as caption
    });
  } catch (error) {
    console.error("Error fetching GitHub user information:", error);
    reply("❌ Unable to fetch GitHub user information. Please try again later.");
  }
});


//----- 

cmd({
    pattern: "githubstalk2",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "menu",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username. ");
        }
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `👤 *Username*: ${data.name || data.login}
🔗 *Github Url*:(${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mʀ Fʀᴀɴᴋ`;
          const sentMsg = await conn.sendMessage(from,{image:{url: data.avatar_url },caption: userInfo },{quoted:mek })
    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
});



// Default verses to show when no reference is given
const DEFAULT_VERSES = [
    "John 3:16",
    "Psalm 23:1",
    "Philippians 4:13",
    "Proverbs 3:5",
    "Romans 8:28"
];

// Bible-related images for attachments
const BIBLE_IMAGES = [
    "https://files.catbox.moe/vlplwr.jpg",
    "https://files.catbox.moe/vlplwr.jpg",
    "https://files.catbox.moe/vlplwr.jpg"
];

cmd(
    {
        pattern: 'bible',
        alias: ['verse', 'scripture'],
        desc: 'Fetch Bible verses with rich attachments',
        category: 'utility',
        react: '📖',
        use: '[reference] (leave empty for default verse)',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        try {
            // Send processing reaction
            await conn.sendMessage(mek.chat, { react: { text: "⏳", key: mek.key } });

            // Select a random default verse if none provided
            const reference = q || DEFAULT_VERSES[Math.floor(Math.random() * DEFAULT_VERSES.length)];
            const apiUrl = `https://kaiz-apis.gleeze.com/api/bible?q=${encodeURIComponent(reference)}`;

            const response = await axios.get(apiUrl);
            
            if (!response.data || !response.data.verse || !response.data.verse.length) {
                return reply('❌ No results found for this reference');
            }

            const verseData = response.data.verse[0];
            const verseReference = `${verseData.book_name} ${verseData.chapter}:${verseData.verse}`;
            const bibleGatewayUrl = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(verseReference)}&version=NIV`;

            // Get a random Bible image
            const randomImageUrl = BIBLE_IMAGES[Math.floor(Math.random() * BIBLE_IMAGES.length)];
            const imageResponse = await axios.get(randomImageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(imageResponse.data, 'binary');

            // Formatted output with rich attachments
            const message = {
                text: `
📖 *${verseReference}*

${verseData.text.trim()}

${q ? '' : '✨ *Here\'s a verse for you today!* ✨'}

🔗 *Read more at:* ${bibleGatewayUrl}
                `,
                contextInfo: {
                    externalAdReply: {
                        title: `Bible Verse: ${verseReference}`,
                        body: q ? 'Requested Verse' : 'Daily Verse',
                        thumbnail: imageBuffer,
                        mediaType: 1,
                        mediaUrl: bibleGatewayUrl,
                        sourceUrl: bibleGatewayUrl,
                        showAdAttribution: true
                    }
                }
            };

            await conn.sendMessage(mek.chat, message, { quoted: mek });

            // Send success reaction
            await conn.sendMessage(mek.chat, { react: { text: "✅", key: mek.key } });

        } catch (error) {
            console.error('Error:', error);
            await conn.sendMessage(mek.chat, { react: { text: "❌", key: mek.key } });
            reply('Error fetching verse. Please try again.');
        }
    }
);

cmd({
    pattern: "google",
    alias: ["gsearch", "googlesearch"],
    desc: "Search Google for a query.",
    category: "tools",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        // Vérifiez si un mot-clé est fourni
        if (args.length === 0) {
            return reply(`❗ *Please provide a search query.*\n\n*Example:*\n.google SubZero Md Bot`);
        }

        const query = args.join(" ");
        const apiKey = "AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI"; // Votre clé API Google
        const cx = "baf9bdb0c631236e5"; // Votre ID de moteur de recherche personnalisé
        const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;

        // Appel API
        const response = await axios.get(apiUrl);

        // Vérifiez si l'API a renvoyé des résultats
        if (response.status !== 200 || !response.data.items || response.data.items.length === 0) {
            return reply(`❌ *No results found for:* ${query}`);
        }

        // Format et envoi des résultats
        let results = `🔎 *Google Search Results for:* "${query}"\n\n`;
        response.data.items.slice(0, 5).forEach((item, index) => {
            results += `*${index + 1}. ${item.title}*\n${item.link}\n${item.snippet}\n\n`;
        });

        reply(results.trim());
    } catch (error) {
        console.error(error);
        reply(`⚠️ *An error occurred while fetching search results.*\n\n${error.message}`);
    }
});


cmd(
    {
        pattern: 'imdb',
        alias: ['movie'],
        desc: 'Get movie information from IMDb',
        category: 'information',
        react: '🎬',
        use: '<movie name>',
        filename: __filename,
    },
    async (conn, mek, m, { text, reply }) => {
        try {
            if (!text) return reply('🎬 *Please provide a movie name*\nExample: .imdb Sonic the Hedgehog\n.imdb The Dark Knight');

            // Send processing reaction
            await conn.sendMessage(mek.chat, { react: { text: "⏳", key: mek.key } });

            // Call IMDb API
            const apiUrl = `https://apis.davidcyriltech.my.id/imdb?query=${encodeURIComponent(text)}`;
            const response = await axios.get(apiUrl, { timeout: 10000 });
            
            if (!response.data?.status || !response.data.movie) {
                return reply('🎬 *Movie not found* - Please check the name and try again');
            }

            const movie = response.data.movie;

            // Format ratings
            const ratings = movie.ratings.map(r => `• *${r.source}:* ${r.value}`).join('\n');

            // Create the message
            const message = `
🎥 *${movie.title}* (${movie.year})

📊 *Ratings:*
${ratings}

📅 *Released:* ${new Date(movie.released).toLocaleDateString()}
⏱ *Runtime:* ${movie.runtime}
🎭 *Genres:* ${movie.genres}
🎬 *Director:* ${movie.director}
✍️ *Writers:* ${movie.writer}
🌟 *Stars:* ${movie.actors}

📝 *Plot:*
${movie.plot}

🌎 *Country:* ${movie.country}
🗣️ *Languages:* ${movie.languages}
🏆 *Awards:* ${movie.awards}
💰 *Box Office:* ${movie.boxoffice}

🔗 *IMDb Link:* ${movie.imdbUrl}
            `;

            // Get poster image
            let posterBuffer;
            try {
                const posterResponse = await axios.get(movie.poster, { 
                    responseType: 'arraybuffer',
                    timeout: 5000
                });
                posterBuffer = Buffer.from(posterResponse.data, 'binary');
            } catch {
                posterBuffer = null;
            }

            // Send the movie info with poster
            await conn.sendMessage(mek.chat, {
                image: posterBuffer,
                caption: message,
                contextInfo: {
                    externalAdReply: {
                        title: movie.title,
                        body: `IMDb Rating: ${movie.imdbRating}/10`,
                        thumbnail: posterBuffer,
                        mediaType: 1,
                        mediaUrl: movie.imdbUrl,
                        sourceUrl: movie.imdbUrl
                    }
                }
            }, { quoted: mek });

            // Send success reaction
            await conn.sendMessage(mek.chat, { react: { text: "✅", key: mek.key } });

        } catch (error) {
            console.error('IMDb error:', error);
            await conn.sendMessage(mek.chat, { react: { text: "❌", key: mek.key } });
            reply('🎬 *Error fetching movie info* - Please try again later');
        }
    }
);


cmd({
  pattern: 'imgsearch',
  alias: ['img','pin','image'],
  react: '🔍',
  desc: 'Search for images on Google',
  category: 'image',
  filename: __filename
}, async (conn, mek, m, {
  body,
  from,
  quoted,
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
    const text = body.trim().replace(command, '').trim();
    if (!text) {
        return reply(`*Usage:* ${command} <query>\n\n*Example:* ${command} cat`);
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

        const apiResponse = await axios.get(`https://apis.davidcyriltech.my.id/googleimage`, {
            params: { query: text }
        });

        const { success, results } = apiResponse.data;

        if (!success || !results || results.length === 0) {
            return reply(`❌ No images found for "${text}". Try another search.`);
        }

        const maxImages = Math.min(results.length, 5);
        for (let i = 0; i < maxImages; i++) {
            await conn.sendMessage(m.chat, {
                image: { url: results[i] },
                caption: `📷 *Image Search*\n\n🔎 *Query:* "${text}"\n📄 *Result:* ${i + 1}/${maxImages}\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ ᴏғᴄ*`,
            }, { quoted: m });
        }

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (error) {
        console.error("Error in Image Search:", error);
        reply(`❌ *Error fetching images. Try again later.*`);
    }
});


//########
cmd({
  'pattern': "img2",
  'alias': ["image2", "pinterest2", "pinimg2"],
  'react': '🖼️',
  'desc': "Search and download images from Pinterest using keywords.",
  'category': "image",
  'use': ".img <keywords>",
  'filename': __filename
}, async (_0x1a9409, _0x59fdb9, _0x3f150e, {
  from: _0x163393,
  args: _0x12b1f7,
  reply: _0x2ac5cb
}) => {
  try {
    const _0x3207b0 = _0x12b1f7.join(" ");
    if (!_0x3207b0) {
      return _0x2ac5cb("*Please provide search keywords for the image. Eg Subzero*");
    }
    _0x2ac5cb("*🔍 Showing Results For - " + _0x3207b0 + "...*");
    const _0x2f5556 = 'https://apis.davidcyriltech.my.id/googleimage?query=' + encodeURIComponent(_0x3207b0);
    const _0x530cac = await axios.get(_0x2f5556);
    if (!_0x530cac.data || !_0x530cac.data.result || _0x530cac.data.result.length === 0x0) {
      return _0x2ac5cb("❌ No images found for \"" + _0x3207b0 + "\".");
    }
    const _0x82a454 = _0x530cac.data.result;
    for (let _0xecb4cf = 0x0; _0xecb4cf < Math.min(_0x82a454.length, 0x5); _0xecb4cf++) {
      const _0x58b5b7 = _0x82a454[_0xecb4cf];
      if (_0x58b5b7.images_url) {
        await _0x1a9409.sendMessage(_0x163393, {
          'image': {
            'url': _0x58b5b7.images_url
          },
          'caption': "*© Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ SᴜʙZᴇʀᴏ*" 
        }, {
          'quoted': _0x59fdb9
        });
      }
    }
    if (_0x82a454.every(_0x45deb7 => !_0x45deb7.images_url)) {
      _0x2ac5cb("❌ No valid image URLs found in the results.");
    }
  } catch (_0x422b47) {
    console.error(_0x422b47);
    _0x2ac5cb("❌ An error occurred while processing your request.");
  }
});


