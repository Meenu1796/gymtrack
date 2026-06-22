# System Design Document
## GymTrack — com.rubyx.gymtrack
**Version:** 1.1 | **Date:** June 2026
**Framework:** React Native CLI (bare, no Expo)

---

## 1. Architecture Overview

GymTrack follows a **local-first, offline-capable** architecture for v1.0. No backend or Expo runtime. All workout data is bundled as static JSON. Native modules are linked manually via CocoaPods (iOS) and Gradle (Android).

```
┌─────────────────────────────────────────────────────┐
│                  GymTrack App                       │
│                                                     │
│  ┌──────────────┐    ┌────────────────────────┐    │
│  │   UI Layer   │    │      Data Layer        │    │
│  │              │    │                        │    │
│  │ react-nav v6 │    │ Static JSON (bundled)  │    │
│  │ Screens      │◄──►│ exercises.json         │    │
│  │ Components   │    │ muscleGroups.json      │    │
│  └──────────────┘    │ workoutPlans.json      │    │
│         │            │                        │    │
│         ▼            │ AsyncStorage (prefs)   │    │
│  ┌──────────────┐    └────────────────────────┘    │
│  │ State Layer  │                                   │
│  │   Zustand    │                                   │
│  └──────────────┘                                   │
└─────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack

| Layer | Technology | Version | Reason |
|-------|-----------|---------|--------|
| Framework | React Native CLI | 0.76+ | Full native control, no Expo overhead |
| Language | TypeScript | 5.x | Type safety across codebase |
| Navigation | React Navigation | v6 | Industry standard for RN CLI |
| State | Zustand | 5.x | Lightweight, no boilerplate |
| Animation | React Native Reanimated | 3.x | 60fps UI-thread animations |
| SVG Avatar | react-native-svg | 15.x | Vector muscle map rendering |
| Storage | @react-native-async-storage/async-storage | 2.x | User prefs (gender toggle) |
| Icons | react-native-vector-icons | 10.x | Consistent icon set |
| Splash (native) | react-native-splash-screen | 3.x | Native launch screen before JS loads |
| iOS build | CocoaPods | 1.14+ | Native dependency management |
| Android build | Gradle | 8.x | Native dependency management |
| Distribution | Fastlane (optional) or manual | — | App Store + Play Store |

> ⚠️ NO Expo packages. All libraries must be React Native CLI compatible and require manual native linking where needed.

---

## 3. Project Setup Commands

```bash
# 1. Create project
npx @react-native-community/cli@latest init GymTrack \
  --package-name com.rubyx.gymtrack \
  --title "GymTrack"

# 2. Install core dependencies
npm install @react-navigation/native \
            @react-navigation/stack \
            @react-navigation/bottom-tabs \
            react-native-screens \
            react-native-safe-area-context \
            react-native-gesture-handler

npm install react-native-reanimated
npm install react-native-svg
npm install zustand
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
npm install react-native-splash-screen

# 3. iOS — install pods
cd ios && pod install && cd ..

# 4. Run
npx react-native run-ios
npx react-native run-android
```

---

## 4. Screen Architecture (React Navigation v6)

```
RootStack (Stack.Navigator)
├── Splash         (no header)
├── MainTabs       (Tab.Navigator)
│   ├── Home       (Stack → HomeScreen)
│   └── Plans      (Stack → PlansScreen → PlanDetailScreen)
├── BodyMap        (full screen, no tab bar)
└── Exercises      (BodyMap → ExercisesScreen, params: muscleId)
```

### Navigator Setup
```typescript
// App.tsx
<NavigationContainer>
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="Splash"    component={SplashScreen} />
    <RootStack.Screen name="MainTabs"  component={MainTabs} />
    <RootStack.Screen name="BodyMap"   component={BodyMapScreen} />
    <RootStack.Screen name="Exercises" component={ExercisesScreen} />
    <RootStack.Screen name="PlanDetail" component={PlanDetailScreen} />
  </RootStack.Navigator>
</NavigationContainer>
```

---

## 5. Folder Structure

```
GymTrack/
├── android/                    ← Android native project
│   └── app/
│       └── src/main/
│           ├── AndroidManifest.xml   (package: com.rubyx.gymtrack)
│           └── res/
│               ├── mipmap-*/         (launcher icons)
│               └── drawable/         (splash background)
├── ios/                        ← iOS native project
│   └── GymTrack/
│       ├── AppDelegate.mm
│       ├── LaunchScreen.storyboard   (native splash)
│       └── Images.xcassets/          (app icon set)
├── src/
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── BodyMapScreen.tsx
│   │   ├── ExercisesScreen.tsx
│   │   ├── PlansScreen.tsx
│   │   └── PlanDetailScreen.tsx
│   ├── components/
│   │   ├── avatar/
│   │   │   ├── BodyAvatar.tsx        ← 3D flip container
│   │   │   ├── AvatarSVG.tsx         ← react-native-svg muscle renderer
│   │   │   ├── frontMalePaths.ts     ← Male front SVG path data
│   │   │   ├── frontFemalePaths.ts   ← Female front SVG path data
│   │   │   ├── backMalePaths.ts      ← Male back SVG path data
│   │   │   ├── backFemalePaths.ts    ← Female back SVG path data
│   │   │   └── muscleDots.ts         ← Label anchor positions
│   │   ├── ui/
│   │   │   ├── GenderToggle.tsx
│   │   │   ├── MuscleChip.tsx
│   │   │   ├── ExerciseCard.tsx
│   │   │   ├── PlanCard.tsx
│   │   │   ├── DashboardCard.tsx
│   │   │   └── HomeButton.tsx
│   │   └── navigation/
│   │       └── MainTabs.tsx
│   ├── data/
│   │   ├── muscleGroups.ts
│   │   ├── exercises.ts
│   │   └── workoutPlans.ts
│   ├── store/
│   │   └── appStore.ts               ← Zustand store
│   ├── hooks/
│   │   └── useBodyAvatar.ts
│   ├── theme/
│   │   └── colors.ts                 ← Design tokens
│   └── types/
│       └── index.ts                  ← Shared TypeScript types
├── App.tsx                     ← Root component + NavigationContainer
├── index.js                    ← RN entry point (registerComponent)
├── package.json
├── tsconfig.json
├── babel.config.js             ← Must include reanimated plugin LAST
├── metro.config.js
└── .eslintrc.js
```

---

## 6. Critical Native Configuration

### 6.1 babel.config.js — Reanimated plugin MUST be last
```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ... other plugins
    'react-native-reanimated/plugin',  // ← ALWAYS last
  ],
};
```

### 6.2 iOS — AppDelegate.mm — Splash screen setup
```objc
#import "RNSplashScreen.h"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // ... existing setup
  [RNSplashScreen show];
  return YES;
}
```

### 6.3 Android — MainActivity.kt — Splash + Gesture Handler
```kotlin
import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this)
    super.onCreate(null)
  }
}
```

### 6.4 react-native-vector-icons — Android Gradle
```gradle
// android/app/build.gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### 6.5 react-native-svg — already auto-linked in RN 0.70+
No extra config needed, but verify in ios/Podfile that `RNSvg` is present after `pod install`.

---

## 7. Data Models (TypeScript)

```typescript
// src/types/index.ts

export type Gender = 'male' | 'female';

export type MuscleGroup = {
  id: string;
  label: string;
  color: string;
  frontSlugs: string[];
  backSlugs: string[];
  exerciseIds: string[];
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroupId: string;
  description: string;
  equipment: 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

export type WorkoutPlan = {
  id: 'push' | 'pull' | 'legs';
  name: string;
  color: string;
  targetMuscleIds: string[];
  exerciseIds: string[];
};

export type UserPrefs = {
  selectedGender: Gender;
  lastPlanViewed: string | null;
};
```

---

## 8. Zustand Store

```typescript
// src/store/appStore.ts
import { create } from 'zustand';
import { Gender } from '../types';

type AppState = {
  selectedGender: Gender;
  activeMuscleId: string | null;
  isShowingFront: boolean;

  setGender: (gender: Gender) => void;
  selectMuscle: (id: string | null) => void;
  flipAvatar: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedGender: 'female',     // default: female
  activeMuscleId: null,
  isShowingFront: true,

  setGender: (gender) => set({ selectedGender: gender }),
  selectMuscle: (id) => set({ activeMuscleId: id }),
  flipAvatar: () => set((s) => ({ isShowingFront: !s.isShowingFront })),
}));
```

---

## 9. Avatar Flip Animation (Reanimated 3)

```typescript
// src/hooks/useBodyAvatar.ts
import { useSharedValue, withTiming, interpolate, useAnimatedStyle } from 'react-native-reanimated';

export function useBodyAvatar() {
  const rotation = useSharedValue(0); // 0 = front, 1 = back

  const flip = () => {
    rotation.value = withTiming(rotation.value === 0 ? 1 : 0, { duration: 600 });
  };

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotation.value, [0, 1], [180, 360])}deg` }],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  }));

  return { flip, frontStyle, backStyle };
}
```

---

## 10. Navigation Flow

```
SplashScreen (2.5s)
    ↓ navigation.replace('MainTabs')
HomeScreen
    ├── navigation.navigate('BodyMap')
    │       ├── navigation.navigate('Exercises', { muscleId })
    │       │       └── navigation.goBack() → BodyMap
    │       └── navigation.navigate('MainTabs') → Home
    └── navigation.navigate('Plans')
            └── navigation.navigate('PlanDetail', { planId })
```

---

## 11. Design Tokens

```typescript
// src/theme/colors.ts
export const Colors = {
  bg:       '#0A0D14',
  surface:  '#111520',
  surface2: '#161B28',
  border:   '#1A2030',
  blue:     '#4A9EE8',
  teal:     '#38C49A',
  red:      '#E05C5C',
  gold:     '#E8C040',
  purple:   '#A07AE8',
  pink:     '#E060A0',
  green:    '#52C07A',
  violet:   '#8870E8',
  orange:   '#E07840',
  lime:     '#A0D840',
  text:     '#E8EAF0',
  muted:    '#4A5570',
  dim:      '#2A3350',
};
```

---

## 12. Build & Distribution

### iOS
```bash
# Development
npx react-native run-ios --device "iPhone 15 Pro"

# Release build (Archive via Xcode)
# Product → Archive → Distribute App → App Store Connect
```

### Android
```bash
# Development
npx react-native run-android

# Release APK
cd android && ./gradlew assembleRelease

# Release AAB (for Play Store)
cd android && ./gradlew bundleRelease
```

### Signing
- **iOS:** Distribution certificate + provisioning profile (Apple Developer Portal)
- **Android:** Keystore file — store securely, NEVER commit to git

---

## 13. Future Architecture (v2.0)

When cloud features are added, the following will be introduced without breaking the current CLI structure:
- **Backend:** Supabase (Auth + Postgres)
- **HTTP client:** TanStack Query
- **Local DB:** WatermelonDB (SQLite, works natively in RN CLI)
- **Auth:** Supabase Auth or Firebase Auth
- **Push notifications:** @notifee/react-native (CLI compatible, not Expo)

---

*System Design v1.1 — updated from Expo managed workflow to React Native CLI bare project.*
