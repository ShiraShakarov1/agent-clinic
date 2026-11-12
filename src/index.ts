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
          --bg: #f6f1ee;
          --bg-strong: #efe3d8;
          --card: rgba(255,255,255,0.88);
          --card-strong: #fffaf7;
          --primary: #b45309;
          --primary-strong: #7c2d12;
          --secondary: #0f172a;
          --accent: #f59e0b;
          --success: #166534;
          --text: #1f2937;
          --muted: #6b7280;
          --border: rgba(120, 85, 39, 0.14);
          --shadow: rgba(15, 23, 42, 0.12);
          --glow: rgba(245, 158, 11, 0.18);
        }

        * { box-sizing: border-box; }

        html, body {
          margin: 0;
          min-height: 100%;
          font-family: "Segoe UI", Tahoma, sans-serif;
          background:
            radial-gradient(circle at top right, rgba(245, 158, 11, 0.18), transparent 22%),
            linear-gradient(135deg, var(--bg) 0%, #f9f7f5 35%, #edf4f8 100%);
          color: var(--text);
          direction: rtl;
        }

        body {
          min-height: 100vh;
        }

        .shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
          padding: 12px 4px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--secondary);
        }

        .brand-mark {
          display: inline-flex;
          width: 48px;
          height: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          box-shadow: 0 14px 30px var(--glow);
          font-size: 1.4rem;
          color: white;
        }

        .badge {
          border: 1px solid rgba(180, 83, 9, 0.2);
          background: rgba(255,255,255,0.7);
          color: var(--primary-strong);
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .hero-card, .panel, .stat-card, .mini-panel {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          box-shadow: 0 18px 45px var(--shadow);
          backdrop-filter: blur(8px);
        }

        .hero-card {
          padding: 30px 28px;
          position: relative;
          overflow: hidden;
        }

        .hero-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(245,158,11,0.08), rgba(15,23,42,0.01));
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(180, 83, 9, 0.09);
          color: var(--primary-strong);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        h1 {
          margin: 0 0 12px;
          font-size: clamp(2.1rem, 4vw, 3.3rem);
          line-height: 1.1;
          letter-spacing: -0.05em;
          color: var(--secondary);
        }

        .subtitle {
          margin: 0;
          max-width: 620px;
          font-size: 1.08rem;
          line-height: 1.8;
          color: var(--muted);
        }

        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          border: 1px solid transparent;
        }

        .cta.primary {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: white;
          box-shadow: 0 12px 25px rgba(180, 83, 9, 0.25);
        }

        .cta.secondary {
          background: rgba(255,255,255,0.7);
          color: var(--secondary);
          border-color: rgba(15, 23, 42, 0.08);
        }

        .mini-panel {
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .mini-panel h3 {
          margin: 0 0 12px;
          font-size: 0.82rem;
          color: var(--muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .mini-stat {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--secondary);
          margin: 0;
        }

        .mini-tag {
          display: inline-block;
          align-self: flex-start;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(22, 101, 52, 0.08);
          color: var(--success);
          font-size: 0.76rem;
          font-weight: 700;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 24px;
        }

        .stat-card {
          padding: 22px 18px 18px;
        }

        .stat-card h3 {
          margin: 0 0 10px;
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .metric {
          margin: 0;
          font-size: clamp(1.8rem, 2vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .metric.primary { color: var(--primary-strong); }
        .metric.success { color: var(--success); }
        .metric.dark { color: var(--secondary); }
        .metric.accent { color: var(--accent); }

        .content-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          margin-top: 16px;
        }

        .panel {
          padding: 24px;
        }

        .panel h2 {
          margin: 0 0 16px;
          font-size: 1.3rem;
          color: var(--secondary);
        }

        .timeline {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 14px;
        }

        .timeline li {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: #fffaf6;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 14px;
        }

        .dot {
          width: 12px;
          height: 12px;
          margin-top: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.14);
          flex-shrink: 0;
        }

        .timeline strong {
          display: block;
          margin-bottom: 4px;
          color: var(--secondary);
        }

        .timeline span {
          color: var(--muted);
          line-height: 1.6;
        }

        .endpoint-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }

        .endpoint-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.74), rgba(252,247,242,0.95));
          border: 1px solid var(--border);
        }

        code {
          display: inline-block;
          padding: 5px 8px;
          border-radius: 8px;
          background: rgba(180, 83, 9, 0.08);
          color: var(--primary-strong);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .endpoint-label {
          color: var(--secondary);
          font-weight: 700;
        }

        .progress-wrap {
          margin-top: 20px;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 0.9rem;
          color: var(--muted);
          font-weight: 700;
        }

        .progress {
          width: 100%;
          height: 12px;
          background: rgba(180, 83, 9, 0.08);
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          width: 84%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          box-shadow: 0 8px 18px rgba(180, 83, 9, 0.22);
        }

        @media (max-width: 900px) {
          .hero, .content-grid { grid-template-columns: 1fr; }
          .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 560px) {
          .topbar { display: block; }
          .badge { display: inline-block; margin-top: 10px; }
          .stats { grid-template-columns: 1fr; }
          .cta-row { display: grid; }
          .cta { width: 100%; }
        }
      </style>
    </head>
    <body>
      <div class="shell">
        <div class="topbar">
          <div class="brand">
            <span class="brand-mark">📸</span>
            Event Lens Studio
          </div>
          <span class="badge">Photographer Dashboard</span>
        </div>

        <div class="hero">
          <div class="hero-card">
            <div class="hero-content">
              <div class="eyebrow">Creative Ops</div>
              <h1>לוח בקרה לבעלי מקצועות צילום ואירועים</h1>
              <p class="subtitle">
                מערכת יוקרתית לניהול אירועים, צלמים, גלריות, תיקים וארגון תמונות — הכול במקום אחד, עם מבט תפעולי ומסודר על פעילות הצילום.
              </p>
              <div class="cta-row">
                <a class="cta primary" href="#overview">צפה במבט כללי</a>
                <a class="cta secondary" href="/api/health">בריאות מערכת</a>
              </div>
            </div>
          </div>

          <div class="mini-panel">
            <div>
              <h3>התקדמות MVP</h3>
              <p class="mini-stat">84%</p>
            </div>
            <span class="mini-tag">בפיתוח מתקדם</span>
          </div>
        </div>

        <div class="stats" id="overview">
          <div class="stat-card">
            <h3>אירועים</h3>
            <p class="metric dark">12</p>
          </div>
          <div class="stat-card">
            <h3>גלריות</h3>
            <p class="metric success">8</p>
          </div>
          <div class="stat-card">
            <h3>צלמים</h3>
            <p class="metric primary">24</p>
          </div>
          <div class="stat-card">
            <h3>תמונות</h3>
            <p class="metric accent">1,240</p>
          </div>
        </div>

        <div class="content-grid">
          <div class="panel">
            <h2>סטטוס נוכחי</h2>
            <ul class="timeline">
              <li>
                <span class="dot"></span>
                <div>
                  <strong>ממשק תפעולי</strong>
                  <span>המערכת מכילה ניהול אירועים, צלמים, גלריות ותהליכי עבודה לפי פרויקט צילום.</span>
                </div>
              </li>
              <li>
                <span class="dot"></span>
                <div>
                  <strong>מסד נתונים</strong>
                  <span>SQLite מאתחל אוטומטית ומספק בסיס עבודה יציב להמשך פיתוחי המוצר.</span>
                </div>
              </li>
              <li>
                <span class="dot"></span>
                <div>
                  <strong>בדיקות ושמירה</strong>
                  <span>הפרויקט כולל בדיקות ולוגיקת שירותים מאומתת, עם תיעוד כתוב ומסודר.</span>
                </div>
              </li>
            </ul>

            <div class="progress-wrap">
              <div class="progress-label">
                <span>השלמת MVP</span>
                <span>84%</span>
              </div>
              <div class="progress"><div class="progress-bar"></div></div>
            </div>
          </div>

          <div class="panel">
            <h2>נקודות גישה</h2>
            <ul class="endpoint-list">
              <li><span class="endpoint-label">GET /api/health</span><code>Health</code></li>
              <li><span class="endpoint-label">GET /api/agents</span><code>Photographers</code></li>
              <li><span class="endpoint-label">GET /api/ailments</span><code>Events</code></li>
              <li><span class="endpoint-label">GET /</span><code>Dashboard</code></li>
            </ul>
          </div>
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
