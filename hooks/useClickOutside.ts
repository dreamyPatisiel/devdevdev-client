import { useEffect } from 'react';

/**
 * 특정 요소 외부 클릭을 처리하는 커스텀 훅입니다.
 * @param ref - 외부 클릭을 감지할 요소의 ref입니다.
 * @param callback - 외부 클릭이 감지되었을 때 호출할 함수입니다.
 */

export function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
