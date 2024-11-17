import { useLoginStatusStore } from '@stores/loginStore';
import { useUserInfoStore } from '@stores/userInfoStore';

export default function CommentUserInfo() {
  const { userInfo } = useUserInfoStore();

  const { loginStatus } = useLoginStatusStore();

  return (
    <section className='p1 mt-[12.8rem] ml-4'>
      {loginStatus === 'login' ? (
        <p>
          <span className='text-point3'>{userInfo?.nickname || ''}</span>님 의견을 남겨주세요!
        </p>
      ) : (
        <p>
          <span className='text-point3'>로그인</span> 후 의견을 남겨주세요!
        </p>
      )}
    </section>
  );
}
