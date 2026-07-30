# Overview

This is a submission for a technical assignment, creating a small full-stack app creating an Incident Management System

# Running the Project

Add .env file in /api
```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/incident_report"
PORT=8000
```
Add .env file in /web
```bash
VITE_API_URL="http://localhost:8000/api"
```
Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npm run db:generate
```
Generate Prisma Client:

```bash
npm run db:seed
```
Run Backend:

```bash
npm run dev:backend
```

Run Frontend:

```bash
npm run dev:frontend
```

# Assumptions

This is the logic I implemented during development based on the main requirements of the task:

## Incident Workflow
* Incident status transitions are enforced using a backend "state machine".
* Only the following transitions are allowed:
  * New -> In Progress
  * In Progress -> Resolved
  * Resolved -> Closed
  * Resolved -> In Progress (Reopen)
* Closed incidents are treated as read-only and cannot be modified.

## Incident History
* History entries are automatically created whenever significant changes occur.
* The following actions are recorded:
  * Incident created
  * Incident updated
  * Status changes
  * Priority changes
  * Due date changes
  * Resolution note updates
* The history entries contain the modified field together with its previous and new values where applicable. 

## Overdue Incidents
* An incident is considered overdue when:
  * it has a due date,
  * the due date is before the current date/time,
  * and the incident has not been closed.
* Resolved incidents may still appear as overdue until they are closed.

## Resolution Notes
* A resolution note is required before an incident can be moved to the **Resolved** state.
* Resolution notes remain visible after an incident is closed.

## High Priority Incidents
* High-priority incidents must include a due date.
* Lower-priority incidents may optionally have a due date.

## Editing Incidents
* Only modified fields are sent to the backend during updates.
* The backend remains responsible for validating all incoming data regardless of frontend validation.

## Pagination
* Pagination is implemented on the backend.
* I found no use of it on the frontend since I decided to implement a kanban board design.

## Sample Data
* I've included Prisma seed script is included to populate the database with incidents in multiple states, including history entries and overdue incidents.

# Implemented Bonus Requirements:
* Filter Incidents By Status
* Filter Incidents By Priority
* Included Seed Data
* Pagination is possible on the main GET route, however I didn't find a use for it with the design I had implemented

### Frontend Tech Stack
* Vue 3
* TypeScript
* Pinia
* Tailwind CSS
* Axios

### Backend Tech Stack
* Node
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Zod