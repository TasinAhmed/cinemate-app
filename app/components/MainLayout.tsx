'use client';

import { usePathname } from 'next/navigation';
import Drawer from './Drawer';
import Navbar from './Navbar';
import { useSession } from 'next-auth/react';

interface MainLayoutprops {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutprops) => {
  const hideNavRoutes = ['/login'];
  const pathName = usePathname();
  const session = useSession();
  console.log(session, 'user session');

  return (
    <div className="flex h-full flex-col">
      {!hideNavRoutes.includes(pathName) ? (
        <>
          <Navbar user={session.data?.user} />
          <div className="flex flex-1">
            <Drawer user={session.data?.user} />
            <div className="flex-1">{children}</div>
          </div>
        </>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
};
export default MainLayout;
