# GymTrack — Wireframe & UI Spec (v1.0)

Companion to [01_requirements_analysis.md](01_requirements_analysis.md). This is the
text/ASCII spec version of the design; static SVG mockups live in
[wireframes/](wireframes/) and a clickable HTML/CSS/JS prototype lives in
[../prototype/](../prototype/) — open `prototype/index.html` in a browser to click
through the real flow.

Color tokens (from the logo, adjust freely):
- `--bg-dark: #1B1F3B` (navy)
- `--accent: #FF6B35` (orange)
- `--bg-light: #F4F4F4`
- `--text-dark: #1B1F3B`
- `--text-light: #FFFFFF`

---

## Screen 1 — Splash

```
┌─────────────────────────────┐
│                               │
│                               │
│            ⬤ logo             │
│         G Y M T R A C K      │
│                               │
│                               │
└─────────────────────────────┘
```
- Full-bleed navy background.
- Logo centered, app name below it in light text.
- No buttons. Auto-navigates to Home after ~1.5–2s.

---

## Screen 2 — Home (Dashboard)

```
┌─────────────────────────────┐
│  GymTrack                    │  <- header
├─────────────────────────────┤
│  ┌─────────────────────────┐ │
│  │  Browse by Body Part    │ │  <- card, opens Body Map
│  │  [silhouette icon]   →  │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │  Workout Plans           │ │  <- card, opens plan list
│  │  Push / Pull / Leg   →  │ │
│  └─────────────────────────┘ │
│                               │
│  (space reserved for future   │
│   dashboard cards: progress,  │
│   reminders, etc.)            │
└─────────────────────────────┘
```
- Root screen, no back/home button needed.
- Two primary cards now; layout uses a vertical scroll list of cards so new
  cards can be appended later (NFR-4 extensibility).

---

## Screen 3 — Body Map

```
┌─────────────────────────────┐
│ [⌂]                           │   <- home, top-left
│        Tap a highlighted      │   <- hint label, replaced by part name once selected
│           body part           │
│                               │
│        (flat 2D muscle        │
│         map illustration,     │
│         tappable regions,     │
│         dark-gray muscles,    │
│         accent when selected) │
│                               │
├─────────────────────────────┤
│   Side (Front)      Gender    │
│      ⚪──            (Female) │
│                       ⚪──     │
└─────────────────────────────┘

  -- when a part is tapped, bottom sheet rises: --

┌─────────────────────────────┐
│  Hamstrings                  │
│  ───────────────────────     │
│  • Romanian Deadlift          │
│  • Leg Curl                   │
│  • Glute-Ham Raise            │
└─────────────────────────────┘
```
- Default state: female, front view.
- Home icon: always returns to Home Screen.
- **Side switch** (bottom-left): toggles Front ⇄ Back muscle-map illustration.
- **Gender switch** (bottom-right): toggles Female ⇄ Male illustration.
- Tap a region → highlight in accent color + bottom sheet with exercise list (FR-4).
- Tap outside / swipe down on sheet → dismiss and clear highlight.

### Hotspot map (front view)
`head (non-tappable) · shoulders · chest · biceps · forearms · abs · quads`

### Hotspot map (back view)
`traps · back/lats · triceps · glutes · hamstrings · calves`

---

## Screen 4 — Workout Plan List

```
┌─────────────────────────────┐
│ [⌂]  Workout Plans           │
├─────────────────────────────┤
│  ▸ Push Day                  │
│  ▸ Pull Day                  │
│  ▸ Leg Day                   │
└─────────────────────────────┘

  -- tapping "Push Day": --

┌─────────────────────────────┐
│ [⌂]  Push Day                │
├─────────────────────────────┤
│  • Bench Press                │
│  • Overhead Press              │
│  • Tricep Pushdown             │
│  • Lateral Raise               │
└─────────────────────────────┘
```
- Simple list, no body diagram interaction needed here.
- Home icon top-left, same behavior as Screen 3.

---

## Interaction Notes

- **Side / Gender switches**: standard labeled toggle switches (not icon
  buttons, not a drag gesture) — explicit and discoverable, label text updates
  to reflect current state.
- **Body part tap**: hit-testing against named regions, minimum 44x44pt touch
  target even where the visual silhouette area is smaller (NFR-5).
- **Bottom sheet**: dismissible by swipe-down, tap-outside, or re-tapping the
  same body part.
