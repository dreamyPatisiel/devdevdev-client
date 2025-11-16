import { useAnimationControls } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';

type Options = {
  itemCount: number;
  dwellMs: number;
  slideMs: number;
  reduceMotion: boolean | null;
};

export function useVerticalStepLoop({ itemCount, dwellMs, slideMs, reduceMotion }: Options) {
  const controls = useAnimationControls();
  const firstItemRef = useRef<HTMLParagraphElement | null>(null);
  const [rowHeight, setRowHeight] = useState(0);

  useEffect(() => {
    if (firstItemRef.current) setRowHeight(firstItemRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (reduceMotion === true || rowHeight === 0) return;

    let i = 0;
    // 한 칸씩 위로 이동 후, 마지막(복제된 첫 항목)까지 도달하면 즉시 y=0으로 스냅하여
    // 시각적 깜빡임 없이 처음 상태로 되돌립니다. (복제된 첫 항목과 실제 첫 항목은 동일 내용)
    const tick = async () => {
      i += 1;
      await controls.start({
        y: -(i * rowHeight),
        transition: { duration: slideMs / 1000, ease: 'easeInOut' },
      });
      if (i === itemCount) {
        controls.set({ y: 0 });
        i = 0;
      }
    };

    const id = setInterval(tick, dwellMs + slideMs);
    return () => clearInterval(id);
  }, [controls, reduceMotion, rowHeight, itemCount, dwellMs, slideMs]);

  return { controls, firstItemRef } as const;
}
