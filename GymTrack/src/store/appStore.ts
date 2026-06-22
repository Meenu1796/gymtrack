import { create } from 'zustand';
import { Gender } from '../types';

type AppState = {
  selectedGender: Gender;
  activeMuscleId: string | null;
  isShowingFront: boolean;

  setGender: (gender: Gender) => void;
  selectMuscle: (id: string | null) => void;
  flipAvatar: () => void;
};

export const useAppStore = create<AppState>(set => ({
  selectedGender: 'female',
  activeMuscleId: null,
  isShowingFront: true,

  setGender: gender => set({ selectedGender: gender }),
  selectMuscle: id => set({ activeMuscleId: id }),
  flipAvatar: () => set(s => ({ isShowingFront: !s.isShowingFront })),
}));
