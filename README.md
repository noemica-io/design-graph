<p align="center">
  <img src="logos/dg-02-chunky.svg" width="96" alt="Design Graph">
</p>

<h1 align="center">Design Graph</h1>

<p align="center">
  <em>AI design tools give you pages. <strong>Design Graph gives you flows.</strong></em>
  <br/>
  <sub>A canvas where each node is an AI-generated screen and each edge is a user action — so you see the whole product experience, not just isolated variants.</sub>
  <br/>
  <sub>by <a href="https://noemica.io">noemica</a></sub>
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> ·
  <a href="#the-pitch">The pitch</a> ·
  <a href="#authoring-new-variants">Authoring</a> ·
  <a href="#viewer">Viewer</a> ·
  <a href="#projects">Projects</a>
</p>

---

<p align="center">
  <img src="demo.gif" alt="Design Graph — a canvas of design variants, branching and multiplying in real time" width="820"/>
</p>

---

## The pitch

Most AI design tools output one polished *page* per prompt. That's the wrong unit. Real products are **flows** — a sequence of screens, connected by user actions, with alternate paths at every step.

Design Graph is the canvas for designing them.

- **Nodes are screens.** Each one is a self-contained HTML page on disk.
- **Edges are user actions.** "Click 'Get started'". "Scroll to pricing". "Submit form". The edges carry the flow.
- **Clusters are variants.** Multiple versions of the same screen sit together so you can compare directions without losing the flow they plug into.

So when you zoom out, you don't see a gallery of stand-alone mockups — you see an entire product experience laid out as a map. Zoom in on any node and you're reading the real HTML page at native resolution.

> *"Even experienced designers have to ration exploration — there's rarely time to prototype a dozen directions."*
> &mdash; [Anthropic, introducing Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)

**Design Graph is the tool that unrations it.**

Claude Design gives you one polished prototype per prompt and hopes you love it. Design Graph gives you a handful at a time, lets you branch the ones you like into more, and lets *you* pick — while keeping the whole flow visible around every decision. One brief, parallel sub-agents, real HTML pages on disk. They never see each other's work, so the variance isn't noise — it's *range*.

Then you branch. Kill what misses. Keep what's strange. Ask for three more variants of the one you love. The graph preserves every dead end as context for the good ideas.

**What it is:**

- **A flow canvas, not a gallery.** Screens, the actions that connect them, and the alternate paths at each step — all in one spatial view.
- A single `index.html` that reads `graph-data.js` + `pages/*.html` from disk. No framework, no build, no account.
- A project-scoped filesystem (`data/{project}/`) so one canvas can hold many explorations.
- A live-reload loop that watches `graph-data.js` and pops new cards onto the canvas in ~2 seconds, no refresh.
- A bundled [Claude Code skill](./.claude/skills/design-graph-authoring/SKILL.md) that teaches any coding agent how to generate variants *correctly* — in parallel, with independent briefs, writing eagerly.

**What it isn't:**

- Not a Claude Design replacement. A canvas that sits *next to* it — and before it, when you're still deciding which direction the flow should go.
- Not a Figma replacement. Designers who export from Figma can still use this for divergent exploration of user journeys.
- Not tied to any model. Works with Claude, GPT, Gemini, local models — anything that can write HTML.
- Not a SaaS. No account, no tokens, no quotas. Files on disk. MIT.

## Quickstart

```bash
git clone git@github.com:noemica-io/design-graph.git
cd design-graph
python3 -m http.server 3333
```

Open <http://localhost:3333> — you'll land in the default project with the variants you see in the hero above. Pan with drag, zoom with scroll, click a card to focus, double-click to open full-screen.

> The viewer needs an HTTP server, not `file://`. `python3 -m http.server`, `npx serve`, Caddy — any static server is fine.

To generate your own variants: [install Claude Code](https://docs.claude.com/claude-code), run it inside this repo, and ask it to produce N variants of a specific page. The bundled skill ([`.claude/skills/design-graph-authoring/SKILL.md`](./.claude/skills/design-graph-authoring/SKILL.md)) auto-loads and teaches Claude how to spawn parallel sub-agents and write pages eagerly. Live mode picks up each page within ~2 seconds of it landing on disk.

## Projects

Design Graph is project-scoped. Each project is its own graph + its own page directory:

```
data/
├── manifest.json                  # list of available projects + default
└── design-graph/                  # the default seed project
    ├── graph-data.js              # { nodes: [...], edges: [...] }
    └── pages/{id}.html            # one self-contained HTML per node
```

Switch via the toolbar picker, or by URL: `?project=design-graph`. The project stays in the URL so deep links work.

### Adding a new project

1. Create `data/my-project/graph-data.js`:
   ```js
   const GRAPH = { nodes: [], edges: [] };
   ```
2. Create `data/my-project/pages/` (empty — agents fill it as they generate).
3. Append to `data/manifest.json`:
   ```json
   {
     "id": "my-project",
     "name": "My Project",
     "description": "What this one explores."
   }
   ```
4. Reload the viewer. Your project appears in the picker.

## Authoring new variants

Design Graph is a viewer. The real work is generating pages, and it's meant to happen *in parallel*. The shipped skill at [`.claude/skills/design-graph-authoring/SKILL.md`](./.claude/skills/design-graph-authoring/SKILL.md) teaches Claude how to do this well. When you run Claude Code inside this repo, the skill auto-loads.

The core pattern:

1. Read the parent node and its existing siblings so variants don't duplicate what's there.
2. Decide on N genuinely different creative directions.
3. Spawn N parallel sub-agents, each with a different lens — Hick's Law, Progressive Disclosure, Brutalist, Editorial, whatever.
4. Each sub-agent writes one HTML page and returns its suggested node + edge entries.
5. **Append to `graph-data.js` the moment each sub-agent returns.** Never wait for the batch — the canvas is watching, and users perceive the whole session as slow if the first card takes 60 seconds.

The skill enforces the eager-write rule because perceived speed is set by the first card, not the last one.

### Node + edge schema

```js
// data/{project}/graph-data.js
const GRAPH = {
  nodes: [
    {
      id: 'results-kanban',
      label: 'Results',
      sublabel: 'Kanban variant',
      page: 'pages/results-kanban.html',
      x: -820, y: 2050,
      color: '#10b981',
      desc: 'Three columns by severity. Tests whether spatial layout triages faster than a list.'
    }
  ],
  edges: [
    { from: 'running-progress', to: 'results-kanban', label: 'Study complete' }
  ]
};
```

Key fields (full detail in the skill):

- `id` — kebab-case, short, memorable. Users copy it in chat.
- `label` — nodes sharing a label cluster as "variants" in the viewer.
- `sublabel` — differentiates variants of the same label.
- `page` — path relative to the project's own `pages/` directory.
- `x`, `y` — world-space coords; drag-to-reposition is persisted.
- `color` — variants of the same label should stay in the same color family.
- `desc` — the one-line summary shown in the detail bar. Write it like it matters.

## Viewer

### Node states

- **Hovered** — dashed blue border, soft highlight. Set by mousing over a card OR by arrow-key stepping. A copy-ID pill appears above the hovered card. `space` copies the ID.
- **Focused** — solid thick border. Set by clicking a card or pressing `enter` on the hovered node. Arrow keys then open relationship panels (upstream, downstream, variants) instead of stepping spatially.

`Esc` demotes: focused → hovered → nothing.

### Full-screen

Double-click a node (or press `enter` on a focused node) to open it full-screen. The page renders at its native size in an iframe.

- `↑` summons the top bar (title, copy-ID, "Back to graph"). Press again to return to the grid.
- `↓` hides the bars without leaving full-screen.

### Filter

The filter input narrows the canvas to nodes matching the query (by title, sublabel, or ID). Two toggles next to it add upstream (pages leading here) or downstream (pages reached from here) pages. Useful when you've generated a cluster of variants from one page and want to inspect just those.

### Live mode

By default, the viewer polls each project's `graph-data.js` every ~2 seconds and applies changes in place — new nodes pop onto the canvas without a reload. Drag-positions are preserved across updates.

Disable with `?live=off` if you're embedding the viewer somewhere the polling would be noisy.

### Minimap

Bottom-right. Shows the whole node cloud and a rectangle for your current viewport. Click to pan. Hover to reveal controls (collapse, close, drag). `m` toggles visibility. Position is remembered per-browser.

### URL round-trip

The current state is reflected in the URL: `?project=...&node=...&fs=...&zoom=...&hover=...&q=...`. Reloading or sharing a link restores the exact view.

## Why

Most AI design tools are trying to give you *one* polished thing. Design Graph exists on the other axis: you generate *many*, compare them side by side, keep what's right, preserve the dead ends as context.

Not a replacement for a designer — a choice amplifier.

Files on disk. Any coding agent. No account, no subscription, no tokens burned on UI.

## License

MIT. See [LICENSE](./LICENSE).

---

<p align="center">
  Built by <a href="https://noemica.io">noemica</a>.
  <br/>
  <sub>Inspired by every designer who's felt rationed by a context window.</sub>
</p>
