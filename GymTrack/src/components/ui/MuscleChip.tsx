import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MuscleGroup } from '../../types';
import { Colors } from '../../theme/colors';

interface Props {
  group: MuscleGroup;
  isActive: boolean;
  onPress: () => void;
}

export default function MuscleChip({ group, isActive, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrap}>
      <View style={[
        styles.chip,
        { borderColor: isActive ? group.color : group.color + '45' },
        isActive && { backgroundColor: group.color + '25' },
      ]}>
        <View style={[styles.dot, { backgroundColor: group.color }]} />
        <Text style={[
          styles.label,
          { color: isActive ? group.color : group.color + '90' },
        ]}>
          {group.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    margin: 3,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
