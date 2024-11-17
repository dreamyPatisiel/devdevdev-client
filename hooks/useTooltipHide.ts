import { useEffect, useRef } from 'react';

interface UseTooltipProps {
  tooltipMessage: string;
  setTooltipMessage: React.Dispatch<React.SetStateAction<string>>;
  dependencies?: any[];
}

const useTooltipHide = ({
  tooltipMessage,
  setTooltipMessage,
  dependencies = [],
}: UseTooltipProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const hideTooltipAfterDelay = () => {
      timeoutRef.current = setTimeout(() => {
        setTooltipMessage('');
      }, 2000);
    };

    if (tooltipMessage !== '') {
      hideTooltipAfterDelay();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [...dependencies]);
};

export default useTooltipHide;
