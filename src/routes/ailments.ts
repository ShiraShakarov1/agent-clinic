/**
 * Ailments routes - HTTP handlers for Ailment operations
 */

import { Hono } from 'hono';
import { getDatabase } from '../db.js';
import { AilmentService } from '../services/ailment.js';
import { type Ailment, type CreateAilmentInput, type UpdateAilmentInput } from '../types.js';

export const ailmentsRouter = new Hono();

function getAilmentService(): AilmentService {
  return new AilmentService(getDatabase());
}

ailmentsRouter.get('/', (c) => {
  const service = getAilmentService();
  const ailments = service.getAll();
  return c.json({ data: ailments, count: ailments.length });
});

ailmentsRouter.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (isNaN(id)) {
    return c.json({ error: 'Invalid ailment ID' }, 400);
  }
  const service = getAilmentService();
  const ailment = service.getById(id);
  if (!ailment) {
    return c.json({ error: 'Ailment not found' }, 404);
  }
  return c.json({ data: ailment });
});

ailmentsRouter.post('/', async (c) => {
  try {
    const body = await c.req.json<CreateAilmentInput>();
    if (!body.name) {
      return c.json({ error: 'name is required' }, 400);
    }
    const service = getAilmentService();
    const ailment = service.create(body);
    return c.json({ data: ailment }, 201);
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
});

ailmentsRouter.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) {
      return c.json({ error: 'Invalid ailment ID' }, 400);
    }
    const body = await c.req.json<UpdateAilmentInput>();
    const service = getAilmentService();
    const ailment = service.update(id, body);
    if (!ailment) {
      return c.json({ error: 'Ailment not found' }, 404);
    }
    return c.json({ data: ailment });
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
});

ailmentsRouter.delete('/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10);
  if (isNaN(id)) {
    return c.json({ error: 'Invalid ailment ID' }, 400);
  }
  const service = getAilmentService();
  const deleted = service.delete(id);
  if (!deleted) {
    return c.json({ error: 'Ailment not found' }, 404);
  }
  return c.json({ message: 'Ailment deleted' });
});