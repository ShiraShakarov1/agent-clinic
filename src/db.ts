/**
 * SQLite database module for Agent Clinic
 * Uses better-sqlite3 for synchronous database access
 */

import Database from 'better-sqlite3';
import { appConfig } from './config.js';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (db) {
    return db;
  }

  // Ensure data directory exists
  const dbPath = appConfig.database;
  const dir = dirname(dbPath);
  if (dir && dir !== '.' && dir !== '..') {
    try {
      mkdirSync(dir, { recursive: true });
    } catch {
      // Directory may already exist
    }
  }

  db = new Database(dbPath);
  initializeSchema(db);
  return db;
}

function initializeSchema(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS agents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  database.exec(`
    CREATE TABLE IF NOT EXISTS ailments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      severity TEXT NOT NULL DEFAULT 'low',
      description TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes
  database.exec(`CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status)`);
  database.exec(`CREATE INDEX IF NOT EXISTS idx_ailments_severity ON ailments(severity)`);

  // Seed sample data if tables are empty
  const agentCount = database.prepare('SELECT COUNT(*) as count FROM agents').get() as { count: number };
  if (agentCount.count === 0) {
    seedAgents(database);
  }

  const ailmentCount = database.prepare('SELECT COUNT(*) as count FROM ailments').get() as { count: number };
  if (ailmentCount.count === 0) {
    seedAilments(database);
  }
}

function seedAgents(database: Database.Database): void {
  const insert = database.prepare(
    'INSERT INTO agents (name, type, status) VALUES (?, ?, ?)'
  );
  const insertMany = database.transaction((agents: Array<{ name: string; type: string; status: string }>) => {
    for (const agent of agents) {
      insert.run(agent.name, agent.type, agent.status);
    }
  });

  insertMany([
    { name: 'Alpha', type: 'assistant', status: 'active' },
    { name: 'Beta', type: 'analyst', status: 'active' },
    { name: 'Gamma', type: 'coordinator', status: 'busy' },
    { name: 'Delta', type: 'assistant', status: 'inactive' },
  ]);
}

function seedAilments(database: Database.Database): void {
  const insert = database.prepare(
    'INSERT INTO ailments (name, severity, description) VALUES (?, ?, ?)'
  );
  const insertMany = database.transaction((ailments: Array<{ name: string; severity: string; description: string }>) => {
    for (const ailment of ailments) {
      insert.run(ailment.name, ailment.severity, ailment.description);
    }
  });

  insertMany([
    { name: 'Overheating', severity: 'medium', description: 'System temperature above normal thresholds' },
    { name: 'Memory Leak', severity: 'high', description: 'Gradual memory consumption without release' },
    { name: 'Slow Response', severity: 'low', description: 'Latency above acceptable thresholds' },
    { name: 'Connection Timeout', severity: 'medium', description: 'Network connections failing to establish' },
  ]);
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}

export default { getDatabase, closeDatabase };