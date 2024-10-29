import { MouseEvent, useEffect, useState } from 'react';

import { ElementInfo, usePostQaToSlack } from '@/api/usePostQaToSlack';

export const useQaForm = () => {
  const [showQaForm, setShowQaForm] = useState(false);
  const [lastTime, setLastTime] = useState(0);
  const [qaFormPosition, setQaFormPosition] = useState({ x: 0, y: 0 });
  const [qaText, setQaText] = useState('');
  const [elementInfo, setElementInfo] = useState<ElementInfo>({
    pathName: '',
    tagName: '',
    className: '',
    id: '',
    textContent: '',
  });

  const { mutate: qaToslackMutate } = usePostQaToSlack();

  const handleEscKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowQaForm(false);
    }
  };

  const handledbContextMenu = (e: MouseEvent<HTMLElement>) => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastTime;

    if (timeDiff < 900) {
      const targetElement = e.target as HTMLElement;

      setShowQaForm(true);
      setQaFormPosition({ x: e.pageX, y: e.pageY });

      setElementInfo({
        pathName: targetElement.baseURI,
        tagName: targetElement.tagName,
        className: targetElement.className,
        id: targetElement.id,
        textContent: targetElement.textContent ?? '',
      });
    }

    setLastTime(currentTime);
  };

  const sendQaToSlack = () => {
    qaToslackMutate(
      { qaText, elementInfo },
      {
        onSuccess: () => setShowQaForm(false),
      },
    );
    setShowQaForm(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeydown);
    return () => window.removeEventListener('keydown', handleEscKeydown);
  }, []);

  return {
    showQaForm,
    setShowQaForm,
    qaFormPosition,
    setQaText,
    qaText,
    elementInfo,
    handledbContextMenu,
    sendQaToSlack,
  };
};
