# GymTrack — Requirements Analysis Document (v1.0)

**Package name:** `com.rubyx.gymtrack`
**Platform:** React Native (iOS + Android)
**Document stage:** SDLC Phase 1–2 — Requirements Gathering & Analysis
**Status:** Draft for client review — no code will be written until this is approved.

---

## 1. Purpose & Scope

GymTrack is a mobile app that helps a user pick a muscle group/body part they want to
train and suggests matching workouts for it, using an interactive human body diagram
as the primary navigation device. Version 1 is workout-suggestion only (no logging,
no tracking, no accounts). The app is explicitly designed to be extended later
(see §8 Future Scope).

## 2. Stakeholders

| Role | Person |
|---|---|
| Product owner / client | You |
| Build & design | Claude (this session) |

## 3. User Classes

- **Primary user**: gym-goer, any experience level, wants quick workout ideas for a
  specific body part, on either Android or iOS.
- No login/auth, no admin role, no multi-tenant concerns in v1.

## 4. Product Overview

3 screens in v1:

1. **Splash Screen** — logo + app name, auto-advances to Home.
2. **Body Map Screen** — flat 2D muscle-map diagram with a **Front/Back switch**
   and a **Male/Female switch**, tap a muscle region → see suggested exercises
   for it. Home button top-left.
3. **Home Screen** — dashboard, entry point to "Workout Plans" (Push / Pull / Leg day),
   which lead into the Body Map screen contextually.

### 4.1 Navigation Map

```
Splash Screen
   │  (auto, ~1.5–2s)
   ▼
Home Screen  ───────────────────────────┐
   │  tap "Browse by Body Part"          │ tap "Workout Plans"
   ▼                                     ▼
Body Map Screen                  Workout Plan List (Push/Pull/Leg)
   │  tap a body part                    │  tap a plan
   ▼                                     ▼
Exercise Suggestion Sheet         Exercise List for that plan
(bottom sheet/modal)

Body Map Screen [home icon, top-left] → back to Home Screen
Body Map Screen [Side switch] → toggles Front ⇄ Back muscle view
Body Map Screen [Gender switch] → toggles Female ⇄ Male diagram
```

## 5. Functional Requirements

### FR-1 — Splash Screen
- FR-1.1 Display app logo (see Branding doc) centered, with app name "GymTrack".
- FR-1.2 Auto-navigate to Home Screen after a fixed delay (1.5–2s) or once initial
  assets are ready, whichever is later.
- FR-1.3 No user interaction required/possible on this screen.

### FR-2 — Home Screen (Dashboard)
- FR-2.1 Show a dashboard with at minimum two entry points:
  - "Browse by Body Part" → Body Map Screen.
  - "Workout Plans" → list of plan types (Push Day, Pull Day, Leg Day).
- FR-2.2 Dashboard must be laid out so additional dashboard cards/widgets can be
  added later without redesign (future features per §8).
- FR-2.3 No home/back button needed here — this is the root screen.

### FR-3 — Body Map Screen
- FR-3.1 Display a flat 2D muscle-map diagram, default = **female, front view**.
- FR-3.2 A **"Side" switch** (Front/Back) and a **"Gender" switch** (Female/Male)
  are shown below the diagram, each as a labeled toggle (label updates with the
  current state, e.g. "Side (Front)" / "Side (Back)"). Toggling either preserves
  the other's state.
- FR-3.3 A home icon sits at the **top-left corner**; tapping it always navigates
  back to the Home Screen, regardless of current side/gender/selection state.
- FR-3.4 Switching "Side" swaps between the front-view and back-view diagram, so
  the user can see posterior muscle groups (back, triceps, hamstrings, glutes,
  calves) as well as anterior ones (shoulders, chest, biceps, abs, quads).
- FR-3.5 Distinct tappable regions/hotspots exist for at least: **chest, back,
  shoulders, biceps, triceps, abs/core, quads, hamstrings, glutes, calves**.
- FR-3.6 Tapping a body part:
  - Highlights the selected region (visual feedback).
  - Shows the part's name (e.g. "Hamstrings").
  - Opens a suggestion panel (bottom sheet or modal) listing matching exercises
    (see FR-4).
- FR-3.7 Tapping outside any hotspot, or tapping the same part again, dismisses
  the highlight/suggestion panel.

### FR-4 — Exercise Suggestion
- FR-4.1 Each body part maps to a static list of suggested exercises, e.g.:
  - Legs/Quads → Leg Press, Leg Extension, Squats
  - Hamstrings → Romanian Deadlift, Leg Curl
  - Back → Lat Pulldown, Seated Row, Pull-ups
  - Chest → Bench Press, Push-ups, Chest Fly
  - Shoulders → Shoulder Press, Lateral Raise
  - Biceps → Barbell Curl, Hammer Curl
  - Triceps → Tricep Pushdown, Skull Crushers
  - Abs/Core → Crunches, Plank, Leg Raises
  - Glutes → Hip Thrust, Glute Bridge
  - Calves → Calf Raise
- FR-4.2 List is read-only in v1 — no sets/reps tracking, no checking off exercises.
- FR-4.3 Exercise data lives in a local static JSON/TS file in v1 (no backend).

### FR-5 — Workout Plans (Push / Pull / Leg)
- FR-5.1 From Home, user can open "Workout Plans" and pick one of: Push Day,
  Pull Day, Leg Day.
- FR-5.2 Each plan shows a static curated exercise list relevant to that split
  (e.g. Push Day = chest/shoulders/triceps exercises).
- FR-5.3 This is a separate, simpler list view — it does not require the body
  diagram interaction.

### FR-6 — Branding
- FR-6.1 App uses a simple logo (provided as SVG + PNG exports) representing
  GymTrack, used on the splash screen and as the app icon.
- FR-6.2 Android package id: `com.rubyx.gymtrack`. iOS bundle id will mirror this
  (`com.rubyx.gymtrack`) unless you tell me otherwise.

## 6. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | Cross-platform: single React Native codebase for Android + iOS. |
| NFR-2 | Switching Side or Gender should feel instant (simple view swap, no heavy animation/loading). |
| NFR-3 | App must work fully offline in v1 (all data bundled locally, no network calls). |
| NFR-4 | Should be structured (navigation, data layer, components) so that v2 features (tracking, accounts, sync) can be added without a rewrite. |
| NFR-5 | Basic accessibility: tappable hotspots should have a minimum touch target size (~44x44pt) even if the visual region is smaller. |
| NFR-6 | App icon, name, and splash must reflect the final logo/branding once approved. |

## 7. Constraints & Assumptions

- No backend/server in v1 — everything is bundled static data.
- No user accounts, no login.
- Body diagram is a **flat 2D vector illustration** (front view + back view,
  each as its own static image/SVG with tappable muscle regions), not a 3D
  model — per your latest direction, matching a standard "muscle map" UI
  pattern used by many fitness apps. Front ⇄ back is controlled by an explicit
  toggle switch rather than a drag/rotate gesture.
- Build stack in the real app: **react-native-svg** with tappable `<Path>`/
  shape elements per muscle group (front and back illustrations as two SVGs
  per gender, or one SVG with gendered overlays) — the React Native equivalent
  of the prototype's `prototype/js/app.js` + inline SVG approach.
- Target React Native tooling choice (Expo vs. bare RN CLI) is a build-phase
  decision, to be confirmed with you before implementation starts.

## 8. Out of Scope for v1 (Future Scope)

Explicitly deferred, per your note that "more features will come":

- Workout logging / history / progress tracking.
- Sets, reps, weights input.
- User accounts, profiles, cloud sync.
- Custom/editable workout plans.
- Push notifications / reminders.
- Social/sharing features.

The dashboard (FR-2.2) and data layer (NFR-4) are intentionally kept extensible
so these can be added later without restructuring the app.

## 9. Open Questions for You (please confirm before design is finalized)

1. Confirm the muscle-group list in FR-3.5/FR-4.1 is complete — anything to add/remove (e.g. forearms, traps, obliques)?
2. ~~Confirm 2D vs 3D rotation~~ — **resolved: flat 2D muscle map with Front/Back + Gender toggle switches** (see updated §7).
3. Confirm exercise lists in FR-4.1 are good starting suggestions, or you have specific exercises you want per body part.
4. Any color/branding direction for the logo (e.g. specific colors, mood — bold/energetic vs. clean/minimal)? Separately: the muscle-map highlight color is currently brand orange — confirm that's fine, or you'd prefer something else (e.g. blue).
5. Confirm Expo vs. bare React Native CLI for the build.
