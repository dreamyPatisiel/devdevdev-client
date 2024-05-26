import Index from '@pages/index.page';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('테스트', () => {
  it('h1 태그에 "힘들고 막힐 때는 댑댑댑" 문구가 있어야 한다.', async () => {
    const { container } = render(<Index />);
    const h1 = container.querySelector('h1');

    expect(h1?.textContent).toBe('힘들고 막힐 때는 댑댑댑');
  });
});
