const GRAPH = {
  nodes: [
    // ── Pre-entry row (y=-700) ─────────────────────────────────────
    { id: 'auth-sign-in', label: 'Auth', sublabel: 'Sign in — minimal', page: 'pages/auth-sign-in.html', x: -1600, y: -700, color: '#8b5cf6', desc: 'Single-pane SSO-first sign-in that refuses to re-pitch the product. Tests whether narrow-focus auth (one primary path, magic-link backup, zero marketing) lowers drop-off versus a full-bleed welcome screen.' },
    { id: 'dashboard-canvases', label: 'Canvases', sublabel: 'Your list (home)', page: 'pages/dashboard-canvases.html', x: 1400, y: -700, color: '#14b8a6', desc: 'Returning-user home reachable from any canvas topbar — lists 14 canvases grouped by state (running, draft, compare-ready, published, archived). Each row carries slug, variant count, fork provenance, and a state pill so the user can resume work in one click.' },

    // ── Landings (y=0) ─────────────────────────────────────────────
    { id: 'landing-live-canvas', label: 'Landing', sublabel: 'Live canvas demo', page: 'pages/landing-live-canvas.html', x: -1350, y: 0, color: '#7c3aed', desc: 'The product demo is the landing page: a simulated Design Graph canvas with nine real-looking mini-variant cards sits behind a right-side marketing overlay with a single CTA. Tests whether showing the tool in use — prove-by-showing, Hick\'s Law — converts better than telling via feature lists.' },
    { id: 'landing-manifesto', label: 'Landing', sublabel: 'Editorial manifesto', page: 'pages/landing-manifesto.html', x: -600, y: 0, color: '#a855f7', desc: 'A Stripe-Press-style essay spread that argues for parallel exploration as a stance rather than a feature. Tests whether long-form editorial craft — drop cap, pull quote, one quiet CTA — can out-convert a conventional product hero by treating the visitor as a reader.' },
    { id: 'landing-split-brain', label: 'Landing', sublabel: 'Old way / new way split', page: 'pages/landing-split-brain.html', x: 150, y: 0, color: '#8b5cf6', desc: 'A 50/50 hero pitting the old way (one Figma file, red comment dots, Final_v4_FINAL) against Design Graph (a live dotted canvas blooming with eight variants). The comparison is the pitch — no explanation needed.' },
    { id: 'landing-gallery', label: 'Landing', sublabel: 'Community gallery', page: 'pages/landing-gallery.html', x: 900, y: 0, color: '#9333ea', desc: 'An Awwwards/Are.na-style landing where the hero IS the gallery — a 4x4 grid of real-feeling project thumbnails with author attribution and variant counts. Tests whether proof-before-pitch and portfolio conventions convert better than a traditional hero.' },
    { id: 'landing-command-prompt', label: 'Landing', sublabel: 'CLI / dev tool', page: 'pages/landing-command-prompt.html', x: 1400, y: 0, color: '#c084fc', desc: 'Developer-register landing pitched at builders: realistic terminal with a spawn command, five agents materializing live, inline mini-variant output panel showing the actual pages produced, package-manager install tabs, TypeScript API, and a keyboard cheatsheet.' },

    // ── Step 2 (y=700) ─────────────────────────────────────────────
    { id: 'canvas-empty-prompt', label: 'Canvas', sublabel: 'Empty · first prompt', page: 'pages/canvas-empty-prompt.html', x: -1600, y: 700, color: '#6366f1', desc: 'The first moment on a real, empty canvas — one compose card floats on the dotted grid with a variant-count stepper and starter chips. Hick\'s Law: exactly one thing to do, type the prompt.' },
    { id: 'canvas-prepopulated-fork', label: 'Canvas', sublabel: 'Prepopulated · fork-from-demo', page: 'pages/canvas-prepopulated-fork.html', x: -1100, y: 700, color: '#6366f1', desc: 'Opening a canvas drops the user directly into the nine demo variants they just saw on the landing, now live, editable, and forkable. Tests "show-then-edit" against the sibling "empty first prompt" flow.' },
    { id: 'first-prompt-ceremonial', label: 'First prompt', sublabel: 'Invocation — editorial', page: 'pages/first-prompt-ceremonial.html', x: -600, y: 700, color: '#8b5cf6', desc: 'A ceremonial first-prompt surface that reads as the essay\'s next chapter. Treats the textarea as a blank page rather than a SaaS form — hairline rule, serif italic placeholder, typographic variant-count stepper, and a quiet small-caps "Begin" link.' },
    { id: 'setup-split', label: 'Setup', sublabel: 'Split — alive vs dead', page: 'pages/setup-split.html', x: -100, y: 700, color: '#a855f7', desc: 'Continues the landing\'s 50/50 metaphor into configuration: left is the frozen single-artboard pricing page with a pitying committee sidebar, right is the live form where the user names the subject, picks a variant count, and spawns.' },
    { id: 'setup-confession-interview', label: 'Setup', sublabel: 'Confession — single-pane', page: 'pages/setup-confession-interview.html', x: 400, y: 700, color: '#a855f7', desc: 'After the landing\'s 50/50 split, the UI dissolves into a single confessional pane on near-black with one purple accent — a borderless Fraunces textarea asking for the ONE direction the user would have shipped on their own. Tests Tesler\'s Law and Peak-End via commitment through confession.' },
    { id: 'project-detail-fork', label: 'Project', sublabel: 'Detail · fork view', page: 'pages/project-detail-fork.html', x: 900, y: 700, color: '#a855f7', desc: 'Detail page for a single public canvas — Maya\'s 12-variant Serif Coffee checkout study — framed as a GitHub-meets-Dribbble case study with embedded mini-graph, fork/star CTAs, recent forks, discussion, and the original prompt.' },
    { id: 'docs-quickstart', label: 'Docs', sublabel: 'Quickstart walkthrough', page: 'pages/docs-quickstart.html', x: 1400, y: 700, color: '#a855f7', desc: 'Standard three-column documentation quickstart — left nav, numbered walkthrough (install / init / spawn / open), right TOC. Treats docs as the real onboarding for engineer-designers.' },

    // ── Spawning cluster offshoot (Col S, x=-2100) ─────────────────
    { id: 'spawning-orchestra-timeline', label: 'Spawning', sublabel: 'Orchestra timeline', page: 'pages/spawning-orchestra-timeline.html', x: -2100, y: 1100, color: '#f97316', desc: 'Rejects the canvas idiom — visualizes spawning as a CI/DAW-style orchestration timeline with one horizontal lane per agent and phases (read → choose → write → review) flowing left-to-right under a purple now-cursor.' },
    { id: 'spawning-video-wall', label: 'Spawning', sublabel: 'Video wall · mission control', page: 'pages/spawning-video-wall.html', x: -2100, y: 1400, color: '#f97316', desc: 'A CCTV-style 3×2 wall of five agent feeds, each showing live internal monologue beside a shimmering preview. Pushes Nielsen\'s status visibility to its limit — every agent\'s thoughts are watchable in parallel.' },
    { id: 'spawning-minimap-quiet', label: 'Spawning', sublabel: 'Quiet · minimap only', page: 'pages/spawning-minimap-quiet.html', x: -2100, y: 1700, color: '#a855f7', desc: 'Aesthetic-minimalism taken to an extreme: the spawning moment is 99% whitespace — a single italic serif sentence, a 5-dot minimap counting agents to completion, and nothing else.' },
    { id: 'spawning-constellation', label: 'Spawning', sublabel: 'Constellation · orbital', page: 'pages/spawning-constellation.html', x: -2100, y: 2000, color: '#f59e0b', desc: 'A radial orbit where the prompt pulses at the center and each variant\'s distance from the core encodes its progress — queued agents circle far out in gold, running ones shimmer mid-orbit, finished renders glide into the inner ring.' },

    // ── Step 3 (y=1400) ────────────────────────────────────────────
    { id: 'canvas-spawning-live', label: 'Spawning', sublabel: 'Live — dotted canvas', page: 'pages/canvas-spawning-live.html', x: -1600, y: 1400, color: '#f97316', desc: 'The canonical spawning moment: five agents run in parallel and variants materialize live on the dotted canvas. Status visibility over spinners — the user watches the cards appear instead of waiting behind a modal.' },
    { id: 'canvas-augmented', label: 'Canvas', sublabel: 'Augmented · 12 variants', page: 'pages/canvas-augmented.html', x: -1100, y: 1400, color: '#6366f1', desc: 'The compound canvas: a refinement prompt doesn\'t replace — it grows. Nine originals stay as context while three darker, editorial variants materialize alongside, marked as just-spawned with purple glow and dashed edges back to the prompt that birthed them.' },
    { id: 'drafting-editorial', label: 'Designing', sublabel: 'Drafts arriving', page: 'pages/drafting-editorial.html', x: -600, y: 1400, color: '#8b5cf6', desc: 'Variant generation framed as a literary act. Five "drafts" arrive one by one in a magazine-spread grid — each with a hand-written label, a tiny rendering in its own typography, and an italic serif timing note — refusing the dashboard register.' },
    { id: 'spawning-split', label: 'Spawning', sublabel: 'Split — dead vs alive in motion', page: 'pages/spawning-split.html', x: -100, y: 1400, color: '#f97316', desc: 'The a-ha moment: the split-brain contrast deepens as 8 variants materialize on the right while the left waits for a Tuesday review. The seam tilts — right panel visibly expanding, pressure wave bleeding orange into grey.' },
    { id: 'reveal-ten', label: 'Reveal', sublabel: 'The confessed + nine alternates', page: 'pages/reveal-ten.html', x: 400, y: 1400, color: '#8b5cf6', desc: 'Peak moment of the confession flow: the user\'s confessed pricing page appears highlighted among nine alternates — each rendered distinct in typography and layout. Not triumphant; contemplative.' },
    { id: 'canvas-forked-yours', label: 'Canvas', sublabel: 'Forked · yours', page: 'pages/canvas-forked-yours.html', x: 900, y: 1400, color: '#a855f7', desc: 'The user\'s freshly-forked copy of Maya\'s Serif Coffee checkout canvas, inheriting all 12 variants plus the prompt and provenance. Foregrounds the three moves that complete the loop — rename, spawn more, annotate — so the fork becomes genuinely theirs.' },
    { id: 'terminal-spawn-run', label: 'Terminal', sublabel: 'Spawn run — live (terminal state)', page: 'pages/terminal-spawn-run.html', x: 1400, y: 1400, color: '#f97316', desc: 'A full-page terminal cast of the spawn command streaming live — five agents interleave progress, diagnostic output, and clickable file paths with inline thumbnails. Terminal state of the command-prompt flow.' },

    // ── Offshoot row (y=1750) ──────────────────────────────────────
    { id: 'canvas-agent-failed', label: 'Canvas', sublabel: 'Agent failed · recover', page: 'pages/canvas-agent-failed.html', x: -1600, y: 1750, color: '#dc2626', desc: 'One of five agents hits a token limit mid-generation. Parallelism makes the failure survivable — four variants remain ready while the failed card offers Retry, Simplify, or Dismiss, with a quiet path to ship with four.' },

    // ── Step 4 (y=2100) ────────────────────────────────────────────
    { id: 'canvas-review-five', label: 'Canvas', sublabel: 'Reviewing — 5 ready', page: 'pages/canvas-review-five.html', x: -1600, y: 2100, color: '#3b82f6', desc: 'All 5 variants rendered at full fidelity on the canvas with a floating detail inspector on the selected minimalist variant. Recognition-over-recall review surface where the set stays visible and details reveal on click.' },
    { id: 'canvas-compare-twelve', label: 'Canvas', sublabel: 'Compare 12 · side-by-side', page: 'pages/canvas-compare-twelve.html', x: -1100, y: 2100, color: '#3b82f6', desc: 'Dedicated compare surface for the 12 pricing variants after augmentation: a 4×3 grid plus a top dock that pins 2–4 selected variants side-by-side with attribute-level diffs.' },
    { id: 'reading-room-draft-i', label: 'Reading', sublabel: 'Draft I — the editorial one', page: 'pages/reading-room-draft-i.html', x: -600, y: 2100, color: '#8b5cf6', desc: 'The reading room for Draft I, framed as a chapter rather than a dashboard tile. TOC of all five drafts in the left rail, Garamond-set pricing page in the center, designer\'s marginalia on the right — no comparison chrome.' },
    { id: 'review-collapsed-seam', label: 'Review', sublabel: 'Collapsed seam — 8 ready', page: 'pages/review-collapsed-seam.html', x: -100, y: 2100, color: '#3b82f6', desc: 'Climax of the split-brain metaphor: the seam has collapsed to the left edge and the old-way panel has shrunk to a 15% memorial sidebar. The remaining 85% is an 8-up grid of distinct pricing variants with a Designer\'s pick highlighted.' },
    { id: 'walkthrough-draft-03', label: 'Walkthrough', sublabel: 'Draft 03 of 10', page: 'pages/walkthrough-draft-03.html', x: 400, y: 2100, color: '#8b5cf6', desc: 'Gallery-walk view of variant-03 (the loud one, chartreuse-on-black), staged one-at-a-time with the user\'s confession pinned above as a conscience-check. Tests progressive disclosure and peak-end against the all-at-once reveal.' },
    { id: 'gallery-publish-back', label: 'Publish', sublabel: 'Back to gallery (terminal)', page: 'pages/gallery-publish-back.html', x: 900, y: 2100, color: '#fbbf24', desc: 'Terminal state of the gallery fork loop: a canvas re-enters public circulation with provenance, attribution, a real URL, and a visible lineage. Closes the loop by reframing publishing as the product\'s heartbeat.' },

    // ── Step 5 / Ship terminals (y=2800) ───────────────────────────
    { id: 'ship-picked-five', label: 'Ship', sublabel: 'Picked from five', page: 'pages/ship-picked-five.html', x: -1600, y: 2800, color: '#fbbf24', desc: 'Quiet closure of the five-variant canvas flow. Variant-03 Minimalist takes the stage at near-real fidelity while the other four shrink to a lineage rail; Export / Share / Rerun are the only primary actions.' },
    { id: 'ship-pair-ab', label: 'Ship', sublabel: 'A/B pair — deploy', page: 'pages/ship-pair-ab.html', x: -1100, y: 2800, color: '#fbbf24', desc: 'Ships both finalists as a live A/B experiment — 50/50 traffic split, signup rate as the primary metric, two-week runtime. Showcases Design Graph\'s unique ability to deploy a pair rather than pick one.' },
    { id: 'ship-chosen-draft', label: 'Ship', sublabel: 'Draft II — chosen', page: 'pages/ship-chosen-draft.html', x: -600, y: 2800, color: '#fbbf24', desc: 'Terminal state of the Manifesto flow. The chosen draft (Draft II, the playful one) is handed off as a framed plate with a colophon and two quiet exits — archive or start new.' },
    { id: 'ship-collapsed-chosen', label: 'Ship', sublabel: 'Split resolved — chosen 03', page: 'pages/ship-collapsed-chosen.html', x: -100, y: 2800, color: '#fbbf24', desc: 'Terminal state of the split-brain flow A. The old-way memorial is gone; variant 03 renders at full fidelity with the 7 unchosen alternates kept quietly as a lineage strip — the split metaphor fully exorcised.' },
    { id: 'ship-confession-vs-chosen', label: 'Ship', sublabel: 'Confession vs chosen', page: 'pages/ship-confession-vs-chosen.html', x: 400, y: 2800, color: '#fbbf24', desc: 'The terminal admission: the user\'s verbatim confession set beside the bold Draft 07 they actually shipped. No celebration — just a quiet pairing that resolves the split.' },

    // ── Deep exploration (y=3500) ──────────────────────────────────
    { id: 'canvas-review-duo', label: 'Canvas', sublabel: 'Review · duo (head-to-head)', page: 'pages/canvas-review-duo.html', x: -1350, y: 2400, color: '#3b82f6', desc: 'Head-to-head tournament: only two variants visible at a time with giant Pick A / Pick B buttons. Forces real comparison over casual browsing — winner advances against the next challenger until one remains.' },
    { id: 'canvas-review-focus', label: 'Canvas', sublabel: 'Review · focus (1 big + 4 small)', page: 'pages/canvas-review-focus.html', x: -1850, y: 2400, color: '#3b82f6', desc: 'One variant rendered huge in the center with the four alternates as a subtle filmstrip below. Tests whether radical focus beats side-by-side comparison for picking a direction.' },
    { id: 'canvas-review-carousel', label: 'Canvas', sublabel: 'Review · carousel (one at a time)', page: 'pages/canvas-review-carousel.html', x: -1600, y: 2400, color: '#3b82f6', desc: 'Reviews variants one full-bleed slide at a time instead of tiling five at once. Tests whether a museum-like single-focus pass, navigated by arrow keys and page dots, beats dense side-by-side comparison for picking a direction.' },
    { id: 'variant-annotate', label: 'Variant', sublabel: 'Annotate · thread with agent', page: 'pages/variant-annotate.html', x: -1600, y: 3500, color: '#6366f1', desc: 'The deep-dive view for a single variant where critique actually happens. Pin comments to coordinates on the rendering, thread replies, and ask the agent that made it WHY — with citations back to its design notes.' }
  ],
  edges: [
    // Pre-entry → Landings
    { from: 'auth-sign-in', to: 'dashboard-canvases', label: 'Continue' },
    { from: 'landing-live-canvas', to: 'auth-sign-in', label: 'Sign in' },

    // Landing → Step 2
    { from: 'landing-live-canvas', to: 'canvas-empty-prompt', label: 'Open a canvas' },
    { from: 'landing-live-canvas', to: 'canvas-prepopulated-fork', label: 'Open a canvas (flow B)' },
    { from: 'landing-manifesto', to: 'first-prompt-ceremonial', label: 'Try a canvas' },
    { from: 'landing-split-brain', to: 'setup-split', label: 'See what else was possible' },
    { from: 'landing-split-brain', to: 'setup-confession-interview', label: 'See what else was possible (flow B)' },
    { from: 'landing-gallery', to: 'project-detail-fork', label: 'Open a featured canvas' },
    { from: 'landing-command-prompt', to: 'docs-quickstart', label: 'Read the docs' },

    // Step 2 → Step 3 (+ spawning siblings)
    { from: 'canvas-empty-prompt', to: 'canvas-spawning-live', label: 'Spawn variants' },
    { from: 'canvas-empty-prompt', to: 'spawning-orchestra-timeline', label: 'Spawn (timeline)' },
    { from: 'canvas-empty-prompt', to: 'spawning-video-wall', label: 'Spawn (wall)' },
    { from: 'canvas-empty-prompt', to: 'spawning-minimap-quiet', label: 'Spawn (quiet)' },
    { from: 'canvas-empty-prompt', to: 'spawning-constellation', label: 'Spawn (orbital)' },
    { from: 'canvas-prepopulated-fork', to: 'canvas-augmented', label: 'Spawn 3 more' },
    { from: 'first-prompt-ceremonial', to: 'drafting-editorial', label: 'Begin' },
    { from: 'setup-split', to: 'spawning-split', label: 'Spawn variants' },
    { from: 'setup-confession-interview', to: 'reveal-ten', label: 'Commit & spawn' },
    { from: 'project-detail-fork', to: 'canvas-forked-yours', label: 'Fork this canvas' },
    { from: 'docs-quickstart', to: 'terminal-spawn-run', label: 'Run spawn command' },

    // Step 3 offshoot
    { from: 'canvas-spawning-live', to: 'canvas-agent-failed', label: 'Agent 04 failed' },

    // Step 3 → Step 4
    { from: 'canvas-spawning-live', to: 'canvas-review-five', label: 'All ready' },
    { from: 'canvas-augmented', to: 'canvas-compare-twelve', label: 'Compare 12' },
    { from: 'drafting-editorial', to: 'reading-room-draft-i', label: 'Read all' },
    { from: 'spawning-split', to: 'review-collapsed-seam', label: 'All 8 ready' },
    { from: 'reveal-ten', to: 'walkthrough-draft-03', label: 'Walk through each' },
    { from: 'canvas-forked-yours', to: 'gallery-publish-back', label: 'Publish' },

    // Step 4 → Step 5 (ship terminals)
    { from: 'canvas-review-five', to: 'ship-picked-five', label: 'Pick this variant' },
    { from: 'canvas-compare-twelve', to: 'ship-pair-ab', label: 'Pick these 2' },
    { from: 'reading-room-draft-i', to: 'ship-chosen-draft', label: 'Choose this draft' },
    { from: 'review-collapsed-seam', to: 'ship-collapsed-chosen', label: 'Choose 1' },
    { from: 'walkthrough-draft-03', to: 'ship-confession-vs-chosen', label: 'Ship it' },

    // Step 4 → deep exploration
    { from: 'canvas-review-five', to: 'variant-annotate', label: 'Annotate' },
    { from: 'canvas-spawning-live', to: 'canvas-review-carousel', label: 'All ready (carousel)' },
    { from: 'canvas-spawning-live', to: 'canvas-review-focus', label: 'All ready (focus)' },
    { from: 'canvas-spawning-live', to: 'canvas-review-duo', label: 'All ready (duo)' }
  ]
};
