import { formatISOtoDate } from '@utils/formatDate';

type TypeTestCase = {
  input: string;
  expected: string | null;
};

/** 서버에서 주는 YYYY-MM-DD HH:mm:ss 형식을 YYYY.MM.DD HH:mm로 바꾸는 함수 테스트 */
describe('formatISOtoDate', () => {
  describe('콘솔 에러 케이스', () => {
    let spy: jest.SpyInstance;

    beforeAll(() => {
      // 모든 에러 케이스 테스트에서 재사용
      spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
      // 각 케이스 끝나면 호출 내역 초기화
      spy.mockRestore();
    });

    afterEach(() => {
      // 다음 케이스 검증을 위해 호출 내역만 초기화
      spy.mockClear();
    });

    it('파라미터가 존재하지 않을 때 `YYYY-MM-DD HH:mm:ss 형식인 파라미터가 존재하지 않습니다.` 콘솔 에러를 띄우고 null을 반환한다.', () => {
      const testCase: TypeTestCase = { input: '', expected: null };

      const result = formatISOtoDate(testCase.input);

      expect(spy).toHaveBeenCalledWith('YYYY-MM-DD HH:mm:ss 형식인 파라미터가 존재하지 않습니다.');
      expect(result).toBe(testCase.expected);
    });

    it('YYYY 또는 MM 또는 DD 또는 HH 또는 mm 또는 ss 가 0이면 `파라미터에 0이 포함되어 있습니다.` 콘솔 에러를 띄우고 null을 반환한다.', () => {
      const testCases: TypeTestCase[] = [
        { input: '0-12-24 12:34:56', expected: null },
        { input: '2025-0-0 12:34:56', expected: null },
        { input: '2025-0-0 0:34:56', expected: null },
        { input: '2025-08-24 12:0:56', expected: null },
        { input: '2025-12-31 12:34:0', expected: null },
        { input: '2025-08-24 0:0:0', expected: null },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = formatISOtoDate(input);

        expect(spy).toHaveBeenCalledWith('파라미터에 0이 포함되어 있습니다.');
        expect(result).toBe(expected);
      });
    });
  });

  describe('정상 케이스', () => {
    it('YYYY-MM-DD HH:mm:ss 형식인 string을 파라미터로 받았을 때 YYYY.MM.DD HH:mm 형식으로 반환된다.', () => {
      const testCases: TypeTestCase[] = [
        { input: '2025-08-24 12:34:56', expected: '2025.08.24 12:34' },
        { input: '1111-12-31 44:55:01', expected: '1111.12.31 44:55' },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = formatISOtoDate(input);

        expect(result).toBe(expected);
      });
    });

    it('YYYY-M-DD HH:mm:ss 또는 YYYY-MM-D HH:mm:ss 또는 YYYY-MM-DD H:mm:ss 또는 YYYY-MM-DD HH:m:ss 형식일 경우 하나의 숫자일 때 앞에 0을 표시한다.', () => {
      const testCases: TypeTestCase[] = [
        { input: '2025-8-24 12:34:56', expected: '2025.08.24 12:34' },
        { input: '2025-12-4 12:34:56', expected: '2025.12.04 12:34' },
        { input: '2025-08-24 2:34:56', expected: '2025.08.24 02:34' },
        { input: '2025-08-24 12:4:56', expected: '2025.08.24 12:04' },
        { input: '2025-8-4 2:4:56', expected: '2025.08.04 02:04' },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = formatISOtoDate(input);

        expect(result).toBe(expected);
      });
    });
  });
});
