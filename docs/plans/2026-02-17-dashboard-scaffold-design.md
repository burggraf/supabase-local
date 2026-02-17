# Dashboard Scaffold Design - 2026-02-17

## Overview
A client-side-only React SPA built with Vite, Tailwind 3.x, and shadcn/ui, using Supabase for the backend. The application features a collapsible dashboard sidebar, user profile management (with avatar), and full authentication (including password recovery).

## Architecture & Tech Stack
- **Frontend**: React 18+ (Vite) - Client-side only (no SSR/Server functions).
- **Styling**: Tailwind CSS 3.x, shadcn/ui components (Radix UI).
- **Icons**: Lucide React.
- **State**: React Router 6, Context/Hooks for Auth and Theme.
- **Backend**: Supabase (Auth, Database, Storage).
- **Testing**: Playwright (Desktop & Mobile viewports).

## Data Model
- **Auth**: Supabase Auth (Email/Password).
- **Database**: 
  - `profiles` table: `id` (UUID, references `auth.users`), `username` (text), `full_name` (text), `avatar_url` (text), `updated_at` (timestamptz).
  - RLS enabled (users can only see/edit their own profile).
- **Storage**: `avatars` bucket (Public, RLS-protected for uploads/deletes).

## UI/UX & Layout
- **Starting Page**: Simple splash page with "Get Started" and light/dark toggle.
- **Dashboard**: 
  - Collapsible sidebar (`shadcn/ui` sidebar component).
  - **Header**: Company switcher (placeholder).
  - **Footer**: User object with links to Profile and Logout.
- **Profile Page**: Update profile info and manage avatar (upload/change/delete).
- **Themes**: System-default with manual toggle. High-contrast colors for accessibility (no low-contrast text/icons).

## Auth Flow
- **Lazy Profile Creation**: Profiles are created via `upsert` only when a user first attempts to save changes on the profile page.
- **Protected Routes**: Main dashboard and profile are inaccessible unless authenticated.
- **Password Recovery**: Full flow using Supabase `resetPasswordForEmail`.

## Testing
- **Playwright E2E**: Auth flows, profile updates, theme persistence, responsive layouts (Desktop & Mobile).
- **Verification**: Contrast checks and console error monitoring.
