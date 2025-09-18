const http = require('http');
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

// HTTP server pro Render a UptimeRobot
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot běží!');
}).listen(port, () => {
  console.log(`🌐 HTTP server běží na portu ${port}`);
});