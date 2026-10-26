const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1564195495109328909/s0RuA1UBajQGM1RCSWCQQYfU835eEXgQpZlzDEuIIPCmFfq6pVolo7uAZWY_C5FtcRHd';

export default async function handler(req: any, res: any) {
  // If Web standard Request (Edge / Next)
  if (req instanceof Request) {
    const body = await req.json().catch(() => ({}));
    const { client = 'direct-visitor', page = '/', userAgent = '' } = body;
    const host =
      req.headers.get('x-forwarded-host') ||
      req.headers.get('host') ||
      'unknown-host';

    const isMobile =
      /mobile|iphone|ipad|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(
        userAgent || ''
      );
    const deviceType = isMobile ? '📱 Mobile' : '💻 Desktop';

    const payload = {
      content: '@everyone 🚨 Client visited the website!',
      embeds: [
        {
          title: '👀 Site Preview Opened!',
          color: 0x5865f2,
          fields: [
            { name: 'Website / Host', value: host, inline: true },
            { name: 'Client ID', value: client, inline: true },
            { name: 'Device Type', value: deviceType, inline: true },
            { name: 'Page Path', value: page, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const resp = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return new Response(JSON.stringify({ success: resp.ok }), {
      status: resp.ok ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Node HTTP req/res (Vercel Serverless Function)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { client = 'direct-visitor', page = '/', userAgent = '' } = body;

    const host =
      req.headers['x-forwarded-host'] ||
      req.headers['host'] ||
      'unknown-host';

    const isMobile =
      /mobile|iphone|ipad|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(
        userAgent || ''
      );
    const deviceType = isMobile ? '📱 Mobile' : '💻 Desktop';

    const payload = {
      content: '@everyone 🚨 Client visited the website!',
      embeds: [
        {
          title: '👀 Site Preview Opened!',
          color: 0x5865f2,
          fields: [
            { name: 'Website / Host', value: String(host), inline: true },
            { name: 'Client ID', value: String(client), inline: true },
            { name: 'Device Type', value: deviceType, inline: true },
            { name: 'Page Path', value: String(page), inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Discord webhook failed' });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}
