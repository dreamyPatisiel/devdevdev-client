import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '@/pages';

describe('테스트', () => {
  it('div 태그에 "index 나와라!" 문구가 있어야 한다.', async () => {
    const { container } = render(<Index />);
    const div = container.querySelector('div');

    expect(div?.textContent).toBe('index 나와라!');
  });
});
