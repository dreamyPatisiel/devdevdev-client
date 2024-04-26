import axios from 'axios';

import { SuccessResponse } from '@/types/successResponse';

import { TechCardProps } from '../types/techBlogType';

export const getDetailTechBlog = async (id: string) => {
  const res = await axios.get<SuccessResponse<TechCardProps>>(`/devdevdev/api/v1/articles/${id}`);
  return res?.data;
};
