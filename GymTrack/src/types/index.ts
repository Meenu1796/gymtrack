export type Gender = 'male' | 'female';

export type MuscleGroup = {
  id: string;
  label: string;
  color: string;
  frontSlugs: string[];
  backSlugs: string[];
  exerciseIds: string[];
  frontDot: { x: number; y: number };
  backDot:  { x: number; y: number } | null;
  labelSide: 'L' | 'R';
  labelY: number;
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroupId: string;
  description: string;
  equipment: 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight' | 'kettlebell';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sets?: string;
  reps?: string;
};

export type WorkoutPlan = {
  id: 'push' | 'pull' | 'legs';
  name: string;
  subtitle: string;
  color: string;
  emoji: string;
  targetMuscleIds: string[];
  exerciseIds: string[];
};

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  BodyMap: undefined;
  Exercises: { muscleId: string };
  PlanDetail: { planId: string };
};
