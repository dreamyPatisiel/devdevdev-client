import React from 'react';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export default function AlertBellIcon({
  color = 'gray500',
  className,
  onClick,
}: {
  color?: string;
  className?: string;
  onClick?: () => void;
}) {
  const { isMobile } = useMediaQueryContext();

  const handleAlertBellClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className={className || ''} onClick={handleAlertBellClick}>
      <svg
        width={isMobile ? '15' : '20'}
        height={isMobile ? '17' : '24'}
        viewBox='0 0 20 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10 22.5C8.59375 22.5 7.5 21.4062 7.5 20H12.4609C12.4609 21.4062 11.3672 22.5 10 22.5ZM18.3984 16.6797C18.6328 16.9141 18.75 17.2266 18.75 17.5C18.7109 18.1641 18.2422 18.75 17.4609 18.75H2.5C1.71875 18.75 1.25 18.1641 1.25 17.5C1.21094 17.2266 1.32812 16.9141 1.5625 16.6797C2.30469 15.8594 3.75 14.6484 3.75 10.625C3.75 7.61719 5.85938 5.19531 8.75 4.57031V3.75C8.75 3.08594 9.29688 2.5 10 2.5C10.6641 2.5 11.2109 3.08594 11.2109 3.75V4.57031C14.1016 5.19531 16.2109 7.61719 16.2109 10.625C16.2109 14.6484 17.6562 15.8594 18.3984 16.6797Z'
          fill={`var(--${color})`}
        />
      </svg>
    </div>
  );
}
