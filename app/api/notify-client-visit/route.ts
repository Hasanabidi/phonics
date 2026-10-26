export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1564195495109328909/s0RuA1UBajQGM1RCSWCQQYfU835eEXgQpZlzDEuIIPCmFfq6pVolo7uAZWY_C5FtcRHd';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { client = 'direct-visitor', page = '/', userAgent = '' } = body;

    // Read incoming request host dynamically
    const host =
      req.headers.get('x-forwarded-host') ||
      req.headers.get('host') ||
      'unknown-host';

    // Detect device category (📱 Mobile or 💻 Desktop)
    const isMobile =
      /mobile|iphone|ipad|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(
        userAgent || ''
      );
    const deviceType = isMobile ? '📱 Mobile' : '💻 Desktop';

    // Construct Discord notification payload
    const payload = {
      content: '@everyone 🚨 Client visited the website!',
      embeds: [
        {
          title: '👀 Site Preview Opened!',
          color: 0x5865f2,
          fields: [
            {
              name: 'Website / Host',
              value: host,
              inline: true,
            },
            {
              name: 'Client ID',
              value: client,
              inline: true,
            },
            {
              name: 'Device Type',
              value: deviceType,
              inline: true,
            },
            {
              name: 'Page Path',
              value: page,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Forward to Discord webhook
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({ error: 'Discord webhook failed', details: errText }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
