
# Data Analytics Dashboard Figma Version 7

## Code analysis summary (v)

- Stack: Vite + React + TypeScript; Tailwind utility classes; lucide-react for icons; Recharts for charts; layout mirrors earlier versions.
- App shell: `App.tsx` now tracks `isCollapsed` alongside `selectedApp`, passing both into `Sidebar`; header/body remain unchanged.
- Sidebar: dark theme with collapsible width (`w-64` ↔ `w-20`) via `isCollapsed`, toggle button with Chevron icons, centers icons when collapsed and hides labels (uses `title` for tooltips); selection styling unchanged from v6.
- Header: same search/notification/user dropdown with outside-click close handler.
- Dashboard: same mock stat cards, Recharts panels (area, line, bar), and recent-activity feed driven by local arrays.

## Differences vs v6

- New collapsible sidebar state and UI: added `isCollapsed` prop, toggle control, responsive label hiding, tooltip titles, and width transition.
- Minor prop threading: `App.tsx` wires collapse state into `Sidebar`; other components are unchanged.
  