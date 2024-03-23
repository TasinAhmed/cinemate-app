'use client';
import { usePathname } from 'next/navigation';
import { createContext, useEffect, useMemo, useState } from 'react';

const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const contextValue = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading]
  );

  useEffect(() => {
    setLoading(true);
  }, [pathname]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
