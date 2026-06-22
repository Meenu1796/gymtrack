# System Design Document
## GymTrack — com.rubyx.gymtrack
**Version:** 1.0 | **Date:** June 2026

---

## 1. Architecture Overview

GymTrack follows a **local-first, offline-capable** architecture for v1.0. No backend server is required. All workout data is bundled as static JSON within the app.

```
┌─────────────────────────────────────────────────┐
│                  GymTrack App                   │
│                                                 │
│  ┌─────────────┐    ┌──────────────────────┐   │
│  │  UI Layer   │    │   Data Layer         │   │
│  │             │    │                      │   │
│  │ Expo Router │    │ Static JSON bundle   │   │
│  │ Screens     │◄──►│ (exercises, plans)   │   │
│  │ Components  │    │                      │   │
│  └─────────────┘    │ AsyncStorage (prefs) │   │
│         │           └──────────────────────┘   │
│         ▼                                       │
│  ┌─────────────┐                               │
│  │ State Layer │                               │
│  │   Zustand   │                               │
│  └─────────────┘                               │
└─────────────────────────────────────────────────┘
```

---

## 2. Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | React Native (Expo SDK 55+) | Cross-platform, New Architecture |
| Navigation | Expo Router (file-based) | Best practice 2026 |
| State | Zustand | Lightweight, no boilerplate |
| Animation | React Native Reanimated | 60fps UI-thread animations |
| SVG Avatar | react-native-svg | Vector muscle map |
| Storage | AsyncStorage | User preferences (gender toggle) |
| Build | EAS Build | App Store + Play Store |
| Icons | Expo Vector Icons | Consistent icon set |

---

## 3. Screen Architecture (Expo Router)

```
app/
├── _layout.tsx           ← Root layout (navigation shell)
├── index.tsx             ← Splash screen
├── (tabs)/
│   ├── _layout.tsx       ← Tab navigator
│   ├── home.tsx          ← Home Dashboard
│   └── plans.tsx         ← Workout Plans
├── body-map.tsx          ← Body Avatar Screen
├── exercises/
│   └── [muscleId].tsx    ← Exercise Suggestions (dynamic)
└── plan/
    └── [planId].tsx      ← Plan Detail
```

---

## 4. Data Model

### 4.1 Muscle Group
```typescript
type MuscleGroup = {
  id: string;           // e.g. "quads"
  label: string;        // e.g. "Quadriceps"
  color: string;        // hex color
  frontSlugs: string[]; // SVG path keys for front avatar
  backSlugs: string[];  // SVG path keys for back avatar
  exercises: string[];  // exercise IDs
};
```

### 4.2 Exercise
```typescript
type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;  // MuscleGroup id
  description: string;
  equipment: string;    // "barbell" | "dumbbell" | "machine" | "bodyweight"
  difficulty: "beginner" | "intermediate" | "advanced";
};
```

### 4.3 Workout Plan
```typescript
type WorkoutPlan = {
  id: "push" | "pull" | "legs";
  name: string;         // "Push Day"
  targetMuscles: string[];
  exercises: string[];  // exercise IDs
  color: string;
};
```

### 4.4 User Preferences (AsyncStorage)
```typescript
type UserPrefs = {
  selectedGender: "male" | "female";
  lastPlanViewed: string | null;
};
```

---

## 5. Component Architecture

```
src/
├── components/
│   ├── avatar/
│   │   ├── BodyAvatar.tsx        ← 3D flip container
│   │   ├── AvatarSVG.tsx         ← SVG muscle renderer
│   │   ├── frontPaths.ts         ← Front body SVG path data
│   │   ├── backPaths.ts          ← Back body SVG path data
│   │   └── muscleDots.ts         ← Label dot positions
│   ├── ui/
│   │   ├── MuscleChip.tsx        ← Colored muscle tag
│   │   ├── ExerciseCard.tsx      ← Exercise list item
│   │   ├── PlanCard.tsx          ← Workout plan card
│   │   ├── DashboardCard.tsx     ← Home feature card
│   │   └── GenderToggle.tsx      ← ♀/♂ switch button
│   └── navigation/
│       └── HomeButton.tsx        ← Top-left home icon
├── data/
│   ├── muscleGroups.ts           ← All 13 muscle group definitions
│   ├── exercises.ts              ← Full exercise database
│   └── workoutPlans.ts           ← Push/Pull/Legs plans
├── store/
│   └── appStore.ts               ← Zustand store
└── hooks/
    └── useBodyAvatar.ts          ← Avatar state + flip logic
```

---

## 6. Avatar Flip Animation

```
User taps avatar
      ↓
Reanimated shared value: rotation 0° → 180°
      ↓
At 90° (midpoint): swap front ↔ back SVG
      ↓
Continue 90° → 180°
      ↓
User sees back of body
      ↓
Tap again: 180° → 360° (back to front)
```

Implementation uses `useSharedValue` + `withTiming` + `interpolate` in Reanimated for a smooth perspective card flip effect.

---

## 7. Navigation Flow

```
Splash (2.5s auto)
    ↓
Home Dashboard
    ├── [Tap "Body Map"] ──────────────► Body Map Screen
    │                                        ├── [Tap muscle] ──► Exercise Screen
    │                                        │                       └── [Back] ──► Body Map
    │                                        └── [Home btn] ──────────► Home
    │
    └── [Tap "Workout Plans"] ──────────► Plans Screen
                                              ├── [Push Day] ──► Plan Detail
                                              ├── [Pull Day] ──► Plan Detail
                                              └── [Leg Day]  ──► Plan Detail
```

---

## 8. State Management (Zustand)

```typescript
type AppState = {
  // Avatar
  selectedGender: "male" | "female";
  activeMuscle: string | null;
  isShowingFront: boolean;

  // Actions
  setGender: (g: "male" | "female") => void;
  selectMuscle: (id: string | null) => void;
  flipAvatar: () => void;
};
```

---

## 9. File Structure (Full)

```
gymtrack/
├── app/                    ← Expo Router screens
├── src/                    ← Business logic & components
├── assets/
│   ├── logo.svg
│   ├── splash.png
│   └── icon.png
├── app.config.ts           ← Expo config (com.rubyx.gymtrack)
├── eas.json               ← EAS build profiles
├── drizzle.config.ts       ← (v2.0 — DB migration ready)
└── package.json
```

---

## 10. Future Architecture (v2.0)

When cloud features are added:
- **Backend:** Supabase (Auth + Postgres)
- **Sync:** TanStack Query for server state
- **DB (local):** Drizzle ORM on expo-sqlite
- **Auth:** Supabase Auth (email + Google OAuth)
- **Push:** Expo Notifications for workout reminders

---

*System Design v1.0 — approved before development begins.*
