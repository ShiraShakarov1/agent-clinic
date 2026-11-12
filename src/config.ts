/**
 * Application configuration
 */

export const appConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  database: process.env.DB_PATH || './data/clinic.db',
  nodeEnv: process.env.NODE_ENV || 'development',
} as const;