import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WorkoutPlan } from '../../types';
import { Colors } from '../../theme/colors';

interface Props {
  plan: WorkoutPlan;
  onPress: () => void;
}

export default function PlanCard({ plan, onPress }: Props) {
  return (
    <TouchableOpacity style={[styles.card, { borderColor: plan.color }]} onPress={onPress} activeOpacity={0.8}>
      {/* Left accent bar */}
      <View style={[styles.bar, { backgroundColor: plan.color }]} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{plan.emoji}</Text>
          <View>
            <Text style={styles.name}>{plan.name}</Text>
            <Text style={[styles.subtitle, { color: plan.color }]}>{plan.subtitle}</Text>
          </View>
        </View>

        <View style={styles.chips}>
          {plan.targetMuscleIds.map(m => (
            <View key={m} style={[styles.chip, { borderColor: plan.color + '60' }]}>
              <Text style={[styles.chipText, { color: plan.color }]}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.startBtn, { backgroundColor: plan.color }]} onPress={onPress}>
          <Text style={styles.startText}>START  →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface2,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  bar: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 30,
  },
  name: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  startBtn: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  startText: {
    color: Colors.bg,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
