import React from 'react';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { PickCount } from './PickCount';
import { WebWriteButton } from './PickWriteButton';

interface PickActionSectionProps {
  count?: number;
  hideDropdown?: boolean;
}

export const PickActionSection = ({ count = 1, hideDropdown = false }: PickActionSectionProps) => {
  const { isMobile } = useMediaQueryContext();

  if (isMobile) {
    return (
      <div className='flex justify-between items-center mb-[2.4rem]'>
        <PickCount count={count} />
        {!hideDropdown && <MobileDropdown />}
      </div>
    );
  }

  return (
    <div className='mb-[2.4rem] flex justify-between items-center'>
      <PickCount count={count} />
      <div className='flex gap-[1.6rem]'>
        {!hideDropdown && <Dropdown type='pickpickpick' />}
        <WebWriteButton />
      </div>
    </div>
  );
};
