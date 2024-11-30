import { create } from 'zustand';

interface SelectedPickCommentIdProps {
  selectedCommentId: number | null;
  setSelectedCommentId: (id: number | null) => void;
  setRefreshCommentPickId: () => void;
}

export const useSelectedPickCommentIdStore = create<SelectedPickCommentIdProps>((set) => ({
  selectedCommentId: null,
  setSelectedCommentId: (id) => set({ selectedCommentId: id }),
  setRefreshCommentPickId: () => set({ selectedCommentId: null }),
}));
