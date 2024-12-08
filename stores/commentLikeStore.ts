import { create } from 'zustand';

interface CommentLikeState {
  likedComments: Record<number, boolean>;
  setCommentLike: (commentId: number, isLiked: boolean) => void;
}

export const useCommentLikeStore = create<CommentLikeState>((set) => ({
  likedComments: {},
  setCommentLike: (commentId, isLiked) =>
    set((state) => ({
      likedComments: {
        ...state.likedComments,
        [commentId]: isLiked,
      },
    })),
}));
