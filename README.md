
  # Smart Harvest
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

Making the database accessible locally (optional)

- If you need local or remote access to your MySQL server, do these steps on the machine running MySQL:

  1. If you want external access, edit your MySQL config (my.ini or my.cnf) and set `bind-address = 0.0.0.0`. Restart the MySQL service after changing it.

  2. Create a dedicated DB user for the app and grant privileges. A helper PowerShell script is included at `backend/scripts/create_remote_user.ps1`. It now creates `smart_user` for both `127.0.0.1` and `localhost`, which enables local backend access. Edit the variables inside (`$appUser`, `$appPass`, and optionally `$adminPass`) and run the script as Administrator:

      ```powershell
      cd backend\scripts
      .\create_remote_user.ps1
      ```

  3. Update `backend/.env` with the new `DATABASE_URL`, encoding any special characters in the password (for example `@` → `%40`). Example:

      ```env
      DATABASE_URL="mysql://smart_user:YourP%40ss@127.0.0.1:3306/smart_harvest"
      ```

  Notes:
  - Changing `bind-address` can expose MySQL to the network. Prefer creating a user bound to a specific host or use firewalls to restrict access.
  - If you prefer not to open MySQL to the network, use the backend API endpoints (already available) so the frontend does not need direct DB access.
  
