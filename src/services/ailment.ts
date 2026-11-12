/**
 * Ailment service layer - business logic for Ailment operations
 */

import Database from 'better-sqlite3';
import { Ailment, CreateAilmentInput, UpdateAilmentInput } from '../types.js';

export class AilmentService {
  constructor(private db: Database.Database) {}

  getAll(): Ailment[] {
    const stmt = this.db.prepare('SELECT * FROM ailments ORDER BY created_at DESC');
    return stmt.all() as Ailment[];
  }

  getById(id: number): Ailment | undefined {
    const stmt = this.db.prepare('SELECT * FROM ailments WHERE id = ?');
    return stmt.get(id) as Ailment | undefined;
  }

  create(input: CreateAilmentInput): Ailment {
    const stmt = this.db.prepare(
      'INSERT INTO ailments (name, severity, description) VALUES (?, ?, ?) RETURNING *'
    );
    const result = stmt.get(
      input.name,
      input.severity ?? 'low',
      input.description ?? ''
    ) as Ailment;
    return result;
  }

  update(id: number, input: UpdateAilmentInput): Ailment | undefined {
    const existing = this.getById(id);
    if (!existing) {
      return undefined;
    }

    const name = input.name ?? existing.name;
    const severity = input.severity ?? existing.severity;
    const description = input.description ?? existing.description;

    const stmt = this.db.prepare(
      'UPDATE ailments SET name = ?, severity = ?, description = ? WHERE id = ? RETURNING *'
    );
    return stmt.get(name, severity, description, id) as Ailment | undefined;
  }

  delete(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM ailments WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}