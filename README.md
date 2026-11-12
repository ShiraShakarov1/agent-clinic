# Agent Clinic

## Overview

Agent Clinic is a Spec-Driven Development project that demonstrates building a complete application using specifications as the source of truth. The project follows a structured workflow: define specifications, implement features based on those specs, validate the implementation against the specs, and iterate.

## Project Structure

```
agent-clinic/
├── specs/           # Specification documents (source of truth)
│   ├── mission.md
│   ├── techstack.md
│   └── roadmap.md
├── src/             # Source code
│   ├── index.ts     # Entry point
│   ├── app.ts       # Hono app setup
│   ├── db.ts        # SQLite database
│   ├── routes/      # API routes
│   └── views/       # HTML templates
├── tests/           # Test files
├── public/          # Static assets
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Development mode (watch)
npm run dev

# Production build
npm run build

# Run production
npm start

# Run tests
npm test
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Hono (web framework)
- **Database**: SQLite (better-sqlite3)
- **Language**: TypeScript with strict mode
- **Testing**: Vitest
- **Build**: TypeScript compiler + tsx

## Development Workflow

1. **Spec First**: Write or update specifications before coding
2. **Feature Branches**: Create feature branches for each new feature
3. **Implement**: Build the feature following the spec
4. **Validate**: Run tests and verify against spec
5. **Review**: Code review and fixes
6. **Merge**: Merge to main after approval