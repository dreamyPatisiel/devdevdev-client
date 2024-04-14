import axios from 'axios';
import { error } from 'console';

import { PostPicksProps } from '@pages/types/postPicks';

export const postPicks = (data: PostPicksProps) => {
  try {
    const res = axios.post('/devdevdev/api/v1/picks', data);
    return res;
  } catch {
    console.error(error);
  }
};
