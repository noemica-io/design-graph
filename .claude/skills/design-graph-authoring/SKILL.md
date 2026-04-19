---
name: design-graph-authoring
description: >
  Teaches Claude how to author variant pages for a Design Graph canvas. Design Graph
  is a viewer — the real work is generating many good, genuinely-different HTML page
  variants in parallel, wiring them as nodes+edges, and writing descriptions users
  will actually read. Use whenever the user asks to "add a variant", "explore N
  alternatives", "make another version", "branch this screen", "generate options",
  or otherwise expand the graph. The skill handles: parallel sub-agent orchestration,
  how to brief them so variants don't all look the same, the node/edge schema, the
  color + positioning system, and interactive-prototype patterns when the user wants
  clickable flows rather than static snapshots.
---

# Design Graph Authoring

Design Graph is a canvas for reviewing many HTML page variants side by side. The
canvas viewer doesn't generate anything — it just renders `graph-data.js` and
serves the files in `pages/`. **You** are the generator. This skill is how you
do that well.

## The single most important rule: write eagerly

**The moment a sub-agent reports done, append its node + edges to
`graph-data.js` immediately.** Do not wait for the batch. Do not collect all
returns and write them at the end. The user is watching the canvas in live
mode (`?live` is the default) and expects each card to pop into view the
second its HTML is on disk.

Why this matters: the perceived speed of the whole session is set by how
quickly the *first* card appears, not by when the *last* one finishes. If you
batch writes, the user stares at an empty canvas for 60+ seconds even though
four agents finished in 15. Eager writing makes the tool feel alive.

The write itself is tiny — one `{node}` + one or two `{edges}` appended to a
JSON-like array. It takes a single Edit call. There is no reason to batch.
Even if two sub-agents return within the same second, process them
sequentially in arrival order; the second Edit runs 20ms after the first.

**Rule of thumb:** from "sub-agent done" notification to `graph-data.js`
updated should be under 5 seconds. If you catch yourself saying "let me wait
for the other three to finish and then I'll add them all," stop and write the
one you have.

## The core loop, compressed

1. Read the parent node + every existing sibling that shares the target label.
2. Decide on N creative directions that are *genuinely* different (not rewordings).
3. Spawn N background sub-agents — one per direction — each returning its HTML +
   the suggested node/edge entries.
4. **As each sub-agent reports done, append its entries to `graph-data.js`
   immediately.** This is non-negotiable — see the eager-write rule above.
5. Tell the user which nodes to open in the viewer.

Everything below is elaboration on that loop.

## Repo layout

The viewer is project-scoped. Each project lives under `data/{project}/`
with its own graph and pages. The viewer loads one project at a time, chosen
via `?project=<id>` in the URL.

```
design_graph/
  index.html                   ← viewer (don't touch for data changes)
  data/
    manifest.json              ← lists available projects; sets default
    noemica/
      graph-data.js            ← { nodes, edges } for this project
      pages/{id}.html          ← self-contained page per node
    design-graph/
      graph-data.js
      pages/{id}.html
    your-new-project/
      graph-data.js
      pages/{id}.html
  logos/                       ← shared
```

Rules:
- **Never touch `index.html`** for data changes.
- **Always work inside `data/{project}/`** — edit `graph-data.js`, write
  pages to `pages/`. Never write to a top-level `pages/` or `graph-data.js`
  (those don't exist in this structure).
- The `page:` field in a node entry is **relative to the project's own
  `pages/`** directory — e.g. `page: 'pages/meta-bracket.html'`. The viewer
  prefixes `data/{project}/` automatically.
- Which project to edit: if the user doesn't specify and there are multiple
  projects in `data/manifest.json`, **ask them which project** before
  creating variants. If there's only one project, use it.
- Serve with `python3 -m http.server 3333` from the repo root. View with
  `http://localhost:3333/?project={id}`.

### Adding a new project

1. Create `data/{new-project}/` with `graph-data.js` (empty `GRAPH.nodes`
   and `GRAPH.edges` arrays) and an empty `pages/` directory.
2. Append an entry to `data/manifest.json` under `projects`:
   `{ "id": "...", "name": "Display Name", "description": "..." }`
3. Optionally set `"default": "new-project"` if this should be the default
   landing project.
4. Reload the viewer. The project picker in the toolbar will show it.

## Node + edge schema

```js
// GRAPH.nodes
{
  id: 'results-kanban',
  label: 'Results',
  sublabel: 'Kanban variant',
  page: 'pages/results-kanban.html',
  x: -820, y: 2050,
  color: '#10b981',
  desc: 'Organizes verdicts into three columns by severity. Tests whether a spatial layout helps users triage feedback faster than a linear list.'
}

// GRAPH.edges
{ from: 'running-progress', to: 'results-kanban', label: 'Study complete' }
```

Field-by-field rules:

- **`id`** — kebab-case, short, memorable. Users copy this in chat to reference
  pages. Name it something you'd want to type.
- **`label`** — the card title. **Nodes sharing a label cluster as "variants"**
  in the viewer's variants panel. If you're making another take on an existing
  screen, reuse its `label` exactly (`Results`, `Landing`, `Config`…).
- **`sublabel`** — the card subtitle. This is where you differentiate variants:
  `Kanban variant`, `Conversational`, `Dense table`, `Dark hero`.
- **`page`** — always `pages/{id}.html`.
- **`x`, `y`** — world-space coords. Place by looking at neighbors in
  `graph-data.js`, not by formula. Rough rule: ~280px horizontal between
  siblings, ~600–900px vertical between depth levels. The viewer persists
  drag-to-reposition in `localStorage`, so you don't need to be perfect —
  just close.
- **`color`** — from the palette below. Variants of the same label should stay
  in the same color family so the cluster reads as one thing.
- **`desc`** — one or two sentences shown in the viewer's detail bar. This is
  the most user-facing piece of metadata. Describe (a) what this page is,
  (b) what hypothesis or design question it tests, (c) what makes it distinct
  from its siblings. Write it well or the variant is invisible.
- **Edge `label`** — the user action that moves you from `from` → `to`:
  `Enter URL`, `Quick setup`, `Study complete`. Short verb phrases.

## The parallel sub-agent pattern

This is the skill's core contribution. Claude's default instinct is to generate
variants sequentially in the main thread. That's slow *and* homogenizes the
output because each variant sees the ones before it.

**Do this instead:**

- Spawn each variant as a background sub-agent (`run_in_background: true`).
- Each sub-agent runs independently — no visibility into the others' output.
- You get notified as each one finishes; don't poll, don't wait for the slowest.
- When a sub-agent reports done, extract its suggested `{node, edges}` payload
  and append it to `graph-data.js` immediately. Move on.

Why background and not foreground-parallel: foreground-parallel still blocks
the main thread until the slowest returns. Background lets you process each
one the instant it completes, and `graph-data.js` edits are tiny so
serializing them per-completion costs nothing.

### How to brief a sub-agent

Do not lobotomize it with a narrow "write this HTML" prompt. You want it to
make real design decisions, not transcribe yours.

Give it:

1. **The repo files to read.** `graph-data.js`, the parent page's HTML, every
   sibling that shares the label. Tell it to walk the full ancestor chain up
   to the root so it understands the design vision the flow is building toward.
2. **The design question this variant is testing.** Not "make a kanban layout"
   but "test whether spatial grouping helps triage faster than a linear list."
3. **The siblings it must differ from.** Cite them by id. "`results-cards`
   exists; don't rebuild that."
4. **One or two relevant UX principles to lean on** (list below). Not the
   whole menu.
5. **The required return format.** Ask it to end its final message with a
   fenced block containing the suggested `node` entry + any `edge` entries.
   The main agent copy-pastes that into `graph-data.js`.

What *not* to include: section-by-section HTML structure, copy suggestions,
color picks, "make sure to include a hero and three feature cards." That
produces homogeneous output — the whole point of running N of these is that
they surprise you.

## UX principles menu (pick 1–2 per variant)

- **Hick's Law** — fewer choices; one primary action per screen.
- **Peak-End Rule** — design the peak moment and the ending intentionally.
- **Goal-Gradient** — show progress; users push harder as they near completion.
- **Jakob's Law** — match familiar product conventions.
- **Progressive Disclosure** — defer advanced options until needed.
- **Cognitive Load** — anything not helping is hurting; remove it.
- **Fitts's Law** — big, close targets for primary actions.
- **Tesler's Law** — absorb inherent complexity on behalf of the user.
- **Nielsen's 10** — status visibility, real-world match, user control,
  consistency, error prevention, recognition over recall, flexibility,
  aesthetic minimalism, error recovery, help.

Handing a sub-agent *one* of these as its lens is how you get directions that
diverge. Two sub-agents given Hick vs Progressive Disclosure will produce
genuinely different pages even with the same design question.

## Color palette by flow stage

- Purple (`#7c3aed`, `#a855f7`) — Landing / entry
- Indigo (`#6366f1`, `#4f46e5`) — Validation, transition, deep-dive
- Green (`#22c55e`, `#10b981`) — Configuration / design phase
- Teal (`#14b8a6`, `#5eead4`) — Mid-flow / in-progress config
- Amber (`#f59e0b`, `#fbbf24`) — Launch / confirmation
- Orange (`#f97316`) — Running / waiting
- Blue (`#3b82f6`, `#60a5fa`) — Results / verdicts
- Red (`#ef4444`) — Critical findings, dark-pattern flags
- Pink (`#ec4899`) — Individual user interactions
- Violet (`#8b5cf6`) — Aggregate insights / synthesis

Rule: **variants of the same label share a color family.** The cluster should
read as one group in the viewer.

## Positioning

Positions are hand-placed, not grid-generated.

1. Find the parent's `{x, y}` in `graph-data.js`.
2. New sibling? Offset horizontally ~280px from existing siblings at the same
   label.
3. New child? Place below the parent (~600–900px y offset), roughly centered.
4. Check you don't overlap a nearby node (nodes are 240×170).
5. Don't stress precision — the viewer persists drag-to-reposition.

## ID naming conventions

- kebab-case, short, memorable.
- Include a variant suffix when siblings share a label: `results-cards`,
  `results-kanban`, `results-synthesis`.
- Use a flow-stage prefix when it clarifies: `landing-v1`, `config-chat`,
  `design-midflow`.
- Users will read and copy these. Treat them like function names.

## Writing the page HTML itself

Pages are self-contained. No shared CSS or JS unless you opt into the
interactive-flow pattern below. Render target is 1280×800 (the viewer
displays them at that native size).

Defaults that work:

- System-font stack for UI chrome; one display serif (Garamond / Fraunces /
  Playfair) if the project has an editorial lean.
- One accent color per page; everything else neutral.
- No shadows, no gradients, no decorative icons unless the variant's thesis is
  specifically about visual richness.
- Copy is part of the design. Don't use placeholder lorem ipsum — write
  plausible strings that match the product.
- If the project has a brand skill (`noemica-brand`, a company style guide,
  etc.), use it. Don't re-derive the brand.

## Add to the graph immediately

See the eager-write rule at the top of this skill. In practice that means:

- The moment a sub-agent returns its payload → one Edit to `graph-data.js` →
  move on. Do not hold it in memory to bundle with siblings.
- If the user is watching the viewer, the canvas pops the card within ~2s
  (the live-mode polling interval). That's the whole point.
- If three agents return within a few seconds of each other, do three
  sequential Edits. Each is under 100ms; you do not need to batch for
  performance.
- Never say "I'll add these once all agents finish." That's the failure mode.

## Interactive prototypes (when pages need to be clickable)

Most variants are static 1280×800 snapshots. Sometimes the user wants to walk
a flow end-to-end — click through, watch state transitions, actually *use* it.
Use this pattern for that.

- Name interactive pages with a common prefix so they cluster:
  `live-flow-1-home.html`, `live-flow-2-config.html`, …
- One shared helper at `pages/live-flow.js`. Every flow page includes:
  ```html
  <script src="live-flow.js"></script>
  ```
- The helper provides three things:
  1. **Transitions with visible signal.** Call
     `window.flowTransition(nextHref, nextLabel)` instead of `location.href`.
     It mounts a pill reading `→ Transitioning to <Label>…`, waits ~900ms,
     then navigates. On the next page's load, a banner reads
     `✓ Step N / M · Label` for ~2.4s. Without this, users lose track
     mid-flow.
  2. **Parent sync via postMessage** so the viewer's selected node follows
     the iframe's real page:
     - On load: `{ type: 'page-loaded', pageId }`
     - Before navigating: `{ type: 'page-navigating', nextId }`
     - On Escape: `{ type: 'page-close', pageId }`
  3. **Two-step Escape.** First Esc blurs a focused input; second Esc posts
     `page-close` to the parent viewer. Use capture-phase listeners on both
     `document` and `window` and call `stopImmediatePropagation` — the viewer
     also listens for Escape and will otherwise double-fire.

Viewer wiring (`index.html`): add one `window.addEventListener('message', …)`
that handles `page-close` → set focus to `data.pageId`, close the modal; and
`page-loaded` → update the current node and refresh side panels.

Flow pages sit in their own column (pick an unused `x`) stepping down by
~350px per step. Share a single `label` with step-numbered `sublabel`s
(`1 · Home (live)`, `2 · Config (live)`, …).

## What to tell the user when you're done

A two-line report:

1. `N variants added under <label>: <id1>, <id2>, <id3>.`
2. `Open the viewer and look at the <label> cluster.`

Don't summarize what each variant does — the `desc` field does that, and the
user will read it in the viewer where it belongs.
