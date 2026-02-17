# Agent Guidelines: Supabase + React + Vite Project

This project is a modern full-stack template using React, Vite, and Supabase. These guidelines help AI agents contribute effectively.

## Tech Stack & Architecture

- **React 19**: Use functional components with hooks.
- **Vite**: Modern dev server and build tool.
- **TypeScript**: Strictly typed development.
- **Supabase**: Backend (Auth, Database, Storage) with a local development workflow.
- **Tailwind CSS + Shadcn UI**: Styling and UI components.
- **React Router 7**: Declarative routing.

## Important Directories & Files

- `src/lib/supabase.ts`: Supabase client initialization.
- `src/components/auth-provider.tsx`: Context for authentication state.
- `src/components/ui/`: Shadcn UI components (reusable).
- `src/lib/profile-service.ts`: Logic for managing user profiles in Supabase.
- `supabase/migrations/`: Database schema definitions.
- `tests/`: End-to-end tests using Playwright.

## Working with Database Schema

1.  **Always use migrations**: Never apply schema changes directly.
2.  **Creation**: Use `supabase migration new <name>` to generate a new file in `supabase/migrations`.
3.  **Application**: Use `supabase migration up` (or `supabase start`) to apply.
4.  **Schema Check**: See `supabase/migrations/20260217000000_init_schema.sql` for the current profile schema.

## Adding New Features

### 1. UI Components
- Use `npx shadcn-ui@latest add <component-name>` to add new Shadcn components.
- Place project-specific components in `src/components`.
- Follow the accessibility patterns established in existing components.

### 2. Pages
- Add new pages to `src/pages`.
- Register new routes in `src/App.tsx`.

### 3. Supabase Integration
- Create services for complex database logic in `src/lib`.
- Ensure Row Level Security (RLS) policies are defined for any new tables in migrations.

## Testing Guidelines

- **Playwright**: Add new end-to-end tests for critical user flows in `tests/`.
- Ensure tests pass before claiming completion of a feature.
- Use `pnpm test` to run all tests.

## Coding Standards

- **React**: Use modern patterns (e.g., `useActionState` if appropriate for React 19).
- **TypeScript**: Define interfaces for all data structures (e.g., Supabase table rows).
- **Styling**: Prefer utility classes (Tailwind) and CSS variables for theming.
- **Error Handling**: Implement robust error handling for Supabase calls and form submissions.
- **Accessibility**: Ensure all new components follow ARIA guidelines and are keyboard-navigable.

## Authentication & RLS

- Use the `useAuth` hook (from `AuthProvider`) to access the current session and user.
- All new tables **must** have RLS enabled with appropriate policies.
- Check `20260217000000_init_schema.sql` for examples of RLS policies for profiles and storage.
