# Bitscale Frontend Assignment

Take-home for Bitscale's Frontend Engineer role. A responsive, AI-native dashboard built from the provided Figma file.

**Live:** https://bitscale-fe-assignment.netlify.app
**Repo:** https://github.com/amrit2611/bitscale-fe-assignment

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Primitives | shadcn/ui (Radix-backed, Nova preset) |
| Icons | Lucide React |
| Animation | Framer Motion |
| Hosting | Netlify |

Architecture rationale lives in [`DECISIONS.md`](./DECISIONS.md).

---

## Run locally

```bash
git clone https://github.com/amrit2611/bitscale-fe-assignment.git
cd bitscale-fe-assignment
npm install
npm run dev
```

Open http://localhost:3000.

---

## What this app does

Faithful build of the two frames in the assignment Figma:

**Dashboard page (Page 1):**
- Collapsible sidebar (Bitscale logo, GTM Spaces selector, Home + Other nav groups, support footer)
- Top bar with credits balance, Booster Plan badge, profile avatar
- Welcome bar with three primary CTAs (Find Companies, Find People, New Grid)
- Two intro cards: "Latest from Bitscale" carousel + "Complete product demo" progress widget
- "My Grids" / "Starred" tabs with live filtering
- Search input that filters the grid table by name or editor in real time
- 11-row grid table with star toggling, expandable workbook row, per-row dropdown actions (View / Rename / Duplicate / Delete)

**Find People modal (Page 2):**
- Triggered from the "Find People" CTA
- Left filter panel with 7 fields (People Keyword, Job Title, Company Website, Person Location, Company Location, Company Headcount, Management Level) + Save / Preview footer
- Right results panel with credit balance, Enterprise upsell, column header strip, and empty-state surface

**Responsive:**
- Mobile: sidebar collapses behind a hamburger drawer (shadcn Sheet), Booster Plan badge hides, CTAs wrap, table scrolls horizontally inside its own container
- Tablet: same hamburger pattern, cards begin stacking
- Desktop (>= lg): full two-column layout matching the Figma frame

---

## Creative touch — AI-native streaming suggestions

The empty state of the Find People modal usually does nothing. I turned it into the surface where Bitscale's AI value proposition shows up.

**Behavior:** when the user types 3+ characters into the People Keyword field, the right panel transitions from the static empty state into an "AI Suggestions" pane that streams an analysis character-by-character (typewriter cursor + pulsing thinking indicator), then fades in three filter suggestion pills with a Framer Motion stagger. The text and suggestions are deterministic per keyword, so the same input always yields the same output.

**Why this surface:** Bitscale's product is GTM + AI. The empty state of a search modal is exactly where an AI-native product should show its hand. The Figma left it static; the brief asked for a creative touch; the JD called out "streaming chat UIs, agent visualizations, generative UIs." This delivers all three in one moment that maps directly to the company's value proposition.

**Honest scoping:** the streamed text is locally generated, not an LLM call. Trade-off was deliberate. A real Anthropic streaming response would require an API key, a server route, SSE handling, and rate-limiting — added 30+ min of risk for marginal UX gain in a take-home context. The architecture is built so the deterministic generator (`buildAnalysis` in `src/components/StreamingSuggestion.tsx`) can be swapped for a `fetch('/api/suggest')` SSE stream in 15-20 lines without changing the UI layer.

**Implementation:**
- `src/hooks/useStreamingText.ts` — a 30-line custom hook that grows a substring over time, resets cleanly when the source text changes
- `src/components/StreamingSuggestion.tsx` — the panel with the streaming text, blinking caret, status indicator, and animated suggestion pills
- `src/components/FindPeopleModal.tsx` — debounces the keyword input (500ms) and conditionally renders the streaming panel

---

## What's deliberately out of scope

- Real LLM call for streaming suggestions (see above)
- Working "Find Companies" and "New Grid" modals — CTAs are wired but inert
- Real sort / persistence on the grid table (visual sort arrow only)
- Authentication, multi-tenant, RBAC
- Dark mode
- Brand-perfect row icons (LinkedIn / Google / Hubspot) — Lucide doesn't ship these as first-class icons in the installed version; generic icons used with intent-aligned colors

---

## Folder structure

```
src/
  app/
    layout.tsx                # root layout, fonts, global background
    page.tsx                  # dashboard route
    globals.css               # tailwind + theme tokens
  components/
    Sidebar.tsx               # desktop sidebar wrapper
    SidebarContent.tsx        # shared nav content (used by desktop + mobile drawer)
    MobileNav.tsx             # mobile hamburger + shadcn Sheet drawer
    Header.tsx                # top bar
    WelcomeBar.tsx            # greeting + CTAs, owns FindPeopleModal open state
    LatestCard.tsx            # 4-slide carousel card
    DemoCard.tsx              # progress + checklist card
    GridsTable.tsx            # tabs + search + table with filtering, star toggle, row dropdown
    FindPeopleModal.tsx       # modal shell + debounced keyword + conditional empty/streaming
    StreamingSuggestion.tsx   # the creative touch
    ui/                       # shadcn primitives
  data/
    nav.ts                    # sidebar nav groups
    grids.ts                  # 11 mock grid rows
    demoChecklist.ts          # checklist items + progress
    findPeopleFields.ts       # modal form field config
  hooks/
    useStreamingText.ts       # the streaming hook
  lib/
    utils.ts                  # shadcn cn() helper
```

---

## Notes on the build process

- Built with Claude Code and Cursor as primary engineering leverage, in line with Bitscale's "Cursor + Claude are co-pilots, not toys" culture
- Tailwind v4's `@theme inline` block in `globals.css` defines the design tokens; no `tailwind.config.ts` file
- All event-handling components are explicitly marked `"use client"`; the dashboard route, the static cards, and the sidebar shell render as React Server Components
- TypeScript strict, production build verified (`npm run build` succeeds, both routes statically prerendered)
