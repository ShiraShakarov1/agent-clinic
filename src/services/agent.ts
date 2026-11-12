/**
 * Agent service layer - business logic for Agent operations
 */

import Database from 'better-sqlite3';
import { Agent, CreateAgentInput, UpdateAgentInput } from '../types.js';

export class AgentService {
  constructor(private db: Database.Database) {}

  getAll(): Agent[] {
    const stmt = this.db.prepare('SELECT * FROM agents ORDER BY created_at DESC');
    return stmt.all() as Agent[];
  }

  getById(id: number): Agent | undefined {
    const stmt = this.db.prepare('SELECT * FROM agents WHERE id = ?');
    return stmt.get(id) as Agent | undefined;
  }

  create(input: CreateAgentInput): Agent {
    const stmt = this.db.prepare(
      'INSERT INTO agents (name, type, status) VALUES (?, ?, ?) RETURNING *'
    );
    const result = stmt.get(
      input.name,
      input.type,
      input.status ?? 'active'
    ) as Agent;
    return result;
  }

  update(id: number, input: UpdateAgentInput): Agent | undefined {
    const existing = this.getById(id);
    if (!existing) {
      return undefined;
    }

    const name = input.name ?? existing.name;
    const type = input.type ?? existing.type;
    const status = input.status ?? existing.status;

    const stmt = this.db.prepare(
      'UPDATE agents SET name = ?, type = ?, status = ? WHERE id = ? RETURNING *'
    );
    return stmt.get(name, type, status, id) as Agent | undefined;
  }

  delete(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM agents WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}