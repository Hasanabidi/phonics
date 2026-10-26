import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1564195495109328909/s0RuA1UBajQGM1RCSWCQQYfU835eEXgQpZlzDEuIIPCmFfq6pVolo7uAZWY_C5FtcRHd';

function discordNotifyDevPlugin(): Plugin {
  return {
    name: 'discord-notify-dev-plugin',
    configureServer(server) {
      server.middlewares.use('/api/notify-client-visit', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let rawBody = '';
        req.on('data', (chunk) => {
          rawBody += chunk;
        });

        req.on('end', async () => {
          try {
            const body = JSON.parse(rawBody || '{}');
            const { client = 'direct-visitor', page = '/', userAgent = '' } = body;
            const host =
              req.headers['x-forwarded-host'] ||
              req.headers['host'] ||
              'localhost:5173';

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

            await fetch(DISCORD_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: message }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    discordNotifyDevPlugin(),
  ],
});
