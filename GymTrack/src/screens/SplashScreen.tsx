import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { Colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.6);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.back(1.2)),
    });
    setTimeout(() => {
      textOpacity.value = withTiming(1, { duration: 600 });
    }, 400);
    const timer = setTimeout(() => navigation.replace('MainTabs'), 2500);
    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <View style={styles.container}>
        <Animated.View style={[styles.logoWrap, logoStyle]}>
          <View style={styles.hexOuter}>
            <View style={styles.hexInner}>
              <Text style={styles.hexLetter}>G</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View style={[styles.textWrap, textStyle]}>
          <Text style={styles.appName}>GymBelt</Text>
          <Text style={styles.byLine}>by RUBYX</Text>
        </Animated.View>
        <Animated.View style={[styles.dots, textStyle]}>
          {[0, 1, 2].map(i => (
            <View
              key={i}
              style={[styles.dot, i === 1 ? styles.dotActive : styles.dotDim]}
            />
          ))}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: { marginBottom: 28 },
  hexOuter: {
    width: 110,
    height: 110,
    backgroundColor: Colors.blue,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '30deg' }],
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  hexInner: {
    transform: [{ rotate: '-30deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexLetter: {
    color: Colors.bg,
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: -2,
  },
  textWrap: { alignItems: 'center' },
  appName: {
    color: Colors.text,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 6,
  },
  byLine: {
    color: Colors.blue,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 6,
  },
  dots: { flexDirection: 'row', gap: 8, marginTop: 48 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { backgroundColor: Colors.blue },
  dotDim: { backgroundColor: Colors.dim },
});
