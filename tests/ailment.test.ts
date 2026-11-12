/**
 * Unit tests for AilmentService
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Database from 'better-sqlite3';
import { AilmentService } from '../src/services/ailment.js';
import { CreateAilmentInput } from '../src/types.js';

describe('AilmentService', () => {
  let db: Database.Database;
  let service: AilmentService;

  beforeAll(() => {
    db = new Database(':memory:');
    db.exec(`
      CREATE TABLE IF NOT EXISTS ailments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        severity TEXT NOT NULL DEFAULT 'low',
        description TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    service = new AilmentService(db);
  });

  afterAll(() => {
    db.close();
  });

  describe('create', () => {
    it('should create a new ailment', () => {
      const input: CreateAilmentInput = {
        name: 'TestAilment',
        severity: 'high',
      };
      const ailment = service.create(input);
      expect(ailment.id).toBeDefined();
      expect(ailment.name).toBe('TestAilment');
      expect(ailment.severity).toBe('high');
    });

    it('should default severity to low', () => {
      const ailment = service.create({ name: 'DefaultSev' });
      expect(ailment.severity).toBe('low');
    });
  });

  describe('getAll', () => {
    it('should return all ailments', () => {
      const ailments = service.getAll();
      expect(ailments.length).toBeGreaterThan(0);
    });
  });

  describe('getById', () => {
    it('should return ailment by id', () => {
      const created = service.create({ name: 'GetById' });
      const found = service.getById(created.id);
      expect(found).toBeDefined();
      expect(found?.name).toBe('GetById');
    });
  });

  describe('update', () => {
    it('should update ailment', () => {
      const created = service.create({ name: 'UpdateMe' });
      const updated = service.update(created.id, { severity: 'high' });
      expect(updated?.severity).toBe('high');
    });
  });

  describe('delete', () => {
    it('should delete ailment', () => {
      const created = service.create({ name: 'DeleteMe' });
      const deleted = service.delete(created.id);
      expect(deleted).toBe(true);
    });
  });
});