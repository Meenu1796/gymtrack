import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  // ── Chest ──────────────────────────────────────────────────
  { id:'bench-press',      muscleGroupId:'chest',      name:'Barbell Bench Press',    equipment:'barbell',    difficulty:'intermediate', sets:'4', reps:'8-10', description:'Lie flat on bench, lower bar to chest, press up. King of chest exercises.' },
  { id:'incline-db-press', muscleGroupId:'chest',      name:'Incline DB Press',       equipment:'dumbbell',   difficulty:'intermediate', sets:'3', reps:'10-12', description:'Set bench 30-45 deg. Press dumbbells up and slightly inward for upper chest.' },
  { id:'cable-fly',        muscleGroupId:'chest',      name:'Cable Fly',              equipment:'cable',      difficulty:'beginner',     sets:'3', reps:'12-15', description:'Arms wide, bring hands together in an arc. Great for inner chest stretch.' },
  { id:'push-up',          muscleGroupId:'chest',      name:'Push-Up',                equipment:'bodyweight', difficulty:'beginner',     sets:'3', reps:'15-20', description:'Hands shoulder-width, body straight. Lower chest to floor then press up.' },
  { id:'dips-chest',       muscleGroupId:'chest',      name:'Chest Dips',             equipment:'bodyweight', difficulty:'intermediate', sets:'3', reps:'10-12', description:'Lean forward on parallel bars, lower until shoulder stretch, press up.' },

  // ── Abs ────────────────────────────────────────────────────
  { id:'plank',            muscleGroupId:'abs',        name:'Plank',                  equipment:'bodyweight', difficulty:'beginner',     sets:'3', reps:'30-60s', description:'Forearms on floor, body rigid. Brace core tight throughout.' },
  { id:'hanging-leg-raise',muscleGroupId:'abs',        name:'Hanging Leg Raise',      equipment:'bodyweight', difficulty:'intermediate', sets:'3', reps:'12-15', description:'Hang from bar, raise straight legs to 90 deg. Avoid swinging.' },
  { id:'cable-crunch',     muscleGroupId:'abs',        name:'Cable Crunch',           equipment:'cable',      difficulty:'beginner',     sets:'3', reps:'15-20', description:'Kneel at cable, crunch elbows to knees. Keep hips stationary.' },
  { id:'ab-wheel',         muscleGroupId:'abs',        name:'Ab Wheel Rollout',       equipment:'bodyweight', difficulty:'advanced',     sets:'3', reps:'8-12', description:'On knees, roll wheel out as far as possible, pull back. Full core workout.' },
  { id:'russian-twist',    muscleGroupId:'abs',        name:'Russian Twist',          equipment:'bodyweight', difficulty:'beginner',     sets:'3', reps:'20 total', description:'Seated, feet raised, rotate torso side to side. Add weight for progression.' },

  // ── Biceps ─────────────────────────────────────────────────
  { id:'barbell-curl',       muscleGroupId:'biceps',   name:'Barbell Curl',           equipment:'barbell',    difficulty:'beginner',     sets:'4', reps:'8-10', description:'Stand, curl barbell to chin. Keep elbows tucked at sides.' },
  { id:'hammer-curl',        muscleGroupId:'biceps',   name:'Hammer Curl',            equipment:'dumbbell',   difficulty:'beginner',     sets:'3', reps:'10-12', description:'Neutral grip (thumbs up). Trains brachialis and brachioradialis too.' },
  { id:'incline-db-curl',    muscleGroupId:'biceps',   name:'Incline DB Curl',        equipment:'dumbbell',   difficulty:'intermediate', sets:'3', reps:'10-12', description:'Seated on incline bench, arms hang behind body. Full bicep stretch.' },
  { id:'cable-curl',         muscleGroupId:'biceps',   name:'Cable Curl',             equipment:'cable',      difficulty:'beginner',     sets:'3', reps:'12-15', description:'Constant tension throughout range. Great as a finishing exercise.' },
  { id:'concentration-curl', muscleGroupId:'biceps',   name:'Concentration Curl',     equipment:'dumbbell',   difficulty:'beginner',     sets:'3', reps:'12-15', description:'Seated, elbow on inner thigh. Isolates bicep completely.' },

  // ── Triceps ────────────────────────────────────────────────
  { id:'triceps-pushdown',   muscleGroupId:'triceps',  name:'Triceps Pushdown',       equipment:'cable',      difficulty:'beginner',     sets:'4', reps:'12-15', description:'Use rope or bar. Push down until arms fully extended. Keep elbows fixed.' },
  { id:'skull-crusher',      muscleGroupId:'triceps',  name:'Skull Crusher',          equipment:'barbell',    difficulty:'intermediate', sets:'3', reps:'10-12', description:'Lie on bench, lower bar to forehead, extend up. Long head emphasis.' },
  { id:'close-grip-bench',   muscleGroupId:'triceps',  name:'Close-Grip Bench Press', equipment:'barbell',    difficulty:'intermediate', sets:'4', reps:'8-10', description:'Hands shoulder-width on bar. Compound movement, heavy tricep overload.' },
  { id:'overhead-ext',       muscleGroupId:'triceps',  name:'Overhead Extension',     equipment:'dumbbell',   difficulty:'beginner',     sets:'3', reps:'12-15', description:'Hold dumbbell overhead, lower behind head. Best long head stretch.' },
  { id:'dips-tri',           muscleGroupId:'triceps',  name:'Tricep Dips',            equipment:'bodyweight', difficulty:'intermediate', sets:'3', reps:'10-15', description:'Stay upright on parallel bars. Lower and press focusing on triceps.' },

  // ── Shoulders ──────────────────────────────────────────────
  { id:'overhead-press',   muscleGroupId:'shoulders',  name:'Overhead Press',         equipment:'barbell',    difficulty:'intermediate', sets:'4', reps:'6-8', description:'Press bar from shoulders overhead. Best overall shoulder builder.' },
  { id:'lateral-raise',    muscleGroupId:'shoulders',  name:'Lateral Raise',          equipment:'dumbbell',   difficulty:'beginner',     sets:'4', reps:'15-20', description:'Raise arms out to sides to shoulder height. Targets medial deltoid.' },
  { id:'front-raise',      muscleGroupId:'shoulders',  name:'Front Raise',            equipment:'dumbbell',   difficulty:'beginner',     sets:'3', reps:'12-15', description:'Raise arms in front to shoulder height. Targets anterior deltoid.' },
  { id:'arnold-press',     muscleGroupId:'shoulders',  name:'Arnold Press',           equipment:'dumbbell',   difficulty:'intermediate', sets:'3', reps:'10-12', description:'Rotate from palms-in to palms-out as you press. Hits all three heads.' },
  { id:'reverse-fly',      muscleGroupId:'shoulders',  name:'Reverse Fly',            equipment:'dumbbell',   difficulty:'beginner',     sets:'3', reps:'15', description:'Bent over, raise arms out to sides. Targets rear delts.' },

  // ── Trapezius ──────────────────────────────────────────────
  { id:'shrug',           muscleGroupId:'traps',       name:'Barbell Shrug',          equipment:'barbell',    difficulty:'beginner',     sets:'4', reps:'12-15', description:'Lift shoulders straight up, hold 1 second at top. Go heavy.' },
  { id:'face-pull',       muscleGroupId:'traps',       name:'Face Pull',              equipment:'cable',      difficulty:'beginner',     sets:'3', reps:'15-20', description:'Pull rope to face, elbows high. Great for rear delts and traps.' },
  { id:'upright-row',     muscleGroupId:'traps',       name:'Upright Row',            equipment:'barbell',    difficulty:'intermediate', sets:'3', reps:'10-12', description:'Pull bar up along body to chin. Elbows lead the movement.' },
  { id:'rack-pull',       muscleGroupId:'traps',       name:'Rack Pull',              equipment:'barbell',    difficulty:'advanced',     sets:'3', reps:'6-8', description:'Deadlift from knee height. Massive trap and upper back overload.' },

  // ── Back ───────────────────────────────────────────────────
  { id:'pull-up',          muscleGroupId:'back',       name:'Pull-Up',                equipment:'bodyweight', difficulty:'intermediate', sets:'4', reps:'6-10', description:'Full hang, pull chest to bar. Best lat width builder.' },
  { id:'lat-pulldown',     muscleGroupId:'back',       name:'Lat Pulldown',           equipment:'machine',    difficulty:'beginner',     sets:'4', reps:'10-12', description:'Pull bar to upper chest. Great pull-up alternative or supplement.' },
  { id:'barbell-row',      muscleGroupId:'back',       name:'Barbell Row',            equipment:'barbell',    difficulty:'intermediate', sets:'4', reps:'8-10', description:'Hinge at hips, row bar to lower chest. Best overall back thickness.' },
  { id:'seated-cable-row', muscleGroupId:'back',       name:'Seated Cable Row',       equipment:'cable',      difficulty:'beginner',     sets:'3', reps:'12-15', description:'Sit tall, row handle to abdomen. Squeeze shoulder blades together.' },
  { id:'deadlift',         muscleGroupId:'back',       name:'Deadlift',               equipment:'barbell',    difficulty:'advanced',     sets:'4', reps:'5', description:'Hip hinge to lift bar from floor. King of all compound movements.' },

  // ── Forearms ───────────────────────────────────────────────
  { id:'wrist-curl',       muscleGroupId:'forearms',   name:'Wrist Curl',             equipment:'barbell',    difficulty:'beginner',     sets:'3', reps:'15-20', description:'Forearms on bench, curl wrists up. Isolates forearm flexors.' },
  { id:'reverse-curl',     muscleGroupId:'forearms',   name:'Reverse Curl',           equipment:'barbell',    difficulty:'beginner',     sets:'3', reps:'12-15', description:'Overhand grip curl. Works brachioradialis and forearm extensors.' },
  { id:'farmers-walk',     muscleGroupId:'forearms',   name:"Farmer's Walk",          equipment:'dumbbell',   difficulty:'intermediate', sets:'3', reps:'30-40m', description:'Walk holding heavy dumbbells at sides. Grip, core, and trap builder.' },

  // ── Glutes ─────────────────────────────────────────────────
  { id:'hip-thrust',       muscleGroupId:'glutes',     name:'Barbell Hip Thrust',     equipment:'barbell',    difficulty:'intermediate', sets:'4', reps:'10-12', description:'Upper back on bench, bar on hips, thrust up. #1 glute builder.' },
  { id:'glute-bridge',     muscleGroupId:'glutes',     name:'Glute Bridge',           equipment:'bodyweight', difficulty:'beginner',     sets:'3', reps:'15-20', description:'On floor, drive hips up and squeeze glutes hard at top.' },
  { id:'cable-kickback',   muscleGroupId:'glutes',     name:'Cable Kickback',         equipment:'cable',      difficulty:'beginner',     sets:'3', reps:'15', description:'On all fours at cable, kick leg back and up. Great isolation.' },
  { id:'sumo-squat',       muscleGroupId:'glutes',     name:'Sumo Squat',             equipment:'dumbbell',   difficulty:'beginner',     sets:'3', reps:'12-15', description:'Wide stance, toes out. Greater glute and inner thigh activation.' },
  { id:'leg-abduction',    muscleGroupId:'glutes',     name:'Leg Abduction Machine',  equipment:'machine',    difficulty:'beginner',     sets:'3', reps:'15-20', description:'Push legs apart against resistance. Targets glute medius.' },

  // ── Quads ──────────────────────────────────────────────────
  { id:'back-squat',       muscleGroupId:'quads',      name:'Back Squat',             equipment:'barbell',    difficulty:'intermediate', sets:'4', reps:'6-8', description:'Bar on traps, squat to parallel or below. King of leg exercises.' },
  { id:'leg-press',        muscleGroupId:'quads',      name:'Leg Press',              equipment:'machine',    difficulty:'beginner',     sets:'4', reps:'10-12', description:'Push platform away. Safer spinal loading than squat. Go heavy.' },
  { id:'leg-extension',    muscleGroupId:'quads',      name:'Leg Extension',          equipment:'machine',    difficulty:'beginner',     sets:'3', reps:'15', description:'Extend legs against pad. Pure quad isolation, great finisher.' },
  { id:'bulgarian-split',  muscleGroupId:'quads',      name:'Bulgarian Split Squat',  equipment:'dumbbell',   difficulty:'advanced',     sets:'3', reps:'10 each', description:'Rear foot elevated, lunge deep. Unilateral strength and balance.' },
  { id:'hack-squat',       muscleGroupId:'quads',      name:'Hack Squat',             equipment:'machine',    difficulty:'intermediate', sets:'3', reps:'10-12', description:'Machine squat with back supported. Great quad overload, spine friendly.' },

  // ── Hamstrings ─────────────────────────────────────────────
  { id:'romanian-dl',      muscleGroupId:'hamstrings', name:'Romanian Deadlift',      equipment:'barbell',    difficulty:'intermediate', sets:'4', reps:'8-10', description:'Hip hinge, bar slides down legs. Best hamstring length and strength.' },
  { id:'lying-leg-curl',   muscleGroupId:'hamstrings', name:'Lying Leg Curl',         equipment:'machine',    difficulty:'beginner',     sets:'3', reps:'12-15', description:'Lie face down, curl legs to glutes. Pure hamstring isolation.' },
  { id:'nordic-curl',      muscleGroupId:'hamstrings', name:'Nordic Curl',            equipment:'bodyweight', difficulty:'advanced',     sets:'3', reps:'6-8', description:'Kneel anchored, lower body with hamstrings. Eccentric beast.' },
  { id:'good-morning',     muscleGroupId:'hamstrings', name:'Good Morning',           equipment:'barbell',    difficulty:'intermediate', sets:'3', reps:'10-12', description:'Bar on traps, hinge at hip. Posterior chain strength builder.' },
  { id:'stiff-leg-dl',     muscleGroupId:'hamstrings', name:'Stiff-Leg Deadlift',     equipment:'barbell',    difficulty:'intermediate', sets:'3', reps:'10-12', description:'Minimal knee bend, maximum hip hinge. Deep hamstring stretch.' },

  // ── Calves ─────────────────────────────────────────────────
  { id:'standing-calf-raise', muscleGroupId:'calves',  name:'Standing Calf Raise',    equipment:'machine',    difficulty:'beginner',     sets:'4', reps:'15-20', description:'Full range of motion, pause at bottom stretch. Targets gastrocnemius.' },
  { id:'seated-calf-raise',   muscleGroupId:'calves',  name:'Seated Calf Raise',      equipment:'machine',    difficulty:'beginner',     sets:'4', reps:'15-20', description:'Knee bent targets soleus. Use heavy weight, slow tempo.' },
  { id:'donkey-calf-raise',   muscleGroupId:'calves',  name:'Donkey Calf Raise',      equipment:'bodyweight', difficulty:'beginner',     sets:'3', reps:'15-20', description:"Hips hinged 90 deg. Arnold's favourite. Great gastrocnemius stretch." },
];

export const getExercisesByMuscle = (muscleGroupId: string): Exercise[] =>
  EXERCISES.filter(e => e.muscleGroupId === muscleGroupId);

export const getExerciseById = (id: string): Exercise | undefined =>
  EXERCISES.find(e => e.id === id);
