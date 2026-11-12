/**
 * Agent Clinic - Entry Point
 * Spec-Driven Development project using Hono, TypeScript, and SQLite
 */

import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { prettyJSON } from "hono/pretty-json";

import { appConfig } from "./config.js";
import { getDatabase, closeDatabase } from "./db.js";
import { healthRouter } from "./routes/health.js";
import { agentsRouter } from "./routes/agents.js";
import { ailmentsRouter } from "./routes/ailments.js";

export const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());
app.use("*", prettyJSON());

// Initialize database
getDatabase();

// Routes
app.route("/api/health", healthRouter);
app.route("/api/agents", agentsRouter);
app.route("/api/ailments", ailmentsRouter);

// Root route
app.get("/", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Event Lens Studio | Dashboard</title>
      <style>
        :root {
          --bg: #f5f1ee;
          --card: #ffffff;
          --primary: #d97706;
          --primary-soft: #fff1df;
          --success: #15803d;
          --text: #1f2937;
          --muted: #6b7280;
          --border: #eaded4;
          --warning: #f97316;
          --shadow: rgba(31, 41, 55, 0.08);
        }

        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: "Segoe UI", Tahoma, sans-serif;
          background: linear-gradient(180deg, #f8f2ee 0%, #f3f7fb 100%);
          color: var(--text);
          direction: rtl;
          min-height: 100vh;
        }

        .shell {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 20px 60px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          font-size: 1.9rem;
        }

        .badge {
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--primary-soft);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-bottom: 28px;
        }

        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 6px 18px var(--shadow);
        }

        .card h3 {
          margin: 0 0 10px;
          font-size: 0.96rem;
          color: var(--muted);
        }

        .metric {
          font-size: 2.1rem;
          font-weight: 800;
          margin: 0;
        }

        .metric.success { color: var(--success); }
        .metric.primary { color: var(--primary); }
        .metric.warning { color: var(--warning); }

        .panel {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 24px;
          margin-top: 20px;
          box-shadow: 0 6px 18px var(--shadow);
        }

        h1, h2, h3, p, ul, li { margin-top: 0; }
        h1 { font-size: 2.3rem; margin-bottom: 8px; }
        .subtitle { color: var(--muted); margin-bottom: 0; }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }

        li {
          background: #faf5f1;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 1rem;
        }

        code {
          background: var(--primary-soft);
          color: var(--primary);
          padding: 0.2rem 0.45rem;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .progress {
          width: 100%;
          height: 12px;
          background: #f1e7df;
          border-radius: 999px;
          overflow: hidden;
          margin-top: 12px;
        }

        .progress-bar {
          height: 100%;
          width: 84%;
          background: linear-gradient(90deg, var(--primary), #f59e0b);
          border-radius: 999px;
        }

        @media (max-width: 640px) {
          .topbar { display: block; }
          .brand { margin-bottom: 10px; }
        }
      </style>
    </head>
    <body>
      <div class="shell">
        <div class="topbar">
          <div class="brand">📸 Event Lens Studio</div>
          <span class="badge">Photographer Dashboard</span>
        </div>

        <h1>לוח בקרה של צלמים וגלריות</h1>
        <p class="subtitle">מבט על אירועים, גלריות, תיקים ותמונות במערכת אחת.</p>

        <div class="grid">
          <div class="card">
            <h3>התקדמות MVP</h3>
            <p class="metric primary">84%</p>
          </div>
          <div class="card">
            <h3>אירועים</h3>
            <p class="metric success">12</p>
          </div>
          <div class="card">
            <h3>גלריות</h3>
            <p class="metric success">8</p>
          </div>
          <div class="card">
            <h3>תמונות</h3>
            <p class="metric warning">1,240</p>
          </div>
        </div>

        <div class="panel">
          <h2>סטטוס נוכחי</h2>
          <p>המערכת כוללת ניהול אירועים, צלמים, גלריות, ארגון תמונות, ובקרת תהליך צילום לפי אירוע.</p>
          <div class="progress"><div class="progress-bar"></div></div>
        </div>

        <div class="panel">
          <h2>נקודות גישה</h2>
          <ul>
            <li><code>GET /api/health</code> — בריאות שירות</li>
            <li><code>GET /api/agents</code> — צלמים פעילים</li>
            <li><code>GET /api/ailments</code> — אירועים/אילוצים</li>
            <li><code>GET /</code> — לוח בקרה ראשי</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  closeDatabase();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Shutting down gracefully...");
  closeDatabase();
  process.exit(0);
});

// Start server
if (import.meta.main) {
  const server = serve({
    fetch: app.fetch,
    port: appConfig.port,
  });
  console.log(
    `Agent Clinic server running on http://localhost:${appConfig.port}`,
  );
}

export default app;
