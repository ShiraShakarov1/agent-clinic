# Changelog

All notable changes to Agent Clinic will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-11-13

### Added
- Initial project setup with TypeScript strict mode
- Hono web framework integration
- SQLite database with better-sqlite3
- Health check endpoint (`GET /api/health`)
- Root HTML page with application information
- Agent CRUD operations (List, Get, Create, Update, Delete)
- Ailment CRUD operations (List, Get, Create, Update, Delete)
- Shared TypeScript type definitions
- Service layer for business logic
- Vitest testing infrastructure
- Unit tests for AgentService (9 tests)
- Unit tests for AilmentService (6 tests)
- Integration test suite (9 tests)
- Testing policy documentation
- Seed data for agents and ailments
- Graceful shutdown handling
- CORS middleware
- Request logging
- Pretty JSON middleware

### Changed
- Updated techstack.md with testing policy
- Updated roadmap.md with completed phases

### Files Created
- `package.json`, `package-lock.json`
- `tsconfig.json`, `vitest.config.ts`
- `.gitignore`
- `README.md`
- `specs/mission.md`
- `specs/techstack.md`
- `specs/roadmap.md`
- `specs/features/hello-hono.md`
- `specs/validation-hello-hono.md`
- `TASKS.md`
- `CHANGELOG.md`
- `src/index.ts`
- `src/config.ts`
- `src/types.ts`
- `src/db.ts`
- `src/routes/health.ts`
- `src/routes/agents.ts`
- `src/routes/ailments.ts`
- `src/services/agent.ts`
- `src/services/ailment.ts`
- `tests/agent.test.ts`
- `tests/ailment.test.ts`
- `tests/api-test.ts`

### Statistics
- Lines of code: ~800
- Test coverage: 100% of service methods
- Dependencies: 5 production, 7 dev