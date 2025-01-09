import MyWritingNav from '@pages/myinfo/components/MyWritingNav';
import MyInfo from '@pages/myinfo/index.page';

import MyCommentItem from './components/MyCommentItem';

export default function MyComment() {
  return (
    <MyInfo>
      <MyWritingNav />
      <MyCommentItem
        commentType={'PICK'}
        author={'아이유짱'}
        maskedEmail={'iuu*******'}
        postId={222}
        commentId={123}
        postTitle={
          '아이유는 국민가수인데요. 여러분은 아이유의 노래 중 무엇이 가장 아이유의 성장에 큰 도움을 줬다고 생각하시나요?!'
        }
        commentCreatedAt={'2023-05-11'}
        commentContents={
          '여러모로 그는 K-팝 아티스트 중 아티스트 라는 호칭의 고전적 의미에 가장 가까운 스타다. 음악가로서 그가 본업에 충실하고, 단호하되 과격하지 않게 대중과 소통함으로써 존경을 쌓아온 한편, 인간 이지은의 성공 신화와 미담은 한국인이 숭배하는 또 다른 가치를 드러낸다.'
        }
        commentLikedCount={12344}
        pickOptionTitle={
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Kakao의 방법이 더 서버의 비용을 절감하고 유용합니다.'
        }
        pickOptionType={'firstPickOption'}
      />
    </MyInfo>
  );
}
