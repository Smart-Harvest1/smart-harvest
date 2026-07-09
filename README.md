
  # Smart Harvest

  This is a code bundle for Smart Harvest. The original project is available at https://www.figma.com/design/vq2UBdZhaClYU7uucIoBd5/Smart-Harvest.

  ## Running the code
  Run `npm i` to install the workspace dependencies.

  Development
  - Frontend (Vite + React)
    - Install deps and start dev server:

      ```bash
      npm install
      npm run dev
      ```

    - The frontend dev server runs at `http://localhost:5174/` (Vite may pick a different port).

  - Backend (Node + Express + Prisma)
    - Setup and run:

      ```bash
      cd backend
      npm install
      # copy environment example (Windows)
      copy .env.example .env
      # edit .env if using MySQL with password; example DATABASE_URL format:
      # mysql://USER:PASSWORD@HOST:PORT/DATABASE
      npx prisma generate
      npx prisma migrate dev --name init
      node prisma/seed.js
      npm run dev
      ```

    - The backend listens at `http://localhost:4000` and exposes a health endpoint at `/api/health`.

  Notes
  - This repository contains both frontend and backend. The backend uses Prisma and expects a database configured in `backend/.env` under `DATABASE_URL`.
  - For local development the project was tested with a MySQL database on `127.0.0.1:3306` and a root account that had no password. If your MySQL requires a password, encode special characters in the URL (e.g. `@` -> `%40`).
  - To seed an initial admin user, set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` in `backend/.env` before running `node prisma/seed.js`.
  