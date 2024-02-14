'use client';

import { usePathname } from 'next/navigation';

const Navbar = () => {
  const hideNavRoutes = ['/login'];
  const pathName = usePathname();

  return (
    !hideNavRoutes.includes(pathName) && <div className="bg-red h-8 w-full" />
  );
};
export default Navbar;
