/**
 * Unit tests for AgentService
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Database from 'better-sqlite3';
import { AgentService } from '../src/services/agent.js';
import { CreateAgentInput } from '../src/types.js';

describe('AgentService', () => {
  let db: Database.Database;
  let service: AgentService;

  beforeAll(() => {
    db = new Database(':memory:');
    db.exec(`
      CREATE TABLE IF NOT EXISTS agents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    service = new AgentService(db);
  });

  afterAll(() => {
    db.close();
  });

  describe('create', () => {
    it('should create a new agent', () => {
      const input: CreateAgentInput = {
        name: 'TestAgent',
        type: 'tester',
      };
      const agent = service.create(input);
      expect(agent.id).toBeDefined();
      expect(agent.name).toBe('TestAgent');
      expect(agent.type).toBe('tester');
      expect(agent.status).toBe('active');
    });

    it('should create agent with custom status', () => {
      const input: CreateAgentInput = {
        name: 'BusyAgent',
        type: 'worker',
        status: 'busy',
      };
      const agent = service.create(input);
      expect(agent.status).toBe('busy');
    });
  });

  describe('getAll', () => {
    it('should return all agents', () => {
      const agents = service.getAll();
      expect(agents.length).toBeGreaterThan(0);
      expect(Array.isArray(agents)).toBe(true);
    });
  });

  describe('getById', () => {
    it('should return agent by id', () => {
      const created = service.create({ name: 'GetById', type: 'test' });
      const found = service.getById(created.id);
      expect(found).toBeDefined();
      expect(found?.name).toBe('GetById');
    });

    it('should return undefined for non-existent id', () => {
      const found = service.getById(9999);
      expect(found).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update agent', () => {
      const created = service.create({ name: 'UpdateMe', type: 'test' });
      const updated = service.update(created.id, { name: 'UpdatedName' });
      expect(updated).toBeDefined();
      expect(updated?.name).toBe('UpdatedName');
    });

    it('should return undefined for non-existent id', () => {
      const updated = service.update(9999, { name: 'Nope' });
      expect(updated).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete agent', () => {
      const created = service.create({ name: 'DeleteMe', type: 'test' });
      const deleted = service.delete(created.id);
      expect(deleted).toBe(true);
    });

    it('should return false for non-existent id', () => {
      const deleted = service.delete(9999);
      expect(deleted).toBe(false);
    });
  });
});