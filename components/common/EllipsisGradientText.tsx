import { CSSProperties, FC } from 'react';

import { cn } from '@utils/mergeStyle';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

interface EllipsisTextProps {
  startPercent: string;
  endPercent: string;
  children: React.ReactNode;
  className?: string;
  isFullContents?: boolean;
}

export const EllipsisGradientText: FC<EllipsisTextProps> = ({
  startPercent,
  endPercent,
  children,
  className,
  isFullContents = false,
}) => {
  const { isMobile } = useMediaQueryContext();
  const gradientPercentStyle = `linear-gradient(180deg, #fff ${startPercent}, #292a2e ${endPercent})`;
  const combinedClass = cn(className);

  const gradientStyle: CSSProperties = {
    background: gradientPercentStyle,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    maxHeight: isMobile ? '370px' : '271px',
    overflow: 'hidden',
  };

  return (
    <div style={isFullContents ? undefined : gradientStyle} className={combinedClass}>
      {children}
    </div>
  );
};
