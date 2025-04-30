import { useEffect } from 'react';

import { cn } from '@utils/mergeStyle';

import { useAlertStore } from '@stores/AlertStore';

export default function AlertCountBadge({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  const { setBellDisabled } = useAlertStore();

  const getDisplayAlertCount = (count?: number) => {
    if (!count) return 0;
    return count <= 10 ? count : '10+';
  };

  useEffect(() => {
    if (count === 0) {
      setBellDisabled(true);
    }
  }, [count]);

  return (
    <div
      className={cn(
        'flex items-center justify-center px-[0.4rem] h-[1.6rem] rounded-RadiusRounded bg-primary500 cursor-pointer',
        count < 10 && 'w-[1.6rem]',
      )}
      onClick={onClick}
    >
      <span className='font-bold c2'>{getDisplayAlertCount(count)}</span>
    </div>
  );
}
