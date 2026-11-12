/**
 * Agent Clinic - Entry Point
 * Spec-Driven Development project using Hono, TypeScript, and SQLite
 */

import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { prettyJSON } from 'hono/pretty-json';

import { appConfig } from './config.js';
import { healthRouter } from './routes/health.js';
import { agentsRouter } from './routes/agents.js';
import { ailmentsRouter } from './routes/ailments.js';

export const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', prettyJSON());

// Routes
app.route('/api/health', healthRouter);
app.route('/api/agents', agentsRouter);
app.route('/api/ailments', ailmentsRouter);

// Root route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Agent Clinic</title>
      <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1 { color: #333; }
        code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Agent Clinic</h1>
      <p>Welcome to the Agent Clinic API.</p>
      <h2>Endpoints</h2>
      <ul>
        <li><code>GET /api/health</code> - Health check</li>
        <li><code>GET /api/agents</code> - List agents</li>
        <li><code>GET /api/ailments</code> - List ailments</li>
      </ul>
    </body>
    </html>
  `);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// Start server
if (import.meta.main) {
  serve({
    fetch: app.fetch,
    port: appConfig.port,
  });
  console.log(`Agent Clinic server running on http://localhost:${appConfig.port}`);
}

export default app;