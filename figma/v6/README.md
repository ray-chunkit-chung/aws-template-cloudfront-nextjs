
  # Data Analytics Dashboard

  This is a code bundle for Data Analytics Dashboard. The original project is available at https://www.figma.com/design/37IT4KgJRy2COBh2EIUJTN/Data-Analytics-Dashboard.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Code analysis summary (v6)
  - Stack: Vite + React + TypeScript with Tailwind utility classes, lucide-react icons, and Recharts for visualizations.
  - App shell: `App.tsx` keeps a single `selectedApp` state that flows into `Sidebar` (selection buttons) and `Dashboard` (contextual copy in hero). Layout uses a fixed sidebar plus header + scrollable main content.
  - Navigation: `Sidebar` renders a static list of app shortcuts; selection toggles highlight state and updates the parent via callback.
  - Header: search input, notification badge, and user dropdown; dropdown uses `useEffect` with a document mousedown listener to close on outside clicks.
  - Dashboard: stat cards (map over `stats` config with trend icons/colors), three Recharts panels (area revenue/users, line weekly traffic, bar category sales), and a recent-activity feed with user-initial avatars; all data is local mock arrays.
  - Responsiveness: grids collapse to fewer columns via Tailwind breakpoints (`md`, `lg`), and the main area scrolls while header/sidebar stay fixed.
  