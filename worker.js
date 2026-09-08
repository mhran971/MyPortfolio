export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle secure Telegram notification API
    if (url.pathname === '/api/telegram' && request.method === 'POST') {
      try {
        const body = await request.json();
        const text = body.text;

        if (!text) {
          return new Response(JSON.stringify({ error: 'Message text is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const botToken = env.TELEGRAM_BOT_TOKEN;
        const chatId = env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
          return new Response(JSON.stringify({
            error: 'Telegram credentials not configured on Cloudflare. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Cloudflare secrets.'
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
          })
        });

        const data = await tgResponse.json();
        return new Response(JSON.stringify(data), {
          status: tgResponse.status,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Fallback: serve static assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
