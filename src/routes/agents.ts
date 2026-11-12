/**
 * Agents routes
 */

import { Hono } from 'hono';

export const agentsRouter = new Hono();

agentsRouter.get('/', (c) => {
  return c.json({
    message: 'Agents endpoint - coming soon',
    agents: [],
  });
});