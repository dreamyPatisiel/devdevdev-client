import { SubButton } from '@components/common/buttons/subButtons';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export default function StartExitButton({ setNextStep }: { setNextStep: () => void }) {
  const { isMobile } = useMediaQueryContext();

  return (
    <SubButton
      text='네 탈퇴할게요'
      variant='primary'
      onClick={setNextStep}
      className={isMobile ? 'w-full mt-auto px-[2rem] py-[1.2rem]' : ''}
    />
  );
}
