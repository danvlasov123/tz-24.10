'use client';
import { FC, PropsWithChildren, Fragment, useEffect } from 'react';

import { useAppSelector } from 'src/hooks/storeHooks';

import { useRouter } from 'next/navigation';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth && location.pathname === '/auth') {
      push('/');
    } else {
      push('/auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isAuth]);

  return <Fragment>{children}</Fragment>;
};

export { AuthProvider };
