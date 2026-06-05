# Architectural Decisions

A running log of choices made during this build, with one-line reasoning each. Lives at the repo root so reviewers can see the thinking, not just the output.

---

## Stack

**Next.js 16 (App Router) → matches Bitscale's JD stack ("React, Next.js, TypeScript, Tailwind"); App Router is the modern default for new Next projects.**

**React 19 → comes with Next 16; latest stable, no migration risk.**

**TypeScript strict → required by JD; my daily standard.**

**Tailwind CSS v4 → matches JD; v4's zero-config + `@theme inline` approach removes a config file from maintenance.**

**Inter font (Google Fonts via next/font) → dashboard-UI default; Bitscale's Figma uses a similar humanist sans.**

## Component primitives

**shadcn/ui → production-grade Table, Dialog, Dropdown, Tabs primitives with proper accessibility (focus, keyboard nav, aria). Saves 4+ hours vs hand-rolling. Bitscale's "AI-native dev loop" culture treats shadcn as standard.**

**Lucide React for icons → matches the Figma's icon visual language (stroke-based, consistent weight).**

## Animation

**Framer Motion → required for the creative-touch streaming animation in the Find People modal empty state. Standard for production React animation.**

## State management

**No Redux/Zustand/Jotai. Local `useState`/`useReducer` only.** The dashboard surface has no genuinely shared cross-tree state. Reaching for a global store would be over-engineering for the assignment's scope.

## Data

**Mock data in `src/data/*.ts` files, no fetching, no backend.** The brief is a UI component, not a full-stack app. Mocks keep the focus where the brief points.

## Routing

**Single page at `/`, no client-side routing.** Find People modal is a `<Dialog>` overlay, not a route. Keeps the surface area small and focused.

## Folder structure

```
src/
  app/
    layout.tsx       # root layout, fonts, body styles
    page.tsx         # dashboard entry
    globals.css      # tailwind + theme tokens
  components/        # custom components (Sidebar, Header, etc.)
  components/ui/     # shadcn primitives (added via shadcn CLI)
  data/              # mock data
  hooks/             # custom hooks (useStreamingText, etc.)
  lib/
    utils.ts         # shadcn cn() helper
```

## Creative touch

**AI-native streaming suggestions in the Find People modal empty state.** When the user starts typing in the People Keyword field, the right panel streams character-by-character suggestions for filters and expected result counts via a custom `useStreamingText` hook + Framer Motion. Directly maps Bitscale's JD line about "streaming chat UIs, agent visualizations, generative UIs."

## What's deferred

- Working sort/search/filter on table (visual only)
- "Find Companies" and "New Grid" modals (CTAs inert by design)
- Real backend / data fetching
- Auth / RBAC
- Dark mode
- The mobile sidebar drawer trigger button is wired but the desktop sidebar is the primary experience
