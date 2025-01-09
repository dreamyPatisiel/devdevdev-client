import MyWritingNav from '@pages/myinfo/components/MyWritingNav';
import MyInfo from '@pages/myinfo/index.page';

import MyCommentItem from './components/MyCommentItem';

export default function MyComment() {
  return (
    <MyInfo>
      <MyWritingNav />
      <MyCommentItem />
    </MyInfo>
  );
}
