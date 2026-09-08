export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight for /api/telegram
    if (url.pathname === '/api/telegram' && request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Handle secure Telegram notification API
    if (url.pathname === '/api/telegram' && request.method === 'POST') {
      const corsHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };

      try {
        const body = await request.json();
        const text = body.text;

        if (!text) {
          return new Response(JSON.stringify({ error: 'Message text is required' }), {
            status: 400,
            headers: corsHeaders,
          });
        }

        const botToken = env.TELEGRAM_BOT_TOKEN;
        const chatId = env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
          return new Response(JSON.stringify({
            error: 'Telegram credentials not configured on Cloudflare. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Cloudflare secrets.'
          }), {
            status: 500,
            headers: corsHeaders,
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
          headers: corsHeaders,
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // Fallback: serve static assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
