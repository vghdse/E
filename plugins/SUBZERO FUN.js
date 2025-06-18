const axios = require('axios');
const { cmd } = require('../command');
const Config = require('../config');
const { sleep } = require('../lib/functions'); 
const connectDB = require('../lib/db'); // Import the MongoDB connection
const Diary = require('../models/Diary'); // Import the Diary model
const NodeCache = require('node-cache'); // For session management
const { fetchEmix } = require("../lib/emix-utils");
const { getBuffer } = require("../lib/functions");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { fetchGif, gifToVideo } = require("../lib/fetchGif");
const fetch = require("node-fetch");



cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            '💻 *SUBZERO HACK STARTING...* 💻',
            '',
            '*Initializing hacking tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            '',
            '```[██████████] 10%``` ⏳'                                            ,
            '```[███████████████████] 20%``` ⏳'                                   ,
            '```[███████████████████████] 30%``` ⏳'                               ,
            '```[██████████████████████████] 40%``` ⏳'                            ,
            '```[███████████████████████████████] 50%``` ⏳'                       ,
            '```[█████████████████████████████████████] 60%``` ⏳'                 ,
            '```[██████████████████████████████████████████] 70%``` ⏳'            ,
            '```[██████████████████████████████████████████████] 80%``` ⏳'        ,
            '```[██████████████████████████████████████████████████] 90%``` ⏳'    ,
            '```[████████████████████████████████████████████████████] 100%``` ✅',
            '',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Command Execution: Complete!* 🎯',
            '',
            '*📡 Transmitting data...* 📤',
            '_🕵️‍♂️ Ensuring stealth..._ 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '',
            '⚠️ *Note:* All actions are for demonstration purposes only.',
            '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
            '',
            '> *SUBZERO-HACKING-COMPLETE ☣*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});


cmd({
  'pattern': "rcolor",
  'react': "🎨",
  'alias':"randomcolour",
  'desc': "Generate a random color with name and code.",
  'category': "utility",
  'filename': __filename
}, async (_0xdb9b4f, _0x1dc91a, _0x232196, {
  reply: _0x82e9b2
}) => {
  try {
    const _0xb13dc7 = ["Red", 'Green', "Blue", "Yellow", 'Orange', 'Purple', 'Pink', 'Brown', 'Black', "White", "Gray", "Cyan", "Magenta", 'Violet', "Indigo", "Teal", 'Lavender', "Turquoise"];
    const _0x256030 = '#' + Math.floor(Math.random() * 0xffffff).toString(0x10);
    const _0x5d0cef = _0xb13dc7[Math.floor(Math.random() * _0xb13dc7.length)];
    _0x82e9b2("🎨 *\`SUBZERO MD RANDOM COLOUR:\`* \n\nColour Name: " + _0x5d0cef + "\nCode: " + _0x256030);
  } catch (_0x563257) {
    console.error("Error in .randomcolor command:", _0x563257);
    _0x82e9b2("❌ An error occurred while generating the random color.");
  }
});
cmd({
  'pattern': "binary",
  'react': "🤹‍♂️",
  'desc': "Convert text into binary format.",
  'category': 'utility',
  'filename': __filename
}, async (_0x3249b3, _0x7a9df9, _0x3dccce, {
  args: _0x1d50f3,
  reply: _0x20adfd
}) => {
  try {
    if (!_0x1d50f3.length) {
      return _0x20adfd("❌ Please provide the text to convert to binary.");
    }
    const _0x12ab54 = _0x1d50f3.join(" ");
    const _0x63c851 = _0x12ab54.split('').map(_0x41ab34 => {
      return ("00000000" + _0x41ab34.charCodeAt(0x0).toString(0x2)).slice(-0x8);
    }).join(" ");
    _0x20adfd(" *\`Subzero Binary Representation:\`* \n\n" + _0x63c851);
  } catch (_0x307dbc) {
    console.error("Error in .binary command:", _0x307dbc);
    _0x20adfd("❌ An error occurred while converting to binary.");
  }
});
cmd({
  'pattern': "dbinary",
  'react': "🧩",
  'desc': "Decode binary string into text.",
  'category': "utility",
  'filename': __filename
}, async (_0x5ef941, _0x158713, _0x4b75b0, {
  args: _0x359424,
  reply: _0x1fc9a9
}) => {
  try {
    if (!_0x359424.length) {
      return _0x1fc9a9("❌ Please provide the binary string to decode.");
    }
    const _0x1e16b2 = _0x359424.join(" ");
    const _0x26dbbd = _0x1e16b2.split(" ").map(_0x1bbd2b => {
      return String.fromCharCode(parseInt(_0x1bbd2b, 0x2));
    }).join('');
    _0x1fc9a9("*\`Subzero Decoded Text:\`* \n\n" + _0x26dbbd);
  } catch (_0xbe47d3) {
    console.error("Error in .binarydecode command:", _0xbe47d3);
    _0x1fc9a9("❌ An error occurred while decoding the binary string.");
  }
});
cmd({
  'pattern': "encode",
  'react': "🧩",
  'desc': "Encode text into Base64 format.",
  'category': "utility",
  'filename': __filename
}, async (_0x4adb24, _0x673c52, _0x53b711, {
  args: _0xc44ee1,
  reply: _0x451688
}) => {
  try {
    if (!_0xc44ee1.length) {
      return _0x451688("❌ Please provide the text to encode into Base64.");
    }
    const _0x3ffe51 = _0xc44ee1.join(" ");
    const _0x3a1e80 = Buffer.from(_0x3ffe51).toString("base64");
    _0x451688(" *\`Encoded Base64 Text:\`* \n\n" + _0x3a1e80);
  } catch (_0x2abb38) {
    console.error("Error in .encode command:", _0x2abb38);
    _0x451688("❌ An error occurred while encoding the text into Base64.");
  }
});
cmd({
  'pattern': 'decode',
  'react': "🤹‍♂️",
  'desc': "Decode Base64 encoded text.",
  'category': "utility",
  'filename': __filename
}, async (_0x1089b2, _0x9b388b, _0x101929, {
  args: _0x4fb23d,
  reply: _0xe552ef
}) => {
  try {
    if (!_0x4fb23d.length) {
      return _0xe552ef("❌ Please provide the Base64 encoded text to decode.");
    }
    const _0x5c819 = _0x4fb23d.join(" ");
    const _0x529359 = Buffer.from(_0x5c819, "base64").toString("utf-8");
    _0xe552ef("*\`Subzero Decoded Text:\`* \n\n" + _0x529359);
  } catch (_0x28b6de) {
    console.error("Error in .decode command:", _0x28b6de);
    _0xe552ef("❌ An error occurred while decoding the Base64 text.");
  }
});
cmd({
  'pattern': "urlencode",
  'desc': "Encode text into URL encoding.",
  'category': 'utility',
  'filename': __filename
}, async (_0x1b66a1, _0x5ea663, _0x4703fd, {
  args: _0x26d2aa,
  reply: _0x12589d
}) => {
  try {
    if (!_0x26d2aa.length) {
      return _0x12589d("❌ Please provide the text to encode into URL encoding.");
    }
    const _0x2ed7cc = _0x26d2aa.join(" ");
    const _0x35903e = encodeURIComponent(_0x2ed7cc);
    _0x12589d(" *Encoded URL Text:* \n" + _0x35903e);
  } catch (_0x380f20) {
    console.error("Error in .urlencode command:", _0x380f20);
    _0x12589d("❌ An error occurred while encoding the text.");
  }
});
cmd({
  'pattern': 'urldecode',
  'desc': "Decode URL encoded text.",
  'category': "utility",
  'filename': __filename
}, async (_0xebbefb, _0x141da6, _0x30d208, {
  args: _0x297082,
  reply: _0x585056
}) => {
  try {
    if (!_0x297082.length) {
      return _0x585056("❌ Please provide the URL encoded text to decode.");
    }
    const _0x17faba = _0x297082.join(" ");
    const _0x23cd98 = decodeURIComponent(_0x17faba);
    _0x585056("🔓 *Decoded Text:* \n" + _0x23cd98);
  } catch (_0x49aa11) {
    console.error("Error in .urldecode command:", _0x49aa11);
    _0x585056("❌ An error occurred while decoding the URL encoded text.");
  }
});
cmd({
  'pattern': "roll",
  'desc': "Roll a dice (1-6).",
  'category': 'fun',
  'filename': __filename
}, async (_0x52291b, _0x3b2718, _0x263aad, {
  reply: _0x2f786c
}) => {
  try {
    const _0xc66607 = Math.floor(Math.random() * 0x6) + 0x1;
    _0x2f786c("🎲 You rolled: *" + _0xc66607 + '*');
  } catch (_0xfc9684) {
    console.error("Error in .roll command:", _0xfc9684);
    _0x2f786c("❌ An error occurred while rolling the dice.");
  }
});
cmd({
  'pattern': "coinflip",
  'desc': "Flip a coin and get Heads or Tails.",
  'category': "fun",
  'filename': __filename
}, async (_0x43388c, _0x1f1a6d, _0x11ed37, {
  reply: _0x3ce285
}) => {
  try {
    const _0x264649 = Math.random() < 0.5 ? "Heads" : "Tails";
    _0x3ce285("🪙 Coin Flip Result: *" + _0x264649 + '*');
  } catch (_0x233808) {
    console.error("Error in .coinflip command:", _0x233808);
    _0x3ce285("❌ An error occurred while flipping the coin.");
  }
});
cmd({
  'pattern': "flip",
  'desc': "Flip the text you provide.",
  'category': 'fun',
  'filename': __filename
}, async (_0x2ce830, _0x36a68e, _0x89c2b5, {
  args: _0x4a0544,
  reply: _0x20d297
}) => {
  try {
    if (!_0x4a0544.length) {
      return _0x20d297("❌ Please provide the text to flip.");
    }
    const _0x8d1e25 = _0x4a0544.join(" ").split('').reverse().join('');
    _0x20d297("🔄 Flipped Text: *" + _0x8d1e25 + '*');
  } catch (_0x57be85) {
    console.error("Error in .flip command:", _0x57be85);
    _0x20d297("❌ An error occurred while flipping the text.");
  }
});
cmd({
  'pattern': "pick",
  'desc': "Pick between two choices.",
  'category': "fun",
  'filename': __filename
}, async (_0x3d4e6f, _0x59fa22, _0x231495, {
  args: _0x5915c6,
  reply: _0x92f526
}) => {
  try {
    if (_0x5915c6.length < 0x2) {
      return _0x92f526("❌ Please provide two choices to pick from. Example: `.pick Ice Cream, Pizza`");
    }
    const _0xb7816c = _0x5915c6.join(" ").split(',')[Math.floor(Math.random() * 0x2)].trim();
    _0x92f526("🎉 Bot picks: *" + _0xb7816c + '*');
  } catch (_0x5a875f) {
    console.error("Error in .pick command:", _0x5a875f);
    _0x92f526("❌ An error occurred while processing your request.");
  }
});
cmd({
  'pattern': "timenow",
  'desc': "Check the current local time.",
  'category': "utility",
  'filename': __filename
}, async (_0x9a07a0, _0x44fd28, _0x70d7c, {
  reply: _0x2cf87c
}) => {
  try {
    const _0x265dd6 = new Date();
    const _0x624003 = _0x265dd6.toLocaleTimeString("en-US", {
      'hour': '2-digit',
      'minute': "2-digit",
      'second': '2-digit',
      'hour12': true,
      'timeZone': "Africa/Harare"
    });
    _0x2cf87c("🕒 Current Local Time in Zimbabwe6: " + _0x624003);
  } catch (_0x39a156) {
    console.error("Error in .timenow command:", _0x39a156);
    _0x2cf87c("❌ An error occurred. Please try again later.");
  }
});
cmd({
  'pattern': 'date',
  'desc': "Check the current date.",
  'category': "utility",
  'filename': __filename
}, async (_0x33d0b2, _0x464ab3, _0xa1f520, {
  reply: _0x2f4fd4
}) => {
  try {
    const _0x11f490 = new Date();
    const _0x5987f3 = _0x11f490.toLocaleDateString('en-US', {
      'weekday': 'long',
      'year': "numeric",
      'month': 'long',
      'day': "numeric"
    });
    _0x2f4fd4("📅 Current Date: " + _0x5987f3);
  } catch (_0x2ed4a8) {
    console.error("Error in .date command:", _0x2ed4a8);
    _0x2f4fd4("❌ An error occurred. Please try again later.");
  }
});
cmd({
  'pattern': 'shapar',
  'desc': "Send shapar ASCII art with mentions.",
  'category': 'fun',
  'filename': __filename
}, async (_0x36fc22, _0x5e5045, _0x46ed7e, {
  from: _0x4a95e9,
  isGroup: _0x4545db,
  reply: _0x2c6281
}) => {
  try {
    if (!_0x4545db) {
      return _0x2c6281("This command can only be used in groups.");
    }
    const _0x11404d = _0x46ed7e.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"]?.[0x0];
    if (!_0x11404d) {
      return _0x2c6281("Please mention a user to send the ASCII art to.");
    }
    const _0x359ce7 = "😂 @" + _0x11404d.split('@')[0x0] + "!\n😂 that for you:\n\n" + "\n          _______\n       .-'       '-.\n      /           /|\n     /           / |\n    /___________/  |\n    |   _______ |  |\n    |  |  \\ \\  ||  |\n    |  |   \\ \\ ||  |\n    |  |____\\ \\||  |\n    |  '._  _.'||  |\n    |    .' '.  ||  |\n    |   '.___.' ||  |\n    |___________||  |\n    '------------'  |\n     \\_____________\\|\n";
    await _0x36fc22.sendMessage(_0x4a95e9, {
      'text': _0x359ce7,
      'mentions': [_0x11404d]
    }, {
      'quoted': _0x46ed7e
    });
  } catch (_0x57e7a8) {
    console.error("Error in .shapar command:", _0x57e7a8);
    _0x2c6281("An error occurred while processing the command. Please try again.");
  }
});
cmd({
  'pattern': "rate",
  'desc': "Rate someone out of 10.",
  'category': "fun",
  'filename': __filename
}, async (_0x54e566, _0x542197, _0x533c27, {
  from: _0x8dd0a,
  isGroup: _0x5485c0,
  reply: _0x4c482a
}) => {
  try {
    if (!_0x5485c0) {
      return _0x4c482a("This command can only be used in groups.");
    }
    const _0x206461 = _0x533c27.message.extendedTextMessage?.["contextInfo"]?.['mentionedJid']?.[0x0];
    if (!_0x206461) {
      return _0x4c482a("Please mention someone to rate.");
    }
    const _0x2ccf17 = Math.floor(Math.random() * 0xa) + 0x1;
    const _0x2febc0 = '@' + _0x206461.split('@')[0x0] + " is rated " + _0x2ccf17 + '/10.';
    await _0x54e566.sendMessage(_0x8dd0a, {
      'text': _0x2febc0,
      'mentions': [_0x206461]
    }, {
      'quoted': _0x533c27
    });
  } catch (_0xfc2d68) {
    console.error("Error in .rate command:", _0xfc2d68);
    _0x4c482a("An error occurred. Please try again.");
  }
});
cmd({
  'pattern': "countx",
  'desc': "Start a reverse countdown from the specified number to 1.",
  'category': 'owner',
  'filename': __filename
}, async (_0x463a1d, _0x2de13d, _0x574864, {
  args: _0x446409,
  reply: _0x467ce5,
  senderNumber: _0x296132
}) => {
  try {
    const _0x42aa6c = _0x463a1d.user.id.split(':')[0x0];
    if (_0x296132 !== _0x42aa6c) {
      return _0x467ce5("❎ Only the bot owner can use this command.");
    }
    if (!_0x446409[0x0]) {
      return _0x467ce5("✳️ Use this command like:\n *Example:* .countx 10");
    }
    const _0x597580 = parseInt(_0x446409[0x0].trim());
    if (isNaN(_0x597580) || _0x597580 <= 0x0 || _0x597580 > 0x32) {
      return _0x467ce5("❎ Please specify a valid number between 1 and 50.");
    }
    _0x467ce5("⏳ Starting reverse countdown from " + _0x597580 + "...");
    for (let _0x25839e = _0x597580; _0x25839e >= 0x1; _0x25839e--) {
      await _0x463a1d.sendMessage(_0x574864.chat, {
        'text': '' + _0x25839e
      }, {
        'quoted': _0x2de13d
      });
      await sleep(0x3e8);
    }
    _0x467ce5("✅ Countdown completed.");
  } catch (_0x1dc26f) {
    console.error(_0x1dc26f);
    _0x467ce5("❎ An error occurred while processing your request.");
  }
});
cmd({
  'pattern': "count",
  'desc': "Start a countdown from 1 to the specified number.",
  'category': 'owner',
  'filename': __filename
}, async (_0xd830cf, _0x801616, _0x37ccd0, {
  args: _0x21c31e,
  reply: _0x19288f,
  senderNumber: _0x2825a0
}) => {
  try {
    const _0x2c980a = _0xd830cf.user.id.split(':')[0x0];
    if (_0x2825a0 !== _0x2c980a) {
      return _0x19288f("❎ Only the bot owner can use this command.");
    }
    if (!_0x21c31e[0x0]) {
      return _0x19288f("✳️ Use this command like:\n *Example:* .count 10");
    }
    const _0xb11b58 = parseInt(_0x21c31e[0x0].trim());
    if (isNaN(_0xb11b58) || _0xb11b58 <= 0x0 || _0xb11b58 > 0x32) {
      return _0x19288f("❎ Please specify a valid number between 1 and 50.");
    }
    _0x19288f("⏳ Starting countdown to " + _0xb11b58 + "...");
    for (let _0x14e304 = 0x1; _0x14e304 <= _0xb11b58; _0x14e304++) {
      await _0xd830cf.sendMessage(_0x37ccd0.chat, {
        'text': '' + _0x14e304
      }, {
        'quoted': _0x801616
      });
      await sleep(0x3e8);
    }
    _0x19288f("✅ Countdown completed.");
  } catch (_0x48e78b) {
    console.error(_0x48e78b);
    _0x19288f("❎ An error occurred while processing your request.");
  }
});
cmd({
  'pattern': 'calculate',
  'alias': ['calc'],
  'desc': "Evaluate a mathematical expression.",
  'category': "utilities",
  'filename': __filename
}, async (_0x1cbb24, _0x5a22db, _0xb97cd9, {
  args: _0x62506a,
  reply: _0x552cd6
}) => {
  try {
    if (!_0x62506a[0x0]) {
      return _0x552cd6("✳️ Use this command like:\n *Example:* .calculate 5+3*2");
    }
    const _0x434def = _0x62506a.join(" ").trim();
    if (!/^[0-9+\-*/().\s]+$/.test(_0x434def)) {
      return _0x552cd6("❎ Invalid expression. Only numbers and +, -, *, /, ( ) are allowed.");
    }
    let _0x4fe8b9;
    try {
      _0x4fe8b9 = eval(_0x434def);
    } catch (_0x500df3) {
      return _0x552cd6("❎ Error in calculation. Please check your expression.");
    }
    _0x552cd6("✅ Result of \"" + _0x434def + "\" is: " + _0x4fe8b9);
  } catch (_0x205272) {
    console.error(_0x205272);
    _0x552cd6("❎ An error occurred while processing your request.");
  }
});


cmd({
  pattern: "joke",
  desc: "😂 Get a random joke",
  react: "🤣",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { reply }) => {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    const joke = response.data;

    if (!joke || !joke.setup || !joke.punchline) {
      return reply("❌ Failed to fetch a joke. Please try again.");
    }

    const jokeMessage = `🤣 *Here's a random joke for you!* 🤣\n\n*${joke.setup}*\n\n${joke.punchline} 😆\n\n> *© ᴄᴏᴏᴋᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ*`;

    return reply(jokeMessage);
  } catch (error) {
    console.error("❌ Error in joke command:", error);
    return reply("⚠️ An error occurred while fetching the joke. Please try again.");
  }
});

// flirt

cmd({
    pattern: "flirt",
    alias: ["masom", "line"],
    desc: "Get a random flirt or pickup line.",
    react: "💘",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // Define API key and URL
        const shizokeys = 'shizo';
        const apiUrl = `https://shizoapi.onrender.com/api/texts/flirt?apikey=${shizokeys}`;

        // Fetch data from the API
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw new Error(`API error: ${await res.text()}`);
        }
        
        const json = await res.json();
        if (!json.result) {
            throw new Error("Invalid response from API.");
        }

        // Extract and send the flirt message
        const flirtMessage = `${json.result}`;
        await conn.sendMessage(from, {
            text: flirtMessage,
            mentions: [m.sender],
        }, { quoted: m });

    } catch (error) {
        console.error("Error in flirt command:", error);
        reply("Sorry, something went wrong while fetching the flirt line. Please try again later.");
    }
});

//truth

cmd({
    pattern: "truth",
    alias: ["truthquestion"],
    desc: "Get a random truth question from the API.",
    react: "❓",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/truth?apikey=${shizokeys}`);
        
        if (!res.ok) {
            console.error(`API request failed with status ${res.status}`);
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        if (!json.result) {
            console.error("Invalid API response: No 'result' field found.");
            throw new Error("Invalid API response: No 'result' field found.");
        }

        const truthText = `${json.result}`;
        await conn.sendMessage(from, { 
            text: truthText, 
            mentions: [m.sender] 
        }, { quoted: m });

    } catch (error) {
        console.error("Error in truth command:", error);
        reply("Sorry, something went wrong while fetching the truth question. Please try again later.");
    }
});

// dare

cmd({
    pattern: "dare",
    alias: ["truthordare"],
    desc: "Get a random dare from the API.",
    react: "🎯",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // API Key
        const shizokeys = 'shizo';

        // Fetch dare text from the API
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=${shizokeys}`);
        
        if (!res.ok) {
            console.error(`API request failed with status ${res.status}`);
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        if (!json.result) {
            console.error("Invalid API response: No 'result' field found.");
            throw new Error("Invalid API response: No 'result' field found.");
        }

        // Format the dare message
        const dareText = `${json.result}`;

        // Send the dare to the chat
        await conn.sendMessage(from, { 
            text: dareText, 
            mentions: [m.sender] 
        }, { quoted: m });

    } catch (error) {
        console.error("Error in dare command:", error);
        reply("Sorry, something went wrong while fetching the dare. Please try again later.");
    }
});

cmd({
  pattern: "fact",
  desc: "🧠 Get a random fun fact",
  react: "🧠",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { reply }) => {
  try {
    const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
    const fact = response.data.text;

    if (!fact) {
      return reply("❌ Failed to fetch a fun fact. Please try again.");
    }

    const factMessage = `🧠 *Random Fun Fact* 🧠\n\n${fact}\n\nIsn't that interesting? 😄\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ*`;

    return reply(factMessage);
  } catch (error) {
    console.error("❌ Error in fact command:", error);
    return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
  }
});

cmd({
    pattern: "pickupline",
    alias: ["pickup"],
    desc: "Get a random pickup line from the API.",
    react: "💬",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // Fetch pickup line from the API
        const res = await fetch('https://api.popcat.xyz/pickuplines');
        
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        // Log the API response (for debugging purposes)
        console.log('JSON response:', json);

        // Format the pickup line message
        const pickupLine = `*Here's a pickup line for you:*\n\n"${json.pickupline}"\n\n> *© ᴅʀᴏᴘᴘᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ*`;

        // Send the pickup line to the chat
        await conn.sendMessage(from, { text: pickupLine }, { quoted: m });

    } catch (error) {
        console.error("Error in pickupline command:", error);
        reply("Sorry, something went wrong while fetching the pickup line. Please try again later.");
    }
});

// char

cmd({
    pattern: "character",
    alias: ["char"],
    desc: "Check the character of a mentioned user.",
    react: "🔥",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, text, reply }) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Extract the mentioned user
        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) {
            return reply("Please mention a user whose character you want to check.");
        }

        // Define character traits
        const userChar = [
            "Sigma",
            "Generous",
            "Grumpy",
            "Overconfident",
            "Obedient",
            "Good",
            "Simp",
            "Kind",
            "Patient",
            "Pervert",
            "Cool",
            "Helpful",
            "Brilliant",
            "Sexy",
            "Hot",
            "Gorgeous",
            "Cute",
        ];

        // Randomly select a character trait
        const userCharacterSelection =
            userChar[Math.floor(Math.random() * userChar.length)];

        // Message to send
        const message = `Character of @${mentionedUser.split("@")[0]} is *${userCharacterSelection}* 🔥⚡`;

        // Send the message with mentions
        await conn.sendMessage(from, {
            text: message,
            mentions: [mentionedUser],
        }, { quoted: m });

    } catch (e) {
        console.error("Error in character command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});

cmd({
  pattern: "repeat",
  alias: ["rp", "rpm"],
  desc: "Repeat a message a specified number of times.",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { args, reply }) => {
  try {
    if (!args[0]) {
      return reply("✳️ Use this command like:\n*Example:* .repeat 10,I love you");
    }

    const [countStr, ...messageParts] = args.join(" ").split(",");
    const count = parseInt(countStr.trim());
    const message = messageParts.join(",").trim();

    if (isNaN(count) || count <= 0 || count > 300) {
      return reply("❎ Please specify a valid number between 1 and 300.");
    }

    if (!message) {
      return reply("❎ Please provide a message to repeat.");
    }

    const repeatedMessage = Array(count).fill(message).join("\n");

    reply(`🔄 Repeated ${count} times:\n\n${repeatedMessage}`);
  } catch (error) {
    console.error("❌ Error in repeat command:", error);
    reply("❎ An error occurred while processing your request.");
  }
});

cmd({
  pattern: "sendtext",
  desc: "Send a message multiple times, one by one.",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { args, reply, senderNumber }) => {
  try {
    const botOwner = conn.user.id.split(":")[0]; // Get bot owner's number

    if (senderNumber !== botOwner) {
      return reply("❎ Only the bot owner can use this command.");
    }

    if (!args[0]) {
      return reply("✳️ Use this command like:\n *Example:* .send 10,I love you");
    }

    const [countStr, ...messageParts] = args.join(" ").split(",");
    const count = parseInt(countStr.trim());
    const message = messageParts.join(",").trim();

    if (isNaN(count) || count <= 0 || count > 100) {
      return reply("❎ Please specify a valid number between 1 and 100.");
    }

    if (!message) {
      return reply("❎ Please provide a message to send.");
    }

    reply(`⏳ Sending "${message}" ${count} times. This may take a while...`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(m.from, { text: message }, { quoted: m });
      await sleep(1000); // 1-second delay
    }

    reply(`✅ Successfully sent the message ${count} times.`);
  } catch (error) {
    console.error("❌ Error in ask command:", error);
    reply("❎ An error occurred while processing your request.");
  }
});

cmd({
  pattern: "readmore",
  alias: ["rm", "rmore", "readm"],
  desc: "Generate a Read More message.",
  category: "convert",
  use: ".readmore <text>",
  react: "📝",
  filename: __filename
}, async (conn, m, store, { args, reply }) => {
  try {
    const inputText = args.join(" ") || "No text provided.";
    const readMore = String.fromCharCode(8206).repeat(4000); // Creates a large hidden gap
    const message = `${inputText} ${readMore} Continue Reading...`;

    await conn.sendMessage(m.from, { text: message }, { quoted: m });
  } catch (error) {
    console.error("❌ Error in readmore command:", error);
    reply("❌ An error occurred: " + error.message);
  }
});




cmd({
  pattern: "riddle",
  alias: ["puzzle", "brainteaser"],
  desc: "Get a random riddle with 4 possible answers. The correct answer is revealed after 15 seconds.",
  category: "utility",
  use: ".riddle",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    // Fetch a random riddle from the API
    const response = await axios.get("https://riddles-api.vercel.app/random");
    const { riddle, answer } = response.data;

    // Generate 4 options (1 correct and 3 random incorrect ones)
    const options = await generateOptions(answer);

    // Format the riddle message with options
    const riddleMessage = `
🤔 *Riddle*: ${riddle}

🅰️ ${options[0]}
🅱️ ${options[1]}
🅾️ ${options[2]}
🆎 ${options[3]}

⏳ The answer will be revealed in 15 seconds...
    `;

    // Send the riddle message
    await reply(riddleMessage);

    // Wait for 15 seconds before revealing the answer
    setTimeout(async () => {
      const answerMessage = `
🎉 *Answer*: ${answer}

💡 *Explanation*: If you got it right, well done! If not, better luck next time!
      `;
      await reply(answerMessage);
    }, 15000); // 15 seconds delay
  } catch (error) {
    console.error("Error fetching riddle:", error);

    // Send an error message
    reply("❌ Unable to fetch a riddle. Please try again later.");
  }
});

// Helper function to generate 4 options (1 correct and 3 random incorrect ones)
async function generateOptions(correctAnswer) {
  try {
    // Fetch random words or incorrect answers from an API (e.g., Random Word API)
    const randomWordsResponse = await axios.get("https://random-word-api.herokuapp.com/word?number=3");
    const randomWords = randomWordsResponse.data;

    // Combine the correct answer with 3 random words
    const options = [correctAnswer, ...randomWords];

    // Shuffle the options to randomize their order
    return shuffleArray(options);
  } catch (error) {
    console.error("Error generating options:", error);
    // Fallback to simple options if the API fails
    return [correctAnswer, "A shadow", "A whistle", "A cloud"];
  }
}

// Helper function to shuffle an array (for randomizing options)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


cmd({
  pattern: "quote",
  react: "💬",
  alias: ["randomquote", "inspire"],
  desc: "Get a random inspirational quote.",
  category: "utility",
  use: ".quote",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply, react }) => {
  try {
    // Add a reaction to indicate the bot is processing the request
   // await react("⏳"); // Hourglass emoji for processing

    // Fetch a random quote from the Forismatic API
    const response = await axios.get("http://api.forismatic.com/api/1.0/", {
      params: {
        method: "getQuote",
        format: "json",
        lang: "en",
      },
    });

    const { quoteText, quoteAuthor } = response.data;

    // Format the quote message with emojis and footer
    const quoteMessage = `
✨ *Quote*: ${quoteText}

👤 *Author*: ${quoteAuthor || "Unknown"}

─────────────────
> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ
    `;

    // Send the formatted message
    await reply(quoteMessage);

    // Add a success reaction
  //  await react("✅"); // Checkmark emoji for success
  } catch (error) {
    console.error("Error fetching quote:", error);

    // Add an error reaction
  //  await react("❌"); // Cross mark emoji for failure

    // Send an error message
    reply("❌ Unable to fetch a quote. Please try again later.");
  }
});


cmd({
  pattern: 'quiz',
  alias: ['q'],
  desc: 'Fetches a quiz question from an API and presents it to the user.',
  category: 'utility',
  use: '.quiz',
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    // Fetch a quiz question from the API
    const response = await axios.get('https://the-trivia-api.com/v2/questions?limit=1');
    const questionData = response.data[0];

    if (!questionData) {
      return reply('❌ Failed to fetch a quiz question. Please try again later.');
    }

    const { question, correctAnswer, incorrectAnswers } = questionData;
    const options = [...incorrectAnswers, correctAnswer];
    shuffleArray(options);

    // Send the question and options to the user
    const optionsText = options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
    await reply(`🎯 *Question:* ${question.text}\n\n${optionsText}\n\nYou have 20 seconds to answer. Reply with the letter corresponding to your choice.`);

    // Set a timeout to handle the 20-second response window
    const timeout = setTimeout(() => {
      reply(`⏰ Time's up! The correct answer was: ${correctAnswer}`);
    }, 20000);

    // Listen for the user's response
    const filter = (response) => response.key.from === from && /^[A-Da-d]$/.test(response.text);
    const collected = await conn.awaitMessages({ filter, time: 20000, max: 1 });

    clearTimeout(timeout);

    if (collected.size === 0) {
      return reply(`⏰ Time's up! The correct answer was: ${correctAnswer}`);
    }

    const userAnswer = collected.first().text.toUpperCase();
    const isCorrect = options[userAnswer.charCodeAt(0) - 65] === correctAnswer;

    if (isCorrect) {
      return reply('✅ Correct!');
    } else {
      return reply(`❌ Incorrect. The correct answer was: ${correctAnswer}`);
    }
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    reply('❌ Failed to fetch quiz data. Please try again later.');
  }
});

// Shuffle an array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



cmd({
    pattern: "nsfw", // Nom de la commande
    desc: "Display a list of NSFW options",
    category: "fun",
    use: '.nsfw',
    react: "🔥", // Réaction ajoutée
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Liste des options NSFW
        const nsfwList = `
   *❦ \`ＳＵＢＺＥＲＯ ＳＥＸＹ ＨＵＢ.🎀🍭\`*

1️⃣ *EJACULATION💦*
2️⃣ *PENIS🍆*
3️⃣ *EREC🌭*
4️⃣ *NUDE🍜*
5️⃣ *SEX🫦*
6️⃣ *CUTE🩷*
7️⃣ *ORGASM🌊*
8️⃣ *ANAL🕳️*
9️⃣ *SUSPENSION🍑*
1️⃣0️⃣ *KISS💋*

────────────────
*_Simply type the number corresponding to the option you'd like to choose._*
────────────────
⚠️\`[NOTICE]\` 
*By Continueing You Agree that you are 18+ .*`;

        // URL image for NSFW
        const imageUrl = 'https://i.ibb.co/j8hv83f/Manul-Ofc-X.jpg';

        // Envoi de la liste avec l'image et la légende
        await conn.sendMessage(from, {
            text: nsfwList,
            caption: 'Choose one from the list above!',
            image: { url: imageUrl }
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply('❌ An error occurred while processing your request.');
    }
});
cmd({
    pattern: "ejaculation", // Nom de la commande
    desc: "Fetch a NSFW image related to the command",
    category: "fun",
    use: '.ejaculation',
    react: "🔥",
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API
        const apiURL = `https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=ejaculation`;
        
        // Récupérer l'image via l'API
        const response = await axios.get(apiURL);

        if (response.data && response.data.image_url) {
            const imageUrl = response.data.image_url;

            // Envoi de l'image avec le caption
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: `Here your ${command} image 🔞🍆🍑.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋🍑🔞.`,
            }, { quoted: mek });
        } else {
            await reply('❌ No image found for this category.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while fetching the image.');
    }
});
cmd({
    pattern: "penis", // Nom de la commande
    desc: "Fetch a NSFW image related to the command",
    category: "fun",
    use: '.penis',
    react: "🍑",
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API
        const apiURL = `https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=penis_under_skirt`;
        
        // Récupérer l'image via l'API
        const response = await axios.get(apiURL);

        if (response.data && response.data.image_url) {
            const imageUrl = response.data.image_url;

            // Envoi de l'image avec le caption
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: `Here your ${command} image 🔞🍆🍑.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋🍑🔞.`,
            }, { quoted: mek });
        } else {
            await reply('❌ No image found for this category.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while fetching the image.');
    }
});
cmd({
    pattern: "erec", // Nom de la commande
    desc: "Fetch a NSFW image related to the command",
    category: "fun",
    use: '.erec',
    react: "🍑",
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API
        const apiURL = `https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=erect_nipple`;
        
        // Récupérer l'image via l'API
        const response = await axios.get(apiURL);

        if (response.data && response.data.image_url) {
            const imageUrl = response.data.image_url;

            // Envoi de l'image avec le caption
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: `Here your ${command} image 🔞🍆🍑.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋🍑🔞.`,
            }, { quoted: mek });
        } else {
            await reply('❌ No image found for this category.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while fetching the image.');
    }
});
cmd({
    pattern: "nude", // Nom de la commande
    desc: "Display a nude NSFW image",
    category: "fun",
    use: '.nude',
    react: "🔥", // Réaction ajoutée
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API pour obtenir l'image de la catégorie "nude"
        const apiUrl = 'https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=nude';

        // Faire une requête à l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Vérification des données reçues
        if (data && data.image) {
            const imageUrl = data.image; // URL de l'image reçue depuis l'API

            // Envoi de l'image dans le chat
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: 'Here is your nude NSFW image 🔞🔥.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋🔥🔞.'
            }, { quoted: mek });
        } else {
            reply('❌ Unable to fetch image. Please try again later.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while processing your request.');
    }
});
cmd({
    pattern: "sex", // Nom de la commande
    desc: "Display a NSFW sex image",
    category: "fun",
    use: '.sex',
    react: "🔥", // Réaction ajoutée
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API pour obtenir l'image de la catégorie "sex"
        const apiUrl = 'https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=sex';

        // Faire une requête à l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Vérification des données reçues
        if (data && data.image) {
            const imageUrl = data.image; // URL de l'image reçue depuis l'API

            // Envoi de l'image dans le chat
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: 'Here is your sex NSFW image 🔞🔥.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋🔥🔞.'
            }, { quoted: mek });
        } else {
            reply('❌ Unable to fetch image. Please try again later.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while processing your request.');
    }
});
cmd({
    pattern: "cute", // Nom de la commande
    desc: "Display a NSFW cute image",
    category: "fun",
    use: '.cute',
    react: "🌸", // Réaction ajoutée
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API pour obtenir l'image de la catégorie "cute"
        const apiUrl = 'https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=cute';

        // Faire une requête à l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Vérification des données reçues
        if (data && data.image) {
            const imageUrl = data.image; // URL de l'image reçue depuis l'API

            // Envoi de l'image dans le chat
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: 'Here is your cute NSFW image 🔞💖.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋💖🔞.'
            }, { quoted: mek });
        } else {
            reply('❌ Unable to fetch image. Please try again later.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while processing your request.');
    }
});
cmd({
    pattern: "orgasm", // Nom de la commande
    desc: "Display a NSFW orgasm image",
    category: "fun",
    use: '.orgasm',
    react: "💥", // Réaction ajoutée
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API pour obtenir l'image de la catégorie "orgasm"
        const apiUrl = 'https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=orgasm';

        // Faire une requête à l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Vérification des données reçues
        if (data && data.image) {
            const imageUrl = data.image; // URL de l'image reçue depuis l'API

            // Envoi de l'image dans le chat
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: 'Here is your orgasm NSFW image 🔞💥.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋💥🔞.'
            }, { quoted: mek });
        } else {
            reply('❌ Unable to fetch image. Please try again later.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while processing your request.');
    }
});
cmd({
    pattern: "anal", // Nom de la commande
    desc: "Display a NSFW anal image",
    category: "fun",
    use: '.anal',
    react: "🔥", // Réaction ajoutée
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API pour obtenir l'image de la catégorie "anal_sex"
        const apiUrl = 'https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=anal_sex';

        // Faire une requête à l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Vérification des données reçues
        if (data && data.image) {
            const imageUrl = data.image; // URL de l'image reçue depuis l'API

            // Envoi de l'image dans le chat
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: 'Here is your anal NSFW image 🔞🔥.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋🔥🔞.'
            }, { quoted: mek });
        } else {
            reply('❌ Unable to fetch image. Please try again later.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while processing your request.');
    }
});
cmd({
    pattern: "suspension", // Nom de la commande
    desc: "Display a NSFW suspension image",
    category: "fun",
    use: '.suspension',
    react: "🔥", // Réaction ajoutée
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API pour obtenir l'image de la catégorie "suspension"
        const apiUrl = 'https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=suspension';

        // Faire une requête à l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Vérification des données reçues
        if (data && data.image) {
            const imageUrl = data.image; // URL de l'image reçue depuis l'API

            // Envoi de l'image dans le chat
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: 'Here is your suspension NSFW image 🔞🔥.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋🔥🔞.'
            }, { quoted: mek });
        } else {
            reply('❌ Unable to fetch image. Please try again later.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while processing your request.');
    }
});
cmd({
    pattern: "kiss", // Nom de la commande
    desc: "Display a NSFW kissing image",
    category: "fun",
    use: '.kiss',
    react: "💋", // Réaction ajoutée
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // URL de l'API pour obtenir l'image de la catégorie "kissing_while_penetrated"
        const apiUrl = 'https://pikabotzapi.vercel.app/anime-nsfw/hentai-images/?apikey=anya-md&category=kissing_while_penetrated';

        // Faire une requête à l'API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Vérification des données reçues
        if (data && data.image) {
            const imageUrl = data.image; // URL de l'image reçue depuis l'API

            // Envoi de l'image dans le chat
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: 'Here is your kiss NSFW image 🔞💋.\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Nᴀsᴛʏ SᴜʙZᴇʀᴏ😋💋🔞.'
            }, { quoted: mek });
        } else {
            reply('❌ Unable to fetch image. Please try again later.');
        }
    } catch (e) {
        console.error(e);
        await reply('❌ An error occurred while processing your request.')
    }
});




cmd({
    pattern: "meme",
    desc: "Generate random memes",
    alias: ["randommeme"],
    category: "fun",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Popular meme subreddits to pull from
        const subreddits = [
            'dankmemes',
            'memes',
            'wholesomememes',
            'ProgrammerHumor',
            'me_irl',
            'AdviceAnimals',
            'MemeEconomy',
            'comedyheaven',
            'terriblefacebookmemes',
            'funny'
        ];
        
        // Select random subreddit
        const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];
        
        // Get meme from API
        const { data } = await axios.get(`https://meme-api.com/gimme/${randomSub}`);
        
        if (!data.url) throw new Error('No meme found');
        
        // Send the meme image
        await conn.sendMessage(from, {
            image: { url: data.url },
            caption: `*${data.title}*\n\n> _From r/${data.subreddit}_`,
            contextInfo: {
                externalAdReply: {
                    title: "Random Meme Generator",
                    body: "Powered by Mr Frank 🦋",
                    thumbnail: { url: data.url }
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error('Meme Error:', error);
        reply('❌ Failed to get meme. Try again later!');
    }
});


cmd(
    {
        pattern: "cry",
        desc: "Send a crying reaction GIF.",
        category: "fun",
        react: "😢",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is crying over @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is crying!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/cry";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .cry command:", error);
            reply(`❌ *Error in .cry command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "cuddle",
        desc: "Send a cuddle reaction GIF.",
        category: "fun",
        react: "🤗",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} cuddled @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is cuddling everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/cuddle";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .cuddle command:", error);
            reply(`❌ *Error in .cuddle command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "bully",
        desc: "Send a bully reaction GIF.",
        category: "fun",
        react: "😈",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is bullying @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is bullying everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/bully";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .bully command:", error);
            reply(`❌ *Error in .bully command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "hug",
        desc: "Send a hug reaction GIF.",
        category: "fun",
        react: "🤗",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} hugged @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is hugging everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/hug";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .hug command:", error);
            reply(`❌ *Error in .hug command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


cmd(
    {
        pattern: "awoo",
        desc: "Send an awoo reaction GIF.",
        category: "fun",
        react: "🐺",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} awoos at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is awooing everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/awoo";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .awoo command:", error);
            reply(`❌ *Error in .awoo command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "lick",
        desc: "Send a lick reaction GIF.",
        category: "fun",
        react: "👅",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);

            let message = mentionedUser ? `${sender} licked @${mentionedUser.split("@")[0]}` : `${sender} licked themselves!`;

            const apiUrl = "https://api.waifu.pics/sfw/lick";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .lick command:", error);
            reply(`❌ *Error in .lick command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);
  
cmd(
    {
        pattern: "pat",
        desc: "Send a pat reaction GIF.",
        category: "fun",
        react: "🫂",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} patted @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is patting everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 `;

            const apiUrl = "https://api.waifu.pics/sfw/pat";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .pat command:", error);
            reply(`❌ *Error in .pat command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "smug",
        desc: "Send a smug reaction GIF.",
        category: "fun",
        react: "😏",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is smug at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is feeling smug!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 `;

            const apiUrl = "https://api.waifu.pics/sfw/smug";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .smug command:", error);
            reply(`❌ *Error in .smug command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "bonk",
        desc: "Send a bonk reaction GIF.",
        category: "fun",
        react: "🔨",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} bonked @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is bonking everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/bonk";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .bonk command:", error);
            reply(`❌ *Error in .bonk command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


cmd(
    {
        pattern: "yeet",
        desc: "Send a yeet reaction GIF.",
        category: "fun",
        react: "💨",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} yeeted @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is yeeting everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 🖤`;

            const apiUrl = "https://api.waifu.pics/sfw/yeet";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .yeet command:", error);
            reply(`❌ *Error in .yeet command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "blush",
        desc: "Send a blush reaction GIF.",
        category: "fun",
        react: "😊",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is blushing at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is blushing!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/blush";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .blush command:", error);
            reply(`❌ *Error in .blush command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);  
  
cmd(
    {
        pattern: "handhold",
        desc: "Send a hand-holding reaction GIF.",
        category: "fun",
        react: "🤝",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is holding hands with @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} wants to hold hands with everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 `;

            const apiUrl = "https://api.waifu.pics/sfw/handhold";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .handhold command:", error);
            reply(`❌ *Error in .handhold command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


cmd(
    {
        pattern: "highfive",
        desc: "Send a high-five reaction GIF.",
        category: "fun",
        react: "✋",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} gave a high-five to @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is high-fiving everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/highfive";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .highfive command:", error);
            reply(`❌ *Error in .highfive command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);  

cmd(
    {
        pattern: "nom",
        desc: "Send a nom reaction GIF.",
        category: "fun",
        react: "🍽️",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is nomming @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is nomming everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/nom";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .nom command:", error);
            reply(`❌ *Error in .nom command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "wave",
        desc: "Send a wave reaction GIF.",
        category: "fun",
        react: "👋",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} waved at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is waving at everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/wave";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .wave command:", error);
            reply(`❌ *Error in .wave command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "smile",
        desc: "Send a smile reaction GIF.",
        category: "fun",
        react: "😁",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} smiled at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is smiling at everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/smile";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .smile command:", error);
            reply(`❌ *Error in .smile command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "wink",
        desc: "Send a wink reaction GIF.",
        category: "fun",
        react: "😉",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} winked at @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is winking at everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/wink";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .wink command:", error);
            reply(`❌ *Error in .wink command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "happy",
        desc: "Send a happy reaction GIF.",
        category: "fun",
        react: "😊",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} is happy with @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is happy with everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 `;

            const apiUrl = "https://api.waifu.pics/sfw/happy";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .happy command:", error);
            reply(`❌ *Error in .happy command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "glomp",
        desc: "Send a glomp reaction GIF.",
        category: "fun",
        react: "🤗",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} glomped @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is glomping everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 `;

            const apiUrl = "https://api.waifu.pics/sfw/glomp";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .glomp command:", error);
            reply(`❌ *Error in .glomp command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "bite",
        desc: "Send a bite reaction GIF.",
        category: "fun",
        react: "🦷",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} bit @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is biting everyone!`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 `;

            const apiUrl = "https://api.waifu.pics/sfw/bite";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .bite command:", error);
            reply(`❌ *Error in .bite command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "poke",
        desc: "Send a poke reaction GIF.",
        category: "fun",
        react: "👉",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} poked @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} poked everyone`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 `;

            const apiUrl = "https://api.waifu.pics/sfw/poke";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .poke command:", error);
            reply(`❌ *Error in .poke command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);
  
  
cmd(
    {
        pattern: "cringe",
        desc: "Send a cringe reaction GIF.",
        category: "fun",
        react: "😬",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} thinks @${mentionedUser.split("@")[0]} is cringe`
                : isGroup
                ? `${sender} finds everyone cringe`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/cringe";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .cringe command:", error);
            reply(`❌ *Error in .cringe command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


cmd(
    {
        pattern: "dance",
        desc: "Send a dance reaction GIF.",
        category: "fun",
        react: "💃",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message = mentionedUser
                ? `${sender} danced with @${mentionedUser.split("@")[0]}`
                : isGroup
                ? `${sender} is dancing with everyone`
                : `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;

            const apiUrl = "https://api.waifu.pics/sfw/dance";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .dance command:", error);
            reply(`❌ *Error in .dance command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


  
cmd(
    {
        pattern: "kill",
        desc: "Send a kill reaction GIF.",
        category: "fun",
        react: "🔪",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message;
            if (mentionedUser) {
                let target = `@${mentionedUser.split("@")[0]}`;
                message = `${sender} killed ${target}`;
            } else if (isGroup) {
                message = `${sender} killed everyone`;
            } else {
                message = `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;
            }

            const apiUrl = "https://api.waifu.pics/sfw/kill";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .kill command:", error);
            reply(`❌ *Error in .kill command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "slap",
        desc: "Send a slap reaction GIF.",
        category: "fun",
        react: "✊",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message;
            if (mentionedUser) {
                let target = `@${mentionedUser.split("@")[0]}`;
                message = `${sender} slapped ${target}`;
            } else if (isGroup) {
                message = `${sender} slapped everyone`;
            } else {
                message = `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;
            }

            const apiUrl = "https://api.waifu.pics/sfw/slap";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .slap command:", error);
            reply(`❌ *Error in .slap command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);

cmd(
    {
        pattern: "kiss",
        desc: "Send a kiss reaction GIF.",
        category: "fun",
        react: "💋",
        filename: __filename,
        use: "@tag (optional)",
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let sender = `@${mek.sender.split("@")[0]}`;
            let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
            let isGroup = m.isGroup;

            let message;
            if (mentionedUser) {
                let target = `@${mentionedUser.split("@")[0]}`;
                message = `${sender} kissed ${target}`;
            } else if (isGroup) {
                message = `${sender} kissed everyone`;
            } else {
                message = `> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐔𝐁𝐙𝐄𝐑𝐎`;
            }

            const apiUrl = "https://api.waifu.pics/sfw/kiss";
            let res = await axios.get(apiUrl);
            let gifUrl = res.data.url;

            let gifBuffer = await fetchGif(gifUrl);
            let videoBuffer = await gifToVideo(gifBuffer);

            await conn.sendMessage(
                mek.chat,
                { video: videoBuffer, caption: message, gifPlayback: true, mentions: [mek.sender, mentionedUser].filter(Boolean) },
                { quoted: mek }
            );
        } catch (error) {
            console.error("❌ Error in .kiss command:", error);
            reply(`❌ *Error in .kiss command:*\n\`\`\`${error.message}\`\`\``);
        }
    }
);


cmd({
    pattern: "emix",
    desc: "Combine two emojis into a sticker.",
    category: "fun",
    react: "🔮",
    use: ".emix 😂,🙂",
    filename: __filename,
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q.includes(",")) {
            return reply("❌ *Usage:* .emix 😂,🙂\n_Send two emojis separated by a comma._");
        }

        let [emoji1, emoji2] = q.split(",").map(e => e.trim());

        if (!emoji1 || !emoji2) {
            return reply("❌ Please provide two emojis separated by a comma.");
        }

        let imageUrl = await fetchEmix(emoji1, emoji2);

        if (!imageUrl) {
            return reply("❌ Could not generate emoji mix. Try different emojis.");
        }

        let buffer = await getBuffer(imageUrl);
        let sticker = new Sticker(buffer, {
            pack: "sմճzҽɾօ ճօԵ",
            author: "ɱɾ ƒɾαɳҡ",
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            quality: 75,
            background: "transparent",
        });

        const stickerBuffer = await sticker.toBuffer();
        await conn.sendMessage(mek.chat, { sticker: stickerBuffer }, { quoted: mek });

    } catch (e) {
        console.error("Error in .emix command:", e.message);
        reply(`❌ Could not generate emoji mix: ${e.message}`);
    }
});
          





cmd({
  pattern: "didyouknow",
  react: "❓",
  alias: ["dyk", "fact", "randomfact"],
  desc: "Get a random fun fact.",
  category: "utility",
  use: ".didyouknow",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply, react }) => {
  try {
    // Add a reaction to indicate the bot is processing the request
  //  await react("⏳"); // Hourglass emoji for processing

    // Fetch a random fact from the API
    const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");

    const { text } = response.data;

    // Format the fact message with emojis and footer
    const factMessage = `
🤔 *Did You Know?* 

${text}

─────────────────
> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ
    `;

    // Send the formatted message
    await reply(factMessage);

    // Add a success reaction
  //  await react("✅"); // Checkmark emoji for success
  } catch (error) {
    console.error("Error fetching fact:", error);

    // Add an error reaction
 //   await react("❌"); // Cross mark emoji for failure

    // Send an error message
    reply("❌ Unable to fetch a fact. Please try again later.");
  }
});












// Connect to MongoDB
connectDB();

// Session cache (stores authenticated users)
const sessionCache = new NodeCache({ stdTTL: 3600 }); // Sessions expire after 1 hour (3600 seconds)

// Function to get Harare time
function getHarareTime() {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Africa/Harare',
        hour12: true, // Use 12-hour format (optional)
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

// Function to authenticate user
async function authenticateUser(sender, passphrase) {
    const user = await Diary.findOne({ userId: sender });
    if (!user) {
        return { status: "new_user" }; // New user
    }
    if (user.passphrase === passphrase) {
        return { status: "authenticated" }; // Correct passphrase
    }
    return { status: "incorrect" }; // Incorrect passphrase
}

// Function to set passphrase for new user
async function setPassphrase(sender, passphrase) {
    await Diary.updateOne(
        { userId: sender },
        { $set: { passphrase } },
        { upsert: true }
    );
}


// USER ID SECTION 

cmd({
    pattern: "getuserid",
    alias: ["myid","getid"],
    use: '.getuserid',
    react: "🆔",
    desc: "Get your user ID.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        reply(`[❗] Your user ID is: ${sender}`);
    } catch (error) {
        console.error("Error:", error);
        reply("*Error: Unable to fetch your user ID. Please try again later.*");
    }
});

// RESET PASS 
cmd({
    pattern: "resetpassphrase",
    alias: ["resetpass","resetdiarypassword","resetdiary"],
    use: '.resetpassphrase <user_id>',
    react: "🛠️",
    desc: "Reset a user's passphrase (superadmin only).",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, body }) => {
    try {
        const [command, targetUserId, superadminPassphrase] = body.split(' ');
        if (!targetUserId || !superadminPassphrase) {
            return reply("[⚠️] Please provide the target user ID and superadmin passphrase.\n Example: `.resetpassphrase 1234567890@c.us subzero_bot`");
        }

        // Verify superadmin passphrase
        if (superadminPassphrase !== "subzero_bot") {
            return reply("❌ Invalid superadmin passphrase. Access denied ☝.");
        }

        // Reset the target user's passphrase
        await Diary.updateOne(
            { userId: targetUserId },
            { $set: { passphrase: null } }
        );

        // Clear the target user's session (if any)
        sessionCache.del(targetUserId);

        reply(`🛠️ Passphrase for user ${targetUserId} has been reset. They can now set a new passphrase using \`.setpassphrase\`.`);
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to reset passphrase. Please try again later.*");
    }
});


// Login command (authenticate user)
cmd({
    pattern: "login",
    alias: ["auth"],
    use: '.login <passphrase>',
    react: "🔐",
    desc: "Authenticate to access your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, body }) => {
    try {
        const passphrase = body.split(' ')[1]; // Extract the passphrase
        if (!passphrase) {
            return reply("⚠️ Please provide your passphrase. Example: `.login your_passphrase`");
        }

        // Authenticate user
        const auth = await authenticateUser(sender, passphrase);
        if (auth.status === "new_user") {
            return reply("Welcome 👋😄! To start using your diary, set a passphrase first using `.setpassphrase your_passphrase`.");
        }
        if (auth.status === "incorrect") {
            return reply("❌ Incorrect passphrase. Please try again.");
        }

        // Store user in session cache
        sessionCache.set(sender, true);
        reply("🔐 Login successful! \nYou can now use diary commands without your passphrase.");
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to authenticate. Please try again later.*");
    }
});

// Set passphrase for new user
cmd({
    pattern: "setpassphrase",
    alias: ["setpass"],
    use: '.setpassphrase <passphrase>',
    react: "🔐",
    desc: "Set a passphrase to secure your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, body }) => {
    try {
        const passphrase = body.split(' ')[1]; // Extract the passphrase
        if (!passphrase) {
            return reply("⚠️ Please provide a passphrase. Example: `.setpassphrase your_passphrase`");
        }

        // Check if user already has a passphrase
        const user = await Diary.findOne({ userId: sender });
        if (user?.passphrase) {
            return reply("❌ You already have a passphrase set. Contact support to reset it. by typing .report");
        }

        // Set the passphrase
        await setPassphrase(sender, passphrase);
        reply("🔐 Passphrase set successfully ✅! You can now use your diary.✨");
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to set passphrase. Please try again later.*");
    }
});

// Add a note to the diary
cmd({
    pattern: "diaryadd",
    alias: ["addnote", "adddiary"],
    use: '.diaryadd <text>',
    react: "📝",
    desc: "Add a note to your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, body }) => {
    try {
        // Check if user is authenticated
        if (!sessionCache.has(sender)) {
            return reply("⚠️ Please login first using `.login your_passphrase`.");
        }

        const note = body.split(' ').slice(1).join(' '); // Extract the note text
        if (!note) {
            return reply("⚠️ Please provide a note to add. Example: `.diaryadd Today was a great day with Subzero!`");
        }

        // Save the note to the database
        const newNote = new Diary({ userId: sender, note });
        await newNote.save();

        // Send a formatted message with an image
        const SUBZERO_DIARY_IMG = 'https://i.postimg.cc/vHQdBJmf/IMG-20250305-WA0006.jpg'; // Replace with your image URL
        const formattedInfo = `📝 *Note added to your diary!✅*\n\n` +
                              `*🔖 "${note}"*\n\n` +
                              `_📆 Time: ${getHarareTime()}_`; // Use Harare time

        await conn.sendMessage(from, {
            image: { url: SUBZERO_DIARY_IMG },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 🎀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to add the note. Please try again later.*");
    }
});

// Delete a note from the diary
cmd({
    pattern: "diarydelete",
    alias: ["deletenote", "deletediary"],
    use: '.diarydelete <note number>',
    react: "🗑️",
    desc: "Delete a note from your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, body }) => {
    try {
        // Check if user is authenticated
        if (!sessionCache.has(sender)) {
            return reply("⚠️ Please login first using `.login your_passphrase`.");
        }

        const noteNumber = parseInt(body.split(' ')[1]); // Extract the note number
        if (isNaN(noteNumber) || noteNumber < 1) {
            return reply("Please provide a valid note number. Example: `.diarydelete 1`");
        }

        // Fetch all notes for the user
        const notes = await Diary.find({ userId: sender }).sort({ timestamp: 1 });
        if (noteNumber > notes.length) {
            return reply(`You only have ${notes.length} notes in your diary.`);
        }

        // Delete the specified note
        const noteToDelete = notes[noteNumber - 1];
        await Diary.findByIdAndDelete(noteToDelete._id);

        // Send a formatted message with an image
        const SUBZERO_DIARY_IMG = 'https://i.postimg.cc/vHQdBJmf/IMG-20250305-WA0006.jpg'; // Replace with your image URL
        const formattedInfo = `🗑️ *Note ${noteNumber} deleted from your diary!✅*\n\n` +
                              `*🔖 "${noteToDelete.note}"*\n\n` +
                              `_📆 Time: ${new Date(noteToDelete.timestamp).toLocaleString('en-US', { timeZone: 'Africa/Harare' })}_`; // Use Harare time

        await conn.sendMessage(from, {
            image: { url: SUBZERO_DIARY_IMG },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to delete the note. Please try again later.*");
    }
});

// Delete all notes from the diary
cmd({
    pattern: "diarydeleteall",
    alias: ["deleteallnotes", "cleardiary"],
    use: '.diarydeleteall',
    react: "💥",
    desc: "Delete all notes from your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        // Check if user is authenticated
        if (!sessionCache.has(sender)) {
            return reply("⚠️ Please login first using `.login your_passphrase`.");
        }

        // Fetch all notes for the user
        const notes = await Diary.find({ userId: sender });
        if (notes.length === 0) {
            return reply("Your diary is already empty. Nothing to delete.");
        }

        // Delete all notes for the user
        await Diary.deleteMany({ userId: sender });

        // Send a formatted message with an image
        const SUBZERO_DIARY_IMG = 'https://i.postimg.cc/vHQdBJmf/IMG-20250305-WA0006.jpg'; // Replace with your image URL
        const formattedInfo = `💥 *All notes deleted from your diary!✅*\n\n` +
                              `_📆 Time: ${getHarareTime()}_`; // Use Harare time

        await conn.sendMessage(from, {
            image: { url: SUBZERO_DIARY_IMG },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to delete all notes. Please try again later.*");
    }
});

// Show all notes in the diary
cmd({
    pattern: "showdiary",
    alias: ["viewdiary", "diary", "viewnotes", "notes"],
    use: '.showdiary',
    react: "📖",
    desc: "View all notes in your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        // Check if user is authenticated
        if (!sessionCache.has(sender)) {
            return reply("⚠️ Please login first using `.login your_passphrase`.");
        }

        // Fetch all notes for the user
        const notes = await Diary.find({ userId: sender }).sort({ timestamp: 1 });
        if (notes.length === 0) {
            return reply("Your diary is empty. Add a note with `.diaryadd <text>`.");
        }

        // Format the notes as a numbered list
        let diaryList = "📕 `SUBZERO USER DIARY`  📕\n\n⟣━━━━━━━━━━━━━━━━⟢\n\n";
        notes.forEach((note, index) => {
            diaryList += `*🔖 ${index + 1}. ${note.note}*\n` +
                         `📆 _Time: ${new Date(note.timestamp).toLocaleString('en-US', { timeZone: 'Africa/Harare' })}_\n\n`; // Use Harare time
        });

        // Send a formatted message with an image
        const SUBZERO_DIARY_IMG = 'https://i.postimg.cc/vHQdBJmf/IMG-20250305-WA0006.jpg'; // Replace with your image URL
        await conn.sendMessage(from, {
            image: { url: SUBZERO_DIARY_IMG },
            caption: diaryList,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '❄️ 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃❄️',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to fetch your diary. Please try again later.*");
    }
});


// Anime Quotes Plugin (With Thumbnail)
cmd({
    pattern: "animequote",
    alias: ["aquote", "aniquote"],
    desc: "Get random anime quotes",
    category: "fun",
    react: "🌸",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        await conn.sendMessage(mek.chat, { react: { text: "⏳", key: mek.key } });

        const response = await axios.get('https://draculazyx-xyzdrac.hf.space/api/aniQuotes');
        const quote = response.data;

        if (!quote.SUCCESS) return reply("❌ Failed to fetch anime quote");

        const quoteText = `🌸 *${quote.MESSAGE.anime}*\n\n"${quote.MESSAGE.quote}"\n\n- ${quote.MESSAGE.author}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ`;

        await conn.sendMessage(mek.chat, { 
            image: { url: 'https://files.catbox.moe/m31j88.jpg' }, // Anime thumbnail
            caption: quoteText,
            contextInfo: {
                externalAdReply: {
                    title: quote.MESSAGE.anime,
                    body: "Random Anime Quote",
                    thumbnail: await getImageBuffer('https://files.catbox.moe/m31j88.jpg'),
                    mediaType: 1,
                    mediaUrl: "https://myanimelist.net/",
                    sourceUrl: "https://myanimelist.net/"
                }
            }
        }, { quoted: mek });

        await conn.sendMessage(mek.chat, { react: { text: "✅", key: mek.key } });

    } catch (error) {
        console.error("Anime quote error:", error);
        await conn.sendMessage(mek.chat, { react: { text: "❌", key: mek.key } });
        reply("❌ Error fetching anime quote. Please try again later.");
    }
});

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
    pattern: "chai",
    alias: ["tea", "chay", "cha", "chah"],
    desc: "Brews you a fantastic cup of chai with the famous meme!",
    category: "tools",
    react: "☕",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        // Owner restriction check
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner command.*"
            }, { quoted: mek });
        }

        // making
        const brewingMsg = await conn.sendMessage(from, { 
            text: 'Brewing your chai... ☕' 
        }, { quoted: mek });

        // Chai brewing animation with fun steps
        const chaiSteps = [
            "Boiling water... 💦",
            "Adding Assam tea leaves... 🍃",
            "Pouring fresh milk... 🥛",
            "Crushing ginger & cardamom... 🧄🌿",
            "Adding just the right sugar... ⚖️",
            "Letting it boil to perfection... ♨️",
            "*Aroma intensifies* 👃🤤",
            "Straining the tea... 🕳️",
            "Pouring into cup... 🫖",
            "Almost ready... ⏳"
        ];

        // Show each step with delay
        for (const step of chaiSteps) {
            await sleep(1000); // 1 second delay between steps
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: brewingMsg.key,
                        type: 14,
                        editedMessage: {
                            conversation: step,
                        },
                    },
                },
                {}
            );
        }

        // Final text message
        await sleep(1000);
        await conn.sendMessage(from, { 
            text: 'Your masala chai is ready! ☕✨\nWait sending you...' 
        }, { quoted: mek });

        // Send the famous meme image
        await sleep(1000);
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/dyzdgl.jpg" },
            caption: "- *The Tea Was Fantastic* ☕\n> _(Remember 2019 😂💀🗿)_ \n - *2019 X 2025 🗿😎*",
            mimetype: "image/jpeg"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ *Chai spilled!* ${e.message}\n_Better luck next time!_`);
    }
});
