# Event Lens Studio

A lightweight TypeScript API and dashboard for managing photographers, events, galleries, and photo workflows.

## Overview

Event Lens Studio is a Spec-Driven Development project designed as a scalable foundation for creative businesses, especially photography studios, event coverage teams, and digital gallery management.

The project combines:
- TypeScript
- Hono
- SQLite
- Vitest
- Git-based workflow and documentation-first development

## What this project includes

- Working REST API
- SQLite database initialization and seed data
- Photographer/event-focused domain model
- Service-layer CRUD logic
- Testing setup for validation
- Dashboard with an event and photography branding concept

## Project structure

```text
agent-clinic/
├── data/                   # SQLite data directory
├── specs/                  # Requirements and roadmap docs
│   ├── mission.md
│   ├── techstack.md
│   ├── roadmap.md
│   └── features/
├── src/
│   ├── config.ts
│   ├── db.ts
│   ├── index.ts
│   ├── types.ts
│   ├── routes/
│   └── services/
├── tests/
├── CHANGELOG.md
├── README.md
├── TASKS.md
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── .gitignore
└── .claude/
```

## Getting started

```bash
npm install
npm run dev
```

### Useful commands

```bash
npm run build
npm start
npm test
npx vitest run
npm run typecheck
```

## Main API endpoints

- GET /
- GET /api/health
- GET /api/agents
- GET /api/agents/:id
- POST /api/agents
- PUT /api/agents/:id
- DELETE /api/agents/:id
- GET /api/ailments
- GET /api/ailments/:id
- POST /api/ailments
- PUT /api/ailments/:id
- DELETE /api/ailments/:id

## Current status

This repository is in a solid MVP state:

- Backend is working
- Database initializes correctly
- API is functional
- Tests pass
- Project documentation is in place
- Dashboard has been re-themed toward photography and event workflows

## Development approach

This project follows a documentation-first and validation-first workflow:

1. Define the requirement/spec
2. Build the feature branch
3. Implement the code
4. Validate with tests
5. Update docs and roadmap
6. Prepare for the next milestone

## Related docs

- [specs/roadmap.md](specs/roadmap.md)
- [TASKS.md](TASKS.md)
- [CHANGELOG.md](CHANGELOG.md)

## Repository

- GitHub: https://github.com/ShiraShakarov1/agent-clinic

## Notes

The project was originally structured as an agent/clinic concept, but it has been adapted into a more flexible event and photography management direction without changing the underlying technical foundation.

This makes it easy to continue with a real gallery, event booking, or studio operations product later on.
