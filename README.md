# Supabase + React + Vite Full-Stack Template

A modern, full-stack boilerplate using React, Vite, and Supabase for local-first development. This template includes a complete authentication system, user profiles, and a dashboard layout with a sidebar.

## Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Backend/Database**: [Supabase](https://supabase.com/) (Local Development)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Testing**: [Playwright](https://playwright.dev/)

## Features

- 🔐 **Full Authentication Flow**: Register, Login, Logout, Password Reset, and Password Recovery.
- 👤 **User Profiles**: Profile management with data stored in Supabase.
- 📊 **Dashboard Layout**: A responsive dashboard with a collapsible sidebar and theme switching.
- 🌓 **Dark Mode**: Built-in support for light and dark themes.
- 🛠️ **Local Development**: Fully local Supabase environment for rapid development.
- ✅ **End-to-End Testing**: Pre-configured Playwright tests for auth and profile flows.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (Required for Supabase Local)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### Setup

1.  **Clone the repository and install dependencies:**

    ```bash
    pnpm install
    ```

2.  **Initialize and start Supabase local backend:**

    Make sure Docker is running, then execute:

    ```bash
    supabase init
    supabase start
    ```

    *Note: If `supabase init` was already performed, you only need `supabase start`.*

3.  **Environment Variables:**

    The application is pre-configured to connect to the local Supabase instance. If you need to customize the connection, check your `.env` file (if applicable) or `src/lib/supabase.ts`.

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    The app will be available at `http://localhost:5173`.

## Database Migrations

Database schema is managed via Supabase migrations. You can find them in the `supabase/migrations` directory.

- To create a new migration: `supabase migration new <name>`
- To apply migrations: `supabase migration up` (handled automatically by `supabase start`)

## Testing

Run the end-to-end tests with Playwright:

```bash
pnpm test
```

For UI mode:

```bash
pnpm exec playwright test --ui
```

## Project Structure

- `src/components`: UI components (including Shadcn components in `/ui`).
- `src/hooks`: Custom React hooks.
- `src/lib`: Utility functions and Supabase client initialization.
- `src/pages`: Individual page components and routing logic.
- `supabase/`: Local Supabase configuration and migrations.
- `tests/`: Playwright E2E tests.
