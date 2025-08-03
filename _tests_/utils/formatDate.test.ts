import { formatDate, formatISOtoDate } from '@/utils/formatDate';

describe('formatDate', () => {
  it('기본 YYYY-MM-DD 형식을 YYYY.MM.DD로 변환해야 한다', () => {
    const input = '2024-01-15';
    const result = formatDate(input);
    expect(result).toBe('2024.01.15');
  });

  it('다양한 날짜 형식을 올바르게 변환해야 한다', () => {
    const testCases = [
      { input: '2023-12-31', expected: '2023.12.31' },
      { input: '2024-02-29', expected: '2024.02.29' },
      { input: '2025-06-15', expected: '2025.06.15' },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = formatDate(input);
      expect(result).toBe(expected);
    });
  });

  it('한 자리 월/일을 두 자리로 패딩해야 한다', () => {
    const testCases = [
      { input: '2024-1-15', expected: '2024.01.15' },
      { input: '2024-01-1', expected: '2024.01.01' },
      { input: '2024-1-1', expected: '2024.01.01' },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = formatDate(input);
      expect(result).toBe(expected);
    });
  });

  it('빈 문자열이 입력되면 null을 반환해야 한다', () => {
    const input = '';
    const result = formatDate(input);
    expect(result).toBeNull();
  });

  it('하이픈이 없는 문자열은 null을 반환해야 한다', () => {
    const input = '20240115';
    const result = formatDate(input);
    expect(result).toBeNull();
  });

  it('공백이 포함된 날짜도 처리해야 한다', () => {
    const input = ' 2024-01-15 ';
    const result = formatDate(input);
    expect(result).toBe('2024.01.15');
  });
});

describe('formatISOtoDate', () => {
  it('기본 YYYY-MM-DD HH:mm:ss 형식을 YYYY.MM.DD HH:mm로 변환해야 한다', () => {
    const input = '2024-01-15 14:30:25';
    const result = formatISOtoDate(input);
    expect(result).toBe('2024.01.15 14:30');
  });

  it('다양한 시간 형식을 올바르게 변환해야 한다', () => {
    const testCases = [
      { input: '2023-12-31 23:59:59', expected: '2023.12.31 23:59' },
      { input: '2024-06-15 09:30:00', expected: '2024.06.15 09:30' },
      { input: '2025-02-14 12:00:30', expected: '2025.02.14 12:00' },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = formatISOtoDate(input);
      expect(result).toBe(expected);
    });
  });

  it('한 자리 시간/분을 두 자리로 패딩해야 한다', () => {
    const testCases = [
      { input: '2024-3-5 9:5:00', expected: '2024.03.05 09:05' },
      { input: '2024-12-1 15:30:05', expected: '2024.12.01 15:30' },
      { input: '2024-1-9 8:45:30', expected: '2024.01.09 08:45' },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = formatISOtoDate(input);
      expect(result).toBe(expected);
    });
  });

  it('초 부분이 제거되어야 한다', () => {
    const testCases = [
      { input: '2024-01-15 14:30:45', expected: '2024.01.15 14:30' },
      { input: '2024-01-15 14:30:00', expected: '2024.01.15 14:30' },
    ];

    testCases.forEach(({ input, expected }) => {
      const result = formatISOtoDate(input);
      expect(result).toBe(expected);
    });
  });

  it('빈 문자열이 입력되면 null을 반환해야 한다', () => {
    const input = '';
    const result = formatISOtoDate(input);
    expect(result).toBeNull();
  });

  it('시간 부분이 없는 날짜도 처리해야 한다', () => {
    const input = '2024-01-15';
    const result = formatISOtoDate(input);
    expect(result).toBe('2024.01.15');
  });

  it('시간만 있는 형식도 처리해야 한다', () => {
    const input = '14:30:25';
    const result = formatISOtoDate(input);
    expect(result).toBe('14:30');
  });

  it('밀리초가 포함된 형식도 처리해야 한다', () => {
    const input = '2024-01-15 14:30:25.123';
    const result = formatISOtoDate(input);
    expect(result).toBe('2024.01.15 14:30');
  });
});
