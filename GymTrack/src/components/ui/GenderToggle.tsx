import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Gender } from '../../types';
import { Colors } from '../../theme/colors';

interface Props {
  selected: Gender;
  onSelect: (g: Gender) => void;
}

export default function GenderToggle({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, selected === 'female' && styles.active]}
        onPress={() => onSelect('female')}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
        <Text style={[styles.symbol, selected === 'female' && styles.activeSymbol]}>♀</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={[styles.btn, selected === 'male' && styles.active]}
        onPress={() => onSelect('male')}
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}>
        <Text style={[styles.symbol, selected === 'male' && styles.activeSymbol]}>♂</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: Colors.pink + '30',
  },
  symbol: {
    fontSize: 16,
    color: Colors.muted,
    fontWeight: '600',
  },
  activeSymbol: {
    color: Colors.pink,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border,
  },
});
