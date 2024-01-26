import Link from 'next/link';
import LoginButton from './LoginButton';
import { baseUrlConfig, loginConfig } from '@/config';

export default function LoginPage() {
  const URL = baseUrlConfig.serviceUrl || '';
  const END_PONIT = loginConfig.endPoint;
  const REDIRECT_URL = URL + END_PONIT;

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${loginConfig.clientId}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  console.log(kakaoAuthUrl);

  return (
    // <Link data-testid='kakaoLink' href={kakaoAuthUrl}>
    <>
      <LoginButton />
    </>
  );
}
