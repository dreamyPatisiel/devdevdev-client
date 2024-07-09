import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { UserInfoType } from '@/types/userInfoType';

interface UserInfoProps {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
  removeUserInfo: () => void;
}

export const useUserInfoStore = create(
  persist<UserInfoProps>(
    (set) => ({
      userInfo: {
        accessToken: '',
        email: '정보 없음',
        nickname: '정보 없음',
      },
      setUserInfo: (userInfo: UserInfoType) => set({ userInfo: userInfo }),
      removeUserInfo: () => localStorage.removeItem('userInfo'),
    }),
    {
      name: 'userInfo', //Zustand 상태를 저장하는 데 사용되는 키
    },
  ),
);
