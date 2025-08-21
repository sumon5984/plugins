const { plugin, mode } = require('../lib');
const axios = require('axios');

plugin({
  pattern: 'koyel',
  desc: 'Sends a random photo',
  type: 'vatari 🥵',
  fromMe: mode
}, async (message) => {
  try {
    const links = [
      "https://files.catbox.moe/uezc5r.jpg",
      "https://files.catbox.moe/7dj0ii.jpg",
      "https://files.catbox.moe/h7msx2.jpg",
      "https://files.catbox.moe/cl12f4.jpg",
      "https://files.catbox.moe/wjvux1.jpg",
      "https://files.catbox.moe/a6mzzt.jpg"
    ];

    const selectedImage = links[Math.floor(Math.random() * links.length)];

    // Download image as buffer
    const { data } = await axios.get(selectedImage, { responseType: 'arraybuffer' });

    await message.client.sendMessage(message.jid, {
      image: Buffer.from(data),   // ✅ always treated as photo
      caption: '> *© ᴘσωєʀє∂ ву 𝖐𝚊𝚒𝚜𝖊𝖓 𝙼ԃ⎯꯭̽💀*',
      mentions: message.mention || []
    }, { quoted: message.data });

  } catch (error) {
    console.error("❌ Error in koyel command:", error);
    await message.send(`❌ *Error in koyel command:*\n\`\`\`${error.message}\`\`\``);
  }
});
