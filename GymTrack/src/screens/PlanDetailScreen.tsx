import React from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ExerciseCard from '../components/ui/ExerciseCard';
import { getPlanById } from '../data/workoutPlans';
import { getExerciseById } from '../data/exercises';
import { Colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'PlanDetail'>;

export default function PlanDetailScreen({ route, navigation }: Props) {
  const { planId } = route.params;
  const plan = getPlanById(planId);

  if (!plan) {
    return (
      <View style={styles.error}>
        <Text style={{ color: Colors.muted }}>Plan not found.</Text>
      </View>
    );
  }

  const exercises = plan.exerciseIds
    .map(id => getExerciseById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getExerciseById>>[];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{plan.name}</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Plan header */}
      <View style={[styles.planHeader, { borderColor: plan.color + '50', backgroundColor: plan.color + '12' }]}>
        <Text style={styles.planEmoji}>{plan.emoji}</Text>
        <View>
          <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
          <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
          <Text style={styles.planCount}>{exercises.length} exercises</Text>
        </View>
      </View>

      {/* Exercise list */}
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            accentColor={plan.color}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={[styles.footerCard, { borderColor: plan.color + '30' }]}>
              <Text style={[styles.footerTitle, { color: plan.color }]}>
                💡  How to use this plan
              </Text>
              <Text style={styles.footerText}>
                Complete all exercises in order. Rest 60–90 seconds between sets.
                Aim for progressive overload — increase weight or reps each week.
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  error: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  backBtn: {
    width: 36,
    height: 36,
    backgroundColor: Colors.surface2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    margin: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  planEmoji: {
    fontSize: 36,
  },
  planName: {
    fontSize: 20,
    fontWeight: '800',
  },
  planSubtitle: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  planCount: {
    color: Colors.dim,
    fontSize: 11,
    marginTop: 4,
  },
  list: {
    paddingBottom: 20,
  },
  footer: {
    padding: 16,
    paddingTop: 8,
  },
  footerCard: {
    backgroundColor: Colors.surface2,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  footerText: {
    color: Colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
});
