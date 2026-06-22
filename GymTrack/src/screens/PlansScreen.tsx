import React from 'react';
import {
  View, Text, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PlanCard from '../components/ui/PlanCard';
import { WORKOUT_PLANS } from '../data/workoutPlans';
import { Colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

export default function PlansScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => (navigation as any).navigate('Home')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.homeBtnText}>⌂</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Workout Plans</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.subtitle}>
          Choose your training split for today
        </Text>

        {WORKOUT_PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onPress={() => navigation.navigate('PlanDetail', { planId: plan.id })}
          />
        ))}

        <View style={styles.note}>
          <Text style={styles.noteText}>
            💡  These are beginner-friendly splits. More advanced programming coming in future updates.
          </Text>
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
    fontSize: 16,
  },
  screenTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  scroll: {
    paddingBottom: 40,
  },
  subtitle: {
    color: Colors.muted,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  note: {
    margin: 16,
    padding: 14,
    backgroundColor: Colors.surface2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noteText: {
    color: Colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
});
