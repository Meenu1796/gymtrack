# Software Requirements Specification (SRS)
## GymTrack — Mobile Application
**Package:** com.rubyx.gymtrack
**Version:** 1.0
**Date:** June 2026
**Prepared by:** Rubyx

---

## 1. Introduction

### 1.1 Purpose
This document defines the software requirements for GymTrack, a React Native mobile application for iOS and Android. It serves as the foundation for design, development, testing, and delivery.

### 1.2 Product Overview
GymTrack is a fitness companion app that guides users through workout planning using an interactive 3D human body avatar. Users select muscle groups on the avatar, receive exercise suggestions for that muscle group, and follow structured workout plans (Push / Pull / Leg days).

### 1.3 Scope
Version 1.0 covers:
- Interactive 3D body avatar (male & female) with muscle group highlighting
- Exercise suggestion engine by muscle group
- Workout plan selection (Push / Pull / Legs)
- Splash screen with logo
- Home dashboard

Future versions will include: workout logging, progress tracking, nutrition, wearable integration, AI coaching.

### 1.4 Definitions
| Term | Definition |
|------|-----------|
| Avatar | The 3D human body figure displayed on the Body Map screen |
| Muscle Group | A labeled region on the avatar (e.g. Chest, Quads, Glutes) |
| Workout Plan | A structured training split (Push / Pull / Legs) |
| Gender Toggle | UI control to switch the avatar between male and female |

---

## 2. Overall Description

### 2.1 Product Perspective
Standalone mobile app. No backend required for v1.0 — all workout data is bundled locally. Cloud sync and user accounts are scoped for v2.0.

### 2.2 User Classes
- **Primary:** Adults (18–45) who go to the gym and want guidance on exercises
- **Secondary:** Personal trainers using the app as a reference tool

### 2.3 Operating Environment
- iOS 16+ (iPhone, iPad)
- Android 10+ (API 29+)
- React Native (Expo managed workflow, New Architecture)
- Package name: com.rubyx.gymtrack

### 2.4 Assumptions & Dependencies
- User device supports basic 3D CSS transforms (all modern phones do)
- react-native-svg for avatar rendering
- react-native-reanimated for flip animation
- expo-router for navigation
- No internet connection required for v1.0

---

## 3. Functional Requirements

### 3.1 Screen 1 — Splash Screen
| ID | Requirement |
|----|-------------|
| FR-01 | App shall display the RubyX GymTrack logo on launch |
| FR-02 | Logo shall animate in (fade + scale) over 1.5 seconds |
| FR-03 | Splash shall auto-navigate to Home Screen after 2.5 seconds |
| FR-04 | Background shall use brand dark color (#0A0D14) |

### 3.2 Screen 2 — Home Dashboard
| ID | Requirement |
|----|-------------|
| FR-05 | Home shall display a greeting and app branding |
| FR-06 | Home shall show a "Body Map" card to navigate to the avatar screen |
| FR-07 | Home shall show a "Workout Plans" card |
| FR-08 | Additional feature cards shall appear as "Coming Soon" placeholders |
| FR-09 | Bottom navigation or card-based layout shall be used |

### 3.3 Screen 3 — Body Map (Avatar Screen)
| ID | Requirement |
|----|-------------|
| FR-10 | Screen shall display a full-body human avatar using anatomical SVG paths |
| FR-11 | Default avatar shall be female |
| FR-12 | Top-right corner shall contain a gender toggle (♀ / ♂) to switch between female and male avatars |
| FR-13 | Avatar shall display muscle groups in distinct colors with labeled leader lines |
| FR-14 | User shall be able to flip the avatar (front → back) via a 3D rotation animation |
| FR-15 | Flip shall be triggered by tapping the avatar or a "Rotate" button |
| FR-16 | Top-left corner shall contain a Home button (← icon) |
| FR-17 | Tapping a muscle group on the avatar shall navigate to the Exercise Suggestions screen for that group |
| FR-18 | Active muscle group shall pulse/highlight when selected |
| FR-19 | Leader lines shall be visible connecting muscle color dots to text labels |

### 3.4 Screen 4 — Exercise Suggestions
| ID | Requirement |
|----|-------------|
| FR-20 | Screen shall display the selected muscle group name and color |
| FR-21 | Screen shall list minimum 5 suggested exercises for the selected muscle group |
| FR-22 | Each exercise card shall show: name, a brief description, and target muscle |
| FR-23 | A back button shall return the user to the Body Map screen |
| FR-24 | A "Add to Plan" button shall be present (functional in v2.0, visible in v1.0) |

### 3.5 Screen 5 — Workout Plans
| ID | Requirement |
|----|-------------|
| FR-25 | Screen shall show three plan cards: Push Day, Pull Day, Leg Day |
| FR-26 | Each plan card shall show the muscles targeted and a list of default exercises |
| FR-27 | Selecting a plan shall display the full exercise list for that day |
| FR-28 | A back/home button shall always be visible |

---

## 4. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Performance | Avatar flip animation must run at 60fps |
| NFR-02 | Performance | App cold start to splash visible < 2 seconds |
| NFR-03 | Usability | All interactive elements must have minimum 44×44pt touch target |
| NFR-04 | Accessibility | Color labels must accompany all color-coded muscle groups (not color alone) |
| NFR-05 | Compatibility | Must function without internet connection |
| NFR-06 | Design | Must follow dark theme consistently (#0A0D14 background) |
| NFR-07 | Store | Must comply with App Store and Google Play guidelines |
| NFR-08 | Privacy | No user data collected in v1.0 — privacy policy still required |
| NFR-09 | Scalability | Architecture must support future screens without refactor |

---

## 5. Muscle Groups & Exercise Data

### 5.1 Muscle Groups (13 groups)
Chest, Abs, Biceps, Triceps, Shoulders, Trapezius, Back (Lats/Upper), Forearms, Glutes, Quads, Hamstrings, Calves, Neck

### 5.2 Sample Exercise Mapping
| Muscle Group | Exercises |
|---|---|
| Chest | Bench Press, Incline DB Press, Cable Fly, Push-Up, Dips |
| Back | Pull-Up, Lat Pulldown, Barbell Row, Seated Cable Row, Face Pull |
| Legs (Quads) | Back Squat, Leg Press, Leg Extension, Bulgarian Split Squat, Hack Squat |
| Legs (Hamstrings) | Romanian Deadlift, Lying Leg Curl, Nordic Curl, Good Morning, Stiff-Leg DL |
| Glutes | Hip Thrust, Glute Bridge, Cable Kickback, Sumo Squat, Leg Abduction |
| Shoulders | Overhead Press, Lateral Raise, Front Raise, Arnold Press, Reverse Fly |
| Biceps | Barbell Curl, Hammer Curl, Incline DB Curl, Cable Curl, Concentration Curl |
| Triceps | Triceps Pushdown, Skull Crusher, Close-Grip Bench, Overhead Extension, Dips |
| Calves | Standing Calf Raise, Seated Calf Raise, Donkey Calf Raise |
| Abs | Plank, Hanging Leg Raise, Cable Crunch, Ab Wheel, Russian Twist |
| Trapezius | Shrug, Face Pull, Upright Row, Rack Pull |
| Forearms | Wrist Curl, Reverse Curl, Farmer's Walk |

### 5.3 Workout Plans
**Push Day:** Bench Press, OHP, Incline DB Press, Lateral Raise, Triceps Pushdown, Skull Crusher
**Pull Day:** Pull-Up, Barbell Row, Lat Pulldown, Face Pull, Barbell Curl, Hammer Curl
**Leg Day:** Back Squat, Romanian DL, Leg Press, Leg Curl, Calf Raise, Hip Thrust

---

## 6. UI/UX Requirements

### 6.1 Design System
| Element | Spec |
|---------|------|
| Primary BG | #0A0D14 |
| Surface | #111520 |
| Border | #1A2030 |
| Brand Accent | #4A9EE8 (blue) |
| Font | System UI / SF Pro (iOS), Roboto (Android) |
| Corner Radius | 12–16px for cards |
| Min Touch Target | 44×44pt |

### 6.2 Navigation Structure
```
Splash Screen
    ↓ (auto 2.5s)
Home Dashboard
    ├── Body Map Screen
    │       ├── [tap muscle] → Exercise Suggestions
    │       └── [home btn] → Home Dashboard
    └── Workout Plans Screen
            └── [select plan] → Plan Detail
```

---

## 7. Logo Specification
- Name: GymTrack by Rubyx
- Icon: Stylized hexagon with body/muscle symbol
- Colors: Brand blue (#4A9EE8) on dark background
- Formats needed: 1024×1024 (App Store), adaptive icon (Android), splash center

---

## 8. SDLC Phases

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 1. Requirements | SRS Document (this file) | ✅ Complete |
| 2. System Design | Architecture + Data Model | ✅ Complete |
| 3. UI/UX Design | Figma-style wireframe deck | ✅ Complete |
| 4. Development | React Native app code | ⏳ Pending approval |
| 5. Testing | Test cases + QA checklist | ⏳ Pending |
| 6. Deployment | EAS Build + store submission | ⏳ Pending |
| 7. Maintenance | Bug fixes + v2.0 planning | ⏳ Future |

---

*Document version 1.0 — subject to revision based on client feedback.*
