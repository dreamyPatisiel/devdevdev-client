import { useEffect } from 'react';

interface observerProps {
  target: React.MutableRefObject<null>;
  onIntersect: ([]: IntersectionObserverEntry[]) => void;
  root?: null;
  rootMargin?: string;
  threshold?: number;
}

export const useObserver = ({
  target, // 감지할 대상, ref를 넘길 예정
  onIntersect, // 감지 시 실행할 callback 함수
  root = null, // 교차할 부모 요소, 아무것도 넘기지 않으면 document가 기본이다.
  rootMargin = '10px', // root와 target이 감지하는 여백의 거리
  threshold = 0, // 임계점. 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행된다.
}: observerProps) => {
  useEffect(() => {
    if (!target || !target.current) {
      return;
    }
    const observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
    observer.observe(target.current);

    // observer를 사용하는 컴포넌트가 해제되면 observer 역시 꺼 주자.
    return () => observer?.disconnect();
  }, [target, rootMargin, threshold, root, onIntersect]);
};
