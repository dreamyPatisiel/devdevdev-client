import { useRouter } from 'next/router';

import { getRandomIndex } from '@utils/randomNumber';

import { useModalStore } from '@stores/modalStore';
import { useNicknameStore } from '@stores/nicknameStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import JoinModalContent from '@components/common/JoinModalContent';
import { JOIN_SUCCESS_MODAL } from '@components/common/modals/modalConfig/login';
import {
  MYINFO_NICKNAME_COMPLELTE_MODAL,
  MYINFO_NICKNAME_EDIT_MODAL,
  MYINFO_NICKNAME_RESULT_10_MODAL,
  MYINFO_NICKNAME_RESULT_20_MODAL,
  MYINFO_NICKNAME_RESULT_MODAL,
} from '@components/common/modals/modalConfig/myInfoNickname';

import {
  NICKNAME_MODAL_FIRST_OVER_COUNT,
  NICKNAME_MODAL_SECOND_OVER_COUNT,
} from '@/constants/UserInfoConstants';

import { useGetNicknameChangeable } from '../apiHooks/useGetNicknameChangeable';
import { useGetNicknameRandom } from '../apiHooks/useGetNicknameRandom';
import { usePatchNickname } from '../apiHooks/usePatchNickname';
import NicknameComplete from '../components/NicknameComplete';
import NicknameResultModal from '../components/NicknameResultModal';

export const useNicknameModals = () => {
  const { pushModal, popModal } = useModalStore();
  const { setToastVisible } = useToastVisibleStore();
  const { setNickname } = useNicknameStore();

  const { mutate: patchNicknameMutate } = usePatchNickname();
  const { refetch: refetchChangeable } = useGetNicknameChangeable();

  const { refetch } = useGetNicknameRandom();

  const router = useRouter();

  const pushNicknameResult20Modal = (count: number, data: string) => {
    const nextCount = count + 1;

    const randomTitles = [
      '이제 진짜 마지막이에요… {nickname}, 더는 못 바꿔드려요!',
      '하… 정말 끈질기시네… {nickname}, 이거면 됐죠?',
      '이제 그만!! 후우... 이건 어때요? {nickname}',
    ];

    popModal();
    pushModal({
      ...MYINFO_NICKNAME_RESULT_20_MODAL,
      contents: <NicknameResultModal title={randomTitles[getRandomIndex(3)]} newNickname={data} />,
      submitFunction: () => pushCompleteModal(),
      cancelFunction: async () => {
        const data = await refetch();
        setNickname(data.data);

        pushNicknameResult20Modal(nextCount, data.data);
      },
    });
  };

  const pushNicknameResult10Modal = (count: number, data: string) => {
    const nextCount = count + 1;

    const randomTitles = [
      '으음~ 조금 까다로우시네 {nickname} 이건 만족하시죠?',
      '하아… 많이 고민했어요… {nickname} 이 정도 퀄리티면 인정 아닌가요?',
      '허허… 쉽지 않았습니다… 하지만 {nickname}, 결국 이게 제일 잘 어울려요!',
    ];

    popModal();
    pushModal({
      ...MYINFO_NICKNAME_RESULT_10_MODAL,
      contents: <NicknameResultModal title={randomTitles[getRandomIndex(3)]} newNickname={data} />,
      submitFunction: () => pushCompleteModal(),
      cancelFunction: async () => {
        const data = await refetch();
        setNickname(data.data);

        count >= NICKNAME_MODAL_SECOND_OVER_COUNT - 1
          ? pushNicknameResult20Modal(nextCount, data.data)
          : pushNicknameResult10Modal(nextCount, data.data);
      },
    });
  };

  const pushNicknameResultModal = (count: number, data?: string) => {
    const nextCount = count + 1;

    const randomTitles = [
      '짜잔 ~ {nickname} 딱 어울려요!',
      '이제부터 {nickname}으로 불릴 거예요, 기분 좋죠?',
      '두근두근~ {nickname}, 정말 매력적인 이름이에요!',
    ];

    popModal();
    pushModal({
      ...MYINFO_NICKNAME_RESULT_MODAL,
      contents: <NicknameResultModal title={randomTitles[getRandomIndex(3)]} newNickname={data} />,
      submitFunction: () => pushCompleteModal(),
      cancelFunction: async () => {
        const { data } = await refetch();
        setNickname(data);

        count >= NICKNAME_MODAL_FIRST_OVER_COUNT - 1
          ? pushNicknameResult10Modal(nextCount, data)
          : pushNicknameResultModal(nextCount, data);
      },
    });
  };

  const pushCompleteModal = () => {
    const nickname = useNicknameStore.getState().nickname;

    popModal();
    pushModal({
      ...MYINFO_NICKNAME_COMPLELTE_MODAL,
      contents: <NicknameComplete />,
      submitFunction: () => {
        patchNicknameMutate({ nickname: nickname });
        popModal();
      },
    });
  };

  const handleNicknameEditClick = async () => {
    const { data: changeable } = await refetchChangeable();

    if (!changeable) {
      return setToastVisible({
        message: '닉네임 변경 후 24시간이 지나지 않았어요!',
        type: 'success',
      });
    }

    pushModal({
      ...MYINFO_NICKNAME_EDIT_MODAL,
      submitFunction: () => pushNicknameResultModal(1),
      cancelFunction: () => popModal(),
    });
  };

  const handleJoinSuccess = () => {
    pushModal({
      ...JOIN_SUCCESS_MODAL,
      contents: <JoinModalContent />,
      submitFunction: () => {
        popModal();
        router.reload();
      },
      cancelFunction: () => pushNicknameResultModal(1),
    });
  };

  return { handleNicknameEditClick, handleJoinSuccess };
};
