import { create } from 'zustand';

interface VotedStoreProps {
  isVoted: boolean;
  setVoted: () => void;
  setUnVoted: () => void;
}

export const useVotedStore = create<VotedStoreProps>((set) => ({
  isVoted: false,

  setVoted: () =>
    set({
      isVoted: true,
    }),

  setUnVoted: () =>
    set({
      isVoted: false,
    }),
}));
