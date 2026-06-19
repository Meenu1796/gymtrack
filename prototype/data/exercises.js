// Static exercise suggestions per body part (v1: no backend, bundled locally).
window.EXERCISES = {
  shoulders: ["Shoulder Press", "Lateral Raise", "Front Raise"],
  chest: ["Bench Press", "Push-ups", "Chest Fly"],
  biceps: ["Barbell Curl", "Hammer Curl", "Concentration Curl"],
  abs: ["Crunches", "Plank", "Leg Raises"],
  quads: ["Leg Press", "Leg Extension", "Squats"],
  back: ["Lat Pulldown", "Seated Row", "Pull-ups"],
  triceps: ["Tricep Pushdown", "Skull Crushers", "Overhead Extension"],
  hamstrings: ["Romanian Deadlift", "Leg Curl", "Glute-Ham Raise"],
  glutes: ["Hip Thrust", "Glute Bridge", "Cable Kickback"],
  calves: ["Calf Raise", "Seated Calf Raise"],
};

window.WORKOUT_PLANS = {
  push: { title: "Push Day", exercises: ["Bench Press", "Overhead Press", "Tricep Pushdown", "Lateral Raise"] },
  pull: { title: "Pull Day", exercises: ["Pull-ups", "Seated Row", "Lat Pulldown", "Barbell Curl"] },
  leg:  { title: "Leg Day", exercises: ["Squats", "Leg Press", "Romanian Deadlift", "Calf Raise"] },
};
