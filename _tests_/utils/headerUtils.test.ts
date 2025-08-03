import { isNavigationActive } from '@/utils/headerUtils';

describe('isNavigationActive', () => {
  it('정확히 일치하는 경로에서 true를 반환해야 한다', () => {
    const testCases: Array<{ link: '/pickpickpick' | '/techblog' | '/myinfo'; pathname: string }> =
      [
        { link: '/pickpickpick', pathname: '/pickpickpick' },
        { link: '/techblog', pathname: '/techblog' },
        { link: '/myinfo', pathname: '/myinfo' },
      ];

    testCases.forEach(({ link, pathname }) => {
      const result = isNavigationActive(link, pathname);
      expect(result).toBe(true);
    });
  });

  it('하위 경로에서도 true를 반환해야 한다', () => {
    const testCases: Array<{ link: '/pickpickpick' | '/techblog' | '/myinfo'; pathname: string }> =
      [
        { link: '/pickpickpick', pathname: '/pickpickpick/detail' },
        { link: '/techblog', pathname: '/techblog/post/123' },
        { link: '/myinfo', pathname: '/myinfo/settings' },
      ];

    testCases.forEach(({ link, pathname }) => {
      const result = isNavigationActive(link, pathname);
      expect(result).toBe(true);
    });
  });

  it('다른 경로에서는 false를 반환해야 한다', () => {
    const testCases: Array<{ link: '/pickpickpick' | '/techblog' | '/myinfo'; pathname: string }> =
      [
        { link: '/pickpickpick', pathname: '/techblog' },
        { link: '/techblog', pathname: '/myinfo' },
        { link: '/myinfo', pathname: '/pickpickpick' },
      ];

    testCases.forEach(({ link, pathname }) => {
      const result = isNavigationActive(link, pathname);
      expect(result).toBe(false);
    });
  });

  it('비슷한 경로명에서도 정확히 구분해야 한다', () => {
    const testCases: Array<{ link: '/pickpickpick' | '/techblog' | '/myinfo'; pathname: string }> =
      [
        { link: '/myinfo', pathname: '/myinfosettings' },
        { link: '/techblog', pathname: '/techblogpost' },
        { link: '/pickpickpick', pathname: '/pickpickpickdetail' },
      ];

    testCases.forEach(({ link, pathname }) => {
      const result = isNavigationActive(link, pathname);
      expect(result).toBe(false);
    });
  });

  it('경계 케이스에서 올바르게 동작해야 한다', () => {
    const testCases: Array<{
      link: '/pickpickpick' | '/techblog' | '/myinfo';
      pathname: string;
      expected: boolean;
    }> = [
      { link: '/pickpickpick', pathname: '', expected: false },
      { link: '/techblog', pathname: '/', expected: false },
      { link: '/myinfo', pathname: '/my', expected: false },
    ];

    testCases.forEach(({ link, pathname, expected }) => {
      const result = isNavigationActive(link, pathname);
      expect(result).toBe(expected);
    });
  });
});
