scaffold a new application using:
react (client-side-only) no SSR, no server-side functions or components, use Vite
tailwind 3.x, shadcn for all UI components
use the shadcn dashboard as a base, with a collapsible left sidebar
add a company switcher to the top of the sidebar
add the user object to the bottom of the sidebar, with links to a user profile page and logout link
add a user registration & login page (email/password) with full password recovery functionality using
supabase for the backend
create the user profile page where the user can update their profile (and upload, change, or delete
their avatar)
add a starting page - the main dashboard is not availble unless the user is logged in
add a light/dark mode toggle to the starting page, login component, and the dashboard - make sure all
screens support both light and dark mode, default to the current system setting (light or dark) and
make SURE there are no screen elements on any page that have poor contrast for any text or icon items
(no light gray on white or dark gray on black, no white on white or black on black, etc.)
use playwright-cli to run e2e tests for each screen to make sure it's functional, doesn't have any errors, and looks professional and clean, and works with both desktop browsers and mobile (phone) browsers
use the superpowers skill, ask any questions for items you're unsure about
