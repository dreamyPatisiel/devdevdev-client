export default function Layout({ children }) {
  return (
    <>
      <div>
        <header className='bg-hello dark:bg-slate-800'>헤더다</header>
        <main>{children}</main>
        <footer>푸턷다</footer>
      </div>
    </>
  );
}
