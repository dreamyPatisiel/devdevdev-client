import { create } from 'zustand';

import { UserInfoType } from '@/types/userInfoType';

interface UserInfoProps {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
}

export const useUserInfoStore = create<UserInfoProps>((set) => ({
  userInfo: {
    accessToken: '',
    email: '정보 없음',
    nickname: '정보 없음',
  },
  setUserInfo: (userInfo: UserInfoType) => set({ userInfo: userInfo }),
}));
