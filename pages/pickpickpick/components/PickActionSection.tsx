import React from 'react';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { PickCount } from './PickCount';

interface PickActionSectionProps {
  count?: number;
}

export const PickActionSection = ({ count = 1 }: PickActionSectionProps) => {
  const { isMobile } = useMediaQueryContext();

  if (isMobile) {
    return (
      <div className='flex justify-between items-center mb-[2.4rem]'>
        <PickCount count={count} />
        <MobileDropdown />
      </div>
    );
  }

  return (
    <div className='mb-[2.4rem] flex justify-between items-center'>
      <PickCount count={count} />
      <Dropdown type='pickpickpick' />
    </div>
  );
};
