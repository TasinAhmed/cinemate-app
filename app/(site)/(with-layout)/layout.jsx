'use client';

import { usePathname } from 'next/navigation';
import Drawer from '@/components/Drawer';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import GlobalContext from 'app/context/GlobalContext';
import Loader from '@/components/Loader';

const MainLayout = ({ children }) => {
  const hideNavRoutes = ['/login'];
  const pathName = usePathname();
  const session = useSession();
  const { loading } = useContext(GlobalContext);

  return (
    <div className="flex h-full flex-col">
      {!hideNavRoutes.includes(pathName) ? (
        <>
          <Navbar user={session.data?.user} />
          <div className="ml-60 mt-16 flex-1">
            <Drawer user={session.data?.user} />
            <div className="relative h-full max-w-full overflow-hidden bg-batman-black text-white">
              {loading && (
                <div className="absolute left-0 top-0 z-50 h-full w-full bg-batman-black">
                  <Loader />
                </div>
              )}
              <div>{children}</div>
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
