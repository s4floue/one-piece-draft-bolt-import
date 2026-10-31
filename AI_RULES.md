# Tech Stack

- You are building a React application.
- Use TypeScript.
- Use React Router. KEEP the routes in src/App.tsx
- Always put source code in the src folder.
- Put pages into src/pages/
- Put components into src/components/
- The main page (default page) is src/pages/Index.tsx
- UPDATE the main page to include the new components. OTHERWISE, the user can NOT see any components!
- ALWAYS try to use the shadcn/ui library.
- Tailwind CSS: always use Tailwind CSS for styling components. Utilize Tailwind classes extensively for layout, spacing, colors, and other design aspects.

Available packages and libraries:

- The lucide-react package is installed for icons.
- You ALREADY have ALL the shadcn/ui components and their dependencies installed. So you don't need to install them again.
- You have ALL the necessary Radix UI components installed.
- Use prebuilt components from the shadcn/ui library after importing them. Note that these files shouldn't be edited, so make new components if you need to change them.

# Draft integration

- `src/lib/draft-runtime.js` preserves the user's verified final `draft.html` engine. Gameplay bug fixes require individual user approval; do not silently alter draft rules, weights, categories, budgets, passes, undo or scoring.
- React/TypeScript hosts the native source-backed interface in `src/data/draft-markup.html`; keep control IDs synchronized with the engine. Runtime mounting cleans up listeners, timers and generated panels.
- The new season does not import old character sale statistics. Averages accumulate through existing sale logic; this is not permission to erase other records.
