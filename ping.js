
const {
plugin,
	isAccess,
  mode,
  config
} = require('../lib');


plugin({
  pattern: 'ping|pong',
  desc: 'Check bot response speed',
  react: '🍄',
  fromMe: mode,
  type: 'info'
}, async (message, match) => {
	const start = new Date().getTime();
  const emojis = [
  '⛅🌦️🌤️', '💘💝💖', '👻⛄👀', '🪁🪃🎳',
  '🎀🎁🎈', '🙊🙉🙈', '🌸✨💮', '🩷🌙💫',
  '🌈🌸🌟', '🍥🌺🎀', '🍓🍡💗', '🦋🎐💖',
  '💫🫧🌙', '💞🌸🐾', '🍰🎀🌼', '🍡🌼💗',
  '👻💀☠️', '🤍🩷🩶', '☁️🌨️🌧️', '🌦️🌥️⛅',
  '🌜🌚🌝', '🥀🌹💐', '☃️🪺🪹', '🍂🍄🌾',
  '🍁🌴🍀', '🐼🐹🐰', '👻⛄☃️', '⚡✨🌟',
  '☁️🎐🏖️', '🌴🌳🌲',
  
  // New additions — weather & nature
  '🌊🐚🪸', '🍒🍇🍉', '🪷🌼🌻', '🐶🐱🐭',
  '🚀🛸🛰️', '🍫🍩🍪', '🪙💎💰', '🌋🏔️⛰️',
  '🪅🎊🎉', '📚🖋️📜', '🍵☕🥛', '🎧🎤🎼',
  '🌞🔥🌅', '🌄🏞️🏕️', '🌌🌠🌙', '🪐🌎🌏',
  '🌳🌲🌴', '🍃🍂🍁', '🪵🍄🌿', '🪲🦋🐞',
  '🐢🦎🐍', '🦀🦞🦐', '🐬🐳🐋', '🦈🐟🐠',

  // Food & drink
  '🍔🍟🌭', '🍕🥪🥗', '🍜🍣🍱', '🥟🍤🍢',
  '🍰🧁🍮', '🍯🍞🥐', '🥩🍗🥓', '🥥🍍🥭',

  // Animals
  '🦊🦝🐻', '🐨🦘🦙', '🦒🦓🦌', '🦏🐘🦛',
  '🐔🐧🦤', '🦅🦆🦉', '🦢🦩🕊️', '🕷️🕸️🦂',

  // Fantasy & fun
  '🧙🧝🧚', '🧛🧟🧞', '🧜🦸🦹', '🐉🐲👾',
  '🎃🪦⚰️', '⚗️🔭🔬', '🛡️⚔️🏹',

  // Travel & culture
  '🗿🏰🏯', '🕌⛩️🛕', '🕍⛪🛤️', '🏟️🎡🎢',

  // Extra cute
  '💖💗💓', '💜💙💚', '❤️🧡💛', '🖤🤎🤍'
];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const temp = await message.send('🏓 Pinging...');
  const end = new Date().getTime();
  const ping = end - start;

  const styledText = `◈ ${emoji}\n*╰┈➤ 𝐏O͒N͒𝐆: ${ping} 𝐌ʂ*`;

  await temp.edit(styledText);
});