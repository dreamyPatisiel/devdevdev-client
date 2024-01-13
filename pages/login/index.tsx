import Image from 'next/image';
import kakaoBtn from '@/public/image/kakao_login_medium_narrow.png';
export default function LoginPage() {
  return (
    <>
      <Image src={kakaoBtn} alt='카카오 로그인 버튼' data-testid='kakao' />
    </>
  );
}
