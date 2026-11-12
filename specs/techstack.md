# Technology Stack

## Core Technologies

### Runtime
- **Node.js** (v20+) - JavaScript runtime
- **npm** - Package manager

### Backend Framework
- **Hono** (^4.7.0) - Fast, lightweight web framework
- **@hono/node-server** - Node.js adapter for Hono

### Database
- **better-sqlite3** (^11.3.0) - SQLite3 driver for Node.js
- SQLite chosen for simplicity, zero-configuration, and portability

### Language
- **TypeScript** (^5.5.0) - Type-safe JavaScript
- Strict mode enabled with additional strict checks:
  - `strictNullChecks`
  - `noImplicitAny`
  - `strictPropertyInitialization`
  - `exactOptionalPropertyTypes`
  - `noUncheckedIndexedAccess`

### Testing
- **Vitest** (^2.1.0) - Modern testing framework
- Test structure: unit tests for business logic, integration tests for routes

### Build & Development
- **tsx** (^4.19.0) - TypeScript runner for development
- **tsc** - TypeScript compiler for production builds

## Development Tools

### Linting
- **ESLint** (^9.0.0) with TypeScript ESLint plugin

### Git
- Git for version control
- Feature branch workflow

## Architecture

### Backend Architecture
- **Hono** for HTTP handling
- **SQLite** for data persistence
- **Layered architecture**: Routes → Service → Database
- **TypeScript types** as contract between layers

### Project Structure
```
src/
├── index.ts       # Entry point
├── app.ts         # Hono app configuration
├── db.ts          # Database connection and migrations
├── routes/        # HTTP route handlers
│   ├── health.ts
│   └── agents.ts
├── services/      # Business logic
├── types/         # Shared TypeScript types
└── views/         # HTML templates (if server-rendered)
```

## Dependency Policy

- All dependencies must be explicitly declared in package.json
- Lock versions to prevent unexpected updates
- Regular security audits (`npm audit`)
- Use `package.json` `overrides` when needed for security fixes

## Testing Strategy

- **Unit tests**: Test individual functions and services
- **Integration tests**: Test route handlers with database
- **Type tests**: Use `tsc --noEmit` to verify types
- Target: 80%+ test coverage for core logic

## Deployment

- Build with `npm run build`
- Run with `node dist/index.js`
- Environment variables for configuration
- SQLite database file for data storage