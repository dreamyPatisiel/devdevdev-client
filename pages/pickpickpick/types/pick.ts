export interface PickAnswerProps {
  answer: string;
  picked: boolean | null;
  percent?: number;
}

export interface PickDataProps {
  id: number;
  question: string;
  answers: {
    answer: string;
    picked: boolean | null;
    percent?: number;
  }[];
  voteCount: number;
  commentCount: number;
  pages: {
    nextPage: true;
  };
}
