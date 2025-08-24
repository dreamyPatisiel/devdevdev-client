import { getMaskedEmail } from '@/utils/getUserInfo';

describe('getMaskedEmail', () => {
  it('이메일의 @ 앞부분을 마스킹 처리해야 한다', () => {
    const email = 'test@example.com';

    const result = getMaskedEmail(email);

    expect(result).toBe('tes*');
  });

  it('긴 이메일 주소도 올바르게 마스킹해야 한다', () => {
    const email = 'verylongemail@example.com';

    const result = getMaskedEmail(email);

    expect(result).toBe('ver**********');
  });

  it('짧은 이메일 주소도 올바르게 처리해야 한다', () => {
    const email = 'ab@example.com';

    const result = getMaskedEmail(email);

    expect(result).toBe('ab');
  });

  it('3글자 이메일 주소는 마스킹 없이 반환해야 한다', () => {
    const email = 'abc@example.com';

    const result = getMaskedEmail(email);

    expect(result).toBe('abc');
  });

  it('4글자 이메일 주소는 1글자만 마스킹해야 한다', () => {
    const email = 'abcd@example.com';

    const result = getMaskedEmail(email);

    expect(result).toBe('abc*');
  });

  it('다양한 도메인도 올바르게 처리해야 한다', () => {
    const email = 'user@gmail.com';

    const result = getMaskedEmail(email);

    expect(result).toBe('use*');
  });

  it('특수문자가 포함된 이메일도 처리해야 한다', () => {
    const email = 'user.name@example.com';

    const result = getMaskedEmail(email);

    expect(result).toBe('use******');
  });

  it('숫자가 포함된 이메일도 처리해야 한다', () => {
    const email = 'user123@example.com';

    const result = getMaskedEmail(email);

    expect(result).toBe('use****');
  });
});
