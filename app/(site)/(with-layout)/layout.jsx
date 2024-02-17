'use client';

import { usePathname } from 'next/navigation';
import Drawer from '../../components/Drawer';
import Navbar from '../../components/Navbar';
import { useSession } from 'next-auth/react';

const MainLayout = ({ children }) => {
  const hideNavRoutes = ['/login'];
  const pathName = usePathname();
  const session = useSession();

  return (
    <div className="flex h-full flex-col">
      {!hideNavRoutes.includes(pathName) ? (
        <>
          <Navbar user={session.data?.user} />
          <div className="flex flex-1">
            <Drawer user={session.data?.user} />
            <div className="flex-1 bg-batman-black p-8 text-white">
              {children}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
};
export default MainLayout;