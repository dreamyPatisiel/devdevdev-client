import { getCookie, checkLogin, getGA } from '@/utils/getCookie';

const setMockCookies = (cookies: string) => {
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: cookies,
  });
};

describe('getCookie', () => {
  beforeEach(() => {
    setMockCookies('');
  });

  it('존재하는 쿠키의 값을 반환해야 한다', () => {
    setMockCookies('testCookie=testValue; otherCookie=otherValue');

    const result = getCookie('testCookie');

    expect(result).toBe('testValue');
  });

  it('존재하지 않는 쿠키는 null을 반환해야 한다', () => {
    setMockCookies('testCookie=testValue');

    const result = getCookie('nonexistentCookie');

    expect(result).toBeNull();
  });

  it('URL 인코딩된 쿠키 값을 올바르게 디코딩해야 한다', () => {
    setMockCookies('encodedCookie=test%40example.com');

    const result = getCookie('encodedCookie');

    expect(result).toBe('test@example.com');
  });

  it('공백이 있는 쿠키도 올바르게 처리해야 한다', () => {
    setMockCookies(' spacedCookie = spacedValue ');

    const result = getCookie('spacedCookie');

    expect(result).toBe('spacedValue');
  });

  it('빈 쿠키 문자열에서도 null을 반환해야 한다', () => {
    setMockCookies('');

    const result = getCookie('anyCookie');

    expect(result).toBeNull();
  });

  it('여러 쿠키 중에서 정확한 쿠키를 찾아야 한다', () => {
    setMockCookies('cookie1=value1; cookie2=value2; cookie3=value3');

    const result = getCookie('cookie2');

    expect(result).toBe('value2');
  });

  it('쿠키 값에 특수문자가 포함되어도 올바르게 처리해야 한다', () => {
    setMockCookies('specialCookie=value%20with%20spaces%26symbols');

    const result = getCookie('specialCookie');

    expect(result).toBe('value with spaces&symbols');
  });

  it('쿠키 값이 숫자여도 문자열로 반환해야 한다', () => {
    setMockCookies('numberCookie=12345');

    const result = getCookie('numberCookie');

    expect(result).toBe('12345');
  });

  it('쿠키 값이 JSON 형태여도 올바르게 처리해야 한다', () => {
    setMockCookies('jsonCookie=%7B%22name%22%3A%22test%22%7D');

    const result = getCookie('jsonCookie');

    expect(result).toBe('{"name":"test"}');
  });

  it('쿠키 이름에 대소문자를 구분해야 한다', () => {
    setMockCookies('TestCookie=value; testcookie=otherValue');

    const result = getCookie('TestCookie');

    expect(result).toBe('value');
  });

  it('빈 값의 쿠키도 올바르게 처리해야 한다', () => {
    setMockCookies('emptyCookie=; otherCookie=value');

    const result = getCookie('emptyCookie');

    expect(result).toBe('');
  });
});

describe('checkLogin', () => {
  beforeEach(() => {
    setMockCookies('');
  });

  it('DEVDEVDEV_LOGIN_STATUS가 active이면 active를 반환해야 한다', () => {
    setMockCookies('DEVDEVDEV_LOGIN_STATUS=active');

    const result = checkLogin();

    expect(result).toBe('active');
  });

  it('DEVDEVDEV_LOGIN_STATUS가 active가 아니면 checking을 반환해야 한다', () => {
    setMockCookies('DEVDEVDEV_LOGIN_STATUS=inactive');

    const result = checkLogin();

    expect(result).toBe('checking');
  });

  it('DEVDEVDEV_LOGIN_STATUS 쿠키가 없으면 checking을 반환해야 한다', () => {
    setMockCookies('otherCookie=value');

    const result = checkLogin();

    expect(result).toBe('checking');
  });

  it('DEVDEVDEV_LOGIN_STATUS가 빈 값이면 checking을 반환해야 한다', () => {
    setMockCookies('DEVDEVDEV_LOGIN_STATUS=');

    const result = checkLogin();

    expect(result).toBe('checking');
  });

  it('DEVDEVDEV_LOGIN_STATUS가 대소문자 구분 없이 active이면 active를 반환해야 한다', () => {
    setMockCookies('DEVDEVDEV_LOGIN_STATUS=ACTIVE');

    const result = checkLogin();

    expect(result).toBe('active');
  });

  it('다른 로그인 상태 값들도 checking을 반환해야 한다', () => {
    const testCases = ['pending', 'failed', 'expired', 'unknown'];

    testCases.forEach((status) => {
      setMockCookies(`DEVDEVDEV_LOGIN_STATUS=${status}`);

      const result = checkLogin();

      expect(result).toBe('checking');
    });
  });
});

describe('getGA', () => {
  beforeEach(() => {
    setMockCookies('');
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('_ga 쿠키가 있으면 해당 값을 반환해야 한다', async () => {
    setMockCookies('_ga=GA1.2.123456789.1234567890');

    const resultPromise = getGA();

    const result = await resultPromise;
    expect(result).toBe('GA1.2.123456789.1234567890');
  });

  it('_ga 쿠키가 없으면 undefined를 반환해야 한다', async () => {
    setMockCookies('otherCookie=value');

    const resultPromise = getGA();

    await jest.runAllTimersAsync();

    const result = await resultPromise;
    expect(result).toBeUndefined();
  });

  it('최대 재시도 횟수만큼 시도해야 한다', async () => {
    setMockCookies('otherCookie=value');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const resultPromise = getGA();

    await jest.runAllTimersAsync();

    await resultPromise;
    expect(consoleSpy).toHaveBeenCalledWith('Failed to get GA cookie after maximum retries');

    consoleSpy.mockRestore();
  });

  it('재시도 중에 쿠키가 생기면 즉시 반환해야 한다', async () => {
    setMockCookies('otherCookie=value');

    const resultPromise = getGA();

    jest.advanceTimersByTime(1000);
    setMockCookies('_ga=GA1.2.123456789.1234567890; otherCookie=value');

    const result = await resultPromise;
    expect(result).toBe('GA1.2.123456789.1234567890');
  });

  it('다양한 GA 쿠키 형식을 올바르게 처리해야 한다', async () => {
    const testCases = [
      'GA1.1.123456789.1234567890',
      'GA1.2.987654321.0987654321',
      'GA1.3.111111111.2222222222',
    ];

    for (const gaCookie of testCases) {
      setMockCookies(`_ga=${gaCookie}`);

      const resultPromise = getGA();

      const result = await resultPromise;
      expect(result).toBe(gaCookie);
    }
  });

  it('GA 쿠키가 URL 인코딩되어 있어도 올바르게 처리해야 한다', async () => {
    setMockCookies('_ga=GA1.2.123456789.1234567890%3B');

    const resultPromise = getGA();

    const result = await resultPromise;
    expect(result).toBe('GA1.2.123456789.1234567890;');
  });

  it('빈 GA 쿠키 값도 undefined로 처리해야 한다', async () => {
    setMockCookies('_ga=');

    const resultPromise = getGA();

    await jest.runAllTimersAsync();

    const result = await resultPromise;
    expect(result).toBeUndefined();
  });
});
