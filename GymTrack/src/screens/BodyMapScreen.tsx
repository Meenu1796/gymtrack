import React, { useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BodyAvatar from '../components/avatar/BodyAvatar';
import GenderToggle from '../components/ui/GenderToggle';
import MuscleChip from '../components/ui/MuscleChip';
import { useAppStore } from '../store/appStore';
import { MUSCLE_GROUPS } from '../data/muscleGroups';
import { Colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'BodyMap'>;

export default function BodyMapScreen({ navigation }: Props) {
  const selectedGender = useAppStore(s => s.selectedGender);
  const activeMuscleId = useAppStore(s => s.activeMuscleId);
  const setGender      = useAppStore(s => s.setGender);
  const selectMuscle   = useAppStore(s => s.selectMuscle);

  const activeGroup = MUSCLE_GROUPS.find(m => m.id === activeMuscleId);

  const handleMusclePress = useCallback((muscleId: string) => {
    if (activeMuscleId === muscleId) {
      selectMuscle(null);
    } else {
      selectMuscle(muscleId);
    }
  }, [activeMuscleId, selectMuscle]);

  const handleViewExercises = () => {
    if (activeMuscleId) {
      navigation.navigate('Exercises', { muscleId: activeMuscleId });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => { selectMuscle(null); navigation.goBack(); }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.homeBtnText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.screenTitle}>Muscle Map</Text>

        <GenderToggle
          selected={selectedGender}
          onSelect={setGender}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Avatar */}
        <BodyAvatar />

        {/* Info panel */}
        <View style={[
          styles.infoPanel,
          activeGroup && { borderColor: activeGroup.color + '50', backgroundColor: activeGroup.color + '10' },
        ]}>
          {activeGroup ? (
            <View style={styles.infoActive}>
              <View style={[styles.infoDot, { backgroundColor: activeGroup.color, shadowColor: activeGroup.color }]} />
              <View style={styles.infoText}>
                <Text style={[styles.infoName, { color: activeGroup.color }]}>
                  {activeGroup.label}
                </Text>
                <Text style={styles.infoHint}>
                  {activeGroup.exerciseIds.length} exercises available
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.viewBtn, { backgroundColor: activeGroup.color }]}
                onPress={handleViewExercises}
              >
                <Text style={styles.viewBtnText}>VIEW →</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.infoEmpty}>
              TAP ANY MUSCLE TO HIGHLIGHT  ·  TAP AVATAR TO ROTATE
            </Text>
          )}
        </View>

        {/* Muscle chips */}
        <View style={styles.chips}>
          {MUSCLE_GROUPS.map(g => (
            <MuscleChip
              key={g.id}
              group={g}
              isActive={activeMuscleId === g.id}
              onPress={() => handleMusclePress(g.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
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
  homeBtn: {
    width: 36,
    height: 36,
    backgroundColor: Colors.surface2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  homeBtnText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  screenTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  infoPanel: {
    marginTop: 12,
    marginHorizontal: 16,
    width: '90%',
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  infoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  infoText: {
    flex: 1,
  },
  infoName: {
    fontSize: 14,
    fontWeight: '800',
  },
  infoHint: {
    color: Colors.muted,
    fontSize: 11,
    marginTop: 1,
  },
  viewBtn: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  viewBtnText: {
    color: Colors.bg,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  infoEmpty: {
    color: Colors.dim,
    fontSize: 10,
    letterSpacing: 1,
    textAlign: 'center',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
  },
});
