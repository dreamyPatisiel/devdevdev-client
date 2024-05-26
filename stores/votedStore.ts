import { create } from 'zustand';

interface VotedStoreProps {
  isVoted: boolean;
  setIsVoted: () => void;

  // firstVoted: boolean;
  // secondVoted: boolean;
  // firstVote: () => void;
  // secondVote: () => void;
}

export const useVotedStore = create<VotedStoreProps>((set) => ({
  isVoted: false,

  setIsVoted: () =>
    set({
      isVoted: true,
    }),

  // firstVoted: false,
  // secondVoted: false,
  // firstVote: () =>
  //   set((state) => ({
  //     ...state,
  //     isVoted: state.isVoted && state.secondVoted ? true : !state.isVoted,
  //     firstVoted: true,
  //     secondVoted: false,
  //   })),
  // secondVote: () =>
  //   set((state) => ({
  //     ...state,
  //     isVoted: state.isVoted && state.firstVoted ? true : !state.isVoted,
  //     firstVoted: false,
  //     secondVoted: true,
  //   })),
}));
