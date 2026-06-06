# Architectural Decisions

One-line reasoning per choice. Lives at repo root so reviewers see the thinking, not just the output.

---

## Framework + language

**Next.js 16 (App Router) over Pages Router** → modern default in Next 13+, React Server Components by default for performance, simpler data-loading model. Pages Router is legacy.

**TypeScript strict** → required by JD, my daily standard. Catches type drift on mock data + component props at build time.

**Tailwind CSS v4** → matches JD, zero-config + `@theme inline` in CSS removes a config file from maintenance.

**Inter / Geist via `next/font`** → loaded at build time, no runtime CSS request, no FOUT. Geist (Nova preset default) carries the dashboard body, Inter is variable-available for accents.

## Primitives

**shadcn/ui (Radix-backed, Nova preset)** → production-grade `Table`, `Dialog`, `Dropdown`, `Tabs`, `Sheet`, `Popover` primitives with accessibility built in (focus management, keyboard nav, aria). Saves 4+ hours of hand-rolling and avoids the version churn of a third-party UI lib. AI tools (Cursor, Claude) have strong training coverage on shadcn patterns, aligning with Bitscale's "Cursor + Claude as co-pilots" culture.

**Lucide React for icons** → matches Figma's stroke-based visual language at consistent weight. Brand-specific icons (LinkedIn / Google / Hubspot) are not first-class in this Lucide version; I used intent-aligned generic icons with brand colors rather than custom-embedding SVG paths for the take-home.

**Framer Motion** → only used for the creative touch (streaming text cursor pulse, suggestion pill stagger entrance). Standard for production React animation; under 50KB tree-shaken.

## State

**Local `useState` / `useReducer` only. No Redux / Zustand / Jotai.** The dashboard has no genuinely shared cross-tree state. The two pieces of UI state that move (`tab`, `query`, `starred`, `workbookOpen`, `keyword`) all live in their owning component. Lifting to a store would be over-engineering for this surface area.

## Server vs client components

**Server by default, `"use client"` only where required.** The dashboard route (`page.tsx`), `Sidebar`, `Header`, `LatestCard` shell, `DemoCard` ship as Server Components, no JS hydration cost. `SidebarContent`, `MobileNav`, `WelcomeBar`, `GridsTable`, `FindPeopleModal`, `StreamingSuggestion`, `LatestCard` (after adding carousel state) are `"use client"` because they have event handlers, hooks, or animations.

## Data

**Mock data in `src/data/*.ts` modules, no fetching, no backend.** The brief asks for a UI component, not a full-stack app. Mocks keep focus on UI craft; the architecture is shaped so swapping to real `fetch` would not require restructuring.

## Routing

**Single route at `/`, no client-side routing.** Find People modal is a `<Dialog>` overlay, not a route. Keeps the surface focused and avoids speculation about routing structure that isn't in the brief.

## Layout / scroll

**Body is `h-full overflow-hidden`; main content is the only scrollable region.** Sidebar and top header stay fixed; only the welcome bar + cards + table scroll. Matches the behavior of production dashboard apps (Notion, Linear) where chrome doesn't move.

## Responsive strategy

**Desktop-first design, mobile-first responsive code.** Tailwind breakpoints `sm` (640px), `md` (768px), `lg` (1024px). Sidebar collapses to a hamburger Sheet drawer below `md`. Booster Plan badge hides below `sm`. Welcome CTAs wrap and stack below `lg`. Table forces `min-w-[720px]` inside `overflow-x-auto` so it never collapses awkwardly on mobile.

## Creative touch — AI-native streaming suggestions

**Live in the Find People modal empty state.** Maps Bitscale's JD line ("streaming chat UIs, agent visualizations, generative UIs") + the product's actual value proposition (GTM + AI). User types 3+ chars in People Keyword → 500ms debounce → empty state transitions to an "AI Suggestions" panel that streams analysis character-by-character via `useStreamingText`, then fades in 3 deterministic filter suggestions with Framer Motion stagger.

**Disclosed scope:** streaming text is locally generated, no LLM call. Trade-off was deliberate — a real Anthropic streaming endpoint would require API key handling, a server route, SSE, and rate-limiting for marginal UX gain in a take-home. The `buildAnalysis` function in `StreamingSuggestion.tsx` is a drop-in for a `fetch('/api/suggest')` SSE stream.

## Folder structure

```
src/
  app/                # routes, layout, global CSS
  components/         # custom components
  components/ui/      # shadcn primitives (copied in via CLI, edited freely)
  data/               # mock data modules
  hooks/              # custom React hooks
  lib/                # cn() helper
```

## What's deferred and why

| Item | Why deferred |
|---|---|
| Real `/api/suggest` LLM endpoint | API key + SSE handling out of scope for take-home; architecture supports swap |
| Find Companies / New Grid modals | Same shape as Find People, would be duplicative engineering for review |
| Real table sort / persistence | Visual sort arrow only; brief is UI-only |
| Brand-perfect row icons (LinkedIn / Google / Hubspot) | Lucide version doesn't ship these; would require custom SVG embedding |
| Auth / multi-tenant / RBAC | Not in brief |
| Dark mode | Not in Figma frames |
| Real backend / data fetching | Not in brief; mocks chosen explicitly |
