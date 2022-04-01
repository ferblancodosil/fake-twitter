import React, { createContext, useContext, useMemo } from 'react';

export const signInUrl = '/api/sign-in';
export const signOutUrl = '/api/sign-out';

export type User = null | { id: string; nickname: string };

type ContextType = {
  user: User;
  signInUrl: string;
  signOutUrl: string;
};

const Context = createContext<ContextType>({ user: null, signInUrl, signOutUrl });

export const AuthProvider = ({
  children,
  value: valueParam,
}: {
  children?: React.ReactNode;
  value: User;
}) => {
  const value = useMemo(
    () => ({
      user: valueParam,
      signInUrl,
      signOutUrl,
    }),
    [valueParam],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);
