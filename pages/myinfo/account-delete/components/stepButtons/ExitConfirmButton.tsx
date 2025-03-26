import { SubButton } from '@components/common/buttons/subButtons';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useDeleteProfile } from '../../apiHooks/useDeleteProfile';

export default function ExitConfirmButton({
  setPrevStep,
  agreeChecked,
}: {
  setPrevStep: () => void;
  agreeChecked: boolean;
}) {
  const { isMobile } = useMediaQueryContext();
  const { mutate: accountDeleteMutate } = useDeleteProfile();

  return (
    <div className={`flex gap-[0.8rem] ${isMobile ? 'w-full' : ''}`}>
      <SubButton
        text='이전'
        variant='gray'
        onClick={setPrevStep}
        className={isMobile ? 'w-full px-[2rem] py-[1.2rem]' : ''}
      />
      <SubButton
        text='탈퇴하기'
        variant='primary'
        onClick={() => {
          accountDeleteMutate();
        }}
        disabled={!agreeChecked}
        className={isMobile ? 'w-full px-[2rem] py-[1.2rem]' : ''}
      />
    </div>
  );
}
