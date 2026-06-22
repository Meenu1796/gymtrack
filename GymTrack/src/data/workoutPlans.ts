import { WorkoutPlan } from '../types';
import { Colors } from '../theme/colors';

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'push',
    name: 'Push Day',
    subtitle: 'Chest · Shoulders · Triceps',
    color: Colors.red,
    emoji: '💪',
    targetMuscleIds: ['chest', 'shoulders', 'triceps'],
    exerciseIds: [
      'bench-press',
      'incline-db-press',
      'overhead-press',
      'lateral-raise',
      'triceps-pushdown',
      'skull-crusher',
    ],
  },
  {
    id: 'pull',
    name: 'Pull Day',
    subtitle: 'Back · Biceps · Traps',
    color: Colors.blue,
    emoji: '🏋️',
    targetMuscleIds: ['back', 'biceps', 'traps'],
    exerciseIds: [
      'pull-up',
      'barbell-row',
      'lat-pulldown',
      'seated-cable-row',
      'barbell-curl',
      'hammer-curl',
      'face-pull',
    ],
  },
  {
    id: 'legs',
    name: 'Leg Day',
    subtitle: 'Quads · Hamstrings · Glutes · Calves',
    color: Colors.green,
    emoji: '🦵',
    targetMuscleIds: ['quads', 'hamstrings', 'glutes', 'calves'],
    exerciseIds: [
      'back-squat',
      'romanian-dl',
      'leg-press',
      'lying-leg-curl',
      'hip-thrust',
      'standing-calf-raise',
    ],
  },
];

export const getPlanById = (id: string) =>
  WORKOUT_PLANS.find(p => p.id === id);
