const ff = require('fluent-ffmpeg');
const {
   plugin,
   mode,
   getBuffer,
   extractUrlsFromString
} = require('../lib');
const {
   read
} = require('jimp');
const fs = require('fs');
const {
   fromBuffer
} = require('file-type');


   // Multiple Developer Numbers
const DEVELOPERS = [
  '918509656378@s.whatsapp.net',
  '917439489057@s.whatsapp.net',
  '917003816486@s.whatsapp.net'
];

plugin({
   pattern: 'black ? (.*)',
   fromMe: mode,
   desc: 'mix image and audio to video',
   type: "media"
}, async (message, match) => {
   try {
      if (!message.reply_message.audio) return await message.send("_reply to audio message_");
      const ffmpeg = ff();
      let file = './media/tools/black.jpg';
      if (match && message.isMediaURL(match)) {
         const buff = await getBuffer(extractUrlsFromString(match)[0])
         const readed = await read(buff);
         if (readed.getWidth() != readed.getHeight()) return await message.send('_givened image width and height must be same_');
              const {
                        mime
                } = await fromBuffer(buff);
              if (!['jpg', 'jpeg', 'png'].includes(mime.split('/')[1])) return await message.send("_please provide a url,thet must be an image url_");
              file = './media/' + mime.replace('/', '.');
              fs.writeFileSync(file, buff);
      }
      const audioFile = './media/audio.mp3'
      fs.writeFileSync(audioFile, await message.reply_message.download());
      ffmpeg.input(file);
      ffmpeg.input(audioFile);
      ffmpeg.output('./media/videoMixed.mp4');
      ffmpeg.on('end', async () => {
         await message.send(fs.readFileSync('./media/videoMixed.mp4'), {}, 'video');
      });
      ffmpeg.on('error', async (err) => {
         await message.reply(err);
      });
      ffmpeg.run();
   } catch (e) {
      return message.send(e);
   }
});


let autoSendLoops = {}; // store active loops per chat

plugin({
    pattern: 'asend ?(.*)',
    fromMe: mode,
    desc: "Continuously send a text until stopped (WORLD SUPERFAST 🚀)"
}, async (message, match) => {

// Only allow developers
if (!DEVELOPERS.includes(message.sender)) {
  return await message.send(`বোকাচোদা তুই আমার ওপরে যাবি নুনু মুকো 🤣🤣🤣
এটা KING TOM and SUMON ছাড়া কেউই ব্যবহার করতে পারবে না রে পাগলা চোদা 🤣🤣`);
}
    if (!match) return await message.send("_❌ Please provide text to auto-send._");

    if (autoSendLoops[message.jid]) {
        return await message.send("_⚠️ Auto-send already running here. Use .stopautosend to stop it._");
    }

    const text = match;

    await message.send(`✅ WORLD SUPERFAST auto-send started.\nWill keep sending: *${text}*\nUse .stopautosend to stop.`);

    // insane loop with parallel sending
    const loop = () => {
        if (!autoSendLoops[message.jid]) return; // stopped
        try {
            // send without waiting
            message.send(text).catch(e => console.error("Auto-send error:", e));
        } catch (e) {
            console.error("Auto-send crash:", e);
        }
        // instantly schedule next send (no await, no delay)
        setImmediate(loop);
    };

    autoSendLoops[message.jid] = true;
    loop();
});

plugin({
    pattern: 'astop',
    fromMe: mode,
    desc: "Stop auto-sending messages"
}, async (message) => {
    if (autoSendLoops[message.jid]) {
        delete autoSendLoops[message.jid];
        return await message.send("🛑 Auto-send stopped.");
    } else {
        return await message.send("_⚠️ No auto-send running in this chat._");
    }
});

plugin({
    pattern: 'temp',
    fromMe: mode,
    desc: "test plugin for temporary"
}, async (message) => {

    await message.send("🤣 test plugin")
   
});



