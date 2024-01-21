import { PretendardVariable } from '@/styles/fonts';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={PretendardVariable.className}>
      <header className='bg-primary1 dark:bg-slate-800'>헤더다</header>
      <main>{children}</main>
      <footer>푸턷다</footer>
    </div>
  );
}
