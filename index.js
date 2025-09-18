const http = require('http');
const mineflayer = require('mineflayer');

let isReconnecting = false;

function startBot() {
  const bot = mineflayer.createBot({
    host: 'gold.magmanode.com',
    port: 32830,
    username: 'AFK_Bot',
    version: false
  });

  bot.on('spawn', () => {
    console.log('✅ Bot je na serveru!');

    // Aktivita: každou minutu poskočí
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);

    // Aktivita: každé 2 minuty napíše zprávu do chatu
    setInterval(() => {
      bot.chat('Jsem tu, nebojte se!');
    }, 120000);
  });

  bot.on('kicked', (reason) => {
    console.log('👢 Bot byl vykopnut:', reason);
  });

  bot.on('error', (err) => {
    console.log('❌ Chyba:', err.message);
  });

  bot.on('end', () => {
    console.log('🔌 Spojení ukončeno');
    reconnect();
  });

  function reconnect() {
    if (isReconnecting) return;
    isReconnecting = true;
    console.log('🔁 Zkouším znovu připojit za 30 sekund...');
    setTimeout(() => {
      isReconnecting = false;
      startBot();
    }, 30000);
  }
}

startBot();

// HTTP server pro Render a UptimeRobot
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot běží!');
}).listen(port, () => {
  console.log(`🌐 HTTP server běží na portu ${port}`);
});
