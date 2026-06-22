import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Exercise } from '../../types';
import { Colors } from '../../theme/colors';

const EQUIPMENT_ICON: Record<string, string> = {
  barbell: '🏋️', dumbbell: '💪', machine: '⚙️',
  cable: '🔗', bodyweight: '🤸', kettlebell: '🔔',
};

const DIFF_COLOR: Record<string, string> = {
  beginner: Colors.green,
  intermediate: Colors.gold,
  advanced: Colors.red,
};

interface Props {
  exercise: Exercise;
  accentColor: string;
  onPress?: () => void;
}

export default function ExerciseCard({ exercise, accentColor, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* left accent bar */}
      <View style={[styles.bar, { backgroundColor: accentColor }]} />

      <View style={styles.icon}>
        <Text style={styles.iconText}>
          {EQUIPMENT_ICON[exercise.equipment] ?? '💪'}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{exercise.description}</Text>
        <View style={styles.tags}>
          <View style={[styles.tag, { borderColor: DIFF_COLOR[exercise.difficulty] }]}>
            <Text style={[styles.tagText, { color: DIFF_COLOR[exercise.difficulty] }]}>
              {exercise.difficulty}
            </Text>
          </View>
          <View style={[styles.tag, { borderColor: Colors.border }]}>
            <Text style={[styles.tagText, { color: Colors.muted }]}>
              {exercise.equipment}
            </Text>
          </View>
          {exercise.sets && (
            <View style={[styles.tag, { borderColor: Colors.border }]}>
              <Text style={[styles.tagText, { color: Colors.muted }]}>
                {exercise.sets} × {exercise.reps}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface2,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: Colors.border,
    overflow: 'hidden',
    minHeight: 80,
  },
  bar: {
    width: 4,
    alignSelf: 'stretch',
  },
  icon: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
  },
  name: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  desc: {
    color: Colors.muted,
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  chevron: {
    color: Colors.dim,
    fontSize: 20,
    paddingRight: 12,
  },
});
