import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DashboardCard from '../components/ui/DashboardCard';
import { Colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoMini}>
            <Text style={styles.logoLetter}>G</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Ready to train? 💪</Text>
            <Text style={styles.appTitle}>GymTrack</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>TRAINING</Text>
        <View style={styles.grid}>
          <DashboardCard
            title="Body Map"
            subtitle="Tap a muscle on the 3D avatar to get exercise suggestions"
            emoji="🫀"
            color={Colors.blue}
            onPress={() => navigation.navigate('BodyMap')}
          />
          <DashboardCard
            title="Workout Plans"
            subtitle="Push Day · Pull Day · Leg Day split programs"
            emoji="📋"
            color={Colors.teal}
            onPress={() => (navigation as any).navigate('Plans')}
          />
        </View>

        <Text style={styles.sectionLabel}>COMING SOON</Text>
        <View style={styles.grid}>
          <DashboardCard
            title="Progress Tracker"
            subtitle="Log sets, reps and weight. Track PRs over time"
            emoji="📈"
            color={Colors.gold}
            comingSoon
          />
          <DashboardCard
            title="Nutrition"
            subtitle="Calorie and macro tracking for your goals"
            emoji="🥗"
            color={Colors.green}
            comingSoon
          />
          <DashboardCard
            title="Rest Timer"
            subtitle="Smart rest timer with notifications between sets"
            emoji="⏱️"
            color={Colors.purple}
            comingSoon
          />
          <DashboardCard
            title="Body Stats"
            subtitle="Track bodyweight, measurements and body fat"
            emoji="⚖️"
            color={Colors.orange}
            comingSoon
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>GymTrack v1.0 · by Rubyx</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 20,
    paddingTop: 24,
  },
  logoMini: {
    width: 44,
    height: 44,
    backgroundColor: Colors.blue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '30deg' }],
  },
  logoLetter: {
    color: Colors.bg,
    fontSize: 20,
    fontWeight: '900',
    transform: [{ rotate: '-30deg' }],
  },
  greeting: { color: Colors.muted, fontSize: 12, marginBottom: 2 },
  appTitle: { color: Colors.text, fontSize: 22, fontWeight: '800' },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    color: Colors.dim,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  footer: { alignItems: 'center', paddingTop: 24, gap: 4 },
  footerText: { color: Colors.dim, fontSize: 10, letterSpacing: 1 },
});
