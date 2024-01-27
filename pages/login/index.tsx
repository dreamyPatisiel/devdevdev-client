import Link from 'next/link';
import Image from 'next/image';
import LoginButton from './LoginButton';
import { baseUrlConfig, loginConfig } from '@/config';
import Modal from '@/components/modal';

export default function LoginPage() {
  const URL = baseUrlConfig.serviceUrl || '';
  const END_PONIT = loginConfig.endPoint;
  const REDIRECT_URL = URL + END_PONIT;

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${loginConfig.clientId}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  console.log(kakaoAuthUrl);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Modal />
    </div>
  );
}
