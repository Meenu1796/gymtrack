import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Easing,
} from 'react-native-reanimated';

import AvatarSVG from './AvatarSVG';
import frontPaths from './frontPaths';
import backPaths from './backPaths';
import { useAppStore } from '../../store/appStore';
import { Colors } from '../../theme/colors';

export default function BodyAvatar() {
  const activeMuscleId = useAppStore(s => s.activeMuscleId);
  const selectMuscle = useAppStore(s => s.selectMuscle);
  const isShowingFront = useAppStore(s => s.isShowingFront);
  const flipAvatar = useAppStore(s => s.flipAvatar);

  const rotation = useSharedValue(0); // 0=front, 1=back

  const handleFlip = useCallback(() => {
    const toValue = rotation.value === 0 ? 1 : 0;
    rotation.value = withTiming(toValue, {
      duration: 650,
      easing: Easing.inOut(Easing.ease),
    });
    // Update store at the halfway point
    setTimeout(() => flipAvatar(), 325);
  }, [rotation, flipAvatar]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1200 },
      { rotateY: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` },
    ],
    backfaceVisibility: 'hidden',
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1200 },
      { rotateY: `${interpolate(rotation.value, [0, 1], [180, 360])}deg` },
    ],
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }));

  const handleMusclePress = useCallback(
    (muscleId: string) => {
      selectMuscle(activeMuscleId === muscleId ? null : muscleId);
    },
    [activeMuscleId, selectMuscle],
  );

  return (
    <View style={styles.container}>
      {/* 3D flip card */}
      <TouchableOpacity
        onPress={handleFlip}
        activeOpacity={0.9}
        style={styles.avatarWrapper}
      >
        <Animated.View style={[styles.face, frontStyle]}>
          <AvatarSVG
            paths={frontPaths}
            side="front"
            activeMuscleId={activeMuscleId}
            onMusclePress={handleMusclePress}
          />
        </Animated.View>
        <Animated.View style={[styles.face, backStyle]}>
          <AvatarSVG
            paths={backPaths}
            side="back"
            activeMuscleId={activeMuscleId}
            onMusclePress={handleMusclePress}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Rotate button */}
      <TouchableOpacity style={styles.flipBtn} onPress={handleFlip}>
        <Text style={styles.flipText}>
          {isShowingFront ? '↺  VIEW BACK' : '↺  VIEW FRONT'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 440,
    maxWidth: '100%',
    height: 480,
  },
  face: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.dim,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  flipText: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
  },
});
