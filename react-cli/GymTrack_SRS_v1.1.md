# Software Requirements Specification (SRS)
## GymTrack — Mobile Application
**Package:** com.rubyx.gymtrack
**Version:** 1.0
**Date:** June 2026
**Prepared by:** Rubyx

---

## 1. Introduction

### 1.1 Purpose
This document defines the software requirements for GymTrack, a React Native CLI mobile application for iOS and Android. It serves as the foundation for design, development, testing, and delivery.

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
| RN CLI | React Native Community CLI — bare native project, no Expo |

---

## 2. Overall Description

### 2.1 Product Perspective
Standalone mobile app built with **React Native CLI** (bare workflow). No Expo runtime dependency. All workout data is bundled locally as static JSON for v1.0. Cloud sync and user accounts scoped for v2.0.

### 2.2 User Classes
- **Primary:** Adults (18–45) who go to the gym and want guidance on exercises
- **Secondary:** Personal trainers using the app as a reference tool

### 2.3 Operating Environment
- iOS 15.1+ (iPhone, iPad)
- Android 8.0+ (API 26+)
- React Native CLI (bare, no Expo)
- Package / Bundle ID: com.rubyx.gymtrack
- Min Node.js: 18 LTS
- Ruby 3.1+ (for CocoaPods / iOS build)
- JDK 17 (for Android Gradle build)

### 2.4 Assumptions & Dependencies
- Developer has Xcode 15+ and Android Studio installed
- CocoaPods installed for iOS native dependency management
- react-native-svg installed and linked natively for avatar rendering
- react-native-reanimated for 60fps animations
- react-navigation v6 for screen routing
- No internet connection required in v1.0

---

## 3. Functional Requirements

### 3.1 Screen 1 — Splash Screen
| ID | Requirement |
|----|-------------|
| FR-01 | App shall display the RubyX GymTrack logo on launch |
| FR-02 | Logo shall animate in (fade + scale) over 1.5 seconds |
| FR-03 | Splash shall auto-navigate to Home Screen after 2.5 seconds |
| FR-04 | Background shall use brand dark color (#0A0D14) |
| FR-05 | Native splash (launch screen) shall show before JS bundle loads |

### 3.2 Screen 2 — Home Dashboard
| ID | Requirement |
|----|-------------|
| FR-06 | Home shall display a greeting and app branding |
| FR-07 | Home shall show a "Body Map" card navigating to the avatar screen |
| FR-08 | Home shall show a "Workout Plans" card |
| FR-09 | Additional feature cards shall appear as "Coming Soon" placeholders |

### 3.3 Screen 3 — Body Map (Avatar Screen)
| ID | Requirement |
|----|-------------|
| FR-10 | Screen shall display a full-body human avatar using react-native-svg paths |
| FR-11 | Default avatar shall be female |
| FR-12 | Top-right corner shall contain a gender toggle (♀ / ♂) |
| FR-13 | Avatar shall display muscle groups in distinct colors with labeled leader lines |
| FR-14 | User shall be able to flip the avatar (front → back) via a 3D rotation animation |
| FR-15 | Flip shall be triggered by tapping the avatar or a "Rotate" button |
| FR-16 | Top-left corner shall contain a Home button (← icon) |
| FR-17 | Tapping a muscle group shall navigate to Exercise Suggestions for that group |
| FR-18 | Active muscle group shall pulse/highlight when selected |

### 3.4 Screen 4 — Exercise Suggestions
| ID | Requirement |
|----|-------------|
| FR-19 | Screen shall display selected muscle group name and color |
| FR-20 | Screen shall list minimum 5 exercises for the selected muscle group |
| FR-21 | Each exercise card shall show: name, description, equipment, difficulty |
| FR-22 | A back button shall return user to Body Map screen |

### 3.5 Screen 5 — Workout Plans
| ID | Requirement |
|----|-------------|
| FR-23 | Screen shall show three plan cards: Push Day, Pull Day, Leg Day |
| FR-24 | Each plan card shall show muscles targeted and default exercises |
| FR-25 | Selecting a plan shall display the full exercise list for that day |
| FR-26 | A back/home button shall always be visible |

---

## 4. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Performance | Avatar flip animation must run at 60fps using Reanimated worklet |
| NFR-02 | Performance | App cold start to first frame < 2 seconds on mid-range device |
| NFR-03 | Usability | All interactive elements must have minimum 44×44pt touch target |
| NFR-04 | Accessibility | Color labels must accompany all color-coded muscle groups |
| NFR-05 | Compatibility | Must function fully without internet connection |
| NFR-06 | Design | Consistent dark theme (#0A0D14 background) across all screens |
| NFR-07 | Store | Must comply with App Store (iOS 15.1+ SDK) and Google Play guidelines |
| NFR-08 | Privacy | No user data collected in v1.0 — privacy policy URL still required |
| NFR-09 | Build | Must build cleanly with `npx react-native run-ios` and `run-android` |
| NFR-10 | Scalability | Folder and component architecture must support future feature additions |

---

## 5. Muscle Groups & Exercise Data

### 5.1 Muscle Groups (13 groups)
Chest, Abs, Biceps, Triceps, Shoulders, Trapezius, Back (Lats/Upper), Forearms, Glutes, Quads, Hamstrings, Calves, Neck

### 5.2 Exercise Mapping
| Muscle Group | Exercises |
|---|---|
| Chest | Bench Press, Incline DB Press, Cable Fly, Push-Up, Dips |
| Back | Pull-Up, Lat Pulldown, Barbell Row, Seated Cable Row, Face Pull |
| Quads | Back Squat, Leg Press, Leg Extension, Bulgarian Split Squat, Hack Squat |
| Hamstrings | Romanian Deadlift, Lying Leg Curl, Nordic Curl, Good Morning, Stiff-Leg DL |
| Glutes | Hip Thrust, Glute Bridge, Cable Kickback, Sumo Squat, Leg Abduction |
| Shoulders | Overhead Press, Lateral Raise, Front Raise, Arnold Press, Reverse Fly |
| Biceps | Barbell Curl, Hammer Curl, Incline DB Curl, Cable Curl, Concentration Curl |
| Triceps | Pushdown, Skull Crusher, Close-Grip Bench, Overhead Extension, Dips |
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
| Brand Accent | #4A9EE8 |
| Font (iOS) | SF Pro (system default) |
| Font (Android) | Roboto (system default) |
| Corner Radius | 12–16px for cards |
| Min Touch Target | 44×44pt |

### 6.2 Navigation Structure
```
Splash Screen (native launch screen + JS animated)
    ↓ (auto 2.5s)
Home Dashboard  [Stack.Navigator root]
    ├── Body Map Screen
    │       ├── [tap muscle] → Exercise Suggestions
    │       └── [home btn]  → Home Dashboard
    └── Workout Plans Screen
            └── [select plan] → Plan Detail
```

---

## 7. Logo Specification
- Name: GymTrack by Rubyx
- Icon: Stylized hexagon with "G" lettermark
- Colors: Brand blue (#4A9EE8) on dark background
- Formats: 1024×1024 (App Store), adaptive icon (Android), launch screen center image

---

## 8. SDLC Phases

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 1. Requirements | SRS Document (this file) | ✅ Complete |
| 2. System Design | Architecture + Data Model | ✅ Complete |
| 3. UI/UX Design | Figma-style wireframe deck | ✅ Complete |
| 4. Development | React Native CLI app code | ⏳ Pending approval |
| 5. Testing | Test cases + QA checklist | ⏳ Pending |
| 6. Deployment | Fastlane / manual store submission | ⏳ Pending |
| 7. Maintenance | Bug fixes + v2.0 planning | ⏳ Future |

---

*Document version 1.1 — updated from Expo to React Native CLI.*
