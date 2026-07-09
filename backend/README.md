# Smart Harvest Backend

This folder contains a production-ready Node/Express backend for the Smart Harvest app.
It includes authentication, role-based access control, user management, and action persistence.

## Run locally

```bash
cd backend
npm install
# On Windows use: `copy .env.example .env` else on macOS/Linux use: `cp .env.example .env`
copy .env.example .env
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

## Database and authentication

- ORM: Prisma
- Database: MySQL / MariaDB
- Auth: JWT bearer tokens
- Roles: `ADMIN`, `TECHNICIAN`, `VIEWER`, `FARMER`
- Initial admin account is seeded from `.env`

## VPS deployment notes

- Set `DATABASE_URL` to a managed MySQL/MariaDB instance on your VPS.
- Use `npx prisma migrate deploy` in production to apply migrations.
- For development, use `npx prisma migrate dev --name init` or `npx prisma db push`.
- Keep `JWT_SECRET` secure and do not commit it.

## Routes

### Auth
- `POST /api/auth/signup` - create an account
- `POST /api/auth/login` - authenticate and receive a token
- `GET /api/auth/me` - retrieve current user profile

### Users
- `GET /api/users` - list users (admin only)
- `GET /api/users/:id` - retrieve user profile
- `POST /api/users` - create a user (admin only)
- `PATCH /api/users/:id` - update user profile
- `DELETE /api/users/:id` - remove a user (admin only)

### Actions
- `GET /api/actions` - list actions
- `GET /api/actions/:id` - retrieve a specific action
- `POST /api/actions` - create an action
- `PATCH /api/actions/:id` - update an action (admin only)
- `DELETE /api/actions/:id` - delete an action (admin only)

## Notes

- the backend listens on port `4000` by default
- `CORS` is enabled so the frontend can call the API from a different origin
- use `Authorization: Bearer <token>` for protected routes
