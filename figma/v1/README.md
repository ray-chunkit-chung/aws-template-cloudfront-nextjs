
# Data Analytics Dashboard Figma Version 1

## Code Analysis Summary

- **Stack:** Vite + React 19 + TypeScript, Tailwind v4 build output in `src/index.css`, icons via `lucide-react`, charts via `recharts`.
- **Entry & shell:** `src/main.tsx` mounts `App.tsx`. `App.tsx` holds `selectedApp` state and renders the shell: `Sidebar` (app selector), `Header` (search, notifications, profile menu), and `Dashboard` (data visuals/content).
- **Layout:** Full-height flex: sidebar (fixed width) + main column with header and scrollable content. Light theme with gray surfaces and indigo accents; rounded cards and soft borders.
- **Components:**
  - `Sidebar.tsx`: static app list, highlights the selected app, emits `onSelectApp`.
  - `Header.tsx`: search input, bell with badge, profile dropdown with click-outside close logic.
  - `Dashboard.tsx`: stat cards, area/line/bar charts (`recharts`), and recent-activity list; `selectedApp` only affects copy in the welcome line.
- **Data model:** All data is local mock arrays for stats, revenue/users, traffic, category sales, and activity feed; no API calls.
- **Styling:** Tailwind utility classes plus token-rich theme variables in `src/styles/globals.css`; the generated Tailwind output lives in `src/index.css`.
- **Behavior:** Client-only interactions (stateful dropdown, app selection). Charts rely on `ResponsiveContainer` for resizing. No routing or persistence.
