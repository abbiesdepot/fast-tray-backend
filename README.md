# Fast Tray Backend

Express + TypeScript backend scaffold for a campus food-court ordering app with Prisma and Zod validation.

## Requirements

- Node.js 20+
- PostgreSQL running locally

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env
   ```

3. Generate the Prisma client:

   ```bash
   npm run prisma:generate
   ```

4. Run the initial migration:

   ```bash
   npm run prisma:migrate
   ```

## Run

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the compiled app:

```bash
npm start
```

## API Layout

- Public routes: `/api/public/health`
- Private CRUD routes: `/api/private/users`, `/api/private/tasks`, `/api/private/schedules`, `/api/private/schedule-activities`, `/api/private/rewards`

Login is role-based: POST `/api/users/login` accepts `email` and `role`, creates the user if needed, and returns the user record.

Private routes are protected by the prototype auth middleware, which accepts either a Bearer token or role headers for the selected user.

## Tests

```bash
npm test
```