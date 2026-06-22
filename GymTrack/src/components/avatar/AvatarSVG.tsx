import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { MUSCLE_GROUPS } from '../../data/muscleGroups';

const PAD_L = 110;
const PAD_R = 110;
const VW    = 220;
const VH    = 440;
const W     = VW + PAD_L + PAD_R;  // 440 — keeps original canvas width
const H     = VH + 20;             // 460

const BASE_FRONT = ['head', 'hair', 'hands', 'ankles', 'feet', 'knees'];
const BASE_BACK  = ['head', 'hair', 'hands', 'ankles', 'feet'];

interface Props {
  paths: Record<string, string>;
  side: 'front' | 'back';
  activeMuscleId: string | null;
  onMusclePress: (muscleId: string) => void;
}

export default function AvatarSVG({ paths, side, activeMuscleId, onMusclePress }: Props) {
  const baseSlugs = side === 'front' ? BASE_FRONT : BASE_BACK;

  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>

      {/* figure is offset by PAD_L so it sits centred in the canvas */}
      <G transform={`translate(${PAD_L}, 10)`}>

        {/* ── Base body silhouette ── */}
        {baseSlugs.map(sl =>
          paths[sl] ? (
            <Path
              key={sl}
              d={paths[sl]}
              fill="#1E2330"
              stroke="#2A3040"
              strokeWidth={0.6}
            />
          ) : null
        )}

        {/* ── Colored muscle groups ── */}
        {MUSCLE_GROUPS.map(g => {
          const slugs    = side === 'front' ? g.frontSlugs : g.backSlugs;
          const isActive = activeMuscleId === g.id;
          const isDimmed = activeMuscleId !== null && !isActive;

          return slugs.map(sl =>
            paths[sl] ? (
              <Path
                key={`${g.id}-${sl}`}
                d={paths[sl]}
                fill={g.color}
                stroke={g.color}
                strokeWidth={isActive ? 1.2 : 0.4}
                opacity={isDimmed ? 0.12 : isActive ? 1 : 0.88}
                onPress={() => onMusclePress(g.id)}
              />
            ) : null
          );
        })}



      </G>

      {/* ── Leader lines and labels removed ── */}
      {/* Previously rendered here — removed as labels overflow on small screens */}

    </Svg>
  );
}
