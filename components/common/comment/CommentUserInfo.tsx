import { useLoginStatusStore } from '@stores/loginStore';
import { useUserInfoStore } from '@stores/userInfoStore';
import { cn } from '@utils/mergeStyle';

export default function CommentUserInfo({className}:{className?:string}) {
  const { userInfo } = useUserInfoStore();

  const { loginStatus } = useLoginStatusStore();

  return (
    <section className={cn('p1 mt-[4rem] ml-4', className)}>
      {loginStatus === 'login' ? (
        <p>
          <span className='text-point3 font-bold'>{userInfo?.nickname || ''}</span>님 의견을
          남겨주세요!
        </p>
      ) : (
        <p>
          <span className='text-point3'>로그인</span> 후 의견을 남겨주세요!
        </p>
      )}
    </section>
  );
}
