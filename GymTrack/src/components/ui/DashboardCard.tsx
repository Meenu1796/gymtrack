import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface Props {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  comingSoon?: boolean;
  onPress?: () => void;
}

export default function DashboardCard({ title, subtitle, emoji, color, comingSoon, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: comingSoon ? Colors.border : color }]}
      onPress={onPress}
      disabled={comingSoon}
      activeOpacity={0.75}
    >
      <View style={[styles.emojiWrap, { backgroundColor: color + '20' }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={[styles.title, { color: comingSoon ? Colors.muted : Colors.text }]}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
      {comingSoon ? (
        <View style={styles.soon}>
          <Text style={styles.soonText}>SOON</Text>
        </View>
      ) : (
        <View style={[styles.arrow, { backgroundColor: color + '20' }]}>
          <Text style={[styles.arrowText, { color }]}>→</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: Colors.surface2,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    margin: '1.5%',
    minHeight: 150,
  },
  emojiWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 22,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.muted,
    lineHeight: 16,
    flex: 1,
  },
  soon: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  soonText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.dim,
    letterSpacing: 1,
  },
  arrow: {
    marginTop: 8,
    alignSelf: 'flex-start',
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
