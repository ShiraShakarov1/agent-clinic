/**
 * Agents routes - HTTP handlers for Agent operations
 */

import { Hono } from 'hono';
import { getDatabase } from '../db.js';
import { AgentService } from '../services/agent.js';
import { type Agent, type CreateAgentInput, type UpdateAgentInput } from '../types.js';

export const agentsRouter = new Hono();

function getAgentService(): AgentService {
  return new AgentService(getDatabase());
}

agentsRouter.get('/', (c) => {
  const service = getAgentService();
  const agents = service.getAll();
  return c.json({ data: agents, count: agents.length });
});

agentsRouter.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (isNaN(id)) {
    return c.json({ error: 'Invalid agent ID' }, 400);
  }
  const service = getAgentService();
  const agent = service.getById(id);
  if (!agent) {
    return c.json({ error: 'Agent not found' }, 404);
  }
  return c.json({ data: agent });
});

agentsRouter.post('/', async (c) => {
  try {
    const body = await c.req.json<CreateAgentInput>();
    if (!body.name || !body.type) {
      return c.json({ error: 'name and type are required' }, 400);
    }
    const service = getAgentService();
    const agent = service.create(body);
    return c.json({ data: agent }, 201);
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
});

agentsRouter.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) {
      return c.json({ error: 'Invalid agent ID' }, 400);
    }
    const body = await c.req.json<UpdateAgentInput>();
    const service = getAgentService();
    const agent = service.update(id, body);
    if (!agent) {
      return c.json({ error: 'Agent not found' }, 404);
    }
    return c.json({ data: agent });
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
});

agentsRouter.delete('/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (isNaN(id)) {
    return c.json({ error: 'Invalid agent ID' }, 400);
  }
  const service = getAgentService();
  const deleted = service.delete(id);
  if (!deleted) {
    return c.json({ error: 'Agent not found' }, 404);
  }
  return c.json({ message: 'Agent deleted' });
});