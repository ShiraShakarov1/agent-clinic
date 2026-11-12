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

### Testing Policy

All features must include tests following the testing pyramid:

1. **Unit Tests** (70% of tests)
   - Test individual functions and services in isolation
   - Use Vitest with in-memory SQLite database
   - Mock external dependencies
   - Location: `tests/*.test.ts`

2. **Integration Tests** (20% of tests)
   - Test route handlers with real database
   - Use Hono's `app.request()` for HTTP simulation
   - Test full request-response cycle
   - Location: `tests/integration/*.test.ts`

3. **Type Tests** (10% of tests)
   - Use `tsc --noEmit` to verify type safety
   - Run as part of CI/CD pipeline
   - Enforce strict mode

### Test Naming Conventions
- Unit tests: `tests/<module>.test.ts`
- Integration tests: `tests/integration/<feature>.test.ts`
- Test describe blocks: `<Feature/Module> - <operation>`
- Test names: `<expected behavior> - <scenario>`

### Test Commands
```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Type check
npm run typecheck
```

### Coverage Requirements
- Minimum 80% coverage for core logic
- 100% coverage for type definitions
- All routes must have corresponding tests
- All service methods must be tested

### Testing Workflow
1. Write feature specification
2. Write tests alongside implementation
3. Run `npm run typecheck` before commit
4. Run `npm test` before commit
5. Fix failing tests before merging
6. Review test coverage in code review

## Deployment

- Build with `npm run build`
- Run with `node dist/index.js`
- Environment variables for configuration
- SQLite database file for data storage