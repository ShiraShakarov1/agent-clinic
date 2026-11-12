# Feature Spec: Agents and Ailments

## 1. Overview

### Feature Name

Agents and Ailments

### Feature Branch

`feature/agents-and-ailments`

### Status

Draft → Implemented and Validated

### Parent Spec

This feature extends the foundation established in the Hello Hono implementation and aligns with the project mission and road map for a practical clinic management API.

---

## 2. Purpose

The Agents and Ailments feature introduces the main data entities for the Agent Clinic domain. The system must support administrative management of staff agents and operational ailment records, enabling CRUD operations and the necessary persistence layer in SQLite.

This feature also validates that the architecture supports domain-driven service separation, data validation, and API-level interaction through Hono.

---

## 3. Requirements

### 3.1 Functional requirements

| ID    | Requirement        | Priority  | Description                                          |
| ----- | ------------------ | --------- | ---------------------------------------------------- |
| FR-01 | Agent list         | Must-have | `GET /api/agents` returns all agents                 |
| FR-02 | Agent detail       | Must-have | `GET /api/agents/:id` returns one agent              |
| FR-03 | Agent create       | Must-have | `POST /api/agents` creates a new agent               |
| FR-04 | Agent update       | Must-have | `PUT /api/agents/:id` updates an agent               |
| FR-05 | Agent delete       | Must-have | `DELETE /api/agents/:id` removes an agent            |
| FR-06 | Ailment list       | Must-have | `GET /api/ailments` returns all ailments             |
| FR-07 | Ailment detail     | Must-have | `GET /api/ailments/:id` returns one ailment          |
| FR-08 | Ailment create     | Must-have | `POST /api/ailments` creates a new ailment           |
| FR-09 | Ailment update     | Must-have | `PUT /api/ailments/:id` updates an ailment           |
| FR-10 | Ailment delete     | Must-have | `DELETE /api/ailments/:id` removes an ailment        |
| FR-11 | Validation         | Must-have | Missing required fields return `400` responses       |
| FR-12 | Not found          | Must-have | Invalid IDs return `404` responses                   |
| FR-13 | SQLite persistence | Must-have | Data is stored in SQLite and survives request cycles |

### 3.2 Non-functional requirements

| ID     | Requirement            | Priority    | Description                                                |
| ------ | ---------------------- | ----------- | ---------------------------------------------------------- |
| NFR-01 | Type safety            | Must-have   | TypeScript strict mode and explicit domain types           |
| NFR-02 | Separation of concerns | Must-have   | Domain logic isolated in service layer                     |
| NFR-03 | Clean API response     | Should-have | JSON envelopes with `data`, `count`, `message`, and errors |
| NFR-04 | Testability            | Must-have   | Unit tests cover CRUD behaviors                            |
| NFR-05 | Maintainability        | Should-have | Small modules with logical responsibility boundaries       |

---

## 4. Technical specifications

### 4.1 Dependencies

- Hono
- @hono/node-server
- better-sqlite3
- TypeScript
- Vitest

### 4.2 Data model

#### Agent

- id: number
- name: string
- type: string
- status: 'active' | 'inactive' | 'busy'
- created_at: string

#### Ailment

- id: number
- name: string
- severity: 'low' | 'medium' | 'high'
- description: string
- created_at: string

### 4.3 File structure

```text
src/
├── db.ts
├── types.ts
├── services/
│   ├── agent.ts
│   └── ailment.ts
├── routes/
│   ├── agents.ts
│   └── ailments.ts
└── index.ts
```

### 4.4 Persistence behavior

- Database initialized lazily through `getDatabase()`
- Tables created automatically if missing
- Sample seed data added when tables are empty
- CRUD operations use prepared SQL statements
- Database handles synchronous read/write operations

---

## 5. Implementation plan

### Phase 1: Data model and schema

- [x] Define TypeScript types in `src/types.ts`
- [x] Define SQLite schema for agents and ailments
- [x] Add seed data for initial examples

### Phase 2: Service layer

- [x] Implement `AgentService`
- [x] Implement `AilmentService`
- [x] Add CRUD operations and validation logic

### Phase 3: Route layer

- [x] Implement `GET`, `POST`, `PUT`, and `DELETE` routes for agents
- [x] Implement `GET`, `POST`, `PUT`, and `DELETE` routes for ailments
- [x] Add `400` and `404` handling for invalid input and missing records

### Phase 4: Testing

- [x] Add unit tests for agent service
- [x] Add unit tests for ailment service
- [x] Validate API behavior with integration checks

---

## 6. Acceptance criteria

- [x] The application starts successfully with the Hono app
- [x] SQLite database initializes automatically
- [x] Agents can be listed, fetched, created, updated, and deleted
- [x] Ailments can be listed, fetched, created, updated, and deleted
- [x] Invalid input returns appropriate HTTP `400` responses
- [x] Missing records return HTTP `404`
- [x] TypeScript compiles without errors
- [x] Vitest suite passes

---

## 7. Validation and scorecard

### Validation commands

```bash
npm run typecheck
npx vitest run
npx tsx tests/api-test.ts
```

### Scorecard

| Area                    | Status | Notes                            |
| ----------------------- | ------ | -------------------------------- |
| Functional completeness | Pass   | CRUD for both entities           |
| SQLite integration      | Pass   | Schema + seed data works         |
| Type safety             | Pass   | Strong domain types              |
| Test coverage           | Pass   | Service and API behavior covered |
| Documentation           | Pass   | Tasks and roadmap updated        |

---

## 8. Risks and mitigations

| Risk                    | Probability | Impact | Mitigation                              |
| ----------------------- | ----------- | ------ | --------------------------------------- |
| SQLite schema mismatch  | Low         | Medium | Validate schema after each change       |
| Invalid route responses | Low         | Medium | Automated integration checks            |
| Type drift              | Low         | Medium | TypeScript strict checks                |
| Missing validation      | Low         | High   | Explicit input checks in route handlers |

---

## 9. Change log

| Date       | Change                                   | Author       |
| ---------- | ---------------------------------------- | ------------ |
| 2026-11-13 | Initial feature specification created    | Agent Clinic |
| 2026-11-13 | Feature validated against implementation | Agent Clinic |

---

## 10. Approval

| Role     | Name         | Date       | Status   |
| -------- | ------------ | ---------- | -------- |
| Author   | Agent Clinic | 2026-11-13 | Approved |
| Reviewer | User         | -          | Pending  |
| Approver | User         | -          | Pending  |
