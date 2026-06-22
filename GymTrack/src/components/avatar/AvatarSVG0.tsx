import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { MUSCLE_GROUPS } from '../../data/muscleGroups';
import { Colors } from '../../theme/colors';

const PAD_L = 110;
const PAD_R = 110;
const VW = 220;
const VH = 440;
const W = VW + PAD_L + PAD_R; // 440
const H = VH + 20; // 460

const BASE_FRONT = ['head', 'hair', 'hands', 'ankles', 'feet', 'knees'];
const BASE_BACK = ['head', 'hair', 'hands', 'ankles', 'feet'];

interface Props {
  paths: Record<string, string>;
  side: 'front' | 'back';
  activeMuscleId: string | null;
  onMusclePress: (muscleId: string) => void;
}

export default function AvatarSVG({
  paths,
  side,
  activeMuscleId,
  onMusclePress,
}: Props) {
  const baseSlugs = side === 'front' ? BASE_FRONT : BASE_BACK;

  const slugColor: Record<string, { color: string; groupId: string }> = {};
  MUSCLE_GROUPS.forEach(g => {
    const slugs = side === 'front' ? g.frontSlugs : g.backSlugs;
    slugs.forEach(sl => {
      slugColor[sl] = { color: g.color, groupId: g.id };
    });
  });

  const labels =
    side === 'front'
      ? [
          { id: 'neck', side: 'R', y: 64 },
          { id: 'traps', side: 'R', y: 88 },
          { id: 'shoulders', side: 'L', y: 94 },
          { id: 'chest', side: 'R', y: 114 },
          { id: 'biceps', side: 'L', y: 140 },
          { id: 'abs', side: 'R', y: 155 },
          { id: 'forearms', side: 'L', y: 178 },
          { id: 'quads', side: 'R', y: 265 },
          { id: 'calves', side: 'L', y: 308 },
        ]
      : [
          { id: 'neck', side: 'R', y: 64 },
          { id: 'traps', side: 'R', y: 88 },
          { id: 'shoulders', side: 'L', y: 94 },
          { id: 'back', side: 'R', y: 142 },
          { id: 'triceps', side: 'L', y: 138 },
          { id: 'forearms', side: 'L', y: 178 },
          { id: 'glutes', side: 'R', y: 198 },
          { id: 'hamstrings', side: 'L', y: 240 },
          { id: 'calves', side: 'R', y: 308 },
        ];

  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* ── Base body (non-highlighted parts) ── */}
      <G transform={`translate(${PAD_L}, 10)`}>
        {baseSlugs.map(sl =>
          paths[sl] ? (
            <Path
              key={sl}
              d={paths[sl]}
              fill="#1E2330"
              stroke="#2A3040"
              strokeWidth={0.6}
            />
          ) : null,
        )}

        {/* ── Colored muscle groups ── */}
        {MUSCLE_GROUPS.map(g => {
          const slugs = side === 'front' ? g.frontSlugs : g.backSlugs;
          const isActive = activeMuscleId === g.id;
          const isDimmed = activeMuscleId !== null && !isActive;
          return slugs.map(sl =>
            paths[sl] ? (
              <Path
                key={sl}
                d={paths[sl]}
                fill={g.color}
                stroke={g.color}
                strokeWidth={isActive ? 0.8 : 0.4}
                opacity={isDimmed ? 0.15 : 0.92}
                onPress={() => onMusclePress(g.id)}
              />
            ) : null,
          );
        })}

        {/* ── Pulse ring on active muscle ── */}
        {MUSCLE_GROUPS.map(g => {
          const isActive = activeMuscleId === g.id;
          if (!isActive) return null;
          const dot = side === 'front' ? g.frontDot : g.backDot;
          if (!dot || (dot.x === 0 && dot.y === 0)) return null;
          return (
            <Circle
              key={`pulse-${g.id}`}
              cx={dot.x}
              cy={dot.y}
              r={6}
              fill="none"
              stroke={g.color}
              strokeWidth={2}
              opacity={0.7}
            />
          );
        })}
      </G>

      {/* ── Leader lines and labels ── */}
      {labels.map(({ id, side: lside, y }) => {
        const g = MUSCLE_GROUPS.find(m => m.id === id);
        if (!g) return null;
        const slugs = side === 'front' ? g.frontSlugs : g.backSlugs;
        if (slugs.length === 0) return null;
        const dot = side === 'front' ? g.frontDot : g.backDot;
        if (!dot || (dot.x === 0 && dot.y === 0)) return null;

        const isActive = activeMuscleId === g.id;
        const isDimmed = activeMuscleId !== null && !isActive;
        const opacity = isDimmed ? 0.18 : 1;
        const dotX = dot.x + PAD_L;
        const dotY = dot.y + 10;
        const elbowX = lside === 'L' ? PAD_L - 10 : PAD_L + VW + 10;
        const labelX = lside === 'L' ? 14 : W - 14;
        const ay = y + 10;

        return (
          <G key={id} opacity={opacity} onPress={() => onMusclePress(g.id)}>
            {/* horizontal line */}
            <Path
              d={`M ${labelX} ${ay} L ${elbowX} ${ay}`}
              stroke={g.color}
              strokeWidth={isActive ? 2 : 1.3}
            />
            {/* diagonal dashed line to dot */}
            <Path
              d={`M ${elbowX} ${ay} L ${dotX} ${dotY}`}
              stroke={g.color}
              strokeWidth={isActive ? 1.5 : 0.9}
              strokeDasharray="3,2"
              opacity={0.8}
            />
            {/* dot on muscle */}
            <Circle
              cx={dotX}
              cy={dotY}
              r={isActive ? 4.5 : 3.2}
              fill={g.color}
              stroke={Colors.bg}
              strokeWidth={1.2}
            />
          </G>
        );
      })}
    </Svg>
  );
}
