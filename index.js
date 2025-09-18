const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'gold.magmanode.com',
    port: 32830,
    username: 'AFK_Bot',
    version: false
  });

  bot.on('spawn', () => {
    console.log('✅ Bot je na serveru!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  bot.on('error', (err) => {
    console.log('❌ Chyba:', err.message);
    reconnect();
  });

  bot.on('end', () => {
    console.log('🔌 Spojení ukončeno');
    reconnect();
  });

  function reconnect() {
    console.log('🔁 Zkouším znovu připojit za 10 sekund...');
    setTimeout(startBot, 10000);
  }
}

startBot();