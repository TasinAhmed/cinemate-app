'use client';

import { usePathname } from 'next/navigation';
import Drawer from '@/components/Drawer';
import Navbar from '@/components/Navbar';
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
          <div className="ml-60 mt-16 flex-1">
            <Drawer user={session.data?.user} />
            <div className="h-full max-w-full overflow-hidden bg-batman-black p-8 text-white">
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
