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

    // ✅ Strong random index generator
    const randomIndex = Math.floor(Math.random() * links.length);
    const selectedImage = links[randomIndex];

    // Download image as buffer
    const { data } = await axios.get(selectedImage, { responseType: 'arraybuffer', headers: { 'Cache-Control': 'no-cache' } });

    await message.client.sendMessage(message.jid, {
      image: Buffer.from(data),
      caption: `> *© ᴘσωєʀє∂ ву 𝖐𝚊𝚒𝚜𝖊𝖓 𝙼ԃ⎯꯭̽💀*\n🎲 Random: ${randomIndex + 1}/${links.length}`,
      mentions: message.mention || []
    }, { quoted: message.data });

  } catch (error) {
    console.error("❌ Error in koyel command:", error);
    await message.send(`❌ *Error in koyel command:*\n\`\`\`${error.message}\`\`\``);
  }
});
