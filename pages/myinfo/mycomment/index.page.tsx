import MyWritingNav from '../components/MyWritingNav';
import MyInfo from '../index.page';
import MyCommentItem from './components/MyCommentItem';

export default function MyComment() {
  return (
    <MyInfo>
      <MyWritingNav />
      <MyCommentItem />
    </MyInfo>
  );
}
