import { PretendardVariable } from '@/styles/fonts';
import { ReactNode } from 'react';
import Header from './header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={PretendardVariable.className}>
      <Header />
      <main>{children}</main>
      <footer>푸턷다</footer>
    </div>
  );
}
