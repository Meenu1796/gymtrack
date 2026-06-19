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
│ [⌂]                    [⚥] │   <- home (top-left), gender toggle (top-right)
│                               │
│                               │
│        (human body            │
│         illustration,         │
│         tappable regions)     │
│                               │
│        ◄ drag to rotate ►     │
│                               │
├─────────────────────────────┤
│  Tap a highlighted body part  │  <- hint label, replaced by part name once selected
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
- Gender toggle: swaps model, keeps current rotation angle.
- Drag horizontally on the body to rotate front ⇄ back (and intermediate
  states if using the sprite-flipbook approach from NFR-2).
- Tap a region → highlight + bottom sheet with exercise list (FR-4).
- Tap outside / swipe down on sheet → dismiss.

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

- **Rotation gesture**: horizontal pan/drag on the body image. Released drag
  snaps to nearest defined view (front / back, or front/¾/back if we add
  intermediate frames).
- **Gender toggle**: single tap icon button, instant swap (with a quick
  crossfade), not a drag gesture — avoids accidental switches.
- **Body part tap**: hit-testing against named regions, minimum 44x44pt touch
  target even where the visual silhouette area is smaller (NFR-5).
- **Bottom sheet**: dismissible by swipe-down, tap-outside, or re-tapping the
  same body part.
