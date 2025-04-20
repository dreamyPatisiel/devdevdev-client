import { useEffect } from 'react';

/**
 * 특정 요소 외부 클릭을 처리하는 커스텀 훅입니다.
 * @param ref - 외부 클릭을 감지할 요소의 ref입니다.
 * @param callback - 외부 클릭이 감지되었을 때 호출할 함수입니다.
 * @param ignoreRefs - 클릭 이벤트를 무시해야 하는 영역들을 명시하는 Ref 배열
 */

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  ignoreRefs: React.RefObject<HTMLElement>[] = [],
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // main ref 바깥 + 모든 ignoreRefs 바깥인 경우에만 실행
      const isOutsideMain = ref.current && !ref.current.contains(target);
      const isOutsideIgnored = ignoreRefs.every((ignoreRef) => {
        console.log(!ignoreRef.current?.contains(target));
        return !ignoreRef.current?.contains(target);
      });

      if (isOutsideMain && isOutsideIgnored) {
        console.log('실행?');
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, ignoreRefs]);
}
