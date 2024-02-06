import Link from 'next/link';
import Image from 'next/image';
import LoginButton from './LoginButton';
import { baseUrlConfig, loginConfig } from '@/config';
import Modal from '@/components/modal';

export default function LoginPage() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Modal />
    </div>
  );
}
