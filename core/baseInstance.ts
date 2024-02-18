import axios from 'axios';

import { baseUrlConfig } from '@/config';

export const baseAPI = axios.create({
  baseURL: baseUrlConfig.serviceUrl,
});
