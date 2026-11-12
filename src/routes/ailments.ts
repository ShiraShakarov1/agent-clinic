/**
 * Ailments routes
 */

import { Hono } from 'hono';

export const ailmentsRouter = new Hono();

ailmentsRouter.get('/', (c) => {
  return c.json({
    message: 'Ailments endpoint - coming soon',
    ailments: [],
  });
});