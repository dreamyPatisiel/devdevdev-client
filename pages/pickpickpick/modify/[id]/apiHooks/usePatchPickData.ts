import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

export const patchPickData = async ({
  id,
  pickData,
}: {
  id?: string | string[];
  pickData: any;
}) => {
  const res = axios.patch(`/devdevdev/api/v1/picks/${id}`, pickData);

  return res;
};

export const usePatchPickData = () => {
  return useMutation({
    mutationFn: patchPickData,
  });
};
