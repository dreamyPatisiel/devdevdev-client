import { baseUrlConfig } from '@/config';
import axios from 'axios';

export const baseAPI = axios.create({
  baseURL: baseUrlConfig.serviceUrl,
});
