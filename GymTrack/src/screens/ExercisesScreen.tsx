import React from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ExerciseCard from '../components/ui/ExerciseCard';
import { getMuscleById } from '../data/muscleGroups';
import { getExercisesByMuscle } from '../data/exercises';
import { Colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Exercises'>;

export default function ExercisesScreen({ route, navigation }: Props) {
  const { muscleId } = route.params;
  const muscle    = getMuscleById(muscleId);
  const exercises = getExercisesByMuscle(muscleId);

  if (!muscle) {
    return (
      <View style={styles.error}>
        <Text style={{ color: Colors.muted }}>Muscle group not found.</Text>
      </View>
    );
  }

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
        <Text style={styles.title}>Exercises</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Muscle header */}
      <View style={[styles.muscleHeader, { borderColor: muscle.color + '50', backgroundColor: muscle.color + '12' }]}>
        <View style={[styles.colorDot, { backgroundColor: muscle.color, shadowColor: muscle.color }]} />
        <View>
          <Text style={[styles.muscleName, { color: muscle.color }]}>{muscle.label}</Text>
          <Text style={styles.muscleCount}>{exercises.length} exercises</Text>
        </View>
      </View>

      {/* Exercise list */}
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            accentColor={muscle.color}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No exercises found for this muscle group.</Text>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
  muscleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  muscleName: {
    fontSize: 18,
    fontWeight: '800',
  },
  muscleCount: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  list: {
    paddingBottom: 30,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.muted,
    fontSize: 13,
  },
});
