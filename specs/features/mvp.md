# Feature Spec: MVP Completion

## 1. Overview

### Feature Name

MVP Completion

### Feature Branch

`feature/mvp`

### Status

Draft → In Progress

### Goal

Complete the minimal viable version of Agent Clinic by validating the implemented CRUD flows, ensuring full project coherence, and confirming that the app is ready for the next development cycle.

---

## 2. Purpose

The MVP must demonstrate that the project behaves as a usable clinic management API:

- the application runs correctly,
- SQLite persists domain data,
- endpoints respond with expected JSON,
- unit tests remain green,
- documentation reflects the actual state of the project.

---

## 3. Requirements

### Functional requirements

| ID    | Requirement     | Priority    | Description                                             |
| ----- | --------------- | ----------- | ------------------------------------------------------- |
| FR-01 | App startup     | Must-have   | The application starts via the standard project command |
| FR-02 | Health endpoint | Must-have   | `GET /api/health` returns service health                |
| FR-03 | Agents CRUD     | Must-have   | Agents can be listed, created, updated, and deleted     |
| FR-04 | Ailments CRUD   | Must-have   | Ailments can be listed, created, updated, and deleted   |
| FR-05 | Example dataset | Must-have   | Seed data is available for both entities                |
| FR-06 | Validation      | Must-have   | Input validation protects invalid requests              |
| FR-07 | Docs alignment  | Should-have | Roadmap and task tracker match the codebase             |

### Non-functional requirements

| ID     | Requirement     | Priority    | Description                           |
| ------ | --------------- | ----------- | ------------------------------------- |
| NFR-01 | Type safety     | Must-have   | TypeScript compilation succeeds       |
| NFR-02 | Reliability     | Must-have   | Test suite passes without regressions |
| NFR-03 | Maintainability | Should-have | Code stays modular and readable       |
| NFR-04 | Documentation   | Should-have | Specs and tasks stay current          |

---

## 4. Technical notes

### Runtime checks

- Use the configured project scripts from `package.json`
- Validate `npm run typecheck`
- Validate `npx vitest run`
- Run the Hono app and query it locally through HTTP

### Data behavior

- The database is created automatically when the app starts
- Tables are created if they do not yet exist
- Sample records are inserted for visible initial data

---

## 5. Implementation checklist

### Project consistency

- [x] Confirm current feature branch is active
- [x] Verify repo is synced to origin/main
- [x] Validate implemented codebase
- [x] Update tasks dashboard

### MVP execution

- [ ] Run the server locally
- [ ] Verify root page responds
- [ ] Verify `/api/health` responds
- [ ] Verify `/api/agents` responds
- [ ] Verify `/api/ailments` responds
- [ ] Confirm SQLite seed data is populated
- [ ] Run full project checks
- [ ] Update roadmap and status board

---

## 6. Success criteria

- [ ] The app boots without TypeScript or runtime errors
- [ ] Local HTTP checks succeed for all major routes
- [ ] Tests remain green
- [ ] The roadmap reflects the actual status of the project
- [ ] The code is ready for the next development phase

---

## 7. Validation commands

```bash
npm run typecheck
npx vitest run
npm run dev
```

Then verify:

```bash
curl http://localhost:3000/
curl http://localhost:3000/api/health
curl http://localhost:3000/api/agents
curl http://localhost:3000/api/ailments
```

---

## 8. Approval

| Role     | Name         | Date       | Status  |
| -------- | ------------ | ---------- | ------- |
| Author   | Agent Clinic | 2026-11-13 | Draft   |
| Reviewer | User         | -          | Pending |
| Approver | User         | -          | Pending |
