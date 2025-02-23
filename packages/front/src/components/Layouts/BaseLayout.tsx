import React from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header/Header';

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <div className="min-h-screen">
      {!isLoginPage && <Header />}
      <main className="p-4">{children}</main>
    </div>
  );
}
